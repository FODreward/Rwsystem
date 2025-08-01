import { SiteHeader } from "@/components/landing-page/site-header"
import { HeroSection } from "@/components/landing-page/hero-section"
import { FeaturesSection } from "@/components/landing-page/features-section"
import { HowItWorksSection } from "@/components/landing-page/how-it-works-section"
import { TestimonialsSection } from "@/components/landing-page/testimonials-section"
import { CtaSection } from "@/components/landing-page/cta-section"
import { SiteFooter } from "@/components/landing-page/site-footer"

export default function LandingPage() {
  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-50">
      <SiteHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}
