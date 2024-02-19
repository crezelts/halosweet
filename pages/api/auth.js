// { api connect }
// /pages/api/auth.js


import { MongoClient } from 'mongodb'




const username = encodeURIComponent("cudd");
const password = encodeURIComponent("C500pQtP808bgBSH");
const cluster = "cluster0";
const authSource = "exl9lhe";
const authMechanism = "mongodb.net/";
let uri =
  `mongodb+srv://${username}:${password}@${cluster}/?authSource=${authSource}&authMechanism=${authMechanism}`;
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const database = client.db("BrainB");
    const ratings = database.collection("post");
    const cursor = ratings.find();
    await cursor.forEach(doc => console.dir(doc));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
