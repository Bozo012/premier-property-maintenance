import { Link } from "react-router-dom";
import {
  Wrench,
  Paintbrush,
  Droplets,
  Zap,
  Home,
  Building2,
  Hammer,
  Wind,
  Lock,
  Lightbulb,
  TreePine,
  Trash2,
  CheckCircle,
  Phone,
} from "lucide-react";

import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from "../config/contact";

export default function Services() {
  const serviceCategories = [
    {
      icon: Wrench,
      title: "General Repairs",
      description: "From door handles to drywall, we fix it all",
      services: [
        "Door and window repairs",
        "Drywall patching and repair",
        "Furniture assembly",
        "Hardware installation",
        "General handyman services",
      ],
    },
    {
      icon: Paintbrush,
      title: "Painting & Finishing",
      description: "Interior and exterior painting services",
      services: [
        "Interior painting",
        "Exterior painting",
        "Cabinet refinishing",
        "Staining and sealing",
        "Wallpaper removal",
      ],
    },
    {
      icon: Droplets,
      title: "Plumbing",
      description: "Professional plumbing repairs and installations",
      services: [
        "Leak repairs",
        "Drain cleaning",
        "Toilet repairs",
        "Faucet installation",
        "Water heater service",
      ],
    },
    {
      icon: Zap,
      title: "Electrical",
      description: "Licensed electrical services",
      services: [
        "Light fixture installation",
        "Outlet and switch repair",
        "Circuit breaker service",
        "Ceiling fan installation",
        "Electrical troubleshooting",
      ],
    },
    {
      icon: Wind,
      title: "HVAC",
      description: "Heating and cooling maintenance",
      services: [
        "AC repair and maintenance",
        "Furnace service",
        "Thermostat installation",
        "Air filter replacement",
        "Duct cleaning",
      ],
    },
    {
      icon: Building2,
      title: "Carpentry",
      description: "Custom woodwork and repairs",
      services: [
        "Deck and fence repair",
        "Cabinet installation",
        "Trim and molding",
        "Custom shelving",
        "Structural repairs",
      ],
    },
    {
      icon: Home,
      title: "Flooring",
      description: "Floor repair and installation",
      services: [
        "Hardwood repair",
        "Tile replacement",
        "Carpet repair",
        "Laminate installation",
        "Floor refinishing",
      ],
    },
    {
      icon: Lock,
      title: "Security & Locks",
      description: "Keep your property secure",
      services: [
        "Lock replacement",
        "Deadbolt installation",
        "Security camera setup",
        "Smart lock installation",
        "Door reinforcement",
      ],
    },
    {
      icon: TreePine,
      title: "Exterior Maintenance",
      description: "Outdoor property care",
      services: [
        "Gutter cleaning",
        "Power washing",
        "Landscaping maintenance",
        "Fence repair",
        "Deck maintenance",
      ],
    },
    {
      icon: Lightbulb,
      title: "Smart Home",
      description: "Modern home technology installation",
      services: [
        "Smart thermostat setup",
        "Video doorbell installation",
        "Smart lighting",
        "Home automation",
        "WiFi optimization",
      ],
    },
    {
      icon: Trash2,
      title: "Cleanup & Hauling",
      description: "Property cleanup services",
      services: [
        "Junk removal",
        "Post-renovation cleanup",
        "Garage cleanout",
        "Appliance removal",
        "Debris hauling",
      ],
    },
    {
      icon: Hammer,
      title: "Emergency Services",
      description: "24/7 emergency response",
      services: [
        "Water damage mitigation",
        "Emergency plumbing",
        "Lock-out service",
        "Storm damage repair",
        "Urgent repairs",
      ],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl mb-6">OUR SERVICES</h1>
            <p className="text-xl text-gray-300 mb-8">
              Comprehensive property maintenance solutions for every need
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CONTACT_PHONE_HREF}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>Call {CONTACT_PHONE_DISPLAY}</span>
              </a>
              <Link
                to="/request-service"
                className="w-full sm:w-auto px-8 py-4 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition-colors"
              >
                Request Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-[#1a1a1a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-6 hover:border-orange-500 transition-colors"
                >
                  <Icon className="w-10 h-10 text-orange-500 mb-4" />
                  <h3 className="text-xl mb-2">{category.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                  <ul className="space-y-2">
                    {category.services.map((service, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0f0f0f] border-t border-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6">DON'T SEE YOUR SERVICE?</h2>
          <p className="text-xl text-gray-300 mb-8">
            We handle a wide range of property maintenance needs. Give us a call to discuss your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={CONTACT_PHONE_HREF}
              className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              Call to Discuss
            </a>
            <Link
              to="/request-service"
              className="w-full sm:w-auto px-8 py-4 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition-colors"
            >
              Request Custom Service
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
