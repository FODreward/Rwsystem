import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-20 md:py-32 text-center"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">Unlock Rewards, Earn Points, Live Better.</h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          Join our community and start earning points for everyday activities, surveys, and more. Redeem for exciting
          rewards!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-lg shadow-md"
          >
            <Link href="/signup">Get Started Today</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-lg bg-transparent"
          >
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
