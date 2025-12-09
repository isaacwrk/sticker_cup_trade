import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_stickers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table
        .integer('sticker_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('stickers')
        .onDelete('CASCADE')

      table.integer('quantity').unsigned().notNullable().defaultTo(0)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      // evita duplicar linha de mesmo user + sticker
      table.unique(['user_id', 'sticker_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
