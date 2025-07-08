
import React, { useState, useEffect, useCallback } from 'react';
import type { User } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Spinner from './components/common/Spinner';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('attendance_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = useCallback((username: string): void => {
    const loggedInUser: User = { id: username.toLowerCase(), name: username };
    localStorage.setItem('attendance_user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  }, []);

  const handleLogout = useCallback((): void => {
    localStorage.removeItem('attendance_user');
    setUser(null);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
