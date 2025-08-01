import Image from "next/image"

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Why Choose Our Reward System?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg">
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
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg">
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
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg">
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
  )
}
