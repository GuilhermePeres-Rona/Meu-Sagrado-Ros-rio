import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../lib/getUserRole';

interface ProtectedRouteProps {
  children: ReactNode;
  roles: UserRole[];
  fallback?: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles,
  fallback = <div>Acesso negado</div>,
}) => {
  const { role, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!role || !roles.includes(role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};