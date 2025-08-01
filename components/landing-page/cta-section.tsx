import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section id="contact" className="bg-primary-600 text-white py-16 md:py-24 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Earning?</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied users who are already benefiting from our rewarding platform.
        </p>
        <Button asChild className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-lg shadow-md">
          <Link href="/signup">Sign Up Now</Link>
        </Button>
      </div>
    </section>
  )
}
