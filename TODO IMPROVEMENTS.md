# TODO IMPROVEMENTS

> Last updated: 2026-08-18

## Pending Changes

### Add real Early Access Steam review quotes to the "Recepção da comunidade" section
- **Category:** Content
- **Source:** [Game8 Early Access review](https://game8.co/reviews/echoes-of-mystralia-review-early-access), [Steam Community discussions](https://steamcommunity.com/app/974480/discussions/), [Steam store page](https://store.steampowered.com/app/974480/Echoes_of_Mystralia/)
- **What:** The `guia.reception1`/`reception2` entries (pt/en) only quote two old demo-era comments. Early Access (since 2026-08-11) has ~410 reviews at 79% positive, with recurring complaints worth surfacing: readability (attack VFX competing visually with currency pickups, weak audio cues), difficulty spikes on regular enemies, and the spell-crafting "link tree" feeling restrictive.
- **Where:** `src/i18n/pt.json` and `src/i18n/en.json` → `guia.reception1`/`reception2` (or add `reception3`/`reception4`), plus `src/components/GuideApp.astro` if new list items are added.
- **Why:** Keeps the reception section current for Early Access instead of demo-only, and gives players realistic expectations.
- **Risk:** This site has a strict, previously-burned-once policy of only quoting attributed reviews with a real username/vote count it can verify (see the fabricated-reaction incident documented in `guia.warning`). I could not pull exact Steam review author handles + vote counts for the specific complaints above from search snippets alone — someone needs to open the Steam review pages, pick real quotes, and copy the author/vote count exactly before this goes in.
- **Effort:** Low

### Generate a real sitemap.xml
- **Category:** Dependency / Feature
- **Source:** N/A (standard Astro tooling)
- **What:** Add `@astrojs/sitemap` integration so `/sitemap.xml` actually exists.
- **Where:** `astro.config.mjs` (add integration), `package.json` (new devDependency).
- **Why:** `public/robots.txt` was added this session pointing crawlers at `/`, but there's no sitemap yet. Adding one is a small SEO win for a niche fan site trying to rank.
- **Risk:** New dependency — low risk, but it's a dependency change so it's queued rather than applied directly per the "never add deps unasked" rule.
- **Effort:** Low

### Self-host the Steam CDN hero/OG images instead of hotlinking
- **Category:** Refactor
- **Source:** `src/components/GuideApp.astro:17,27`, `src/layouts/Base.astro:10`
- **What:** The hero background, hero logo, and `og:image` all hotlink `shared.fastly.steamstatic.com` URLs with a `?t=...` cache-busting token. If Steam rotates/removes that asset or the token expires, the hero image and social-share previews silently break with no fallback.
- **Where:** `src/components/GuideApp.astro` (hero, lines 17 & 27), `src/layouts/Base.astro` (line 10).
- **Why:** Long-term reliability — a fan site shouldn't depend on an undocumented third-party CDN URL staying valid forever.
- **Risk:** Needs downloading the current images and deciding on local paths/licensing note; also more bytes to keep in the repo. Judgment call on whether that tradeoff is worth it.
- **Effort:** Medium

## Notes from this session's research (not action items, just context)
Community complaints as of Early Access launch (2026-08-11), useful if revisiting content: readability of attack telegraphs vs. currency pickups, perceived difficulty spikes, "link tree" spell-crafting feeling limited, and combat described as "muddy" by some reviewers. None of this changes site data (it's about the game's design, not documented mechanics), but it could inform future guide sections like "tips for readability/difficulty" if sourced properly.
