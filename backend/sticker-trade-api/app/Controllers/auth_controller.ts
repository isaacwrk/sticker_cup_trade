import type { HttpContext } from '@adonisjs/core/http'
import User from '../Models/user.js'
import RegisterValidator from '../Validators/Auth/register_validator.js'
import LoginValidator from '../Validators/Auth/login_validator.js'

export default class AuthController {
  public async register({ request, auth, response }: HttpContext) {
    let payload: any
    try {
      payload = await request.validate(RegisterValidator)
    } catch {
      payload = request.only(['name', 'email', 'password'])
      if (!payload.name || !payload.email || !payload.password) {
        return response.badRequest({ message: 'Missing name, email or password' })
      }
    }

    const user = new User()
    user.name = payload.name
    user.email = payload.email
    user.balance = 50
    await user.setPassword(payload.password)
    await user.save()

    const token = await auth.use('api').createToken(user)

    return { user, token: token.value!.release() }
  }

  public async login({ request, auth, response }: HttpContext) {
    let payload: any
    try {
      payload = await request.validate(LoginValidator)
    } catch {
      payload = request.only(['email', 'password'])
      if (!payload.email || !payload.password) {
        return response.badRequest({ message: 'Missing email or password' })
      }
    }

    const user = await User.verifyCredentials(payload.email, payload.password)
    if (!user) {
      return response.unauthorized({ message: 'Credenciais inválidas' })
    }

    const token = await auth.use('api').createToken(user)
    return { user, token: token.value!.release() }
  }
}
