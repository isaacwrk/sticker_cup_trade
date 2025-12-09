import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Sticker from './sticker.js'

export default class UserSticker extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare stickerId: number

  @column()
  declare quantity: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Sticker)
  declare sticker: BelongsTo<typeof Sticker>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
