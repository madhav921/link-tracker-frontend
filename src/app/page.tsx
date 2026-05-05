"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type CreatedLink = {
  shortId: string;
  shortUrl: string;
  originalUrl: string;
  createdAt: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState<CreatedLink | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setCreated(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl, title: title || undefined }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to create short link");
      }

      setCreated(data as CreatedLink);
      setOriginalUrl("");
      setTitle("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-14 sm:px-8">
      <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Link Tracker</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Create a short link</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Generate shareable links with click analytics across countries, devices, and time.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-800">Destination URL</span>
            <input
              required
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/sale"
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-600"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-800">Title (optional)</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Campaign spring launch"
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-600"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating..." : "Create Link"}
            </button>
            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Open Dashboard
            </Link>
          </div>
        </form>

        {error ? <p className="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

        {created ? (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-medium text-emerald-900">Short link created</p>
            <a
              href={created.shortUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block text-base font-semibold text-emerald-800 underline underline-offset-4"
            >
              {created.shortUrl}
            </a>
            <p className="mt-1 break-all text-xs text-emerald-700">{created.originalUrl}</p>
          </div>
        ) : null}
      </section>
    </main>
  );
}
