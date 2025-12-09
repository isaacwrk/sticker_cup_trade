import { schema } from '@adonisjs/validator'

export default class CreateOrderValidator {
  public schema = schema.create({
    items: schema.array().members(
      schema.object().members({
        stickerId: schema.number(),
        quantity: schema.number(),
      })
    ),
  })
}
