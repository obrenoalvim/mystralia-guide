# Echoes of Mystralia Guide

An unofficial community guide for *Echoes of Mystralia* (Borealys Games), with an interactive build combinator and data pulled straight from the game files.

[Versão em português](README.md)

## What's here

- **Spell Combinator**: build a run with up to 2 base spells, check off the Memories you own, and see the best combination per category (Damage, Area, Control, Mobility, Sustain) within your Focus budget.
- **171 unique Memories** confirmed in the game files, on top of the 55 documented by the community wiki with real numbers.
- **21 base spell variants** (4 weapon families across several elements, plus a unique Stone Wall), including the 4 known official spells.
- Real icons pulled from the game for nearly every Memory and spell.
- Site available in Portuguese and English.

## Where the data comes from

The site combines two sources:

1. The [fandom.com](https://echoesofmystralia.fandom.com/) community wiki documented 55 Memories and 4 base spells with real numbers, apparently from the game's demo build.
2. A direct extraction from the installed game files (Unity, IL2CPP, via [UnityPy](https://github.com/K0lb3/UnityPy)) confirmed 171 additional Memories, the game's seventh element, 21 real base spell variants, and the original icons.

Entries pulled from the game files have no exact numeric value available and no official localization: the name comes from the game's internal identifier (translated programmatically), and the description only lists which attributes the Memory affects. This is marked on every card on the site.

The full research history, including sources rejected for looking artificially generated, lives in [`SOURCES.md`](SOURCES.md).

## Stack

- [Astro](https://astro.build/) (static site)
- Plain client-side JavaScript for the combinator and filters, no UI framework
- Astro's built-in i18n (`pt` as default, `en` under `/en/`)
- Deployed on [Vercel](https://vercel.com/)

## Running locally

```bash
npm install
npm run dev      # dev server
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Disclaimer

*Echoes of Mystralia* is a trademark of Borealys Games. This site is not affiliated with, endorsed by, or sponsored by the studio. All content pulled from the game files is used for informational purposes, for a community of players.

## License

Code under [MIT](LICENSE). Game data belongs to Borealys Games.
