import { schema } from '@adonisjs/validator'

export default class LoginValidator {
  public schema = schema.create({
    email: schema.string(),
    password: schema.string(),
  })
}
