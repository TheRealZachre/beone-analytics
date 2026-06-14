# BeOne Analytics

Standalone social media analytics and reporting dashboard for BeOne.

## Local development

```bash
npm install
cp .dev.vars.example .dev.vars   # add AUTH_SECRET
npm run dev
```

Open http://localhost:3001

## Deploy to Cloudflare

```bash
npm run deploy
```

Worker name: `digitaltest-analytics`

Set `AUTH_SECRET` and `AUTH_URL` in Cloudflare dashboard for the analytics worker.
