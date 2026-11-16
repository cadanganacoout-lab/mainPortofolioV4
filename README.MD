# Gilang Faid Portfolio

A responsive, single-page personal portfolio built with React, Vite, and Tailwind CSS. Its visual direction and content are inspired by [Gilang Faid's portfolio](https://gilangfaid.vercel.app/).

## Features

- Responsive layout with Home, About, Projects, Journey, Certificates, and Contact sections
- Sticky navigation and dark/light theme toggle
- Subtle entrance animations with Framer Motion
- Scroll reveals and motion preferences that respect `prefers-reduced-motion`
- Compact music player in the navbar with play/pause, mute, and volume controls
- Local MP3 playback from `public/music/8 Letters - Why Don't We [Official Music Video].mp3`
- Locally stored certificate artwork in `public/images/certificates`
- Contact form delivered by the Vercel serverless API and Resend

## Tech stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Requirements

- Node.js and npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually <http://localhost:5173/>).

## Production build

```bash
npm run build
npm run preview
```

## Contact form setup

The contact form uses `api/contact.js` and Resend. Add these environment variables to the Vercel project for each environment you use:

- `RESEND_API_KEY`: Resend API key
- `CONTACT_FROM_EMAIL`: sender address verified with Resend, for example `Portfolio <hello@your-domain.com>`
- `CONTACT_TO_EMAIL`: inbox that should receive messages

`.env.example` lists the required variable names. For local form testing, use Vercel's local development command (`vercel dev`) so the `/api/contact` function is available; `vite dev` serves only the frontend. Never add real API keys to source control.

The endpoint validates and limits submitted fields, uses a honeypot and minimum completion time for basic spam protection, and returns explicit errors if email delivery is not configured or fails.

Project case-study narratives are intentionally marked as pending until verified project-specific details are available. Add only factual values under each project's optional `caseStudy` object (`problem`, `role`, `challenge`, `solution`, `outcome`) in `src/data/portfolio.js`; the modal only displays populated fields.

## Project structure

```text
public/
  images/certificates/   Certificate artwork
  music/                 Local background music
api/
  contact.js             Resend-backed contact form endpoint
src/
  components/
    layout/
      SiteHeader.jsx     Navigation, theme toggle, and music player
      SiteFooter.jsx     Site footer
    sections/
      HeroSection.jsx
      AboutSection.jsx
      ProjectsSection.jsx
      JourneySection.jsx
      CertificatesSection.jsx
      ContactSection.jsx
  data/
    portfolio.js         Portfolio content and navigation/social data
  App.jsx                Page composition
  index.css              Tailwind import and custom styling
  main.jsx               React entry point
index.html               HTML document
vite.config.js           Vite and Tailwind configuration
```

## Music playback

Hover over the floating music dock at the top of the page, or tap it on a touch device, to open the player. Press play to start audio, choose a track from the selector, and adjust volume with the slider or mute button.

## Synchronizing lyrics

The lyric sync script requires Python and FFmpeg. Install its Python dependency once:

```bash
python -m pip install stable-ts
```

Use the script with original or licensed lyrics and audio. The input `.lrc` should contain untimed lyric lines; the script writes timestamped output to a separate folder so it can be reviewed before replacing the website's lyric file.

```bash
python public/lyrics/sync/sync_lrc.py --lrc path/to/song.lrc --audio "path/to/song.mp3" --out-dir public/lyrics/synced
```

For multiple songs, the `.lrc` and audio files must have matching base names:

```bash
python public/lyrics/sync/sync_lrc.py --lrc-dir path/to/lyrics --audio-dir path/to/audio --out-dir public/lyrics/synced
```

Review the generated timestamps, then copy the approved `.lrc` file to its mapped path in `public/lyrics/`.
