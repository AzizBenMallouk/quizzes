'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, BookOpen } from 'lucide-react'

interface Quiz {
    id: number
    title: string
    category: {
        name: string
    }
}

export default function ManagerDashboard() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchQuizzes()
    }, [])

    const fetchQuizzes = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/quizzes')
            const data = await res.json()
            setQuizzes(data['hydra:member'] || data['member'] || [])
        } catch (error) {
            console.error('Failed to fetch quizzes', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Quiz
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    quizzes.map((quiz) => (
                        <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {quiz.category?.name || 'Uncategorized'}
                                </CardTitle>
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{quiz.title}</div>
                                <p className="text-xs text-muted-foreground">
                                    ID: {quiz.id}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
