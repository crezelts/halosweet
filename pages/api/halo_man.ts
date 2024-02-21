import { NextApiRequest, NextApiResponse } from 'next/types'
import { Db } from 'mongodb'
import connectToDatabase from '../../lib/mongodb'

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const connection = await connectToDatabase()
  const database: Db | undefined = connection?.database
  
  if (database === undefined) {
    console.error("Database connection is undefined.")
    response.status(500).end("Internal Server Error")
    return
  }
  
  const collection = database.collection('jesus')
  
  if (request.method === 'GET') {
    const results = await collection.find({}).limit(10).toArray()
    response.status(200).json(results)
  } else if (request.method === 'POST') {
    const { email, password } = request.body
    
    if (!email || !password) {
      console.error("Email or password is missing.")
      response.status(400).end("Bad Request")
      return
    }

    try {
      // 데이터베이스에 데이터를 추가합니다.
      await collection.insertOne({ email, password })
      
      // 성공적으로 처리되면 클라이언트에게 응답을 보냅니다.
      response.status(200).end("Data successfully processed")
    } catch (error) {
      console.error("Error inserting data:", error)
      response.status(500).end("Internal Server Error")
    }
  }
}

export default handler
