"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ApprovalSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Approval Successful</h1>
        <p className="text-lg text-gray-600 mb-8">The user has been approved successfully.</p>

        <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}
