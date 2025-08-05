import { toast } from "@/hooks/use-toast"
import FingerprintJS from "@fingerprintjs/fingerprintjs"

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://dansog-backend.onrender.com/api"
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

// Function to load reCAPTCHA script
export function loadRecaptchaScript(callback: () => void) {
  if (typeof window !== "undefined" && !document.getElementById("recaptcha-script")) {
    const script = document.createElement("script")
    script.id = "recaptcha-script"
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
    script.async = true
    script.defer = true
    script.onload = callback
    document.head.appendChild(script)
  } else if (typeof window !== "undefined" && (window as any).grecaptcha && (window as any).grecaptcha.ready) {
    callback()
  }
}

export async function apiCall<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data: any = null,
  requiresAuth = false,
  queryParams: Record<string, string | number | boolean | undefined | null> = {},
  recaptchaToken: string | null = null, // New parameter for reCAPTCHA token
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
        params.append(key, String(value))
      }
    }
    url = `${url}?${params.toString()}`
  } else if (data) {
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
      sessionStorage.removeItem("accessToken")
      sessionStorage.removeItem("currentUser")
      window.location.href = "/login"
      throw new Error("No authentication token found. Please log in.")
    }
    ;(options.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`
  }

  // Add reCAPTCHA token to headers if provided
  if (recaptchaToken) {
    ;(options.headers as Record<string, string>)["X-Recaptcha-Token"] = recaptchaToken
  }

  try {
    const response = await fetch(url, options)
    const responseData = await response.json()

    if (!response.ok) {
      const errorMessage = responseData.detail || "An unknown error occurred."

      if (response.status === 401 && requiresAuth) {
        console.log("Toast: Session Expired", "Your session has expired. Please log in again.")
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
          variant: "destructive",
        })
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

// Utility for getting device fingerprint using FingerprintJS
export async function getDeviceFingerprint(): Promise<string> {
  try {
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    return result.visitorId
  } catch (error) {
    console.error("Error getting device fingerprint:", error)
    return "unknown_fingerprint" // Fallback
  }
}

// Utility for getting IP address (backend gets from request headers, this is a placeholder for client-side)
export function getIpAddress(): string {
  return "127.0.0.1" // Placeholder - actual IP will be captured by backend from request headers
}
