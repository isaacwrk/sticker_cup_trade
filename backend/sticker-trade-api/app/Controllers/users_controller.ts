import type { HttpContext } from '@adonisjs/core/http'
import UserSticker from '../Models/user_sticker.js'

export default class UsersController {
  public async me({ auth }: HttpContext) {
    return auth.user
  }

  public async inventory({ auth }: HttpContext) {
    const user = auth.user!
    const items = await UserSticker.query().where('user_id', user.$attributes.id).preload('sticker')

    return { data: items }
  }
}
