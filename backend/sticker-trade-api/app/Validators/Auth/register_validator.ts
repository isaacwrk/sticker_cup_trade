import { schema, rules } from '@adonisjs/validator'

export default class RegisterValidator {
  public schema = schema.create({
    name: schema.string({}, [rules.maxLength(255)]),
    email: schema.string({}, [rules.email(), rules.maxLength(255)]),
    password: schema.string({}, [rules.minLength(6)]),
  })
}
