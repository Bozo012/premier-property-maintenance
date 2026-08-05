import { describe, expect, it } from "vitest";

import {
  buildServiceRequestBody,
  buildServiceRequestEndpoint,
  SERVICE_REQUEST_ENDPOINT_PATH,
} from "./service-request-handoff";

describe("service request CRM handoff", () => {
  it("posts website requests to the CRM service-request intake endpoint", () => {
    expect(buildServiceRequestEndpoint("https://app.ppmnky.com")).toBe(
      `https://app.ppmnky.com${SERVICE_REQUEST_ENDPOINT_PATH}`,
    );
    expect(buildServiceRequestEndpoint("https://app.ppmnky.com/")).toBe(
      "https://app.ppmnky.com/api/v1/service-requests",
    );
  });

  it("returns an empty endpoint when CRM API URL is not configured", () => {
    expect(buildServiceRequestEndpoint("")).toBe("");
    expect(buildServiceRequestEndpoint("   ")).toBe("");
  });

  it("trims submitted form values and preserves the honeypot field", () => {
    expect(
      buildServiceRequestBody(
        {
          firstName: " Jane ",
          lastName: " Smith ",
          emailAddress: " customer@example.com ",
          problemDescription: " Need lawn cleanup ",
        },
        "bot-value",
      ),
    ).toEqual({
      firstName: "Jane",
      lastName: "Smith",
      emailAddress: "customer@example.com",
      problemDescription: "Need lawn cleanup",
      _hp: "bot-value",
    });
  });
});
