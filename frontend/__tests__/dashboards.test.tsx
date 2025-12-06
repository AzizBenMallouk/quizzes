import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import AdminDashboard from '@/app/admin/page'
import ManagerDashboard from '@/app/manager/page'
import StudentDashboard from '@/app/student/page'

// Mock fetch
global.fetch = jest.fn()

describe('Dashboards', () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear()
    })

    describe('AdminDashboard', () => {
        it('renders organisations', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                json: async () => ({
                    'hydra:member': [
                        { id: 1, name: 'Test Org', status: 'active', createdDate: '2023-01-01' }
                    ]
                })
            })

            render(<AdminDashboard />)

            expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
            await waitFor(() => {
                expect(screen.getAllByText('Test Org')[0]).toBeInTheDocument()
            })
        })
    })

    describe('ManagerDashboard', () => {
        it('renders quizzes', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                json: async () => ({
                    'hydra:member': [
                        { id: 1, title: 'Test Quiz', category: { name: 'Test Cat' } }
                    ]
                })
            })

            render(<ManagerDashboard />)

            expect(screen.getByText('Manager Dashboard')).toBeInTheDocument()
            await waitFor(() => {
                expect(screen.getAllByText('Test Quiz')[0]).toBeInTheDocument()
            })
        })
    })

    describe('StudentDashboard', () => {
        it('renders available quizzes', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                json: async () => ({
                    'hydra:member': [
                        { id: 1, title: 'Student Quiz', category: { name: 'General' } }
                    ]
                })
            })

            render(<StudentDashboard />)

            expect(screen.getByText('Student Dashboard')).toBeInTheDocument()
            await waitFor(() => {
                expect(screen.getAllByText('Student Quiz')[0]).toBeInTheDocument()
            })
        })
    })
})
