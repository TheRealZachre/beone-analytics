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

### Git-connected Workers Builds (recommended)

In Cloudflare dashboard → Workers → **digitaltest-analytics** → Settings → Builds:

| Setting | Value |
|---------|--------|
| **Build command** | `npm run build` |
| **Deploy command** | `npx wrangler deploy` |

Also add **AUTH_SECRET** under Variables and Secrets (runtime secret).

`npm run build` runs the OpenNext Cloudflare build (`.open-next/`). Do **not** use plain `next build` before `wrangler deploy` — deploy will fail with *"Could not find compiled Open Next config"*.

Optional: run build + deploy in one step with build command `npm run ci:cloudflare` and deploy command `echo "deployed in build step"`.

### Manual deploy from your machine

```bash
npm run deploy
```

Worker name: `digitaltest-analytics`

Set `AUTH_SECRET` and `AUTH_URL` in Cloudflare dashboard for the analytics worker.
