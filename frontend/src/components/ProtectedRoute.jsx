import { Navigate, useLocation } from 'react-router-dom'
import { portfolioRepository } from '../services/portfolioRepository'

export function ProtectedRoute({ children }) {
  const location = useLocation()
  return portfolioRepository.currentAdmin() ? children : <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
}
