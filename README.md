# Simonyan and Sons — Law Firm Website

Bilingual (Armenian + English) Laravel 11 + Inertia.js + React + TypeScript site with a Filament v3 admin panel. Deployed on Railway.

## Stack

- **Backend:** Laravel 11, PHP 8.2+
- **Frontend:** React 18 + TypeScript via Inertia.js (with SSR)
- **Admin:** Filament v3 at `/admin` (Livewire)
- **Database:** MySQL 8 (Railway plugin)
- **Build / runtime:** Single Docker container — FrankenPHP + Node SSR worker + queue worker via supervisord

## Operations

### Deploy

Push to `main`. Railway auto-builds the `Dockerfile` and runs `docker/entrypoint.sh`, which:

1. Waits for the database
2. Runs `php artisan migrate --force`
3. Runs `php artisan db:seed --force --class=ProductionSeeder` (idempotent — uses `firstOrCreate`)
4. Caches config, routes, views, Filament components
5. Links the public storage disk
6. Hands off to `supervisord`, which boots FrankenPHP, the Inertia SSR worker (port 13714), and the queue worker

### Admin access

The first deploy provisions a single admin user via the `reset_admin_user` migration. Default credentials are `admin@simonyanslawfirm.am` / `TempAdmin2026!` — **change the password immediately** after first login (via Navicat or `UPDATE users SET password = '<bcrypt-hash>' WHERE id = 1`). There is no public registration.

### Editing site content

All editable content lives in the database — no redeploys needed. Visit `/admin` and edit:

- **Pages** — Home, About, Director, Contact, Services intro: title, body, meta, OG image
- **Services** — the 5 service detail records
- **Director** — singleton: photo, bio, expertise, contact
- **Settings** — phone, email, address, hours, Facebook URL, Google Maps embed, reCAPTCHA keys
- **Contact submissions** — read-only inbox with a navigation badge for unread

### Required Railway env vars

See `.env.example`. Critical ones:

- `APP_KEY` — generate once with `php artisan key:generate --show` and paste in
- `APP_URL` — production URL (e.g. `https://simonyanslawfirm.am`)
- `DB_CONNECTION=mysql`
- `MYSQLHOST` / `MYSQLPORT` / `MYSQLDATABASE` / `MYSQLUSER` / `MYSQLPASSWORD` — Railway MySQL plugin (note: no underscore after `MYSQL`)
- `SESSION_DRIVER=database` / `CACHE_STORE=database` / `QUEUE_CONNECTION=database`
- `INERTIA_SSR_ENABLED=true` / `INERTIA_SSR_URL=http://127.0.0.1:13714`
- `FILAMENT_FILESYSTEM_DISK=public`

### reCAPTCHA

The contact form supports reCAPTCHA v3. Drop the site key and secret into the **Settings** resource keys `recaptcha_site_key` / `recaptcha_secret_key`. The form short-circuits the check if either is blank.

### Mail

`MAIL_MAILER=log` is the default — submissions still save to the database but no email is sent. To enable SMTP, set the standard Laravel `MAIL_*` env vars on Railway.

## Site structure

| Section | HY URL | EN URL |
| --- | --- | --- |
| Home | `/hy` | `/en` |
| About | `/hy/mer-masin` | `/en/about` |
| Services index | `/hy/tsarayutyunner` | `/en/services` |
| Service detail | `/hy/tsarayutyunner/{slug}` | `/en/services/{slug}` |
| Director | `/hy/tnoren` | `/en/director` |
| Contact | `/hy/kap` | `/en/contact` |
| Sitemap | `/sitemap.xml` | |
| Admin | `/admin` | |

Root `/` 302-redirects to `/hy`.

## Local notes

There is no local dev workflow — everything runs on Railway. To preview a change, push to the branch Railway is watching and check the Deployments tab.

## DNS

See `DEPLOYMENT.md` for the `.am` registrar setup.
