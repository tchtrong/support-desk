import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppSelector } from '../app/hooks'

const PrivateRoute: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth)
  return user != null
    ? (
    <Outlet />
      )
    : (
        (() => {
          toast.error('Must login to do this action')
          return <Navigate to="/login" />
        })()
      )
}

export default PrivateRoute
