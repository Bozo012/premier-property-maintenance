import { Link } from "react-router-dom";
import { Home, Phone, Search } from "lucide-react";

import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from "../config/contact";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="text-9xl text-orange-500 mb-4">404</div>
          <h1 className="text-4xl mb-4">PAGE NOT FOUND</h1>
          <p className="text-xl text-gray-300 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-8 mb-8">
          <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-6">
            Looking for something specific? Try one of these options:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </Link>
            <Link
              to="/services"
              className="px-6 py-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition-colors"
            >
              View Services
            </Link>
            <Link
              to="/request-service"
              className="px-6 py-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition-colors"
            >
              Request Service
            </Link>
            <a
              href={CONTACT_PHONE_HREF}
              className="flex items-center justify-center space-x-2 px-6 py-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>Call Us</span>
            </a>
          </div>
        </div>

        <p className="text-gray-500 text-sm">
          Need help? Contact us at{" "}
          <a href={CONTACT_PHONE_HREF} className="text-orange-500 hover:text-orange-400">
            {CONTACT_PHONE_DISPLAY}
          </a>
        </p>
      </div>
    </div>
  );
}
