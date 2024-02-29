import { MongoClient, ServerApiVersion } from 'mongodb'


  const uri = 'mongodb+srv://cudd:C50OpQtP8O8bgBSH@cluster0.exl9lhe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  

async function handler(req, res) {
    if (req.method === 'POST') {
      const data = req.body
      const { email, password } = data


  const db = client.db('game')
  const meetupCollection = db.collection('meetup')

  const result = await meetupCollection.insertOne(data)

  console.log(result)

  client.close()
  res.status(200).json({ message: 'Meetup inserted!' })
  }
}

export default handler