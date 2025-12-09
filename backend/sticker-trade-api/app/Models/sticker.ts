import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import UserSticker from './user_sticker.js'
import OrderItem from './order_item.js'
import TradeItem from './trade_item.js'

export default class Sticker extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string

  @column()
  declare name: string

  @column()
  declare team: string

  @column()
  declare rarity: 'common' | 'rare' | 'legendary'

  @column()
  declare price: number

  @column()
  declare imageUrl?: string

  @hasMany(() => UserSticker)
  declare userStickers: HasMany<typeof UserSticker>

  @hasMany(() => OrderItem)
  declare orderItems: HasMany<typeof OrderItem>

  @hasMany(() => TradeItem)
  declare tradeItems: HasMany<typeof TradeItem>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
