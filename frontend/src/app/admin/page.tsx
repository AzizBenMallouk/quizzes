'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'

interface Organisation {
    id: number
    name: string
    status: string
    createdDate: string
}

export default function AdminDashboard() {
    const [organisations, setOrganisations] = useState<Organisation[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrganisations()
    }, [])

    const fetchOrganisations = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/organisations')
            const data = await res.json()
            // API Platform returns 'member' or 'hydra:member'
            setOrganisations(data['hydra:member'] || data['member'] || [])
        } catch (error) {
            console.error('Failed to fetch organisations', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Organisation
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    organisations.map((org) => (
                        <Card key={org.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {org.name}
                                </CardTitle>
                                <span className={`px-2 py-1 rounded text-xs ${org.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {org.status}
                                </span>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{org.name}</div>
                                <p className="text-xs text-muted-foreground">
                                    Created: {new Date(org.createdDate).toLocaleDateString()}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
