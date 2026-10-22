# Gilang Faid Portfolio

A responsive, single-page personal portfolio built with React, Vite, and Tailwind CSS. Its visual direction and content are inspired by [Gilang Faid's portfolio](https://gilangfaid.vercel.app/).

## Features

- Responsive layout with Home, About, Projects, Journey, Certificates, and Contact sections
- Sticky navigation and dark/light theme toggle
- Subtle entrance animations with Framer Motion
- Compact music player in the navbar with play/pause, mute, and volume controls
- Local MP3 playback from `public/music/8 Letters - Why Don't We [Official Music Video].mp3`
- Locally stored certificate artwork in `public/images/certificates`

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

## Project structure

```text
public/
  images/certificates/   Certificate artwork
  music/                 Local background music
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

Browsers may prevent audio from playing before a user interaction. Open the **Music** control in the navbar and press play to start playback. Use the volume slider or mute button to adjust the sound.
