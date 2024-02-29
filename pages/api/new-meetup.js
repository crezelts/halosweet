import { MongoClient, ServerApiVersion } from 'mongodb'


  const uri = process.env.MONGODB_URI

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


  const db = client.db(MONGODB_DATABASE)
  const meetupCollection = db.collection(MONGODB_COLLECTION)

  const result = await meetupCollection.insertOne(data)

  console.log(result)

  client.close()
  res.status(200).json({ message: 'Meetup inserted!' })
  }
}

export default handler