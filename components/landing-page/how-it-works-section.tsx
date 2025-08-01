export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Simple Steps to Start Earning</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary-600 text-white text-xl font-bold flex items-center justify-center mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Sign Up</h3>
            <p className="text-gray-600">Create your free account in minutes. It's quick and easy!</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary-600 text-white text-xl font-bold flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Earn Points</h3>
            <p className="text-gray-600">
              Participate in surveys, daily tasks, and special offers to accumulate points.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary-600 text-white text-xl font-bold flex items-center justify-center mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Redeem Rewards</h3>
            <p className="text-gray-600">Exchange your points for Bitcoin, gift cards, or other exciting rewards.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
