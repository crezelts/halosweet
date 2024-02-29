import { MongoClient } from 'mongodb'

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body
    const { email, password } = data

  const client = await MongoClient('mongodb+srv://cudd:C50OpQtP8O8bgBSH@cluster0.exl9lhe.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 10 });
  
try {  
  await client.connect()
  const db = client.db('game')
  const meetupCollection = db.collection('meetup')

  const result = await meetupCollection.findOne({ email, password })

  if (result) {
    return res.status(400).json({ message: 'Email already exists' })
  }

  await meetupCollection.createIndex({ email: 1, password: 1 })

  await meetupCollection.insertOne(data)
  console.log('Meetup inserted:', data)

  res.status(201).json({ message: 'Meetup inserted!' })
  } catch (error) {
    console.error('Error inserting meetup:', error)
    res.status(500).json({ message: 'Failed to insert meetup' })
  } finally {
    await client.close()
  }
} else {
  res.status(405).json({ message: 'Method Not Allowed' })
}
}

export default handler