import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Sticker from '../../app/Models/sticker.js'

export default class StickerSeeder extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await Sticker.createMany([
      // Brasil
      {
        code: 'BRA-01',
        name: 'Escudo do Brasil',
        team: 'Brasil',
        rarity: 'rare',
        price: 8.0,
        imageUrl: undefined,
      },
      {
        code: 'BRA-10',
        name: 'Neymar Jr.',
        team: 'Brasil',
        rarity: 'legendary',
        price: 15.0,
        imageUrl: undefined,
      },
      {
        code: 'BRA-09',
        name: 'Vini Jr.',
        team: 'Brasil',
        rarity: 'legendary',
        price: 14.0,
        imageUrl: undefined,
      },
      {
        code: 'BRA-05',
        name: 'Casemiro',
        team: 'Brasil',
        rarity: 'rare',
        price: 6.5,
        imageUrl: undefined,
      },
      {
        code: 'BRA-03',
        name: 'Marquinhos',
        team: 'Brasil',
        rarity: 'common',
        price: 3.5,
        imageUrl: undefined,
      },

      // Argentina
      {
        code: 'ARG-01',
        name: 'Escudo da Argentina',
        team: 'Argentina',
        rarity: 'rare',
        price: 8.0,
        imageUrl: undefined,
      },
      {
        code: 'ARG-10',
        name: 'Lionel Messi',
        team: 'Argentina',
        rarity: 'legendary',
        price: 18.0,
        imageUrl: undefined,
      },
      {
        code: 'ARG-11',
        name: 'Di María',
        team: 'Argentina',
        rarity: 'rare',
        price: 7.0,
        imageUrl: undefined,
      },
      {
        code: 'ARG-09',
        name: 'Julián Álvarez',
        team: 'Argentina',
        rarity: 'common',
        price: 4.0,
        imageUrl: undefined,
      },

      // França
      {
        code: 'FRA-01',
        name: 'Escudo da França',
        team: 'França',
        rarity: 'rare',
        price: 8.0,
        imageUrl: undefined,
      },
      {
        code: 'FRA-10',
        name: 'Kylian Mbappé',
        team: 'França',
        rarity: 'legendary',
        price: 17.0,
        imageUrl: undefined,
      },
      {
        code: 'FRA-07',
        name: 'Griezmann',
        team: 'França',
        rarity: 'rare',
        price: 7.0,
        imageUrl: undefined,
      },
      {
        code: 'FRA-04',
        name: 'Varane',
        team: 'França',
        rarity: 'common',
        price: 3.5,
        imageUrl: undefined,
      },

      // Portugal
      {
        code: 'POR-01',
        name: 'Escudo de Portugal',
        team: 'Portugal',
        rarity: 'rare',
        price: 8.0,
        imageUrl: undefined,
      },
      {
        code: 'POR-07',
        name: 'Cristiano Ronaldo',
        team: 'Portugal',
        rarity: 'legendary',
        price: 16.0,
        imageUrl: undefined,
      },
      {
        code: 'POR-08',
        name: 'Bruno Fernandes',
        team: 'Portugal',
        rarity: 'rare',
        price: 6.5,
        imageUrl: undefined,
      },

      // Inglaterra
      {
        code: 'ENG-01',
        name: 'Escudo da Inglaterra',
        team: 'Inglaterra',
        rarity: 'rare',
        price: 8.0,
        imageUrl: undefined,
      },
      {
        code: 'ENG-09',
        name: 'Harry Kane',
        team: 'Inglaterra',
        rarity: 'legendary',
        price: 14.0,
        imageUrl: undefined,
      },
      {
        code: 'ENG-17',
        name: 'Bukayo Saka',
        team: 'Inglaterra',
        rarity: 'rare',
        price: 7.0,
        imageUrl: undefined,
      },

      // Outras seleções (pra catálogo ficar recheado)
      {
        code: 'GER-01',
        name: 'Escudo da Alemanha',
        team: 'Alemanha',
        rarity: 'rare',
        price: 7.5,
        imageUrl: undefined,
      },
      {
        code: 'GER-08',
        name: 'Gündogan',
        team: 'Alemanha',
        rarity: 'common',
        price: 3.0,
        imageUrl: undefined,
      },
      {
        code: 'ESP-01',
        name: 'Escudo da Espanha',
        team: 'Espanha',
        rarity: 'rare',
        price: 7.5,
        imageUrl: undefined,
      },
      {
        code: 'ESP-10',
        name: 'Gavi',
        team: 'Espanha',
        rarity: 'rare',
        price: 6.0,
        imageUrl: undefined,
      },
      {
        code: 'CRO-10',
        name: 'Luka Modrić',
        team: 'Croácia',
        rarity: 'legendary',
        price: 12.0,
        imageUrl: undefined,
      },
      {
        code: 'BEL-10',
        name: 'Kevin De Bruyne',
        team: 'Bélgica',
        rarity: 'legendary',
        price: 13.0,
        imageUrl: undefined,
      },
      {
        code: 'URU-09',
        name: 'Luis Suárez',
        team: 'Uruguai',
        rarity: 'rare',
        price: 7.5,
        imageUrl: undefined,
      },
      {
        code: 'NED-10',
        name: 'Memphis Depay',
        team: 'Holanda',
        rarity: 'rare',
        price: 6.5,
        imageUrl: undefined,
      },
      {
        code: 'SEN-10',
        name: 'Sadio Mané',
        team: 'Senegal',
        rarity: 'rare',
        price: 7.0,
        imageUrl: undefined,
      },
      {
        code: 'JPN-10',
        name: 'Takumi Minamino',
        team: 'Japão',
        rarity: 'common',
        price: 4.0,
        imageUrl: undefined,
      },
    ])
  }
}
