"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Privacy Policy</h1>
        <div className="prose prose-lg text-gray-700 mx-auto">
          <p>
            At Reward System, accessible from [Your Website URL], one of our main priorities is the privacy of our
            visitors. This Privacy Policy document contains types of information that is collected and recorded by
            Reward System and how we use it.
          </p>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to
            contact us.
          </p>
          <p>
            This Privacy Policy applies only to our online activities and is valid for visitors to our website with
            regard to the information that they shared and/or collect in Reward System. This policy is not applicable to
            any information collected offline or via channels other than this website.
          </p>
          <h2>Consent</h2>
          <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
          <h2>Information we collect</h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it,
            will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <p>
            If you contact us directly, we may receive additional information about you such as your name, email
            address, phone number, the contents of the message and/or attachments you may send us, and any other
            information you may choose to provide.
          </p>
          <p>
            When you register for an Account, we may ask for your contact information, including items such as name,
            company name, address, email address, and telephone number.
          </p>
          <h2>How we use your information</h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul>
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>
              Communicate with you, either directly or through one of our partners, including for customer service, to
              provide you with updates and other information relating to the website, and for marketing and promotional
              purposes
            </li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>
          {/* Add more sections as needed */}
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
