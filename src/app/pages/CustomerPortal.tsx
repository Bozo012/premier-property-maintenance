import { Link } from "react-router-dom";
import {
  Lock,
  FileText,
  Calendar,
  CreditCard,
  MessageSquare,
  Settings,
  Home,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { useWebsiteContent } from "../content/website-content-provider";
import { buildSmsHref } from "../config/contact";

export default function CustomerPortal() {
  const {
    content: { settings },
  } = useWebsiteContent();
  const smsHref = buildSmsHref(settings.phoneE164);
  const features = [
    {
      icon: FileText,
      title: "Service History",
      description: "View all past and current service requests",
    },
    {
      icon: Calendar,
      title: "Schedule Services",
      description: "Book new appointments at your convenience",
    },
    {
      icon: CreditCard,
      title: "Billing & Payments",
      description: "Manage invoices and payment methods",
    },
    {
      icon: MessageSquare,
      title: "Direct Messaging",
      description: "Communicate directly with your service team",
    },
    {
      icon: Home,
      title: "Property Management",
      description: "Manage multiple properties in one place",
    },
    {
      icon: Settings,
      title: "Preferences",
      description: "Set your service and communication preferences",
    },
  ];

  const mockRequests = [
    {
      id: "SR-1234",
      property: "123 Main St",
      service: "Plumbing Repair",
      status: "In Progress",
      date: "2026-05-02",
      icon: Clock,
      color: "orange",
    },
    {
      id: "SR-1233",
      property: "456 Oak Ave",
      service: "HVAC Maintenance",
      status: "Completed",
      date: "2026-04-28",
      icon: CheckCircle,
      color: "green",
    },
    {
      id: "SR-1232",
      property: "123 Main St",
      service: "Electrical Repair",
      status: "Scheduled",
      date: "2026-05-06",
      icon: AlertCircle,
      color: "blue",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <Lock className="w-16 h-16 text-orange-500 mx-auto mb-6" />
            <h1 className="text-5xl mb-6">CUSTOMER PORTAL</h1>
            <p className="text-xl text-gray-300 mb-8">
              {settings.portalStatusMessage}
            </p>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Login Form */}
            <div className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-8">
              <h2 className="text-3xl mb-6">SIGN IN</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                    placeholder="Email Address"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm text-gray-400">
                    <input type="checkbox" className="rounded border-gray-700" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-orange-500 hover:text-orange-400">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  Sign In
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{" "}
                  <a href="#" className="text-orange-500 hover:text-orange-400">
                    Request Access
                  </a>
                </p>
              </div>
            </div>

            {/* Features Preview */}
            <div>
              <h2 className="text-3xl mb-6">PORTAL FEATURES</h2>
              <div className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-4 flex items-start space-x-4"
                    >
                      <Icon className="w-8 h-8 text-orange-500 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg mb-1">{feature.title}</h3>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="bg-[#0f0f0f] border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">DASHBOARD PREVIEW</h2>
            <p className="text-gray-400">See what's waiting for you inside the portal</p>
          </div>

          {/* Mock Dashboard */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
                <div className="text-3xl text-orange-500 mb-2">3</div>
                <div className="text-sm text-gray-400">Active Requests</div>
              </div>
              <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
                <div className="text-3xl text-orange-500 mb-2">12</div>
                <div className="text-sm text-gray-400">Completed Services</div>
              </div>
              <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
                <div className="text-3xl text-orange-500 mb-2">5</div>
                <div className="text-sm text-gray-400">Properties</div>
              </div>
              <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
                <div className="text-3xl text-orange-500 mb-2">$0</div>
                <div className="text-sm text-gray-400">Outstanding Balance</div>
              </div>
            </div>

            {/* Recent Requests */}
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
              <h3 className="text-2xl mb-6">RECENT SERVICE REQUESTS</h3>
              <div className="space-y-4">
                {mockRequests.map((request) => {
                  const Icon = request.icon;
                  return (
                    <div
                      key={request.id}
                      className="bg-[#0f0f0f] border border-gray-700 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <Icon className={`w-8 h-8 text-${request.color}-500`} />
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <span className="text-gray-500">{request.id}</span>
                            <span className="text-lg">{request.service}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center space-x-1">
                              <Home className="w-4 h-4" />
                              <span>{request.property}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{request.date}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span
                          className={`px-4 py-2 bg-${request.color}-500/10 text-${request.color}-500 rounded-lg text-sm`}
                        >
                          {request.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a1a1a] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6">NEW CUSTOMER?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Request service to get started and we'll set up your portal access
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/request-service"
              className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              {settings.portalCtaLabel}
            </Link>
            <a
              href={smsHref}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{settings.textCtaLabel}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
