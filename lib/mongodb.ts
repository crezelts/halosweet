import { MongoClient, Db } from 'mongodb'

const connectToDatabase = async () => {
  const uri: string | undefined = 'mongodb+srv://cudd:C50OpQtP8O8bgBSH@cluster0.exl9lhe.mongodb.net/'
  if (!uri) {
    console.error("Environment variable DB_CONNECT_URI is undefined.")
    return null;
  }
  try {
    const mongoClient: MongoClient = await new MongoClient(uri).connect()
    const database: Db = mongoClient.db('post')
    return { mongoClient, database }
  } catch (e) {
    console.error(e)
    return null;
  }
}

export default connectToDatabase
