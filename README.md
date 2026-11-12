# CEI Climatización y Electricidad Ibarra — Sitio web

Static one-page site (HTML + CSS + JS, no build step). Ready for GitHub Pages, Netlify, or Cloudflare Pages.

## Files

```
index.html        Page content (Spanish, es-MX)
styles.css        All styles (brand palette in :root at the top)
script.js         Mobile menu, scroll effects, quote form → WhatsApp
robots.txt        Search engine rules
sitemap.xml       Sitemap for Google
.nojekyll         Tells GitHub Pages to serve files as-is
CNAME             Custom domain for GitHub Pages (ceiclima.com)
assets/img/       Logo, favicon, placeholder images (.svg)
```

## Publish free on GitHub Pages

1. Create a new repo on GitHub (e.g. `cei-web`), set it to **Public**.
2. Upload every file and folder in this directory to the repo root (drag-and-drop on "Add file → Upload files" works).
3. Go to **Settings → Pages**. Under "Build and deployment", choose **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. In 1–2 minutes the site is live at `https://YOUR-USERNAME.github.io/cei-web/`.
5. Connect **ceiclima.com** (the `CNAME` file in this folder already tells GitHub the domain):
   - In Settings → Pages → Custom domain, enter `ceiclima.com` and save.
   - At your domain provider, add these DNS records:
     - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     - `CNAME` record for `www` → `YOUR-USERNAME.github.io`
   - Wait for DNS to update (minutes to a few hours), then tick **Enforce HTTPS** in Settings → Pages.
   - Both `ceiclima.com` and `www.ceiclima.com` will work; `www` redirects to `ceiclima.com`.

## Before going live — replace these

| What | Where | Find / replace |
|---|---|---|
| Phone numbers | `index.html` | Set to 33 1893 3647 (main) and 33 2833 4793 from the van. Confirm which one should take calls and WhatsApp |
| WhatsApp number | `script.js` | `WHATSAPP_NUMBER` |
| Brands strip | `index.html` `.brands` | Confirm the brands they actually install |
| Reviews | `index.html` `#resenas` | Real Google reviews are in. When new ones come in, copy a `<article class="review">` block and paste the text as written |
| Social links | `index.html` footer | the `href="#"` Facebook/Instagram links |
| Hours | `index.html` (contact + JSON-LD) | Mon–Sat 8:00–19:00 assumed |

## Images

| File | Photo |
|---|---|
| `equipo-hero.jpg` | Hero: the four-person team in uniform in front of the van |
| `tecnico.jpg` | Nosotros: technician servicing a Mirage minisplit |
| `srv-aire.jpg` | Mirage minisplit installation (real photo) |
| `srv-electrico.jpg` | Conduit and lighting installation (real photo) |
| `srv-comercial.jpg` | Ceiling unit service (commercial card) |
| `srv-mantenimiento.jpg` | Filter cleaning (maintenance card) |
| `instalacion.jpg` | Drilling for a minisplit install (CTA band) |

Compress each photo to under ~250 KB (squoosh.app).

## Connecting the CRM (phase 2)

The form currently opens WhatsApp with the lead's details pre-filled. To send leads to a CRM instead, open `script.js` and replace the block between `INICIO` and `FIN` with the commented `fetch()` example, pointing at your CRM's webhook URL (HubSpot forms, GoHighLevel, Zapier/Make webhook, etc.).

For call tracking, use a tracking number from your CRM/call-tracking tool as the phone number above.
