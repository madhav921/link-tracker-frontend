import Link from "next/link";
import { getLinks, type LinkItem } from "@/lib/api";

export const dynamic = "force-dynamic";

function prettyDate(iso: string) {
  return new Date(iso).toLocaleString();
}

export default async function DashboardPage() {
  let links: LinkItem[] = [];
  let error = "";

  try {
    links = await getLinks();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load links";
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 sm:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Analytics Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">All Links</h1>
        </div>
        <Link
          href="/"
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Create New Link
        </Link>
      </div>

      {error ? <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

      {!error && links.length === 0 ? (
        <p className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600">No links found yet.</p>
      ) : null}

      {!error && links.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700">Short ID</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Original URL</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Clicks</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Created</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Details</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.shortId} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-mono text-xs text-slate-800">{link.shortId}</td>
                  <td className="max-w-sm truncate px-4 py-3 text-slate-700">{link.originalUrl}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{link.totalClicks}</td>
                  <td className="px-4 py-3 text-slate-600">{prettyDate(link.createdAt)}</td>
                  <td className="px-4 py-3">
                    <Link className="font-semibold text-teal-700 hover:text-teal-900" href={`/dashboard/${link.shortId}`}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </main>
  );
}
