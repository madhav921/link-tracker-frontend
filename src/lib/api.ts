const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

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
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const err = await res.json();
      if (err?.error) msg = err.error;
    } catch {
      // ignore parse errors
    }
    throw new Error(msg);
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
