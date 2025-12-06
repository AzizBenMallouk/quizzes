'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { PlayCircle } from 'lucide-react'

interface Quiz {
    id: number
    title: string
    category: {
        name: string
    }
}

export default function StudentDashboard() {
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
                <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
            </div>

            <h2 className="text-xl font-semibold text-gray-700">Available Quizzes</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    quizzes.map((quiz) => (
                        <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle>{quiz.title}</CardTitle>
                                <p className="text-sm text-muted-foreground">{quiz.category?.name || 'General'}</p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500">Test your knowledge in {quiz.category?.name || 'this topic'}.</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">
                                    <PlayCircle className="mr-2 h-4 w-4" /> Start Quiz
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
