import knex from 'knex'
import { NextApiRequest, NextApiResponse } from 'next'

const db = knex({
  client: 'mysql',
  connection: {
    server: 'localhost',
    port: 3306,
    user: 'lofigirl',
    database: 'lofigirl'
  }
})

export default async function ListApi (_: NextApiRequest, res: NextApiResponse) {
  res.json(await db.select('*').from('themes'))
}
