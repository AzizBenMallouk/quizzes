import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from '@/app/login/page'

// Mock useRouter
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
        }
    },
}))

// Mock fetch
global.fetch = jest.fn()

describe('LoginPage', () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear()
    })

    it('renders login form', () => {
        render(<LoginPage />)

        expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
        expect(screen.getByLabelText('Username')).toBeInTheDocument()
        expect(screen.getByLabelText('Password')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
    })

    it('handles successful login', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
        })

        render(<LoginPage />)

        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'admin' } })
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } })
        fireEvent.click(screen.getByRole('button', { name: 'Login' }))

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/api/login', expect.any(Object))
        })
    })

    it('handles failed login', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        })

        render(<LoginPage />)

        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'wrong' } })
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrong' } })
        fireEvent.click(screen.getByRole('button', { name: 'Login' }))

        await waitFor(() => {
            expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
        })
    })
})
