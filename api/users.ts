import { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // 사용자 목록 조회
      const result = await pool.query('SELECT id, username, email, created_at FROM users ORDER BY created_at DESC');
      
      res.status(200).json({
        success: true,
        data: result.rows,
        message: 'Users retrieved successfully'
      });
    } else if (req.method === 'POST') {
      // 새 사용자 생성 (로그인 시 사용자 정보 저장)
      const { username, email } = req.body;
      
      if (!username || !email) {
        return res.status(400).json({
          success: false,
          message: 'Username and email are required'
        });
      }

      const result = await pool.query(
        'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING id, username, email, created_at',
        [username, email]
      );

      res.status(201).json({
        success: true,
        data: result.rows[0],
        message: 'User created successfully'
      });
    } else {
      res.status(405).json({
        success: false,
        message: 'Method not allowed'
      });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}
