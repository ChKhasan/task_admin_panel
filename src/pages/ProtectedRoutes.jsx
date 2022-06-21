import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const ProtectedRoutes = () => {
  const auth = useAuth()
  return auth ? <Navigate to="/users" />:<Outlet/>
}

export default ProtectedRoutes