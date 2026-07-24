import { useEffect, useState } from "react";
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
import { isSupabaseConfigured } from "../lib/supabase";
import { usePortalSession } from "../portal/use-portal-session";
import { signInPortalCustomer, signOutPortalCustomer, signUpPortalCustomer } from "../portal/portal-api";
import {
  fetchPortalDashboard,
  type PortalDashboardData,
} from "../portal/portal-dashboard-data";

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

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

// Static class strings so Tailwind's build-time scanner can see them —
// `bg-${color}-500` template interpolation is invisible to the scanner and
// silently renders unstyled.
const STATUS_BADGE_CLASSES: Record<string, string> = {
  completed: "bg-green-500/10 text-green-500",
  cancelled: "bg-gray-500/10 text-gray-400",
  spam: "bg-gray-500/10 text-gray-400",
  new: "bg-blue-500/10 text-blue-500",
  reviewed: "bg-blue-500/10 text-blue-500",
};
const DEFAULT_STATUS_BADGE_CLASSES = "bg-orange-500/10 text-orange-500";

function statusBadgeClasses(status: string): string {
  return STATUS_BADGE_CLASSES[status] ?? DEFAULT_STATUS_BADGE_CLASSES;
}

export default function CustomerPortal() {
  const {
    content: { settings },
  } = useWebsiteContent();
  const smsHref = buildSmsHref(settings.phoneE164);
  const { session, isLoading: isSessionLoading } = usePortalSession();

  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  const [dashboardState, setDashboardState] = useState<
    | { status: "loading" }
    | { status: "linked"; data: PortalDashboardData }
    | { status: "not-linked" }
    | { status: "error"; message: string }
  >({ status: "loading" });

  const loadDashboard = async (userId: string) => {
    setDashboardState({ status: "loading" });
    const result = await fetchPortalDashboard(userId);
    if (result.state === "linked") {
      setDashboardState({ status: "linked", data: result.data });
    } else if (result.state === "not-linked") {
      setDashboardState({ status: "not-linked" });
    } else {
      setDashboardState({ status: "error", message: result.message });
    }
  };

  // Handles the page-load / already-signed-in case (session restored from
  // storage, no auth-submit flow to hook the fetch into directly).
  useEffect(() => {
    if (!session?.user) return;
    let cancelled = false;

    loadDashboard(session.user.id).then(() => {
      if (cancelled) {
        // A newer load (e.g. from handleAuthSubmit) may have already
        // superseded this one; nothing further to do.
      }
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthNotice(null);

    if (!isSupabaseConfigured) {
      setAuthError("The customer portal isn't available right now. Please call us instead.");
      return;
    }

    setAuthSubmitting(true);
    try {
      if (authMode === "signin") {
        const result = await signInPortalCustomer(email, password);
        if (!result.success) {
          setAuthError(result.error);
        } else {
          // Load the dashboard directly with the id we already have, rather
          // than waiting on the reactive session effect above — that effect
          // fires as soon as the SDK sees a token, which can race ahead of
          // the account-linking call this sign-in already awaited.
          await loadDashboard(result.data.userId);
        }
      } else {
        const result = await signUpPortalCustomer(fullName, email, password);
        if (!result.success) {
          setAuthError(result.error);
        } else if (result.data.needsEmailConfirmation) {
          setAuthNotice("Check your email to confirm your account, then sign in.");
          setAuthMode("signin");
        } else if (result.data.userId) {
          await loadDashboard(result.data.userId);
        }
      }
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOutPortalCustomer();
    setDashboardState({ status: "loading" });
  };

  const isAuthenticated = Boolean(session?.user) && !isSessionLoading;

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

      {!isAuthenticated ? (
        /* Login / Sign-up Section */
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Auth Form */}
              <div className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-8">
                <h2 className="text-3xl mb-6">{authMode === "signin" ? "SIGN IN" : "CREATE ACCOUNT"}</h2>

                {authNotice ? (
                  <div className="mb-6 flex items-start gap-3 bg-blue-950/50 border border-blue-500 rounded-lg p-4 text-blue-300">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{authNotice}</p>
                  </div>
                ) : null}
                {authError ? (
                  <div className="mb-6 flex items-start gap-3 bg-red-950/50 border border-red-500 rounded-lg p-4 text-red-300">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{authError}</p>
                  </div>
                ) : null}

                <form className="space-y-6" onSubmit={handleAuthSubmit}>
                  {authMode === "signup" ? (
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        placeholder="Full Name"
                      />
                    </div>
                  ) : null}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                      placeholder="Email Address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Password</label>
                    <input
                      type="password"
                      required
                      minLength={authMode === "signup" ? 8 : undefined}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                      placeholder="••••••••"
                    />
                  </div>
                  {authMode === "signin" ? (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2 text-sm text-gray-400">
                        <input type="checkbox" className="rounded border-gray-700" />
                        <span>Remember me</span>
                      </label>
                      <a href="#" className="text-sm text-orange-500 hover:text-orange-400">
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
                        : "Creating Account..."
                      : authMode === "signin"
                        ? "Sign In"
                        : "Create Account"}
                  </button>
                </form>
                <div className="mt-6 text-center">
                  {authMode === "signin" ? (
                    <p className="text-gray-400 text-sm">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode("signup");
                          setAuthError(null);
                          setAuthNotice(null);
                        }}
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
                        onClick={() => {
                          setAuthMode("signin");
                          setAuthError(null);
                          setAuthNotice(null);
                        }}
                        className="text-orange-500 hover:text-orange-400"
                      >
                        Sign In
                      </button>
                    </p>
                  )}
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
      ) : (
        /* Dashboard Section — same structure as before, real data */
        <section className="bg-[#0f0f0f] border-t border-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl mb-4">YOUR DASHBOARD</h2>
              <p className="text-gray-400 mb-6">
                Signed in as {session?.user?.email}
              </p>
              <button
                type="button"
                onClick={handleSignOut}
                className="px-6 py-2 border border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 rounded-lg transition-colors text-sm"
              >
                Sign Out
              </button>
            </div>

            {dashboardState.status === "loading" ? (
              <p className="text-center text-gray-400">Loading your dashboard…</p>
            ) : dashboardState.status === "error" ? (
              <div className="max-w-2xl mx-auto flex items-start gap-3 bg-red-950/50 border border-red-500 rounded-lg p-4 text-red-300">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{dashboardState.message}</p>
              </div>
            ) : dashboardState.status === "not-linked" ? (
              <div className="max-w-2xl mx-auto flex items-start gap-3 bg-blue-950/50 border border-blue-500 rounded-lg p-4 text-blue-300">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Your sign-in works, but we couldn't find an active customer account link yet.
                  Please try signing out and back in, or contact us if this continues.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {dashboardState.data.partialLoadError ? (
                  <p className="text-center text-sm text-amber-400">
                    Some portal data could not be loaded. Please refresh or contact us if this continues.
                  </p>
                ) : null}

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
                    <div className="text-3xl text-orange-500 mb-2">
                      {dashboardState.data.activeRequests.length}
                    </div>
                    <div className="text-sm text-gray-400">Active Requests</div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
                    <div className="text-3xl text-orange-500 mb-2">
                      {dashboardState.data.completedRequests.length}
                    </div>
                    <div className="text-sm text-gray-400">Completed Services</div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
                    <div className="text-3xl text-orange-500 mb-2">
                      {dashboardState.data.properties.length}
                    </div>
                    <div className="text-sm text-gray-400">Properties</div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
                    <div className="text-3xl text-orange-500 mb-2">
                      {formatMoney(dashboardState.data.outstandingBalance)}
                    </div>
                    <div className="text-sm text-gray-400">Outstanding Balance</div>
                  </div>
                </div>

                {/* Recent Requests */}
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
                  <h3 className="text-2xl mb-6">RECENT SERVICE REQUESTS</h3>
                  {[...dashboardState.data.activeRequests, ...dashboardState.data.completedRequests].length === 0 ? (
                    <p className="text-gray-400 text-sm">No service requests yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {[...dashboardState.data.activeRequests, ...dashboardState.data.completedRequests]
                        .slice(0, 10)
                        .map((request) => {
                          return (
                            <div
                              key={request.id}
                              className="bg-[#0f0f0f] border border-gray-700 rounded-lg p-4 flex items-center justify-between flex-wrap gap-4"
                            >
                              <div className="flex items-center space-x-4">
                                <div>
                                  <div className="flex items-center space-x-3 mb-1">
                                    <span className="text-gray-500">{request.requestNumber}</span>
                                    <span className="text-lg">{request.serviceTitle}</span>
                                  </div>
                                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                                    <span className="flex items-center space-x-1">
                                      <Home className="w-4 h-4" />
                                      <span>
                                        {request.propertyAddressLine1}, {request.propertyCity},{" "}
                                        {request.propertyState}
                                      </span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                      <Calendar className="w-4 h-4" />
                                      <span>{formatDate(request.submittedAt)}</span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <span
                                  className={`px-4 py-2 rounded-lg text-sm capitalize ${statusBadgeClasses(request.status)}`}
                                >
                                  {request.status.replace(/_/g, " ")}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      {!isAuthenticated ? (
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
      ) : null}
    </div>
  );
}
