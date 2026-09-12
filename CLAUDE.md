# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

The static marketing site for luupnow.ca — a car-sharing club. There is no build system, no package manager, and no test suite: this is the literal folder you upload to the GoDaddy web root (public_html/httpdocs), unchanged, structure and all. There is no dev server config either; preview by opening the HTML files directly or serving the folder with any static file server.

## Site map

- `index.html` + `styles.css` — the luupnow.ca homepage. Plain hand-written HTML/CSS, no templating system.
- `renters/`, `autoshop/`, `connect/`, `technology/`, `influencer/` — paid-traffic landing pages, each a self-contained `index.html` plus an `images/` folder for that page's hero/OG images.
- `thank-you/index.html` — shared post-submit page for the five landing pages above.
- `analytics.js` — single shared tracking loader, included by every page.
- `support.js` — generated runtime (see below). **Never hand-edit** — it's built from `dc-runtime/src/*.ts` (not present in this repo) via `bun run build`; treat it as vendored.
- `.htaccess` — Apache config: legacy URL redirects (`/auto-shop` → `/autoshop`, `/fintech` → `/connect`), directory index, static asset cache headers.
- `9fet6vb4tbm9g9sc4lm9bou29tb133.html` — Facebook domain-verification file; must stay at the web root.
- `README-UPLOAD.txt` — the changelog/deployment notes handed to whoever uploads the site. **Update this file's "WHAT CHANGED" section whenever you change tracking, forms, or page behavior** — it's the operator's only record of what shipped.

## Landing page architecture (renters/autoshop/connect/technology/influencer)

These five pages are exported from Claude's Design Canvas tool, not written as plain HTML. Each `index.html`:

1. Loads `../support.js` (the dc-runtime) in `<head>`, then wraps the whole page in `<x-dc>`.
2. Puts document metadata in a `<helmet>` block inside `<x-dc>` (title, meta description, canonical, OG/Twitter tags, `facebook-domain-verification`, `robots noindex,nofollow`) instead of a normal `<head>`.
3. Keeps static markup/CSS in the body as ordinary HTML.
4. Ends with a `<script type="text/x-dc" data-dc-script data-props="...">` block. The `data-props` JSON on that tag declares the fields exposed to Design Canvas's visual editor (enums/booleans like `ctaShape`, `heroFocal`, `stickyHeader`) — it's editor metadata, not something the page logic reads at runtime.
5. Inside that script tag, page copy and settings live in one `PAGE_CONFIG` object near the top (headline text, hero image path, nav items, `formEndpoint`, `campaign`/`wave`/`pageName` tracking labels, `appDownloadUrl`, video sources, etc.). **Edit copy and settings here first** — it's the equivalent of a CMS content block for this page. Component/render logic follows below `PAGE_CONFIG` and is denser, React-like class-component code (`this.state`, `this.setState`).

Because each landing page is a standalone file with no shared partials, elements that should be identical across pages (footer/social links, nav structure, the Facebook verification meta, the email+phone form row layout) are **duplicated in every file** — when asked to change one of these site-wide, grep for it and update each landing page individually (plus `index.html`/`thank-you/index.html` if applicable). The homepage (`index.html`) is NOT built this way — it's plain HTML you edit directly, no `PAGE_CONFIG`/dc-runtime involved.

## Tracking (`analytics.js`)

One file controls every analytics/ads pixel for the whole site. Edit only the `window.LUUP_IDS` block at the top:

```js
window.LUUP_IDS = {
  ga4: 'G-...', googleAds: '', googleAdsLead: '', metaPixel: '...',
  mixpanel: '', linkedIn: '', tiktok: '', clarity: ''
};
```

An empty string means that integration is skipped entirely — no code needs commenting out.

- Everything is gated behind a `luupnow.ca` hostname check (`window.__LUUP_LIVE_DOMAIN__`); on any other host (local files, previews, staging) nothing fires and events log to the console instead.
- First-touch attribution (UTM params + `gclid`/`fbclid`/`msclkid`/`ttclid`/`li_fat_id`/etc.) is captured once per session into `sessionStorage`, then attached to every GA4 event, every Mixpanel event, and every Formspree submission — so credit survives the visitor navigating across multiple landing pages.
- `window.luupTrack(name, props)` is the single entry point pages call to fire an event; it fans out to GA4/Meta/Mixpanel/TikTok and — for events in `LEAD_EVENTS` (`invite_form_success`, `form_submit_success`, `lead`) — also fires the Meta `Lead` event and the Google Ads conversion exactly once. Landing pages call this through a local `trackEvent()` wrapper (see `renters/index.html`) that falls back gracefully if `analytics.js` hasn't loaded yet.
- `window.luupIdentify(email, traits)` identifies the visitor to Mixpanel/GA4 user properties; called automatically by `luupTrack` whenever a payload includes an `email`.

## Forms

All five landing pages POST to the same Formspree endpoint (`https://formspree.io/f/xdenypay`, set per-page as `PAGE_CONFIG.formEndpoint`), each tagging its submission with a distinct `campaign`/`form_name`/`source_page`. On success, four of the five redirect to `/thank-you/?from=<page>` (renters/autoshop/connect/technology); `influencer` is the exception and shows an inline confirmation instead of redirecting. See `README-UPLOAD.txt` section 4 for the exact field list and per-page campaign values — keep that doc in sync if you change form behavior.
