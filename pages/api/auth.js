// { api connect }
// /pages/api/data.js


import { MongoClient } from 'mongodb'
import { mongoURI, dbName } from '../../database'



export default async function handler(req, res) {
  let client

  try {
    // MongoDB와 연결
    client = await MongoClient.connect(mongoURI)
    const db = client.db(dbName)

    // 데이터베이스에서 데이터 가져오기
    const data = await db.collection('post').find().toArray()

    // 클라이언트에 데이터 반환
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  } finally {
    // 클라이언트 종료
    if (client) {
      await client.close()
    }
  }
}
