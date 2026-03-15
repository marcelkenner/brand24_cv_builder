# Cloudflare Pages Deployment

Deploy the site as a static export on Cloudflare Pages.

This repository no longer depends on a runtime PDF API route for production deployment. Instead:

- `next build` writes a static site to `out/`
- CV download links point at static PDF assets in `public/generated/cv-pdf/`
- `wrangler.jsonc` declares `pages_build_output_dir = "./out"`
- `.node-version` pins the Pages build image to Node `22.16.0`

## Required Local Refresh Step

If CV content, templates, print styling, or download filenames change, regenerate the checked-in PDFs before deploying:

```bash
cd /home/marcel/src/cv-builder
source ~/.nvm/nvm.sh && npm run refresh:static-pdfs
```

That command:

1. builds the static export,
2. serves `out/` locally,
3. renders every supported paper/version/template combination through Playwright,
4. writes the PDFs to `public/generated/cv-pdf/` and `out/generated/cv-pdf/`.

If Playwright is missing Chromium locally, run:

```bash
cd /home/marcel/src/cv-builder
source ~/.nvm/nvm.sh && npx playwright install chromium
```

## Cloudflare Pages Settings

In the Cloudflare Pages dashboard, use:

- Framework preset: `None`
- Build command: `npm run build`
- Build output directory: `out`

Cloudflare Pages automatically installs dependencies before the build command. The checked-in static PDFs are copied from `public/` into `out/` during the build.

## Optional Wrangler Commands

Local static preview:

```bash
cd /home/marcel/src/cv-builder
source ~/.nvm/nvm.sh && npm run cf:dev
```

Direct deploy with Wrangler:

```bash
cd /home/marcel/src/cv-builder
source ~/.nvm/nvm.sh && npm run cf:deploy
```

## Validation

Before deploying, run:

```bash
cd /home/marcel/src/cv-builder
source ~/.nvm/nvm.sh && npm run lint
source ~/.nvm/nvm.sh && npm run test:unit
source ~/.nvm/nvm.sh && npm run test:e2e
source ~/.nvm/nvm.sh && npm run build
```

Successful validation means:

- `out/` is generated without SSR or route-handler errors
- `/cv/a4/` and `/cv/letter/` are part of the export
- the static PDF files under `/generated/cv-pdf/` return real `%PDF` content during end-to-end tests
