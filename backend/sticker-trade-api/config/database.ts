import app from '@adonisjs/core/services/app'
import env from '../start/env.js'
import { defineConfig } from '@adonisjs/lucid'
import fs from 'node:fs'
import path from 'node:path'

// Garante que o diretório do sqlite exista (pra dev local, se usar)
const dbDir = app.makePath('storage')
fs.mkdirSync(dbDir, { recursive: true })
const sqliteFile = path.join(dbDir, 'db.sqlite3')

const dbConfig = defineConfig({
  connection: env.get('NODE_ENV') === 'production' ? 'pg' : env.get('DB_CONNECTION', 'sqlite'),

  connections: {
    sqlite: {
      client: 'better-sqlite3',
      connection: {
        filename: sqliteFile,
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },

    pg: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT') ? Number(env.get('DB_PORT')) : 5432,
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
