import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../services/api';
import './UserDashboard.css';

interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

interface UserDashboardProps {
  token: string;
  onLogout: () => void;
  currentUser: User | null;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ token, onLogout, currentUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, [token]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchUsers(token);
      setUsers(data);
    } catch (err) {
      setError('사용자 데이터를 불러오는데 실패했습니다.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>사용자 대시보드</h1>
          {currentUser && (
            <p className="welcome-message">
              안녕하세요, <strong>{currentUser.username}</strong>님! ({currentUser.email})
            </p>
          )}
        </div>
        <button onClick={handleLogout} className="logout-button">
          로그아웃
        </button>
      </div>

      <div className="dashboard-content">
        <div className="section-header">
          <h2>사용자 목록</h2>
          <button onClick={loadUsers} className="refresh-button" disabled={loading}>
            {loading ? '새로고침 중...' : '새로고침'}
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading">데이터를 불러오는 중...</div>
        ) : (
          <div className="users-grid">
            {users.length === 0 ? (
              <div className="no-data">사용자 데이터가 없습니다.</div>
            ) : (
              users.map((user) => (
                <div key={user.id} className="user-card">
                  <div className="user-info">
                    <h3>{user.username}</h3>
                    <p className="user-email">{user.email}</p>
                    <p className="user-date">
                      가입일: {new Date(user.created_at).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
