import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DATABASE; 
const collectionName = process.env.MONGODB_COLLECTION; 

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
  
async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      const { email, password } = data;

      await client.connect(); 

      const db = client.db(dbName); 
      const meetupCollection = db.collection(collectionName); 

      const result = await meetupCollection.insertOne(data);

      console.log(result);

      await client.close(); 

      res.status(200).json({ message: 'Meetup inserted!' });
    } catch (error) {
      console.error('Error inserting meetup:', error);
      res.status(500).json({ message: 'Failed to insert meetup' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;