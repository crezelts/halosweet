// pages/api/auth.js

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { email, password } = req.body;

  try {
    // MongoDB에 연결하고 사용자 정보를 저장합니다.
    const { client, ratings } = await connectToMongoDB();
    await ratings.insertOne({ email, password });
    client.close();

    // 사용자 가입이 성공한 경우 200 OK를 반환합니다.
    res.status(200).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    // 오류가 발생한 경우 500 Internal Server Error를 반환합니다.
    res.status(500).json({ message: 'Failed to sign up' });
  }
}

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
