import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Local Boxing Classes - Find Boxing Gyms Near You',
  description: 'Learn about Local Boxing Classes, the nationwide directory helping you find boxing gyms, training facilities, and classes in your area.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#FFFFFF'}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            About Local Boxing Classes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted nationwide directory for finding boxing gyms and training facilities across the United States.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-fight-red">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We believe everyone should have access to quality boxing training. Our platform connects aspiring boxers, fitness enthusiasts, and martial arts students with legitimate boxing gyms and training facilities in their local area.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you're a complete beginner looking to learn the basics or an experienced fighter seeking advanced training, we help you find the right gym that matches your skill level and goals.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-fight-red">What We Offer</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-fight-red mr-3">•</span>
                Comprehensive directory of boxing gyms nationwide
              </li>
              <li className="flex items-start">
                <span className="text-fight-red mr-3">•</span>
                Search by ZIP code with customizable radius
              </li>
              <li className="flex items-start">
                <span className="text-fight-red mr-3">•</span>
                Detailed gym information including contact details and hours
              </li>
              <li className="flex items-start">
                <span className="text-fight-red mr-3">•</span>
                Browse by state and city for regional exploration
              </li>
              <li className="flex items-start">
                <span className="text-fight-red mr-3">•</span>
                Direct links to gym websites and contact information
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 mb-12 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">Why Choose Boxing?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-fight-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-black">Fitness & Conditioning</h3>
              <p className="text-gray-600 text-sm">
                Boxing provides an intense full-body workout that improves cardiovascular health, strength, and coordination.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-fight-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-black">Self-Defense</h3>
              <p className="text-gray-600 text-sm">
                Learn practical self-defense skills while building confidence and mental toughness.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-fight-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-black">Mental Discipline</h3>
              <p className="text-gray-600 text-sm">
                Boxing teaches focus, discipline, and stress management while providing an outlet for daily pressures.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-black">Ready to Start Your Boxing Journey?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Use our search tools to find boxing gyms in your area. Enter your ZIP code to discover training facilities near you, or browse by state and city to explore options across the country.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/classes"
              className="bg-fight-red text-white px-8 py-3 rounded-xl font-bold hover:bg-fight-red/90 transition-all duration-300 hover:scale-105 inline-block"
            >
              Search by ZIP Code
            </a>
            <a
              href="/states"
              className="border border-gray-200 text-black px-8 py-3 rounded-xl font-medium hover:border-fight-red/50 transition-colors inline-block bg-white"
            >
              Browse All States
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}