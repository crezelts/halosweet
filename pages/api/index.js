// app/api/index.js

import mongoose from 'mongoose';

const uri = 'mongodb+srv://cudd:C50OpQtP8O8bgBSH@cluster0.exl9lhe.mongodb.net/ifream.post';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
      await mongoose.connection.close();
      res.status(200).json({ message: 'Connected to MongoDB' });
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      res.status(500).json({ message: 'Error connecting to MongoDB' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
