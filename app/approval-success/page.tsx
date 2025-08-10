"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ApprovalSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-6">✅ Approval Successful</h1>
        <p className="text-lg text-gray-700 mb-8">
          The user has been approved successfully.
        </p>
        <Button asChild className="btn-primary">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}
