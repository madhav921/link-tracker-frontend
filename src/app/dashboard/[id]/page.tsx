import Link from "next/link";
import AnalyticsCharts from "@/components/analytics-charts";
import { getAnalytics, type AnalyticsResponse } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

function prettyDate(iso: string) {
  return new Date(iso).toLocaleString();
}

export default async function LinkAnalyticsPage({ params }: Props) {
  const { id } = await params;

  let data: AnalyticsResponse | null = null;
  let error = "";

  try {
    data = await getAnalytics(id);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load analytics";
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 sm:px-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Link Analytics</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">{id}</h1>
        </div>
        <Link
          href="/dashboard"
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Back to Dashboard
        </Link>
      </div>

      {error ? <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

      {data ? (
        <>
          <section className="mb-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">Total Clicks</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{data.totalClicks}</p>
            </article>
            <article className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">Unique Users</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{data.uniqueUsers}</p>
            </article>
            <article className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">Created</p>
              <p className="mt-2 text-sm font-semibold text-slate-800">{prettyDate(data.createdAt)}</p>
            </article>
          </section>

          <section className="mb-6 rounded-xl border border-black/10 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Original URL</p>
            <a href={data.originalUrl} className="mt-2 block break-all text-sm font-semibold text-sky-700 underline">
              {data.originalUrl}
            </a>
          </section>

          <AnalyticsCharts
            timeSeries={data.timeSeries}
            countries={data.countryBreakdown}
            devices={data.deviceBreakdown}
          />
        </>
      ) : null}
    </main>
  );
}
