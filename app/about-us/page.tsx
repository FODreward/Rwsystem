"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutUsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About Us</h1>
        <div className="prose prose-lg text-gray-700 mx-auto">
          <p>
            Welcome to Reward System, your premier platform for earning rewards and enhancing your daily life. We
            believe in making every interaction count, transforming your time and effort into tangible benefits. Our
            mission is to create a seamless and rewarding experience for our users, fostering a community where
            participation truly pays off.
          </p>
          <p>
            Founded in 2025, Reward System was built on the principle of mutual growth. We connect users with exciting
            opportunities to earn points through various activities, including surveys, engagement tasks, and special
            offers. These points can then be redeemed for a wide array of valuable rewards, from popular gift cards to
            cryptocurrency like Bitcoin.
          </p>
          <p>
            Our team is dedicated to providing a secure, transparent, and user-friendly platform. We continuously strive
            to expand our reward options and earning opportunities, ensuring there's always something new and exciting
            for our community. Join us today and start your journey towards a more rewarding experience!
          </p>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="btn-primary">
            <Link href="/signup">Sign Up Now</Link>
          </Button>
          <Button asChild variant="secondary" className="btn-secondary">
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="btn-light-secondary bg-transparent text-primary-600 border-primary-600 hover:bg-primary-50"
          >
            <Link href="/">Return to Landing Page</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
