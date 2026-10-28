Act as an expert Senior Frontend Developer and UI/UX Engineer specialized in creating high-end, modern creative portfolio websites. 

I need you to build a responsive web component for a modular sidebar navigation using HTML5, modern CSS (featuring CSS Custom Properties/Variables), and clean Vanilla JavaScript. The design must be heavily based on a dark minimalist aesthetic with a clean, high-contrast white "Giant Half-Circle Curve" transition.

Here are the strict design and technical specifications:

1. STATE 1: BEFORE CLICK (Default State)
- The main landing page has a dark background (#0d0d0d) with crisp white text.
- At the top right navbar, there must be a controls container holding three rounded pill buttons:
  * Button 1: "🎧 Music" toggle.
  * Button 2: Theme toggle icon "☀️/🌙".
  * Button 3: Hamburger menu trigger icon "☰".
- The main body displays standard hero items: Status badge ("CURRENTLY INTERNING"), greeting text ("Hi, I'm Gilang."), a short bio description, CTA buttons ("View my work", "Let's connect", "Copy email"), and a portfolio card component at the bottom layer.

2. STATE 2: AFTER CLICK (The Giant Half-Circle Curve Sidebar)
- When the hamburger button is clicked, an off-canvas navigation overlay appears.
- Instead of a boring rectangular box, the sidebar MUST use a giant half-circle curve configuration. The circle shape mask should expand elegantly from the right edge/upper area, covering the upper and middle section of the screen with a solid clean white background (#f5f5f3).
- Implement this curve transition using CSS `clip-path: circle(0% at 100% 30%)` for the hidden state, and animate it to `clip-path: circle(120% at 100% 30%)` when the active class is added.
- The transition curve must feel organic and fluid. Use `transition: clip-path 0.8s cubic-bezier(0.77, 0, 0.175, 1);`.
- The bottom area of the viewport should remain dark, creating a beautiful overlapping curve mask right over the text content and the bottom card layer (exactly matching the user's layout wireframe).

3. SIDEBAR CONTENT & DECORATION (Inside the White Curve Area)
- Display a prominent close button (&times;) in the upper right.
- A vertical list of large typography navigation links: Home, My Work, About Me, Contact. The text color inside the white area must be dark grey or black (#1a1a1a).
- Add clear placeholder slots next to each text link so I can easily embed custom icons (e.g., SVG or React Icons) later.
- At the bottom edge of this active white screen area, implement a subtle micro-interaction animation: a clean, lightweight CSS-only fire/flame particle simulation using soft gradients (orange to transparent) with a slight scaleY flicker keyframe to enhance the visual appeal without hurting website performance.

4. JAVASCRIPT BEHAVIOR & INTERACTION
- Write simple, non-intrusive vanilla JS functions to toggle the ".active" class on the sidebar container.
- Include a functional `copyEmail()` handler that copies "langgdeveloper@gmail.com" to the clipboard and provides visual feedback.
- Provide clean, structural layout code. Keep the HTML clean, separate the CSS styles completely, and write commented JavaScript. Avoid any third-party framework dependencies.

Deliver the complete code output across 3 separate files: index.html, style.css, and script.js. No verbose explanations, just pure clean production-ready code blocks.
