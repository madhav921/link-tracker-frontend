function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (apiUrl) {
    return apiUrl;
  }

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }

  throw new Error("NEXT_PUBLIC_API_URL is not configured for production");
}

const API_URL = getApiUrl();

export type LinkItem = {
  shortId: string;
  shortUrl: string;
  originalUrl: string;
  title: string | null;
  createdAt: string;
  totalClicks: number;
};

export type AnalyticsResponse = {
  shortId: string;
  originalUrl: string;
  title: string | null;
  createdAt: string;
  totalClicks: number;
  uniqueUsers: number;
  timeSeries: Array<{ date: string; count: number }>;
  countryBreakdown: Array<{ country: string; count: number }>;
  deviceBreakdown: Array<{ deviceType: string; count: number }>;
};

async function parseResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type") ?? "";

  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      if (contentType.includes("application/json")) {
        const err = await res.json();
        if (err?.error) msg = err.error;
      } else {
        const text = await res.text();
        if (text) {
          msg = `Expected JSON from API but received ${contentType || "non-JSON response"}`;
        }
      }
    } catch {
      // ignore parse errors
    }
    throw new Error(msg);
  }

  if (!contentType.includes("application/json")) {
    throw new Error(`Expected JSON from API but received ${contentType || "non-JSON response"}`);
  }

  return res.json() as Promise<T>;
}

export async function createLink(payload: { originalUrl: string; title?: string }) {
  const res = await fetch(`${API_URL}/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseResponse<{ shortId: string; shortUrl: string; originalUrl: string; createdAt: string }>(res);
}

export async function getLinks(): Promise<LinkItem[]> {
  const res = await fetch(`${API_URL}/links`, { cache: "no-store" });
  return parseResponse<LinkItem[]>(res);
}

export async function getAnalytics(id: string): Promise<AnalyticsResponse> {
  const res = await fetch(`${API_URL}/analytics/${id}`, { cache: "no-store" });
  return parseResponse<AnalyticsResponse>(res);
}
