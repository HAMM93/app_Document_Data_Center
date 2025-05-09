import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthProvider';
import type { ReactNode } from 'react';

interface Props {
    allowedRoles: string[];
    children: ReactNode;
}

const RoleRoute: React.FC<Props> = ({ allowedRoles, children }) => {
    const { user, isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};

export default RoleRoute;
