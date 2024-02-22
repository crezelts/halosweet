import { MongoClient, Db } from 'mongodb'

const connectToDatabase = async () => {
  const uri: string | undefined = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Environment variable DB_CONNECT_URI is undefined.")
    return null;
  }
  try {
    const mongoClient: MongoClient = await new MongoClient(uri).connect()
    const database: Db = mongoClient.db('BrainB')
    return { mongoClient, database }
  } catch (e) {
    console.error(e)
    return null;
  }
}

export default connectToDatabase
