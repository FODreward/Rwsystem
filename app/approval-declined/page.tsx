"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ApprovalDeclinedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="mb-8">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h1 className="text-4xl font-bold text-red-600 mb-2">Approval Declined</h1>
        </div>

        <p className="text-lg text-gray-700 mb-8">The user's request has been declined.</p>

        <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}
