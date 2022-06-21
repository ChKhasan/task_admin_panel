import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Access = () => {
    const auth = useAuth()
  return auth ? <Outlet/>:<Navigate to="/login" />
}

export default Access