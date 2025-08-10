"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ApprovalInvalidPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-yellow-600 mb-6">⚠️ Invalid Approval Link</h1>
        <p className="text-lg text-gray-700 mb-8">
          The approval link is invalid or has already been used.
        </p>
        <Button asChild variant="outline" className="btn-light-secondary bg-transparent text-primary-600 border-primary-600 hover:bg-primary-50">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}
