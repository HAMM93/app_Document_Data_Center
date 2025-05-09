import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthProvider';
import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const { isAuthenticated } = useAuthContext();

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
