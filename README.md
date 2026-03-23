# How to Be a Pawrent

A mobile-first care guide and daily schedule site for Sunny and Luna. Built for owners, dog sitters, and anyone who has ever opened their phone at 7am and needed to immediately know what to do next.

**Live site:** *(add URL here after enabling GitHub Pages in repo settings)*

---

## Folder Structure

```
docs/index.html   — the main site file (single page app, all 5 pages)
docs/data.js      — ALL schedule and care content lives here.
                    Only file you need to edit for times, instructions,
                    commands, or care notes. Never touch index.html
                    unless you are changing the layout.
docs/style.css    — all visual styles
docs/app.js       — all interactivity (do not edit unless changing behavior)

/images           — drop photos here following the naming convention below
                    sunny-1.jpg, sunny-2.jpg / luna-1.jpg, luna-2.jpg etc.
```

GitHub Pages serves from the `/docs` folder on the main branch.

---

## How to Update the Schedule

1. Open `docs/data.js`
2. Find the section labeled with the dog's name and time (search for the activity name)
3. Change the text inside the quotes
4. Save the file and push to GitHub — the site updates automatically

---

## How to Add Photos

1. Rename your photo: `sunny-1.jpg` or `luna-1.jpg` (increment the number for each new one: sunny-2.jpg, sunny-3.jpg...)
2. Drop it into the `/images` folder
3. Push to GitHub — the photo appears automatically on the carousel, the gallery page, and as the Today page background

Supported formats: .jpg, .jpeg, .png, .webp

---

## How to Switch Default Mode (WFH vs Office)

Open `docs/data.js` and find the very first line:

```js
const DEFAULT_MODE = 'wfh'; // 'wfh' or 'office'
```

Change `'wfh'` to `'office'` to make Office mode the default when the site loads.

---

## Filling In Placeholders

Search `docs/data.js` for `[PLACEHOLDER]` — every item that needs to be filled in is clearly marked. These include:
- Emergency vet phone number
- 24hr emergency vet name, address, and phone
- Owner cell numbers
- Pet insurance provider and policy numbers
- Sunny's separation anxiety details
- Luna's vet/vaccine status and overnight sleep location
- Whether Sunny and Luna have met

---

## GitHub Pages Setup

1. Go to repo Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` / Folder: `/docs`
4. Save — site goes live at `https://[username].github.io/[repo-name]`

---

## Tech Notes

- Plain HTML/CSS/JS — no frameworks, no build steps, nothing to install
- No dependencies, no package.json
- Photo system works by naming convention — zero code changes needed to add photos
