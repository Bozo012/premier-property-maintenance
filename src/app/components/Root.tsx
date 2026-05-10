import { Outlet, Link, useLocation } from "react-router-dom";
import { Phone, MessageSquare, Menu, X } from "lucide-react";
import { useState } from "react";

import { useWebsiteContent } from "../content/website-content-provider";
import { buildPhoneHref, buildSmsHref } from "../config/contact";

export default function Root() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    content: { settings },
  } = useWebsiteContent();
  const phoneHref = buildPhoneHref(settings.phoneE164);
  const smsHref = buildSmsHref(settings.phoneE164);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/rental-properties", label: "Rental Properties" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/customer-portal", label: "Portal" },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <header className="bg-[#0f0f0f] border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              {/* Use the provided logo image instead of the orange P box */}
              <img
                src="/ppmlogo.png"
                alt="Premier Property Maintenance logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl">Premier Property Maintenance</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm hover:text-orange-500 transition-colors ${
                    location.pathname === link.path ? "text-orange-500" : "text-gray-300"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href={phoneHref}
                className="flex items-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{settings.phoneDisplay}</span>
              </a>
              <Link
                to="/request-service"
                className="px-6 py-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition-colors"
              >
                {settings.requestServiceCtaLabel}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0f0f0f] border-t border-gray-800">
            <nav className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-lg ${
                    location.pathname === link.path ? "text-orange-500" : "text-gray-300"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <a
                  href={phoneHref}
                  className="flex items-center justify-center space-x-2 w-full px-6 py-3 bg-orange-500 text-white rounded-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>{settings.phoneDisplay}</span>
                </a>
                <Link
                  to="/request-service"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center w-full px-6 py-3 border border-orange-500 text-orange-500 rounded-lg"
                >
                  {settings.requestServiceCtaLabel}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#0f0f0f] border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              {/* Logo in footer */}
              <img
                src="/ppmlogo.png"
                alt="Premier Property Maintenance logo"
                className="w-8 h-8 mb-2 rounded-lg object-cover"
              />
              <h3 className="text-lg mb-4">Premier Property Maintenance</h3>
              <p className="text-gray-400 text-sm">
                {settings.serviceAreaSummary}
              </p>
            </div>
            <div>
              <h4 className="text-sm mb-4 text-gray-300">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/services" className="hover:text-orange-500">All Services</Link></li>
                <li><Link to="/rental-properties" className="hover:text-orange-500">Rental Properties</Link></li>
                <li><Link to="/request-service" className="hover:text-orange-500">Request Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm mb-4 text-gray-300">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/how-it-works" className="hover:text-orange-500">How It Works</Link></li>
                <li><Link to="/customer-portal" className="hover:text-orange-500">Customer Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm mb-4 text-gray-300">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <a href={phoneHref} className="hover:text-orange-500">{settings.phoneDisplay}</a>
                </li>
                <li className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <a href={smsHref} className="hover:text-orange-500">
                    {settings.textCtaLabel}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>&copy; 2026 Premier Property Maintenance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
