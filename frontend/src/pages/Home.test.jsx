import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { PortfolioProvider } from '../features/PortfolioContext'
import { Home } from './Home'

vi.mock('../services/api', () => ({
  api: {
    get: vi.fn(() => Promise.reject(new Error('API unavailable in unit test'))),
    post: vi.fn(() => Promise.reject(new Error('API unavailable in unit test'))),
  },
}))

describe('Home', () => {
  it('shows Hasolah’s professional identity and a project route', async () => {
    render(<BrowserRouter><PortfolioProvider><Home /></PortfolioProvider></BrowserRouter>)
    expect(screen.getByText(/hello, i.m hasolah/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /copywriter, scriptwriter, and creative storyteller/i })).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /panggung sekolah bukan tempat luka/i })).toHaveAttribute('href', '/projects/panggung-sekolah-bukan-tempat-luka')
  })
})
