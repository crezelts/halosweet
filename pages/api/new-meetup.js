import { MongoClient } from 'mongodb'

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body
    const { email, password } = data

  const client = await MongoClient.connect('mongodb+srv://cudd:C50OpQtP8O8bgBSH@cluster0.exl9lhe.mongodb.net/?retryWrites=true&w=majority')
  const db = client.db('game')
  const meetupCollection = db.collection('meetup')

  const result = await meetupCollection.insertOne(data)

  console.log(result)

  client.close()
  res.status(200).json({ message: 'Meetup inserted!' })
  }
}

export default handler