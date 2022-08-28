import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { logout } from '../features/auth/authSlice'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  const onLogout: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        {user != null
          ? (
          <li>
            <button type="button" className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
            )
          : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser />
                Register
              </Link>
            </li>
          </>
            )}
      </ul>
    </header>
  )
}

export default Header
