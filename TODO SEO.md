# TODO SEO

> Last updated: 2026-08-18

## Pending Changes

None currently — both items below were completed this session.

## Done (kept for history)

### VideoGame structured data for the game itself — DONE
Added a `VideoGame` JSON-LD block (`@id` referenced from the `WebSite` block's `about` property) to `src/layouts/Base.astro`. Scoped to factual, verifiable fields only (name, publisher "Borealys Games", genre, platform, `sameAs` to the official Steam/dev site) — no claim of affiliation or authorship, consistent with the site's own disclaimer.

### Bing Webmaster Tools — DONE
Verified `https://mystralia-guide.vercel.app/` via the "Import from Google Search Console" flow (view-only OAuth scope, no new site verification needed). Only the mystralia-guide property was imported — the account has several other unrelated sites in GSC and those were explicitly left unchecked. Sitemap (`sitemap-index.xml`) imported automatically, status "Success". Also manually submitted both `/` and `/en/` via URL Submission (98/100 daily quota left).

## Notes from this session's research
llms.txt is a community convention (not backed by W3C/IETF, and as of this research no major AI lab has publicly confirmed reading it in production) — added anyway since it's zero-risk and free. The real lever for GEO right now is still: clean semantic HTML, accurate structured data with strict content-parity (schema must describe only what's visibly on the page — this is also why no `FAQPage` schema was added, since the Guide tab's content isn't literally phrased as Q&A), and being genuinely crawlable/indexed (sitemap + Search Console + Bing Webmaster Tools, done this session).
