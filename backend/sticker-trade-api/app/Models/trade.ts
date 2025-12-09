import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import TradeItem from './trade_item.js'

export default class Trade extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare requesterId: number

  @column()
  declare receiverId: number

  @column()
  declare status: 'pending' | 'accepted' | 'rejected' | 'cancelled'

  @belongsTo(() => User, { foreignKey: 'requesterId' })
  declare requester: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'receiverId' })
  declare receiver: BelongsTo<typeof User>

  @hasMany(() => TradeItem)
  declare items: HasMany<typeof TradeItem>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
