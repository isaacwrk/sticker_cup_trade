import type { HttpContext } from '@adonisjs/core/http'
import OrderService from '../Services/Orders/order_service.js'
import CreateOrderValidator from '../Validators/Order/create_order_validator.js'

export default class OrdersController {
  constructor(private orderService: OrderService = new OrderService()) {}

  public async index({ auth }: HttpContext) {
    const user = auth.user!
    const orders = await this.orderService.listByUser(user.$attributes.id)
    return { data: orders }
  }

  public async store({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const payload = await request.validate(CreateOrderValidator)
    try {
      const order = await this.orderService.createFromItems(user.$attributes.id, payload.items)
      await user.refresh()

      return { data: order, balance: user.balance }
    } catch (error) {
      if (error.message === 'Saldo insuficiente') {
        return response.badRequest({ message: 'Saldo insuficiente para concluir a compra' })
      }
      if (error.message.startsWith('Limite de compra atingido')) {
        return response.badRequest({ message: error.message })
      }
      return response.internalServerError({ message: 'Erro ao criar pedido' })
    }
  }
}
