# Moroccan Cosmetics

B2B website for Moroccan Cosmetics — wholesale argan oil, hammam products, and private label manufacturing. Built with **Next.js 16** (App Router), **next-intl** (EN / FR / AR), and **static export** for cPanel hosting.

## Requirements

- Node.js 20+
- npm

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000/en/](http://localhost:3000/en/) (default locale paths: `/en`, `/fr`, `/ar`).

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Static export to `out/` (blog check + RSS) |
| `npm run build:cpanel` | Build + cPanel packaging helper |
| `npm run lint` | ESLint |

## Deployment

Static files are generated in `out/`. See [deployment_guide.md](./deployment_guide.md) for cPanel upload and `.htaccess` redirects.

## Structure

- `app/[locale]/` — localized pages
- `messages/` — UI translations (en, fr, ar)
- `content/blog/` — blog posts (Markdown)
- `public/images/` — WebP assets
- `scripts/` — build and asset utilities

## License

Private — Moroccan Cosmetics.
