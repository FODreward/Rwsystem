"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Terms and Conditions</h1>
        <div className="prose prose-lg text-gray-700 mx-auto">
          <p>
            Welcome to Reward System. These terms and conditions outline the rules and regulations for the use of Reward
            System's Website, located at [Your Website URL].
          </p>
          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use Reward
            System if you do not agree to take all of the terms and conditions stated on this page.
          </p>
          <h2>Cookies:</h2>
          <p>
            The website uses cookies to help personalize your online experience. By accessing Reward System, you agreed
            to use the required cookies.
          </p>
          <h2>License:</h2>
          <p>
            Unless otherwise stated, Reward System and/or its licensors own the intellectual property rights for all
            material on Reward System. All intellectual property rights are reserved. You may access this from Reward
            System for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <p>You must not:</p>
          <ul>
            <li>Republish material from Reward System</li>
            <li>Sell, rent or sub-license material from Reward System</li>
            <li>Reproduce, duplicate or copy material from Reward System</li>
            <li>Redistribute content from Reward System</li>
          </ul>
          <p>This Agreement shall begin on the date hereof.</p>
          <p>
            Parts of this website offer an opportunity for users to post and exchange opinions and information in
            certain areas of the website. Reward System does not filter, edit, publish or review Comments prior to their
            presence on the website. Comments do not reflect the views and opinions of Reward System, its agents and/or
            affiliates. Comments reflect the views and opinions of the person who posts their views and opinions. To the
            extent permitted by applicable laws, Reward System shall not be liable for the Comments or for any
            liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or
            appearance of the Comments on this website.
          </p>
          <p>
            Reward System reserves the right to monitor all Comments and to remove any Comments which can be considered
            inappropriate, offensive or causes breach of these Terms and Conditions.
          </p>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/signup">Sign Up Now</Link>
          </Button>
          <Button asChild variant="secondary" className="bg-gray-600 hover:bg-gray-700">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" className="bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50">
            <Link href="/">Return to Landing Page</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
