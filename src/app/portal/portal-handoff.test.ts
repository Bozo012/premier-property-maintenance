import { describe, expect, it, vi } from "vitest";

import {
  buildForgePortalUrl,
  buildCustomerPortalModePath,
  buildPortalFormAction,
  getPortalAuthModeFromSearch,
  getForgePortalOrigin,
  getPortalStatusMessage,
} from "./portal-handoff";

describe("customer portal Forge handoff", () => {
  it("uses the configured Forge origin for customer auth endpoints", () => {
    vi.stubEnv("VITE_FORGE_PORTAL_ORIGIN", "https://app.ppmnky.com/");

    expect(getForgePortalOrigin()).toBe("https://app.ppmnky.com");
    expect(buildPortalFormAction("signin")).toBe(
      "https://app.ppmnky.com/portal/handoff/sign-in",
    );
    expect(buildPortalFormAction("signup")).toBe(
      "https://app.ppmnky.com/portal/handoff/sign-up",
    );

    vi.unstubAllEnvs();
  });

  it("keeps credentials out of generated handoff URLs", () => {
    vi.stubEnv("VITE_FORGE_PORTAL_ORIGIN", "https://app.ppmnky.com");

    const signInUrl = buildPortalFormAction("signin");
    const signUpUrl = buildPortalFormAction("signup");

    expect(signInUrl).not.toContain("email=");
    expect(signInUrl).not.toContain("password=");
    expect(signUpUrl).not.toContain("email=");
    expect(signUpUrl).not.toContain("password=");

    vi.unstubAllEnvs();
  });

  it("builds marketing portal links that preselect sign-in or sign-up", () => {
    expect(buildCustomerPortalModePath("signin")).toBe("/customer-portal?portalMode=signin");
    expect(buildCustomerPortalModePath("signup")).toBe("/customer-portal?portalMode=signup");
    expect(getPortalAuthModeFromSearch("?portalMode=signup")).toBe("signup");
    expect(getPortalAuthModeFromSearch("?mode=request-access")).toBe("signup");
    expect(getPortalAuthModeFromSearch("?portalMode=signin")).toBe("signin");
  });

  it("maps only known Forge status codes to customer-safe messages", () => {
    expect(getPortalStatusMessage("invalid-credentials")).toBe(
      "Could not sign in with those portal credentials.",
    );
    expect(getPortalStatusMessage("raw database error")).toBeNull();
  });

  it("builds Forge-owned password recovery links", () => {
    vi.stubEnv("VITE_FORGE_PORTAL_ORIGIN", "https://app.ppmnky.com");

    expect(buildForgePortalUrl("/portal/forgot-password")).toBe(
      "https://app.ppmnky.com/portal/forgot-password",
    );

    vi.unstubAllEnvs();
  });
});
