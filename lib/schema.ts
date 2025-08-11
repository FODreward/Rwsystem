export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface UserMetrics {
  totalPoints: number
  pointsThisMonth: number
  surveysCompleted: number
  surveysThisMonth: number
  successRate: number
  rank: number
}

export interface Survey {
  id: string
  title: string
  description: string
  type: "standard" | "premium"
  reward: number
  isActive: boolean
  createdAt: Date
}

export interface Activity {
  id: string
  userId: string
  description: string
  createdAt: Date
}
