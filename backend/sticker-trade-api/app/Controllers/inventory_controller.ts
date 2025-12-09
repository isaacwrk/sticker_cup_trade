import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import UserSticker from '../Models/user_sticker.js'
import Sticker from '../Models/sticker.js'

export default class InventoryController {
  public async index({ auth }: HttpContext) {
    const user = auth.user!

    const items = await UserSticker.query().where('user_id', user.id).preload('sticker')

    return {
      balance: user.balance,
      items,
    }
  }

  public async sell({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const { stickerId, quantity } = request.only(['stickerId', 'quantity'])

    const qty = Number(quantity) || 0
    if (qty <= 0) {
      return response.badRequest({ message: 'Quantidade inválida' })
    }

    return await db.transaction(async (trx) => {
      const userSticker = await UserSticker.query({ client: trx })
        .where('user_id', user.id)
        .andWhere('sticker_id', stickerId)
        .first()

      if (!userSticker || userSticker.quantity < qty) {
        return response.badRequest({
          message: 'Quantidade insuficiente dessa figurinha para vender',
        })
      }

      const sticker = await Sticker.query({ client: trx }).where('id', stickerId).firstOrFail()

      const totalValue = Number(sticker.price) * qty

      // atualiza quantidade
      userSticker.quantity -= qty

      let updatedItem = null

      if (userSticker.quantity <= 0) {
        // zerei -> remove do inventário
        await userSticker.useTransaction(trx).delete()
      } else {
        // ainda tenho algumas -> só salva + carrega relação
        await userSticker.useTransaction(trx).save()
        await userSticker.load('sticker')
        updatedItem = userSticker
      }

      // credita saldo do usuário
      user.balance = Number(user.balance) + totalValue
      await user.useTransaction(trx).save()

      return {
        balance: user.balance,
        item: updatedItem,
      }
    })
  }
}
