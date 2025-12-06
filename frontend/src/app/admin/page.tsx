'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus } from 'lucide-react'

interface Organisation {
    id: number
    name: string
    status: string
    createdDate: string
}

interface User {
    id: number
    username: string
    email: string
    roles: string[]
    organisation?: {
        name: string
    }
}

export default function AdminDashboard() {
    const [organisations, setOrganisations] = useState<Organisation[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [orgsRes, usersRes] = await Promise.all([
                fetch('http://localhost:8000/api/organisations'),
                fetch('http://localhost:8000/api/users')
            ])

            const orgsData = await orgsRes.json()
            const usersData = await usersRes.json()

            setOrganisations(orgsData['hydra:member'] || orgsData['member'] || [])
            setUsers(usersData['hydra:member'] || usersData['member'] || [])
        } catch (error) {
            console.error('Failed to fetch data', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>

            <Tabs defaultValue="organisations" className="w-full">
                <TabsList className="grid w-full grid-cols-4 max-w-2xl">
                    <TabsTrigger value="organisations">Organisations</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="categories">Categories</TabsTrigger>
                    <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                </TabsList>

                <TabsContent value="organisations" className="space-y-4">
                    <div className="flex justify-end">
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
                </TabsContent>

                <TabsContent value="users" className="space-y-4">
                    <div className="flex justify-end">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add User
                        </Button>
                    </div>
                    <div className="bg-white rounded-md border">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Username</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Roles</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Organisation</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle font-medium">{user.username}</td>
                                            <td className="p-4 align-middle">{user.email}</td>
                                            <td className="p-4 align-middle">
                                                {user.roles.map(role => (
                                                    <span key={role} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mr-1">
                                                        {role.replace('ROLE_', '')}
                                                    </span>
                                                ))}
                                            </td>
                                            <td className="p-4 align-middle">{user.organisation?.name || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="categories">
                    <div className="p-4 bg-white rounded-lg border">
                        <h2 className="text-xl font-semibold mb-4">Category Management</h2>
                        <p className="text-gray-500">Category management interface coming soon...</p>
                    </div>
                </TabsContent>

                <TabsContent value="quizzes">
                    <div className="p-4 bg-white rounded-lg border">
                        <h2 className="text-xl font-semibold mb-4">Quiz Management</h2>
                        <p className="text-gray-500">Quiz management interface coming soon...</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
