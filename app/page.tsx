"use client" // Make this a client component

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState, useRef, useEffect } from "react" // Import useState, useRef, and useEffect

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // State for mobile menu
  const menuRef = useRef<HTMLDivElement>(null) // Ref for the mobile menu container
  const buttonRef = useRef<HTMLButtonElement>(null) // Ref for the menu toggle button

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close menu if click is outside the menu and outside the button
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    // Add event listener when menu is open
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      // Clean up event listener when menu is closed
      document.removeEventListener("mousedown", handleClickOutside)
    }

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileMenuOpen]) // Re-run effect when menu state changes

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <nav className="container mx-auto flex justify-between items-center px-4">
          <Link href="#" className="text-2xl font-bold text-primary-600">
            Reward System
          </Link>
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="#how-it-works" className="text-gray-600 hover:text-primary-600 transition-colors">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="#testimonials" className="text-gray-600 hover:text-primary-600 transition-colors">
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="#contact" className="text-gray-600 hover:text-primary-600 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
          <div className="space-x-4 hidden md:block">
            <Button asChild variant="secondary" className="btn-secondary">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="btn-primary">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
          {/* Mobile menu button (hidden on desktop) */}
          <Button
            ref={buttonRef} // Attach ref to the button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-600 hover:text-primary-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobileMenu"
          >
            <Menu className="w-6 h-6" />
            <span className="sr-only">Toggle Mobile Menu</span>
          </Button>
        </nav>
        {/* Mobile menu (hidden by default, will be handled by JS/React state later) */}
        <div
          ref={menuRef} // Attach ref to the menu container
          id="mobileMenu"
          className={`md:hidden bg-white py-2 px-4 border-t border-gray-200 transform transition-all duration-300 ease-in-out origin-top ${
            isMobileMenuOpen ? "scale-y-100 opacity-100 data-[state=open]" : "scale-y-95 opacity-0 hidden"
          }`}
          data-state={isMobileMenuOpen ? "open" : "closed"}
        >
          <ul className="flex flex-col space-y-2">
            <li>
              <Link
                href="#features"
                className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="#how-it-works"
                className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link
                href="#testimonials"
                className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Button asChild variant="secondary" className="btn-secondary w-full mt-2">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
              </Button>
            </li>
            <li>
              <Button asChild className="btn-primary w-full mt-2">
                <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="bg-gradient-to-r from-primary-500 to-teal-600 text-white py-20 md:py-32 text-center"
        >
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Unlock Rewards, Earn Points, Live Better.
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Join our community and start earning points for everyday activities, surveys, and more. Redeem for
              exciting rewards!
            </p>
            <div className="space-x-4 flex flex-col min-[400px]:flex-row justify-center items-center">
              <Button asChild className="btn-light-primary mb-4 min-[400px]:mb-0">
                <Link href="/signup">Get Started Today</Link>
              </Button>
              <Button asChild variant="outline" className="btn-light-secondary bg-transparent">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Why Choose Our Reward System?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="feature-card">
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="Earn Points Icon"
                  className="mx-auto mb-4"
                  width={64}
                  height={64}
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Effortless Earning</h3>
                <p className="text-gray-600">
                  Complete surveys, engage with content, and participate in activities to quickly accumulate points.
                </p>
              </div>
              <div className="feature-card">
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="Redeem Rewards Icon"
                  className="mx-auto mb-4"
                  width={64}
                  height={64}
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Exciting Rewards</h3>
                <p className="text-gray-600">
                  Redeem your hard-earned points for Bitcoin, gift cards, or other valuable incentives.
                </p>
              </div>
              <div className="feature-card">
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="Community Icon"
                  className="mx-auto mb-4"
                  width={64}
                  height={64}
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Thriving Community</h3>
                <p className="text-gray-600">Connect with other users, share tips, and grow your rewards together.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Simple Steps to Start Earning</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sign Up</h3>
                <p className="text-gray-600">Create your free account in minutes. It's quick and easy!</p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Earn Points</h3>
                <p className="text-gray-600">
                  Participate in surveys, daily tasks, and special offers to accumulate points.
                </p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Redeem Rewards</h3>
                <p className="text-gray-600">
                  Exchange your points for Bitcoin, gift cards, or other exciting rewards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="testimonial-card">
                <p className="text-lg italic text-gray-700 mb-4">
                  &quot;This reward system is fantastic! I&apos;ve earned so many points just by doing simple tasks, and
                  redeeming them for gift cards is a breeze. Highly recommend!&quot;
                </p>
                <div className="flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full mr-4"
                    width={48}
                    height={48}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">Jane Doe</p>
                    <p className="text-sm text-gray-600">Active User</p>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <p className="text-lg italic text-gray-700 mb-4">
                  &quot;I was skeptical at first, but the points add up quickly, and the Bitcoin redemption option is a
                  game-changer. It&apos;s a legitimate way to earn extra value.&quot;
                </p>
                <div className="flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full mr-4"
                    width={48}
                    height={48}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">John Smith</p>
                    <p className="text-sm text-gray-600">Crypto Enthusiast</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section id="contact" className="bg-primary-600 text-white py-16 md:py-24 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Earning?</h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users who are already benefiting from our rewarding platform.
            </p>
            <Button asChild className="btn-light-primary">
              <Link href="/signup">Sign Up Now</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="container mx-auto px-4 text-center md:text-left grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Reward System</h3>
            <p className="text-sm">Your ultimate platform for earning points and redeeming exciting rewards.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="hover:text-emerald-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-emerald-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover:text-emerald-400 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Connect With Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.007-.533A8.349 8.349 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.41-4.26 4.107 4.107 0 001.27 5.477A4.072 4.072 0 012 10.425v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.844"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22H12c5.523 0 10-4.477 10-10z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.002 3.797.048.85.04 1.48.174 2.04.393.577.234 1.057.57 1.515 1.028.458.458.794.938 1.028 1.515.22.56.353 1.19.393 2.04.046 1.013.048 1.367.048 3.797s-.002 2.43-.048 3.797c-.04.85-.174 1.48-.393 2.04-.234.577-.57 1.057-1.028 1.515-.458.458-.938.794-1.515 1.028-.56.22-1.19.353-2.04.393-1.013.046-1.367.048-3.797.048s-2.43-.002-3.797-.048c-.85-.04-1.48-.174-2.04-.393-.577-.234-1.057-.57-1.515-1.028-.458-.458-.938-.794-1.028-1.515-.22-.56-.353-1.19-.393-2.04-.046-1.013-.048-1.367-.048-3.797s.002-2.43.048-3.797c.04-.85.174-1.48.393-2.04.234-.577.57-1.057 1.028-1.515.458-.458.938-.794 1.515-1.028.56-.22 1.19-.353 2.04-.393C9.885 2.002 10.23 2 12.315 2zm0 2.18a8.11 8.11 0 100 16.22 8.11 8.11 0 000-16.22zm0 3.687c-2.403 0-4.353 1.95-4.353 4.353s1.95 4.353 4.353 4.353S16.668 14.753 16.668 12s-1.95-4.353-4.353-4.353zm0 2.18a2.173 2.173 0 110 4.346 2.173 2.173 0 010-4.346zm5.327-3.687a1.22 1.22 0 100 2.44 1.22 1.22 0 000-2.44z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          &copy; {"2025 Reward System. All rights reserved."}
        </div>
      </footer>
    </>
  )
}
