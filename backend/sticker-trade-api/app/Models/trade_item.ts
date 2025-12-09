import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Trade from './trade.js'
import Sticker from './sticker.js'

export default class TradeItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tradeId: number

  @column()
  declare direction: 'give' | 'receive'

  @column()
  declare stickerId: number

  @column()
  declare quantity: number

  @belongsTo(() => Trade)
  declare trade: BelongsTo<typeof Trade>

  @belongsTo(() => Sticker)
  declare sticker: BelongsTo<typeof Sticker>
}
