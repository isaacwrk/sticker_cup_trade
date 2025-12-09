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
  // decide a connection via ENV: sqlite (dev) ou pg (prod)
  connection: env.get('DB_CONNECTION') || 'sqlite',

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
        host: env.get('PG_HOST'),
        port: env.get('PG_PORT') ? Number(env.get('PG_PORT')) : undefined,
        user: env.get('PG_USER'),
        password: env.get('PG_PASSWORD'),
        database: env.get('PG_DB_NAME'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
