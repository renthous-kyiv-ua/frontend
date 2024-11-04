import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const PrivateRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    // Если пользователь не авторизован, перенаправляем на страницу входа
    return <Navigate to="/signin" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Если у пользователя нет нужной роли, перенаправляем на страницу входа
    return <Navigate to="/signin" />;
  }

  // Если все проверки пройдены, рендерим вложенные компоненты
  return children;
};

export default PrivateRoute;