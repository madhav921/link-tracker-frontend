# Link Tracker — Frontend Dashboard

Next.js 15 dashboard for the [link-tracker-backend](https://github.com/madhav921/link-tracker-backend). Create short links and visualise click analytics in real time.

## Pages

| Route | Description |
|---|---|
| `/` | Create a new short link |
| `/dashboard` | All links with total click counts |
| `/dashboard/:id` | Per-link analytics — time series, countries, devices |

## Stack

- Next.js 15 (App Router, React 18)
- Tailwind CSS v4
- Recharts — time series line chart + bar charts
- SWR — client-side data fetching
- TypeScript

## Local Development

```bash
# 1. Clone
git clone https://github.com/madhav921/link-tracker-frontend.git
cd link-tracker-frontend

# 2. Install
npm install --legacy-peer-deps

# 3. Configure environment
cp .env.local.example .env.local
# Edit NEXT_PUBLIC_API_URL to point at your backend

# 4. Run
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend base URL | `https://your-backend.railway.app` |

## Deploy to Vercel

1. Import this repo in [Vercel](https://vercel.com/new)
2. Set `NEXT_PUBLIC_API_URL` to your Railway backend URL
3. Deploy — no further config needed

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Create link form
│   ├── dashboard/
│   │   ├── page.tsx             # All links table
│   │   └── [id]/page.tsx        # Per-link analytics
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── analytics-charts.tsx     # Recharts line + bar charts
└── lib/
    └── api.ts                   # Typed backend API client
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
