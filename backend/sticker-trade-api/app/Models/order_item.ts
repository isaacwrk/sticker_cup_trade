import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Order from './order.js'
import Sticker from './sticker.js'

export default class OrderItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare orderId: number

  @column()
  declare stickerId: number

  @column()
  declare quantity: number

  @column()
  declare unitPrice: number

  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>

  @belongsTo(() => Sticker)
  declare sticker: BelongsTo<typeof Sticker>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
