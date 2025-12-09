import type { HttpContext } from '@adonisjs/core/http'
import TradeService from '../Services/Trades/trade_service.js'
import CreateTradeValidator from '../Validators/Trade/create_trade_validator.js'
import Trade from '../Models/trade.js'

export default class TradesController {
  constructor(private tradeService: TradeService = new TradeService()) {}

  public async index({ auth }: HttpContext) {
    const user = auth.user!
    const trades = await this.tradeService.listForUser(user.$attributes.id)
    return { data: trades }
  }

  public async store({ auth, request }: HttpContext) {
    const user = auth.user!
    const payload = await request.validate(CreateTradeValidator)

    const trade = await this.tradeService.createTrade(
      user.$attributes.id,
      payload.receiverId,
      payload.give,
      payload.receive
    )

    return { data: trade }
  }

  public async accept({ auth, params }: HttpContext) {
    const user = auth.user!
    const trade = await this.tradeService.acceptTrade(Number(params.id), user.$attributes.id)
    return { data: trade }
  }

  public async reject({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const trade = await Trade.findOrFail(params.id)

    if (trade.receiverId !== user.$attributes.id) {
      return response.unauthorized({ message: 'Somente o destinatário pode rejeitar' })
    }
    trade.status = 'rejected'
    await trade.save()

    return { data: trade }
  }
}
