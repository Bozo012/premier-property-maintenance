import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  FileText,
  Calendar,
  CreditCard,
  MessageSquare,
  Settings,
  Home,
  AlertCircle,
} from "lucide-react";

import { useWebsiteContent } from "../content/website-content-provider";
import { buildSmsHref } from "../config/contact";
import {
  buildForgePortalUrl,
  buildPortalFormAction,
  getPortalStatusMessage,
  type PortalAuthMode,
} from "../portal/portal-handoff";

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

export default function CustomerPortal() {
  const {
    content: { settings },
  } = useWebsiteContent();
  const smsHref = buildSmsHref(settings.phoneE164);

  const [authMode, setAuthMode] = useState<PortalAuthMode>("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const statusMessage = useMemo(() => {
    if (typeof window === "undefined") return null;
    return getPortalStatusMessage(
      new URLSearchParams(window.location.search).get("portalStatus"),
    );
  }, []);

  const handleAuthSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setAuthError(null);
    if (!event.currentTarget.checkValidity()) return;
    setAuthSubmitting(true);
  };

  const switchAuthMode = (mode: PortalAuthMode) => {
    setAuthMode(mode);
    setAuthError(null);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
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

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-8">
              <h2 className="text-3xl mb-6">
                {authMode === "signin" ? "SIGN IN" : "REQUEST ACCESS"}
              </h2>

              {statusMessage ? (
                <div className="mb-6 flex items-start gap-3 bg-blue-950/50 border border-blue-500 rounded-lg p-4 text-blue-300">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{statusMessage}</p>
                </div>
              ) : null}

              {authError ? (
                <div className="mb-6 flex items-start gap-3 bg-red-950/50 border border-red-500 rounded-lg p-4 text-red-300">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{authError}</p>
                </div>
              ) : null}

              <form
                className="space-y-6"
                action={buildPortalFormAction(authMode)}
                method="post"
                onSubmit={handleAuthSubmit}
              >
                <input type="hidden" name="source" value="marketing-customer-portal" />

                {authMode === "request-access" ? (
                  <div>
                    <label htmlFor="portal-full-name" className="block text-sm text-gray-400 mb-2">
                      Full Name
                    </label>
                    <input
                      id="portal-full-name"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                      placeholder="Full Name"
                    />
                  </div>
                ) : null}

                <div>
                  <label htmlFor="portal-email" className="block text-sm text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    id="portal-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                    placeholder="Email Address"
                  />
                </div>

                <div>
                  <label htmlFor="portal-password" className="block text-sm text-gray-400 mb-2">
                    Password
                  </label>
                  <input
                    id="portal-password"
                    name="password"
                    type="password"
                    required
                    minLength={authMode === "request-access" ? 8 : undefined}
                    autoComplete={authMode === "signin" ? "current-password" : "new-password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                    placeholder="••••••••"
                  />
                </div>

                {authMode === "signin" ? (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-sm text-gray-400">
                      <input name="rememberMe" value="true" type="checkbox" className="rounded border-gray-700" />
                      <span>Remember me</span>
                    </label>
                    <a
                      href={buildForgePortalUrl("/portal/forgot-password")}
                      className="text-sm text-orange-500 hover:text-orange-400"
                    >
                      Forgot password?
                    </a>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={authSubmitting}
                  className="w-full px-8 py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  {authSubmitting
                    ? authMode === "signin"
                      ? "Signing In..."
                      : "Requesting Access..."
                    : authMode === "signin"
                      ? "Sign In"
                      : "Request Access"}
                </button>
              </form>

              <div className="mt-6 text-center">
                {authMode === "signin" ? (
                  <p className="text-gray-400 text-sm">
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchAuthMode("request-access")}
                      className="text-orange-500 hover:text-orange-400"
                    >
                      Request Access
                    </button>
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchAuthMode("signin")}
                      className="text-orange-500 hover:text-orange-400"
                    >
                      Sign In
                    </button>
                  </p>
                )}
              </div>
            </div>

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

      <section className="bg-[#1a1a1a] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6">NEW CUSTOMER?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Request service to get started and we&apos;ll set up your portal access
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
