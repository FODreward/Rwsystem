import { toast } from "@/components/ui/use-toast"

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://dansog-backend.onrender.com/api"

export async function apiCall<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data: any = null,
  requiresAuth = false,
): Promise<T> {
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
      // Redirect to login if no token, or handle more gracefully
      toast({
        title: "Authentication Required",
        description: "Please log in to access this feature.",
        variant: "destructive",
      })
      window.location.href = "/login" // Redirect to login page
      throw new Error("No authentication token found. Please log in.")
    }
    ;(options.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, options)
    const responseData = await response.json()

    if (!response.ok) {
      const errorMessage = responseData.detail || "An unknown error occurred."
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
    // If the error was already toasted, don't toast again unless it's a generic network error
    if (!error.message.includes("No authentication token found")) {
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
  // In a real application, the IP address should be captured on the server-side
  // from the incoming request, as client-side IP can be unreliable or proxied.
  return "127.0.0.1" // Placeholder
}
