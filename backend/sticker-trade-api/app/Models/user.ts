import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'
import Order from './order.js'
import UserSticker from './user_sticker.js'
import Trade from './trade.js'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare passwordHash: string

  @column()
  declare balance: number

  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>

  @hasMany(() => UserSticker)
  declare stickers: HasMany<typeof UserSticker>

  @hasMany(() => Trade, { foreignKey: 'requesterId' })
  declare tradesRequested: HasMany<typeof Trade>

  @hasMany(() => Trade, { foreignKey: 'receiverId' })
  declare tradesReceived: HasMany<typeof Trade>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static accessTokens = DbAccessTokensProvider.forModel(User)

  public async setPassword(plain: string) {
    this.passwordHash = await hash.make(plain)
  }

  public static async verifyCredentials(email: string, password: string) {
    const user = await this.query().where('email', email).first()
    if (!user) return null
    const ok = await hash.verify(user.passwordHash, password)
    return ok ? user : null
  }
}
