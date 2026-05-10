"use client"; // Client component required to fetch public CRM content and update document metadata.

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  DEFAULT_WEBSITE_CONTENT,
  mergeWebsiteContent,
  type WebsiteContentSnapshot,
} from "./website-content";

interface WebsiteContentContextValue {
  content: WebsiteContentSnapshot;
  isLoaded: boolean;
  source: "fallback" | "crm";
}

const WebsiteContentContext = createContext<WebsiteContentContextValue>({
  content: DEFAULT_WEBSITE_CONTENT,
  isLoaded: false,
  source: "fallback",
});

function upsertMetaDescription(content: string): void {
  let descriptionTag = document.querySelector<HTMLMetaElement>(
    'meta[name="description"]',
  );

  if (!descriptionTag) {
    descriptionTag = document.createElement("meta");
    descriptionTag.name = "description";
    document.head.appendChild(descriptionTag);
  }

  descriptionTag.content = content;
}

export function WebsiteContentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [content, setContent] =
    useState<WebsiteContentSnapshot>(DEFAULT_WEBSITE_CONTENT);
  const [source, setSource] = useState<"fallback" | "crm">("fallback");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const crmApiUrl = import.meta.env.VITE_CRM_API_URL?.trim();

    const loadContent = async () => {
      if (!crmApiUrl) {
        setIsLoaded(true);
        return;
      }

      try {
        const response = await fetch(`${crmApiUrl}/api/v1/website-content`, {
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Unexpected status ${response.status}`);
        }

        const body: unknown = await response.json();
        const payload =
          body !== null &&
          typeof body === "object" &&
          "data" in body &&
          (body as { data?: unknown }).data !== undefined
            ? (body as { data: unknown }).data
            : null;

        if (payload) {
          setContent(mergeWebsiteContent(payload));
          setSource("crm");
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      } finally {
        setIsLoaded(true);
      }
    };

    void loadContent();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    document.title = content.settings.homepageSeoTitle;
    upsertMetaDescription(content.settings.homepageSeoDescription);
  }, [content.settings.homepageSeoDescription, content.settings.homepageSeoTitle]);

  const value = useMemo(
    () => ({
      content,
      isLoaded,
      source,
    }),
    [content, isLoaded, source],
  );

  return (
    <WebsiteContentContext.Provider value={value}>
      {children}
    </WebsiteContentContext.Provider>
  );
}

export function useWebsiteContent(): WebsiteContentContextValue {
  return useContext(WebsiteContentContext);
}
