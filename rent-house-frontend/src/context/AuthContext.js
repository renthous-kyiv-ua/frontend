import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signUp = async (userData, role) => {
    setAuthLoading(true);
    setAuthError(null);
    const url = `http://localhost:5206/Auth/register/${role}`;

    try {
      const response = await axios.post(url, userData);
      setAuthLoading(false);
      return response.data;
    } catch (error) {
      setAuthLoading(false);
      setAuthError(error.response ? error.response.data.message : 'Registration failed');
      throw error;
    }
  };

  const signIn = async (email, password) => {
    setAuthLoading(true);
    setAuthError(null);
    const url = 'http://localhost:5206/Auth/login';

    try {
      const response = await axios.post(url, { email, password });
      const { token } = response.data;

      if (token) {
        // Декодируем токен для извлечения данных пользователя
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        // Сохраняем токен и данные пользователя в состоянии и локальном хранилище
        setToken(token);
        setUser({
          id: decodedToken.sub,
          role: userRole,
        });
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({
          id: decodedToken.sub,
          role: userRole,
        }));

        setAuthLoading(false);
        return { token, user: { id: decodedToken.sub, role: userRole } };
      } else {
        throw new Error('Login failed: No token returned');
      }
    } catch (error) {
      setAuthLoading(false);
      setAuthError(error.response ? error.response.data.message : 'Login failed');
      throw error;
    }
  };

  const signOut = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ token, user, signUp, signIn, signOut, authLoading, authError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};