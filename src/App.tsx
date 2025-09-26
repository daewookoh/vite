import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import UserDashboard from './components/UserDashboard';
import { login, type LoginResponse } from './services/api';
import './App.css';

interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 저장된 토큰 확인
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response: LoginResponse = await login(email, password);
      
      // 사용자 정보와 토큰 저장
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <UserDashboard 
          token={localStorage.getItem('token') || ''} 
          onLogout={handleLogout}
          currentUser={user}
        />
      ) : (
        <LoginForm onLogin={handleLogin} isLoading={isLoading} />
      )}
    </div>
  );
}

export default App;
