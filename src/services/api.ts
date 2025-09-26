import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰이 만료되었거나 인증에 실패한 경우
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export interface LoginResponse {
  success: boolean;
  data: {
    user: {
      id: number;
      username: string;
      email: string;
      created_at: string;
    };
    token: string;
  };
  message: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface UsersResponse {
  success: boolean;
  data: User[];
  message: string;
}

// 로그인 API
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post('/auth', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// 사용자 목록 조회 API
export const fetchUsers = async (token: string): Promise<User[]> => {
  try {
    const response = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Fetch users error:', error);
    throw error;
  }
};

// 새 사용자 생성 API (테스트용)
export const createUser = async (username: string, email: string): Promise<User> => {
  try {
    const response = await api.post('/users', {
      username,
      email,
    });
    return response.data.data;
  } catch (error) {
    console.error('Create user error:', error);
    throw error;
  }
};
