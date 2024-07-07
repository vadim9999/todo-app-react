import React from 'react'
import { useAppSelector } from '../../redux/hooks/hooks';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAppSelector((state) => state.main.userInfo);

    if (!user) {
        return <Navigate to="/login" />
    }

    return children;
}

export default ProtectedRoute