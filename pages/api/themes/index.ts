import knex from 'knex'
import sha256 from 'sha256'
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

export default async function ListApi (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { auth, name, url } = req.body

    if (sha256(process.env.ADMIN_SALT + auth) !== process.env.ADMIN_PW) {
      return res.json({ success: false, message: '암호가 잘못되었습니다' })
    }

    await db.insert({ name, url }).from('themes')
    return res.json({ success: true, message: '적용되었습니다' })
  }

  res.json(await db.select('*').from('themes'))
}
