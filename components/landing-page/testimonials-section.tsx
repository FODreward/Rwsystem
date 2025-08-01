import Image from "next/image"

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-lg italic text-gray-700 mb-4">
              {
                '"This reward system is fantastic! I\'ve earned so many points just by doing simple tasks, and redeeming them for gift cards is a breeze. Highly recommend!"'
              }
            </p>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=48&width=48"
                alt="User Avatar"
                className="w-12 h-12 rounded-full mr-4 border-2 border-primary-600"
                width={48}
                height={48}
              />
              <div>
                <p className="font-semibold text-gray-800">Jane Doe</p>
                <p className="text-sm text-gray-600">Active User</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-lg italic text-gray-700 mb-4">
              {
                '"I was skeptical at first, but the points add up quickly, and the Bitcoin redemption option is a game-changer. It\'s a legitimate way to earn extra value."'
              }
            </p>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=48&width=48"
                alt="User Avatar"
                className="w-12 h-12 rounded-full mr-4 border-2 border-primary-600"
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
  )
}
