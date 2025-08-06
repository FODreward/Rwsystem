import Cookies from "js-cookie"
import FingerprintJS from "@fingerprintjs/fingerprintjs" // Corrected import for FingerprintJS

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dansog-backend.onrender.com/api"

// Function to get device fingerprint using FingerprintJS
export async function getDeviceFingerprint(): Promise<string> {
  if (typeof window === "undefined") {
    return "server-side-fingerprint" // Or handle as needed for SSR
  }
  try {
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    return result.visitorId
  } catch (error) {
    console.error("Error getting device fingerprint:", error)
    return "fingerprint-error"
  }
}

// Function to get client IP address
export async function getIpAddress(): Promise<string> {
  if (typeof window === "undefined") {
    return "server-side-ip" // Or handle as needed for SSR
  }
  try {
    const response = await fetch("https://api.ipify.org?format=json")
    const data = await response.json()
    return data.ip
  } catch (error) {
    console.error("Failed to fetch IP address:", error)
    return "unknown"
  }
}

// Function to load reCAPTCHA v2 script
export function loadRecaptchaScript(callback: () => void) {
  if (typeof window !== "undefined" && !document.getElementById("recaptcha-script")) {
    const script = document.createElement("script")
    script.id = "recaptcha-script"
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit&onload=onloadCallback`
    script.async = true
    script.defer = true
    document.body.appendChild(script)
    window.onloadCallback = callback // Assign the callback to the global window object
  } else if (typeof window !== "undefined" && window.grecaptcha && window.grecaptcha.render) {
    // If script is already loaded, call the callback directly
    callback();
  }
}

// Generic API call wrapper
export async function apiCall<T>(
  endpoint: string,
  method: string,
  body: any = null,
  requiresAuth: boolean = true,
  headers: HeadersInit = {},
  recaptchaToken?: string // Added recaptchaToken parameter
): Promise<T> {
  const token = Cookies.get("token")
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  }

  if (requiresAuth && token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`
  }

  // Add reCAPTCHA token to headers if provided
  if (recaptchaToken) {
    defaultHeaders["X-Recaptcha-Token"] = recaptchaToken;
  }

  const options: RequestInit = {
    method: method,
    headers: defaultHeaders,
    body: body ? JSON.stringify(body) : undefined,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: "An unknown error occurred" }))
    throw new Error(errorData.detail || "Something went wrong")
  }
  return response.json() as Promise<T>
}

// Your existing 'api' object (kept for compatibility if other parts of your app use it directly)
export const api = {
  auth: {
    requestOtp: async (email: string, purpose: string) => {
      return apiCall("/auth/request-otp", "POST", { email, purpose }, false)
    },
    verifyOtp: async (email: string, otp_code: string, purpose: string) => {
      return apiCall("/auth/verify-otp", "POST", { email, otp_code, purpose }, false)
    },
    signup: async (userData: {
      email: string
      name: string
      password: string
      pin: string
      referral_code?: string
      device_fingerprint: string
      ip_address: string
      user_agent: string
      recaptcha_token: string
    }) => {
      // Pass recaptcha_token directly in the body for signup
      return apiCall("/auth/signup", "POST", userData, false)
    },
    login: async (credentials: {
      email: string
      password: string
      device_fingerprint: string
      ip_address: string
      user_agent: string
      recaptcha_token: string
    }) => {
      const response = await apiCall<{ access_token: string; user: any }>("/auth/login", "POST", credentials, false)
      if (response.access_token) {
        Cookies.set("token", response.access_token, { expires: 7 })
      }
      return response
    },
    verifyPin: async (pin: string) => {
      return apiCall("/auth/verify-pin", "POST", { pin })
    },
    resetPassword: async (data: { email: string; otp_code: string; new_password: string }) => {
      return apiCall("/auth/reset-password", "POST", data, false)
    },
    resetPin: async (data: { email: string; otp_code: string; new_pin: string }) => {
      return apiCall("/auth/reset-pin", "POST", data, false)
    },
  },
  user: {
    getProfile: async () => apiCall("/users/me", "GET"),
    changePassword: async (data: { current_password: string; new_password: string }) => apiCall("/users/change-password", "POST", data),
    changePin: async (data: { current_pin: string; new_pin: string }) => apiCall("/users/change-pin", "POST", data),
  },
  dashboard: {
    getStats: async () => apiCall("/dashboard/stats", "GET"),
    getActivity: async () => apiCall("/dashboard/activity", "GET"),
  },
  points: {
    transfer: async (to_email: string, amount: number) => apiCall("/points/transfer", "POST", { to_email, amount }),
    getHistory: async () => apiCall("/points/history", "GET"),
  },
  redemption: {
    getRates: async () => apiCall("/redemption/rates", "GET", null, false),
    request: async (data: { type: string; points_amount: number; wallet_address?: string; email_address?: string }) => apiCall("/redemption/request", "POST", data),
    getHistory: async () => apiCall("/redemption/history", "GET"),
  },
  surveys: {
    getAvailable: async () => apiCall("/surveys/available", "GET"),
    complete: async (surveyId: number) => apiCall(`/surveys/${surveyId}/complete`, "POST"),
  },
  admin: {
    getDashboardStats: async () => apiCall("/admin/dashboard/stats", "GET"),
    getAllUsers: async () => apiCall("/admin/users", "GET"),
    updateUserStatus: async (userId: number, status: string) => apiCall(`/admin/users/${userId}/status`, "PUT", { status }),
    bulkUpdateUserStatus: async (userIds: number[], status: string) => apiCall("/admin/users/bulk-status", "PUT", { user_ids: userIds, status }),
    assignAgentRole: async (userId: number, isAgent: boolean) => apiCall(`/admin/users/${userId}/agent`, "PUT", { is_agent: isAgent }),
    getAllRedemptions: async () => apiCall("/admin/redemptions", "GET"),
    processRedemption: async (redemptionId: number, action: string) => apiCall(`/admin/redemptions/${redemptionId}/process?action=${action}`, "PUT"),
    getAllSystemSettings: async () => apiCall("/admin/settings", "GET"),
    updateSystemSetting: async (key: string, value: string, description?: string) => apiCall("/admin/settings", "PUT", { key, value, description }),
    adminSendPoints: async (to_user_email: string, points_amount: number, from_user_email?: string) => apiCall("/admin/point-transfers", "POST", { from_user_email, to_user_email, points_amount }),
    createSurvey: async (title: string, points_reward: number, description?: string) => apiCall("/admin/surveys", "POST", { title, points_reward, description }),
    getAllSurveys: async () => apiCall("/admin/surveys", "GET"),
  },
}
