# JamalKya Nanami (菜々美), portfolio

My personal portfolio, live at **[jamalkya.lol](https://jamalkya.lol)**.

It's drawn like a doodle notebook: a sky-blue hero, sticker cards with hard ink shadows, hand-drawn SVG doodles, and a chibi version of me in every section.

## Stack

- [SvelteKit](https://svelte.dev/docs/kit) with Svelte 5 (runes)
- [Tailwind CSS 4](https://tailwindcss.com)
- [simple-icons](https://simpleicons.org) for tech and contact logos
- Fonts from Google Fonts: Fredoka (headings), Nunito (body), Caveat (handwriting), Zen Maru Gothic (kanji)
- Deployed on [Vercel](https://vercel.com); also runs as a plain Node server

## Run it locally

```sh
npm install
npm run dev
```

Then open http://localhost:5173.

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the dev server                          |
| `npm run build`   | Build for production                          |
| `npm run preview` | Preview the production build                  |
| `npm run check`   | Type-check Svelte and TypeScript              |
| `npm run lint`    | Check formatting (Prettier) and lint (ESLint) |
| `npm run format`  | Fix formatting                                |

## Deploy

Pushing to `main` deploys to production on Vercel.

`vite.config.ts` picks the adapter automatically: `adapter-vercel` when the `VERCEL` env var is set (on Vercel's build machines), and `adapter-node` everywhere else, so `npm run build && npm start` runs a standalone Node server (for example on Railway).

## Where things live

| Path                            | What's there                                                                 |
| ------------------------------- | ---------------------------------------------------------------------------- |
| `src/routes/+page.svelte`       | The whole home page, including the experience, project and skill data        |
| `src/routes/+error.svelte`      | The 404 / error page                                                         |
| `src/routes/layout.css`         | Color tokens (light and dark), fonts, sticker and tooltip styles             |
| `src/lib/components/`           | Nav, doodles, lightbox, project modal, tech icons, scroll rail, theme toggle |
| `src/lib/assets/illustrations/` | The chibi illustrations                                                      |
| `src/lib/assets/experice/`      | Company logos and photos (full size plus `-thumb.webp` versions)             |
| `static/og.jpg`                 | The image shown when the link is shared                                      |

## Making new illustrations

The illustrations are generated with ChatGPT. To keep the character and style consistent across sessions, follow **[docs/illustration-style.md](docs/illustration-style.md)**. It has the character sheet, palette, prompt templates, the prompt used for every existing asset, and the steps to process a new image.

The short version: start a new chat by uploading `dev-on-cloud.webp` as a reference, then use the prompt template from that doc.
