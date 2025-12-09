import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stickers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.string('code').notNullable().unique()
      table.string('name').notNullable()
      table.string('team').notNullable()

      // common | rare | legendary
      table.string('rarity').notNullable()

      // preço da figurinha
      table.decimal('price', 10, 2).notNullable()

      // URL opcional da imagem (pode ser null)
      table.string('image_url').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
