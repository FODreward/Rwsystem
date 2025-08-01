"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import { useEffect, useState } from "react"

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleHashChange = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [isMobileMenuOpen])

  return (
    <header className="bg-white shadow-sm py-4">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-2xl font-bold text-primary-600">
          Reward System
        </Link>
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="#features" className="text-gray-600 hover:text-primary-600 transition-colors relative group">
              Features
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href="#how-it-works"
              className="text-gray-600 hover:text-primary-600 transition-colors relative group"
            >
              How It Works
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href="#testimonials"
              className="text-gray-600 hover:text-primary-600 transition-colors relative group"
            >
              Testimonials
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-gray-600 hover:text-primary-600 transition-colors relative group">
              Contact
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>
        <div className="hidden md:flex space-x-4">
          <Button
            asChild
            variant="outline"
            className="border-primary-600 text-primary-600 hover:bg-primary-50 hover:text-primary-700 bg-transparent"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-primary-600 text-white hover:bg-primary-700">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <MenuIcon className="w-6 h-6 text-gray-600" />
              <span className="sr-only">Toggle Mobile Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px] p-4">
            <nav className="flex flex-col space-y-4 mt-6">
              <Link
                href="#features"
                className="text-gray-700 hover:text-primary-600 text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-700 hover:text-primary-600 text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-700 hover:text-primary-600 text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#contact"
                className="text-gray-700 hover:text-primary-600 text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="border-primary-600 text-primary-600 hover:bg-primary-50 hover:text-primary-700 bg-transparent"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-primary-600 text-white hover:bg-primary-700">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
