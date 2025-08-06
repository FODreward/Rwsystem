import { toast } from "@/hooks/use-toast" // Corrected import path

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://dansog-backend.onrender.com/api"

export async function apiCall<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data: any = null,
  requiresAuth = false,
  queryParams: Record<string, string | number | boolean | undefined | null> = {}, // Added queryParams
): Promise<T> {
  let url = `${BASE_API_URL}${endpoint}`
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  }

  // Handle query parameters for GET requests
  if (method === "GET" && Object.keys(queryParams).length > 0) {
    const params = new URLSearchParams()
    for (const key in queryParams) {
      const value = queryParams[key]
      if (value !== undefined && value !== null) {
        // Only append if value is not undefined or null
        params.append(key, String(value))
      }
    }
    url = `${url}?${params.toString()}`
  } else if (data) {
    // For non-GET requests with data, stringify body
    options.body = JSON.stringify(data)
  }

  if (requiresAuth) {
    const token = sessionStorage.getItem("accessToken")
    if (!token) {
      console.log("Toast: Authentication Required", "Please log in to access this feature.")
      toast({
        title: "Authentication Required",
        description: "Please log in to access this feature.",
        variant: "destructive",
      })
      // Redirect to login page and clear auth data
      sessionStorage.removeItem("accessToken")
      sessionStorage.removeItem("currentUser")
      window.location.href = "/login"
      throw new Error("No authentication token found. Please log in.")
    }
    ;(options.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, options)
    const responseData = await response.json()

    if (!response.ok) {
      const errorMessage = responseData.detail || "An unknown error occurred."

      // Handle 401 Unauthorized specifically for expired tokens
      if (response.status === 401 && requiresAuth) {
        console.log("Toast: Session Expired", "Your session has expired. Please log in again.")
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
          variant: "destructive",
        })
        // Clear auth data and redirect to login page
        sessionStorage.removeItem("accessToken")
        sessionStorage.removeItem("currentUser")
        window.location.href = "/login"
        throw new Error("Session expired. Please log in again.")
      }

      console.log("Toast: API Error", errorMessage)
      toast({
        title: "API Error",
        description: errorMessage,
        variant: "destructive",
      })
      throw new Error(errorMessage)
    }
    return responseData as T
  } catch (error: any) {
    console.error("API Call Error:", error)
    // Only show generic network error if it's not an auth-related redirect
    if (!error.message.includes("No authentication token found") && !error.message.includes("Session expired")) {
      console.log("Toast: Network Error", error.message || "Could not connect to the server.")
      toast({
        title: "Network Error",
        description: error.message || "Could not connect to the server.",
        variant: "destructive",
      })
    }
    throw error
  }
}

// Utility for getting device fingerprint (simple version)
export function getDeviceFingerprint(): string {
  return btoa(navigator.userAgent + screen.width + screen.height)
}

// Utility for getting IP address (placeholder for client-side)
export function getIpAddress(): string {
  return "127.0.0.1" // Placeholder
}
