import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { portfolioRepository } from '../services/portfolioRepository'

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [experiences, setExperiences] = useState([])
  const [certificates, setCertificates] = useState([])
  const [status, setStatus] = useState({ loading: true, error: null, source: 'local' })

  const refresh = useCallback(async () => {
    setStatus((current) => ({ ...current, loading: true, error: null }))
    try {
      const [projectResponse, experienceResponse, certificateResponse] = await Promise.all([
        portfolioRepository.getProjects(),
        portfolioRepository.getExperiences(),
        portfolioRepository.getCertificates(),
      ])
      setProjects(projectResponse.items)
      setExperiences(experienceResponse.items)
      setCertificates(certificateResponse.items)
      setStatus({ loading: false, error: null, source: projectResponse.source })
    } catch (error) {
      setStatus({ loading: false, error, source: 'local' })
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const value = useMemo(() => ({ projects, experiences, certificates, status, refresh, setProjects, setExperiences, setCertificates }), [projects, experiences, certificates, status, refresh])
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) throw new Error('usePortfolio must be used inside PortfolioProvider')
  return context
}
