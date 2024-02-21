import mongoose from 'mongoose';

// MongoDB 연결 URI
const uri = 'mongodb+srv://cudd:C50OpQtP8O8bgBSH@cluster0.exl9lhe.mongodb.net/ifream_post';

// MongoDB 연결 설정
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
};

export default async function handler(req, res) {
  if (req.method === 'POST') { // 이 부분을 수정
    try {
      // MongoDB에 연결
      await mongoose.connect(uri, options);
      console.log('Connected to MongoDB');
      // MongoDB 연결 종료
      await mongoose.connection.close();
      // 클라이언트에 성공 응답 반환
      res.status(200).json({ message: 'Connected to MongoDB' });
    } catch (error) {
      // 오류가 발생한 경우 클라이언트에 오류 응답 반환
      console.error('Error connecting to MongoDB:', error.message);
      res.status(500).json({ message: 'Error connecting to MongoDB' });
    }
  } else {
    // 잘못된 HTTP 메서드인 경우 클라이언트에 허용되지 않음 응답 반환
    res.setHeader('Allow', ['POST']); // 이 부분을 수정
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
