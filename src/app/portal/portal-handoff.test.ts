import { describe, expect, it, vi } from "vitest";

import {
  buildForgePortalUrl,
  buildPortalFormAction,
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
    expect(buildPortalFormAction("request-access")).toBe(
      "https://app.ppmnky.com/portal/handoff/request-access",
    );

    vi.unstubAllEnvs();
  });

  it("keeps credentials out of generated handoff URLs", () => {
    vi.stubEnv("VITE_FORGE_PORTAL_ORIGIN", "https://app.ppmnky.com");

    const signInUrl = buildPortalFormAction("signin");

    expect(signInUrl).not.toContain("email=");
    expect(signInUrl).not.toContain("password=");

    vi.unstubAllEnvs();
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
