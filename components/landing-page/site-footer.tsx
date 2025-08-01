import Link from "next/link"
import { Twitter, Facebook, Instagram } from "lucide-react"

export function SiteFooter() {
  return (
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
              <Link href="#features" className="hover:text-primary-400 transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="#how-it-works" className="hover:text-primary-400 transition-colors">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="#testimonials" className="hover:text-primary-400 transition-colors">
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-primary-400 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Connect With Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link href="#" className="text-gray-300 hover:text-primary-400 transition-colors" aria-label="Twitter">
              <Twitter className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-primary-400 transition-colors" aria-label="Facebook">
              <Facebook className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-primary-400 transition-colors" aria-label="Instagram">
              <Instagram className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Reward System. All rights reserved.
      </div>
    </footer>
  )
}
