"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ApprovalInvalidPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">⚠️</span>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Invalid Approval Link</h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            The approval link is invalid or has already been used.
          </p>

          <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
