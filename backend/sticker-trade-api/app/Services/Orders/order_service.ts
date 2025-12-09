import db from '@adonisjs/lucid/services/db'
import Order from '../../Models/order.js'
import OrderItem from '../../Models/order_item.js'
import UserSticker from '../../Models/user_sticker.js'
import Sticker from '../../Models/sticker.js'
import User from '../../Models/user.js'

interface OrderItemInput {
  stickerId: number
  quantity: number
}

export default class OrderService {
  public async listByUser(userId: number) {
    return Order.query()
      .where('user_id', userId)
      .preload('items', (q) => q.preload('sticker'))
  }

  public async createFromItems(userId: number, items: OrderItemInput[]) {
    if (!items.length) {
      throw new Error('Nenhum item informado')
    }

    return db.transaction(async (trx) => {
      const user = await User.query({ client: trx }).where('id', userId).firstOrFail()

      let total = 0

      const order = await Order.create(
        {
          userId,
          total: 0,
          status: 'pending',
        },
        { client: trx }
      )

      for (const item of items) {
        const sticker = await Sticker.query({ client: trx })
          .where('id', item.stickerId)
          .firstOrFail()

        // ---------- REGRA DE LIMITE POR RARIDADE ----------
        const userSticker = await UserSticker.query({ client: trx })
          .where('user_id', userId)
          .andWhere('sticker_id', sticker.id)
          .first()

        const currentQty = userSticker?.quantity ?? 0

        const maxByRarity: Record<string, number> = {
          common: 4,
          rare: 2,
          legendary: 1,
        }

        const maxAllowed = maxByRarity[sticker.rarity] ?? 4

        const rarityLabel =
          sticker.rarity === 'legendary' ? 'lendária' : sticker.rarity === 'rare' ? 'rara' : 'comum'

        const requestedTotal = currentQty + item.quantity

        if (requestedTotal > maxAllowed) {
          throw new Error(
            `Limite de compra atingido para ${sticker.name} (${rarityLabel}). Máximo de ${maxAllowed} por usuário.`
          )
        }
        const lineTotal = Number(sticker.price) * item.quantity
        total += lineTotal

        await OrderItem.create(
          {
            orderId: order.id,
            stickerId: sticker.id,
            quantity: item.quantity,
            unitPrice: Number(sticker.price),
          },
          { client: trx }
        )

        if (userSticker) {
          userSticker.quantity = requestedTotal
          await userSticker.useTransaction(trx).save()
        } else {
          await UserSticker.create(
            {
              userId,
              stickerId: sticker.id,
              quantity: item.quantity,
            },
            { client: trx }
          )
        }
      }

      // saldo
      if (user.balance < total) {
        throw new Error('Saldo insuficiente')
      }

      user.balance = Number(user.balance) - total
      await user.useTransaction(trx).save()

      order.total = total
      order.status = 'paid'
      await order.useTransaction(trx).save()

      return order
    })
  }
}
