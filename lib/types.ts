export type UserStatus = "pending" | "approved" | "suspended" | "rejected"
export type RedemptionStatus = "pending" | "approved" | "rejected" | "processed"
export type RedemptionType = "bitcoin" | "gift_card"

export interface UserResponse {
  id: number
  email: string
  name: string
  status: UserStatus
  is_admin: boolean
  is_agent: boolean
  points_balance: number
  pending_points_balance?: number
  referral_code?: string
  email_verified: boolean
  created_at: string
  referred_users_count?: number
  is_flagged: boolean // Added for fraud detection
}

export interface DashboardStats {
  points_balance: number
  pending_points_balance: number
  completed_surveys: number
  total_earned: number
  pending_redemptions: number
}

export interface PointTransferResponse {
  id: number
  amount: number
  created_at: string
  from_user: {
    id: number
    email: string
    name: string
  }
  to_user: {
    id: number
    email: string
    name: string
  }
}

export interface RedemptionResponse {
  id: number
  type: RedemptionType
  points_amount: number
  equivalent_value: number
  status: RedemptionStatus
  created_at: string
}

export interface ExternalSurvey {
  survey_id: string
  title: string
  description?: string
  points_reward: number
  redirect_url: string
}

export interface AdminDashboardStats {
  total_users: number
  total_surveys_completed: number
  total_points_distributed: number
  pending_redemptions: number
  reward_percentage?: string
}

export interface SystemSettingUpdate {
  key: string
  value: string
  description?: string
}
