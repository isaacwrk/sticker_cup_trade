import db from '@adonisjs/lucid/services/db'
import Trade from '../../Models/trade.js'
import TradeItem from '../../Models/trade_item.js'
import UserSticker from '../../Models/user_sticker.js'
import { Exception } from '@adonisjs/core/exceptions'

interface TradeItemInput {
  stickerId: number
  quantity: number
}

export default class TradeService {
  public async listForUser(userId: number) {
    return Trade.query()
      .where('requester_id', userId)
      .orWhere('receiver_id', userId)
      .preload('items', (q) => q.preload('sticker'))
  }

  public async createTrade(
    requesterId: number,
    receiverId: number,
    give: TradeItemInput[],
    receive: TradeItemInput[]
  ) {
    return db.transaction(async (trx) => {
      for (const g of give) {
        const us = await UserSticker.query({ client: trx })
          .where('user_id', requesterId)
          .andWhere('sticker_id', g.stickerId)
          .first()
        if (!us || us.quantity < g.quantity) {
          throw new Exception('Requester não possui quantidade suficiente para troca')
        }
      }

      const trade = await Trade.create(
        {
          requesterId,
          receiverId,
          status: 'pending',
        },
        { client: trx }
      )

      for (const g of give) {
        await TradeItem.create(
          {
            tradeId: trade.id,
            direction: 'give',
            stickerId: g.stickerId,
            quantity: g.quantity,
          },
          { client: trx }
        )
      }

      for (const r of receive) {
        await TradeItem.create(
          {
            tradeId: trade.id,
            direction: 'receive',
            stickerId: r.stickerId,
            quantity: r.quantity,
          },
          { client: trx }
        )
      }

      return trade
    })
  }

  public async acceptTrade(tradeId: number, actingUserId: number) {
    return db.transaction(async (trx) => {
      const trade = await Trade.query({ client: trx }).where('id', tradeId).firstOrFail()

      if (trade.receiverId !== actingUserId) {
        throw new Exception('Somente o destinatário pode aceitar a troca', { status: 403 })
      }
      if (trade.status !== 'pending') {
        throw new Exception('Troca não está mais pendente')
      }

      await trade.load('items', (q) => q.preload('sticker'))

      const give = trade.items.filter((i) => i.direction === 'give')
      const receive = trade.items.filter((i) => i.direction === 'receive')

      for (const r of receive) {
        const usReceiver = await UserSticker.query({ client: trx })
          .where('user_id', trade.receiverId)
          .andWhere('sticker_id', r.stickerId)
          .first()
        if (!usReceiver || usReceiver.quantity < r.quantity) {
          throw new Exception('Destinatário não possui quantidade suficiente para troca')
        }
      }

      const moveSticker = async (
        fromUserId: number,
        toUserId: number,
        stickerId: number,
        qty: number
      ) => {
        const from = await UserSticker.query({ client: trx })
          .where('user_id', fromUserId)
          .andWhere('sticker_id', stickerId)
          .first()

        if (!from || from.quantity < qty) {
          throw new Exception('Usuário não possui quantidade suficiente durante a troca')
        }
        from.quantity -= qty
        await from.useTransaction(trx).save()

        const to = await UserSticker.query({ client: trx })
          .where('user_id', toUserId)
          .andWhere('sticker_id', stickerId)
          .first()

        if (to) {
          to.quantity += qty
          await to.useTransaction(trx).save()
        } else {
          await UserSticker.create(
            {
              userId: toUserId,
              stickerId,
              quantity: qty,
            },
            { client: trx }
          )
        }
      }

      for (const g of give) {
        await moveSticker(trade.requesterId, trade.receiverId, g.stickerId, g.quantity)
      }

      for (const r of receive) {
        await moveSticker(trade.receiverId, trade.requesterId, r.stickerId, r.quantity)
      }

      trade.status = 'accepted'
      await trade.useTransaction(trx).save()

      return trade
    })
  }
}
