# SEO & redirects (Moroccan Cosmetics)

## Hosting

| Signal | Value |
|--------|--------|
| **Live site** | **Vercel** (`Server: Vercel`, region `cdg1` — EU) |
| **Repo build** | `npm run build` → static `out/` |
| **cPanel / Apache** | `public/.htaccess` copied into `out/` (for zip upload to `public_html`) |
| **Vercel** | `vercel.json` redirects (www → apex, `/` → `/en/`) |

### Vercel domain settings (required)

In **Project → Settings → Domains**:

1. Set **`moroccan-cosmetics.com`** as the **primary** domain (not `www`).
2. Add **`www.moroccan-cosmetics.com`** and enable redirect to apex (or rely on `vercel.json`).

If apex redirects to www (308 to `www.…`), Seobility and Google see the wrong host — fix primary domain first.

## After each deploy

Upload **`out/`** to cPanel **or** let Vercel build from Git. Build runs `patch-export-seo.mjs` automatically.

## Verify (bash / Git Bash on Windows)

```bash
curl -I https://www.moroccan-cosmetics.com/
# Expect: 301/308 → https://moroccan-cosmetics.com/…

curl -I http://moroccan-cosmetics.com/
# Expect: 301/308 → https://…

curl -I https://moroccan-cosmetics.com/
# Expect: 301/308 → https://moroccan-cosmetics.com/en/

curl -I https://moroccan-cosmetics.com/en/
# Expect: 200

curl -s https://moroccan-cosmetics.com/en/ | grep -iE '<html|<title|canonical|<h1'
```

PowerShell: use `curl.exe -sI …` instead of `curl -sI`.
