import { MongoClient } from 'mongodb';

async function connectToMongoDB() {
  const uri =
    'mongodb+srv://cudd:C50OpQtP8O8bgBSH@cluster0.exl9lhe.mongodb.net/';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("ifream");
    const ratings = database.collection("post");
    return { client, ratings };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function fetchData() {
  const { client, ratings } = await connectToMongoDB();
  
  try {
    const cursor = ratings.find();
    const documents = await cursor.toArray();
    documents.forEach(doc => console.dir(doc));
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    client.close();
  }
}

fetchData().catch(console.error);
