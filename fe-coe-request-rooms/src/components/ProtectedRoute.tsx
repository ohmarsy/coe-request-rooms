// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; // บทบาทที่อนุญาตให้เข้าถึง
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useAuth(); // ดึง role จาก context

  const hasAccess = isAuthenticated && role && allowedRoles.includes(role);

  return hasAccess ? (
    <>
      {children} 
    </>
  ) : (
    <Navigate to="/" replace /> 
  );
};

export default ProtectedRoute;
