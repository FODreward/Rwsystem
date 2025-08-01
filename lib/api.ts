// This is a client-side utility for making API calls.
// It directly uses sessionStorage for token management as per the original app.js.
export async function apiCall<T>(endpoint: string, method = "GET", data: any = null, requiresAuth = false): Promise<T> {
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL
  const url = `${BASE_API_URL}${endpoint}`
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  if (requiresAuth) {
    const token = sessionStorage.getItem("accessToken")
    if (!token) {
      // In a real app, you might want to redirect to login or throw a specific error
      // For now, we'll throw an error that can be caught by the calling component.
      throw new Error("No authentication token found. Please log in.")
    }
    ;(options.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, options)
    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.detail || "An error occurred.")
    }
    return responseData as T
  } catch (error) {
    console.error("API Call Error:", error)
    throw error
  }
}

export function saveAuthData(token: string, user: any) {
  sessionStorage.setItem("accessToken", token)
  sessionStorage.setItem("currentUser", JSON.stringify(user))
}

export function getAuthToken(): string | null {
  return sessionStorage.getItem("accessToken")
}

export function getCurrentUser(): any | null {
  const user = sessionStorage.getItem("currentUser")
  return user ? JSON.parse(user) : null
}

export function clearAuthData() {
  sessionStorage.removeItem("accessToken")
  sessionStorage.removeItem("currentUser")
}

// Placeholder for device fingerprinting - should ideally be more robust
export function getDeviceFingerprint(): string {
  return btoa(navigator.userAgent + screen.width + screen.height)
}

// Placeholder for IP address - should be captured server-side
export function getIpAddress(): string {
  return "127.0.0.1" // Placeholder
}
