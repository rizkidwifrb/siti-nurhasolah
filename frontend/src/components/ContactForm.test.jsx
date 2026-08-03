import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ContactForm } from './ContactForm'

describe('ContactForm', () => {
  it('shows validation feedback for an incomplete message', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.click(screen.getByRole('button', { name: /send message/i }))
    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument()
  })
})
