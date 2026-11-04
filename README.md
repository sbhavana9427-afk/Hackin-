# NammaScholar 🎓
Tamil-first AI scholarship discovery assistant. Next.js (App Router) · TypeScript · Tailwind · Zod · Neo4j · Sarvam AI.

## Features
Dashboard with live match counts · Profile · Scholarship directory with search and status filter · Detail page with "Why?" reasons and official source · Saved scholarships · AI assistant (Tamil/English) · Resources · Password-protected `/admin` · Tamil/English toggle.

## Run
```bash
npm install
cp .env.example .env.local   # fill in values (all optional for a demo run)
npm run dev                  # http://localhost:3000
npm test                     # eligibility engine tests
npm run build && npm start   # production
```

## How it works
- **Eligibility** is deterministic (`src/lib/eligibility.ts`): Likely Match / Need More Information / Not Eligible, each with reasons. AI never decides eligibility.
- **Sarvam AI** is called only from `src/app/api/assistant/route.ts` (server side). The prompt restricts it to stored records, requires the source URL and verification date, and forbids inventing deadlines, awards, eligibility or status. Check the model name and endpoint against Sarvam's current docs.
- **Data**: with no Neo4j settings the app uses clearly labelled **demo records** (`src/lib/data.ts`). They are not real scholarships. To use Neo4j, store each record as `(:Scholarship {id, json})` where `json` is a JSON string matching the `Scholarship` type, and only set `verifiedOn` after checking the official source.
- **Admin**: `/admin` uses HTTP Basic auth with `ADMIN_PASSWORD` (any username).

## Deploy (Vercel)
```bash
npm i -g vercel && vercel --prod
```
Add `NEO4J_URI`, `NEO4J_USER`, `NEO4J_PASSWORD`, `SARVAM_API_KEY`, `ADMIN_PASSWORD` in the project's environment variables.
