import { Link } from "react-router-dom";
import {
  Building2,
  CheckCircle,
  Clock,
  FileText,
  Phone,
  Users,
  Calendar,
  Shield,
  DollarSign,
  Star,
  TrendingUp,
} from "lucide-react";

import { useWebsiteContent } from "../content/website-content-provider";
import { buildPhoneHref } from "../config/contact";

export default function RentalProperties() {
  const {
    content: { settings },
  } = useWebsiteContent();
  const phoneHref = buildPhoneHref(settings.phoneE164);
  const benefits = [
    {
      icon: Clock,
      title: "Priority Scheduling",
      description: "Fast response times for all your properties",
    },
    {
      icon: Users,
      title: "Tenant Coordination",
      description: "We handle communication and scheduling with your tenants",
    },
    {
      icon: FileText,
      title: "Detailed Reporting",
      description: "Complete documentation and photo records of all work",
    },
    {
      icon: Calendar,
      title: "Preventive Maintenance",
      description: "Scheduled maintenance plans to avoid costly emergencies",
    },
    {
      icon: DollarSign,
      title: "Volume Pricing",
      description: "Competitive rates for multi-property owners",
    },
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "Full insurance coverage on all work performed",
    },
  ];

  const services = [
    "Turn-key property turnovers",
    "Emergency repair response",
    "Regular maintenance inspections",
    "Tenant move-in/move-out repairs",
    "Property improvement projects",
    "Code compliance updates",
    "Seasonal maintenance",
    "24/7 emergency availability",
  ];

  const packages = [
    {
      name: "Essential",
      properties: "1-5 Properties",
      price: "Contact for pricing",
      features: [
        "Priority scheduling",
        "Basic reporting",
        "Tenant coordination",
        "Emergency response",
        "Volume discount",
      ],
    },
    {
      name: "Professional",
      properties: "6-15 Properties",
      price: "Contact for pricing",
      features: [
        "All Essential features",
        "Detailed photo reports",
        "Preventive maintenance planning",
        "Dedicated account manager",
        "Monthly property reviews",
        "Enhanced volume discount",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      properties: "16+ Properties",
      price: "Custom pricing",
      features: [
        "All Professional features",
        "Custom maintenance schedules",
        "API integration available",
        "Priority emergency response",
        "Quarterly business reviews",
        "Maximum volume discount",
      ],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Building2 className="w-16 h-16 text-orange-500" />
            </div>
            <h1 className="text-5xl mb-6">RENTAL PROPERTY LANDLORDS</h1>
            <p className="text-xl text-gray-300 mb-8">
              Professional maintenance solutions designed specifically for property managers and landlords
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={phoneHref}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>{settings.callCtaLabel} {settings.phoneDisplay}</span>
              </a>
              <Link
                to="/request-service"
                className="w-full sm:w-auto px-8 py-4 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition-colors"
              >
                {settings.requestServiceCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#1a1a1a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">WHY LANDLORDS CHOOSE US</h2>
            <p className="text-gray-400">Comprehensive support for your rental portfolio</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-6 hover:border-orange-500 transition-colors"
                >
                  <Icon className="w-10 h-10 text-orange-500 mb-4" />
                  <h3 className="text-xl mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-[#0f0f0f] border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-6">LANDLORD SERVICES</h2>
              <p className="text-gray-300 mb-6">
                Keep your properties rent-ready and your tenants satisfied with our comprehensive maintenance services.
              </p>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <TrendingUp className="w-8 h-8 text-orange-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg mb-2">Maximize Property Value</h3>
                    <p className="text-gray-400 text-sm">
                      Regular maintenance keeps properties in top condition and helps maintain rental rates
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Users className="w-8 h-8 text-orange-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg mb-2">Improve Tenant Retention</h3>
                    <p className="text-gray-400 text-sm">
                      Fast, professional service keeps tenants happy and reduces turnover
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Shield className="w-8 h-8 text-orange-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg mb-2">Reduce Liability</h3>
                    <p className="text-gray-400 text-sm">
                      Proper maintenance and documentation help protect you from potential issues
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-[#1a1a1a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">LANDLORD PACKAGES</h2>
            <p className="text-gray-400">Tailored solutions for any portfolio size</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`bg-[#0f0f0f] border rounded-lg p-8 relative ${
                  pkg.popular ? "border-orange-500" : "border-gray-800"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl mb-2">{pkg.name}</h3>
                  <p className="text-orange-500 mb-2">{pkg.properties}</p>
                  <p className="text-3xl">{pkg.price}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm text-gray-300">
                      <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/request-service"
                  className={`block w-full text-center px-6 py-3 rounded-lg transition-colors ${
                    pkg.popular
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-orange-600 to-orange-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6">READY TO SIMPLIFY YOUR PROPERTY MANAGEMENT?</h2>
          <p className="text-xl mb-8 text-orange-50">
            Let us handle the maintenance so you can focus on growing your portfolio
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={phoneHref}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-white text-orange-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>{settings.callCtaLabel} {settings.phoneDisplay}</span>
            </a>
            <Link
              to="/request-service"
              className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-orange-500 rounded-lg transition-colors"
            >
              {settings.requestServiceCtaLabel}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
