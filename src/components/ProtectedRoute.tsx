import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { authService } from '../services/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const isValid = await authService.checkAuthState();
        if (!isValid) {
          logout();
        }
        setIsValid(isValid);
      } catch (error) {
        console.error('Auth validation failed:', error);
        logout();
      } finally {
        setIsChecking(false);
      }
    };

    validateAuth();
  }, [logout]);

  // Show nothing while checking auth state
  if (isChecking) {
    return null;
  }

  if (!isAuthenticated || !isValid) {
    // Redirect to login but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}