# Illustration style guide

How to generate new doodle illustrations for this site so they match the existing ones, even in a new ChatGPT conversation or session.

All current illustrations live in `src/lib/assets/illustrations/` (plus `static/og.jpg`). They were made with ChatGPT image generation.

## The golden rule: always attach a reference image

Text alone will not reproduce the same character in a new chat. Always start a new conversation by **uploading 1–2 existing illustrations as references** and saying "same character, same style".

Best references:

- `src/lib/assets/illustrations/dev-on-cloud.webp` — the original, cleanest look at the character
- `src/lib/assets/illustrations/dev-at-desk.webp` — the character in a busier scene

Inside one conversation, later prompts can start with "Same character and exact same doodle sticker style again…" and ChatGPT keeps the character consistent.

## Character sheet

Use this description every time, word for word:

> A chibi young man with big round black glasses, very messy fluffy black hair, a cream/off-white hoodie, black pants and white sneakers. Big head, small body, friendly expressive face with rosy cheeks. Often sits or stands on a fluffy white cloud.

Things to keep stable:

| Trait          | Value                                                                  |
| -------------- | ---------------------------------------------------------------------- |
| Hair           | Black, messy, fluffy, covers forehead                                  |
| Glasses        | Big, round, thin black frames                                          |
| Top            | Cream / off-white hoodie with drawstrings                              |
| Bottom         | Black pants, white sneakers                                            |
| Proportions    | Chibi: head about 40% of total height                                  |
| Recurring prop | Fluffy white cloud under him                                           |
| Laptop         | Grey/lavender laptop with a small white logo (never a real brand logo) |

## Style rules

- Hand-drawn **doodle sticker** look, like a notebook sticker
- **Thick dark navy ink outlines**: `#1f1d47`
- **Flat colors only**: no gradients, no realistic shading, no textures
- Small doodle accents around the character: stars, sparkles, little motion lines, dashed trails, tiny clouds
- **Transparent background**, sticker cut-out (except the share banner, see below)
- **No text, no letters, no logos** in the image (we add text in code)
- Square 1:1 for section art; landscape 3:2 for wide scenes

## Palette

These match the CSS tokens in `src/routes/layout.css`:

| Name            | Hex       | Used for                     |
| --------------- | --------- | ---------------------------- |
| Ink             | `#1f1d47` | Outlines, dark details       |
| Sky blue        | `#a9dcf7` | Sky, clouds shading, accents |
| Sunshine yellow | `#ffcb3d` | Stars, sun, highlights       |
| Pink            | `#ff4f8b` | Hearts, sparkles, accents    |
| Mint            | `#3fd4a2` | Sparkles, plants, accents    |
| Lilac           | `#b9a6ff` | Occasional accent            |
| White           | `#ffffff` | Clouds, paper                |

## Prompt template

Copy this, then replace the `[SCENE]` part:

```text
Generate an image: cute hand-drawn doodle sticker illustration of a chibi young male
developer with big round black glasses, very messy fluffy black hair, a cream hoodie,
black pants and white sneakers. [SCENE]
Style: thick dark navy ink outlines (#1f1d47), flat cheerful colors only: sky blue #a9dcf7,
sunshine yellow #ffcb3d, pink #ff4f8b, mint #3fd4a2, white. Playful notebook doodle look,
small stars and sparkles around, no gradients, no text, no letters, no logos,
transparent background, square 1:1.
```

When continuing in the same conversation (after the first image), use the short version:

```text
Same character and exact same doodle sticker style again (thick navy ink outlines, flat
sky blue / yellow / pink / mint / white palette, transparent background, no text, square).
New scene: [SCENE]
```

## Prompts used for the existing assets

| File                   | Where it's used      | Scene                                                                                                                                                                            |
| ---------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dev-on-cloud.webp`    | Contact card         | Sitting cross-legged on a cloud, typing on a laptop; two small server racks and a database cylinder float nearby on little clouds, connected to the laptop by dashed lines       |
| `dev-paper-plane.webp` | Hero sky             | Flying on a paper airplane, waving hello, leaving a dashed trail with small hearts and stars (landscape 3:2)                                                                     |
| `dev-at-desk.webp`     | Experience heading   | At a tiny desk on a cloud with a big coffee mug and two monitors with code lines; payment cards and coins fly out along dashed arrows into small shield icons                    |
| `dev-graduation.webp`  | Education heading    | Graduation cap, holding up a golden trophy, rolled diploma under his arm, stack of books, confetti and stars, on a small cloud                                                   |
| `dev-building.webp`    | Projects heading     | Building a little city of LEGO-like blocks (each a tiny service box), envelopes traveling between them on dashed conveyor lines, holding a wrench, a small crane lifting a block |
| `dev-chef.webp`        | "Cooking next"       | Chef hat and apron, stirring a big pot on a small stove; curly braces, gears and tiny database cylinders float out like steam; recipe card pinned nearby                         |
| `dev-toolbox.webp`     | Toolbox heading      | Peeking out from behind a big open toolbox full of wrenches, a gear, a database cylinder, a terminal window, a magnifying glass and a small rocket; thumbs up                    |
| `dev-reading.webp`     | "Learning next" card | Sitting on a stack of big books, reading an open book excitedly, lightbulb with sparkles above his head, sticky notes floating around                                            |
| `dev-sleeping.webp`    | Footer               | Asleep with his head on a laptop keyboard, holding an empty coffee mug, "Z Z Z" doodles floating up, crescent moon and stars                                                     |
| `dev-lost.webp`        | 404 page             | Confused, scratching his head, holding a big paper map upside down, on a small cloud, question mark doodle and a broken dashed path behind him                                   |
| `static/og.jpg`        | Link share preview   | See "Share banner" below                                                                                                                                                         |

### Share banner (`static/og.jpg`)

This one is **not transparent**. Prompt:

```text
Same character and exact same doodle style (thick navy ink outlines #1f1d47, flat colors).
Wide landscape 3:2 banner, NOT transparent: solid sky blue background #a9dcf7 with a few
fluffy white doodle clouds, a yellow doodle sun top-right, small stars. The character sits on
a cloud on the RIGHT third of the image, waving hello, laptop on his lap. Keep the LEFT 55% of
the image mostly empty sky for text to be added later. No text, no letters.
```

The text (name, tagline, `jamalkya.lol` pill) is added afterwards with Pillow using the site fonts (Fredoka for the name and tagline, Caveat for "Hi there, I'm"), then saved as a 1200×630 JPG.

## After generating: processing checklist

1. **Check transparency.** The PNG must be RGBA with real transparent pixels (alpha min 0). Preview it on a bright magenta background to spot leftover white halos.
2. **Trim** empty transparent space around the drawing (crop to the content bounding box).
3. **Resize**:
   - Section art: 560–640 px wide
   - Contact / hero art: 720 px wide
4. **Save as WebP**, quality 86, into `src/lib/assets/illustrations/` with a `dev-<scene>.webp` name.
5. **Use it with fixed dimensions** in Svelte (`width` / `height` attributes) and `loading="lazy"` unless it's above the fold.

Pillow one-liner for steps 2–4:

```python
from PIL import Image
im = Image.open('raw.png')
im = im.crop(im.getbbox())
w = 640
im.resize((w, int(w * im.height / im.width)), Image.LANCZOS).save('dev-scene.webp', quality=86)
```

## Quick checklist before accepting an image

- [ ] Same hair, glasses, hoodie and proportions as the reference images
- [ ] Navy outlines, flat colors, palette only
- [ ] No text, letters or real brand logos
- [ ] Transparent background (except the share banner)
- [ ] Reads clearly at small size (about 150–250 px wide on the page)
