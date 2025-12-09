import type { HttpContext } from '@adonisjs/core/http'
import Sticker from '../Models/sticker.js'

export default class StickersController {
  public async index({}: HttpContext) {
    const stickers = await Sticker.all()
    return { data: stickers }
  }

  public async show({ params }: HttpContext) {
    const sticker = await Sticker.findOrFail(params.id)
    return { data: sticker }
  }
}
