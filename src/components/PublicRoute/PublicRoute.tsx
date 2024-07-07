import React from 'react'
import { useAppSelector } from '../../redux/hooks/hooks';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAppSelector((state) => state.main.userInfo);

    if (user) {
        return <Navigate to="/todolist" />
    }

    return children
}

export default PublicRoute