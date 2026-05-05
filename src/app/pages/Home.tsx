import { Link } from "react-router-dom";
import { Phone, MessageSquare, Wrench, Home as HomeIcon, Building2, Paintbrush, Droplets, CheckCircle, Shield } from "lucide-react";

export default function Home() {
  const services = [
    { icon: Wrench, title: "General Repairs", desc: "Quick fixes for any property issue" },
    { icon: Paintbrush, title: "Painting", desc: "Interior & exterior painting" },
    { icon: Droplets, title: "Plumbing", desc: "Professional plumbing services" },
    { icon: HomeIcon, title: "HVAC", desc: "Heating & cooling maintenance" },
    { icon: Building2, title: "Carpentry", desc: "Custom woodwork & repairs" },
    { icon: Shield, title: "Emergency", desc: "24/7 emergency response" },
  ];

  const stats = [
    
    { value: "24/7", label: "Emergency Response" },
    { value: "100%", label: "Satisfaction Rate" },
    { value: "< 2hrs", label: "Average Response" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl mb-6">
              ONE CALL. EVERY REPAIR.<br />EVERY PROPERTY.
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Professional property maintenance and repair services for residential and commercial properties.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href="tel:+1234567890"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </a>
              <a
                href="sms:+1234567890"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-lg transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Text Us</span>
              </a>
              <Link
                to="/request-service"
                className="w-full sm:w-auto px-8 py-4 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-lg rounded-lg transition-colors"
              >
                Request Service
              </Link>
            </div>

            <p className="text-gray-400 text-sm">(859) 912-0526 • Available 24/7</p>
          </div>
        </div>
      </section>

      {/* Stats Panel */}
      <section className="bg-[#0f0f0f] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl text-orange-500 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-[#1a1a1a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">SERVICES</h2>
            <p className="text-gray-400">Comprehensive property maintenance solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-6 hover:border-orange-500 transition-colors group"
                >
                  <Icon className="w-10 h-10 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Rental Property Owners Section */}
      <section className="bg-[#0f0f0f] border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-6">RENTAL PROPERTY LANDLORDS</h2>
              <p className="text-gray-300 text-lg mb-6">
                Specialized maintenance solutions for property managers and landlords.
                Keep your properties in top condition and your tenants happy.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Priority scheduling for multiple properties</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Tenant-friendly service coordination</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Detailed reporting and documentation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Preventive maintenance programs</span>
                </li>
              </ul>
              <Link
                to="/rental-properties"
                className="inline-block px-8 py-4 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition-colors"
              >
                Learn More About Rental Services
              </Link>
            </div>
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
              <h3 className="text-2xl mb-6 text-center">Quick Contact Form</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
                <select className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500">
                  <option>Number of Properties</option>
                  <option>1-5 Properties</option>
                  <option>6-10 Properties</option>
                  <option>11-20 Properties</option>
                  <option>20+ Properties</option>
                </select>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  Get Started
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#1a1a1a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">HOW IT WORKS</h2>
            <p className="text-gray-400">Simple, fast, and reliable service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl mb-3">Contact Us</h3>
              <p className="text-gray-400">
                Call, text, or submit a service request with your property issue
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl mb-3">We Respond Fast</h3>
              <p className="text-gray-400">
                Get a quote and schedule service within hours
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl mb-3">Problem Solved</h3>
              <p className="text-gray-400">
                Professional technicians fix your issue right the first time
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/how-it-works"
              className="inline-block px-8 py-4 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-orange-600 to-orange-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl mb-6">TAKE THE STRESS OUT OF IT</h2>
          <p className="text-xl mb-8 text-orange-50">
            Professional maintenance you can trust. Available 24/7 for emergencies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+1234567890"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-white text-orange-500 hover:bg-gray-100 text-lg rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>Call (859) 912-0526</span>
            </a>
            <a
              href="sms:+1234567890"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-white text-orange-500 hover:bg-gray-100 text-lg rounded-lg transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Text Us</span>
            </a>
            <Link
              to="/request-service"
              className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-orange-500 text-lg rounded-lg transition-colors"
            >
              Request Service Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
