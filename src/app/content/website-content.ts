import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
} from "../config/contact";

export interface WebsiteContentSettings {
  availabilityText: string;
  callCtaLabel: string;
  emergencyMessage: string;
  heroHeadline: string;
  heroSubheadline: string;
  homepageSeoDescription: string;
  homepageSeoTitle: string;
  phoneDisplay: string;
  phoneE164: string;
  portalCtaLabel: string;
  portalStatusMessage: string;
  requestServiceCtaLabel: string;
  serviceAreaSummary: string;
  textCtaLabel: string;
}

export interface WebsiteContentPromotion {
  buttonLink: string | null;
  buttonText: string | null;
  description: string | null;
  displayOrder: number;
  endDate: string | null;
  id: string;
  startDate: string | null;
  title: string;
}

export interface WebsiteContentServiceHighlight {
  description: string | null;
  displayOrder: number;
  featured: boolean;
  id: string;
  slug: string;
  title: string;
}

export interface WebsiteContentSnapshot {
  promotions: WebsiteContentPromotion[];
  serviceHighlights: WebsiteContentServiceHighlight[];
  settings: WebsiteContentSettings;
}

interface RawWebsiteContentSnapshot {
  promotions?: unknown;
  serviceHighlights?: unknown;
  settings?: unknown;
}

const DEFAULT_SEO_TITLE =
  "Premier Property Maintenance | Repair, Plumbing, HVAC, Painting";
const DEFAULT_SEO_DESCRIPTION =
  "Premier Property Maintenance handles repairs, plumbing, HVAC, painting, carpentry, and emergency service for residential and commercial properties.";

export const DEFAULT_WEBSITE_CONTENT: WebsiteContentSnapshot = {
  promotions: [],
  serviceHighlights: [
    {
      description: "Quick fixes for any property issue",
      displayOrder: 0,
      featured: true,
      id: "fallback-general-repairs",
      slug: "general-repairs",
      title: "General Repairs",
    },
    {
      description: "Interior & exterior painting",
      displayOrder: 1,
      featured: true,
      id: "fallback-painting",
      slug: "painting",
      title: "Painting",
    },
    {
      description: "Professional plumbing services",
      displayOrder: 2,
      featured: true,
      id: "fallback-plumbing",
      slug: "plumbing",
      title: "Plumbing",
    },
    {
      description: "Heating & cooling maintenance",
      displayOrder: 3,
      featured: true,
      id: "fallback-hvac",
      slug: "hvac",
      title: "HVAC",
    },
    {
      description: "Custom woodwork & repairs",
      displayOrder: 4,
      featured: true,
      id: "fallback-carpentry",
      slug: "carpentry",
      title: "Carpentry",
    },
    {
      description: "24/7 emergency response",
      displayOrder: 5,
      featured: true,
      id: "fallback-emergency",
      slug: "emergency",
      title: "Emergency",
    },
  ],
  settings: {
    availabilityText: "Available 24/7",
    callCtaLabel: "Call Now",
    emergencyMessage:
      "Professional maintenance you can trust. Available 24/7 for emergencies.",
    heroHeadline: "ONE CALL. EVERY REPAIR. EVERY PROPERTY.",
    heroSubheadline:
      "Professional property maintenance and repair services for residential and commercial properties.",
    homepageSeoDescription: DEFAULT_SEO_DESCRIPTION,
    homepageSeoTitle: DEFAULT_SEO_TITLE,
    phoneDisplay: CONTACT_PHONE_DISPLAY,
    phoneE164: CONTACT_PHONE_E164,
    portalCtaLabel: "Request Your First Service",
    portalStatusMessage:
      "Manage your properties, services, and billing all in one place",
    requestServiceCtaLabel: "Request Service",
    serviceAreaSummary:
      "Professional property maintenance and repair services for residential and commercial properties.",
    textCtaLabel: "Text Us",
  },
};

function readString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function readNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function readBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function readObject(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

function normalizeSettings(
  value: unknown,
  fallback: WebsiteContentSettings,
): WebsiteContentSettings {
  const settings = readObject(value);

  if (!settings) {
    return fallback;
  }

  return {
    availabilityText:
      readString(settings.availabilityText) ?? fallback.availabilityText,
    callCtaLabel: readString(settings.callCtaLabel) ?? fallback.callCtaLabel,
    emergencyMessage:
      readString(settings.emergencyMessage) ?? fallback.emergencyMessage,
    heroHeadline: readString(settings.heroHeadline) ?? fallback.heroHeadline,
    heroSubheadline:
      readString(settings.heroSubheadline) ?? fallback.heroSubheadline,
    homepageSeoDescription:
      readString(settings.homepageSeoDescription) ??
      fallback.homepageSeoDescription,
    homepageSeoTitle:
      readString(settings.homepageSeoTitle) ?? fallback.homepageSeoTitle,
    phoneDisplay: readString(settings.phoneDisplay) ?? fallback.phoneDisplay,
    phoneE164: readString(settings.phoneE164) ?? fallback.phoneE164,
    portalCtaLabel:
      readString(settings.portalCtaLabel) ?? fallback.portalCtaLabel,
    portalStatusMessage:
      readString(settings.portalStatusMessage) ?? fallback.portalStatusMessage,
    requestServiceCtaLabel:
      readString(settings.requestServiceCtaLabel) ??
      fallback.requestServiceCtaLabel,
    serviceAreaSummary:
      readString(settings.serviceAreaSummary) ?? fallback.serviceAreaSummary,
    textCtaLabel: readString(settings.textCtaLabel) ?? fallback.textCtaLabel,
  };
}

function normalizePromotions(value: unknown): WebsiteContentPromotion[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item, index) => {
      const promotion = readObject(item);

      if (!promotion) {
        return null;
      }

      const title = readString(promotion.title);
      if (!title) {
        return null;
      }

      return {
        buttonLink: readString(promotion.buttonLink),
        buttonText: readString(promotion.buttonText),
        description: readString(promotion.description),
        displayOrder: readNumber(promotion.displayOrder, index),
        endDate: readString(promotion.endDate),
        id: readString(promotion.id) ?? `promotion-${index}`,
        startDate: readString(promotion.startDate),
        title,
      };
    })
    .filter((promotion): promotion is WebsiteContentPromotion => promotion !== null)
    .sort((left, right) => left.displayOrder - right.displayOrder);
}

function normalizeServiceHighlights(
  value: unknown,
): WebsiteContentServiceHighlight[] {
  if (!Array.isArray(value)) {
    return DEFAULT_WEBSITE_CONTENT.serviceHighlights;
  }

  const highlights = value
    .map((item, index) => {
      const highlight = readObject(item);

      if (!highlight) {
        return null;
      }

      const title = readString(highlight.title);
      const slug = readString(highlight.slug);

      if (!title || !slug) {
        return null;
      }

      const fallbackHighlight =
        DEFAULT_WEBSITE_CONTENT.serviceHighlights.find(
          (item) => item.slug === slug,
        ) ?? DEFAULT_WEBSITE_CONTENT.serviceHighlights[index];

      return {
        description:
          readString(highlight.description) ?? fallbackHighlight?.description ?? null,
        displayOrder: readNumber(highlight.displayOrder, index),
        featured: readBoolean(highlight.featured, false),
        id: readString(highlight.id) ?? `highlight-${index}`,
        slug,
        title,
      };
    })
    .filter(
      (highlight): highlight is WebsiteContentServiceHighlight =>
        highlight !== null,
    )
    .sort((left, right) => {
      if (left.featured !== right.featured) {
        return left.featured ? -1 : 1;
      }

      return left.displayOrder - right.displayOrder;
    });

  return highlights.length > 0
    ? highlights
    : DEFAULT_WEBSITE_CONTENT.serviceHighlights;
}

export function mergeWebsiteContent(
  value: unknown,
): WebsiteContentSnapshot {
  const snapshot = readObject(value) as RawWebsiteContentSnapshot | null;

  if (!snapshot) {
    return DEFAULT_WEBSITE_CONTENT;
  }

  return {
    promotions: normalizePromotions(snapshot.promotions),
    serviceHighlights: normalizeServiceHighlights(snapshot.serviceHighlights),
    settings: normalizeSettings(snapshot.settings, DEFAULT_WEBSITE_CONTENT.settings),
  };
}
