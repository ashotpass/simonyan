# Deployment & DNS — simonyanslawfirm.am

The Railway service `simonyan` builds and runs on every push to `main`. To point the `.am` domain at it:

## 1. Verify Railway deploy

After a push, watch the **Deployments** tab in the Railway dashboard. The first successful deploy produces a public URL like `cpopvhje.up.railway.app`. Open it and confirm:

- `/hy` and `/en` both render
- View source on `/hy` — the HTML contains fully-rendered content (SSR working), `<link rel="alternate" hreflang="…">` tags, and the JSON-LD `<script type="application/ml+json">` block
- `/admin` shows the Filament login (default: `admin@simonyanslawfirm.am` / `TempAdmin2026!` — change immediately after first login)

## 2. Add the custom domain in Railway

Railway dashboard → service `simonyan` → **Settings → Networking → Custom Domains** → add `simonyanslawfirm.am` and `www.simonyanslawfirm.am`.

Railway shows you two DNS records to add at the `.am` registrar:

- A **CNAME** target (usually the same `cpopvhje.up.railway.app` style host)
- A **TXT** record under `_railway-verify.simonyanslawfirm.am` for verification

## 3. Set DNS at the `.am` registrar (ISOC.am or your reseller)

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| CNAME | `@` (or apex) | `cpopvhje.up.railway.app` | 3600 |
| CNAME | `www` | `cpopvhje.up.railway.app` | 3600 |
| TXT | `_railway-verify` | `<value Railway gave you>` | 3600 |

If the registrar refuses a CNAME on the apex (`@`), use **ALIAS** / **ANAME** if available, or fall back to an A record pointing at the IP Railway shows in the custom-domain panel.

## 4. Update `APP_URL`

Once DNS resolves, set the Railway env var `APP_URL=https://simonyanslawfirm.am` and redeploy so canonical URLs, sitemap entries, and hreflang links use the production host.

## 5. Post-launch checklist

- [ ] `https://simonyanslawfirm.am/hy` renders with content
- [ ] `https://simonyanslawfirm.am/en/services` lists 5 services
- [ ] `https://simonyanslawfirm.am/sitemap.xml` returns XML with all locales
- [ ] `/admin` login works
- [ ] Edit a page in the admin → reload the public page → change is visible
- [ ] Submit the contact form → submission shows in the admin inbox
- [ ] reCAPTCHA site/secret set in Settings, mail SMTP configured if required
