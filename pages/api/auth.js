// pages/api/auth.js

import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// 데이터베이스 파일 경로
const dbPath = './mydatabase.db';

// 데이터베이스 생성 및 연결
async function connectToDatabase() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
  return db;
}

// 사용자 정보를 삽입하는 함수
async function insertUser(email, password) {
  const db = await connectToDatabase();
  try {
    await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
    console.log('User inserted successfully');
  } catch (error) {
    console.error('Error inserting user:', error);
  } finally {
    await db.close();
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
