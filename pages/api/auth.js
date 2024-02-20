// pages/api/auth.js

import mysql from 'mysql2/promise';

// 환경 변수에서 데이터베이스 연결 정보를 가져옵니다.
const dbConfig = {
  host: 'localhost', 
  port: '3307',
  user: 'root',
  password: '070226', 
  database: 'mydatabase' 
};

// 데이터베이스에 연결하는 함수
async function connectToDatabase() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}

// 사용자 정보를 삽입하는 함수
async function insertUser(email, password) {
  const connection = await connectToDatabase();
  try {
    await connection.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
    console.log('User inserted successfully');
  } catch (error) {
    console.error('Error inserting user:', error);
  } finally {
    await connection.end();
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { email, password } = req.body;

  try {
    // 사용자 정보를 삽입합니다.
    await insertUser(email, password);

    // 사용자 가입이 성공한 경우 200 OK를 반환합니다.
    res.status(200).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    // 오류가 발생한 경우 500 Internal Server Error를 반환합니다.
    res.status(500).json({ message: 'Failed to sign up' });
  }
}
