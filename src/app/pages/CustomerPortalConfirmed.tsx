import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle } from "lucide-react";

import { supabase } from "../lib/supabase";
import { completeEmailConfirmation } from "../portal/portal-api";

/**
 * Landing page for Supabase's email-confirmation link (see emailRedirectTo in
 * portal-api.ts). Deliberately minimal — this isn't a portal screen, it's a
 * one-time bridge between "clicked the email link" and "actually usable".
 */
export default function CustomerPortalConfirmed() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"working" | "success" | "error">("working");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setStatus("error");
      setErrorMessage("The customer portal isn't available right now. Please call us instead.");
      return;
    }

    let settled = false;

    const finish = async () => {
      if (settled) return;
      settled = true;
      const result = await completeEmailConfirmation();
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error);
      }
    };

    // supabase-js processes the token in the URL asynchronously before a
    // session exists — try immediately in case it's already done, and also
    // listen for the SIGNED_IN event in case it isn't yet.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) void finish();
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") void finish();
    });

    const timeout = window.setTimeout(() => {
      if (!settled) {
        settled = true;
        setStatus("error");
        setErrorMessage("This confirmation link looks invalid or expired. Please try signing up again.");
      }
    }, 8000);

    return () => {
      subscription.subscription.unsubscribe();
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#0f0f0f] border border-gray-800 rounded-lg p-8 text-center">
        {status === "working" ? (
          <>
            <h1 className="text-2xl mb-3">Confirming your account…</h1>
            <p className="text-gray-400 text-sm">This will just take a second.</p>
          </>
        ) : status === "success" ? (
          <>
            <CheckCircle className="w-14 h-14 text-orange-500 mx-auto mb-4" />
            <h1 className="text-2xl mb-3">You're confirmed</h1>
            <p className="text-gray-400 text-sm mb-6">
              Your email is confirmed and you're signed in. You can head to your dashboard now.
            </p>
            <button
              type="button"
              onClick={() => navigate("/customer-portal")}
              className="w-full px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              Go to Dashboard
            </button>
          </>
        ) : (
          <>
            <AlertCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl mb-3">Something went wrong</h1>
            <p className="text-gray-400 text-sm mb-6">{errorMessage}</p>
            <Link
              to="/customer-portal"
              className="inline-block w-full px-8 py-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition-colors"
            >
              Back to Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
