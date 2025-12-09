import { schema } from '@adonisjs/validator'

export default class CreateTradeValidator {
  public schema = schema.create({
    receiverId: schema.number(),
    give: schema.array().members(
      schema.object().members({
        stickerId: schema.number(),
        quantity: schema.number(),
      })
    ),
    receive: schema.array().members(
      schema.object().members({
        stickerId: schema.number(),
        quantity: schema.number(),
      })
    ),
  })
}
