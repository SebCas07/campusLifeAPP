# Campus Life App
**Developer:** Sebastian Castro  
**Semester:** Spring 2026  
**Course:** Web Development  
**Deployment:** [Live on Netlify](https://your-site-name.netlify.app) ← replace with your actual URL after deploying

---

## Overview
Campus Life is a mobile-friendly web application designed to help North Park University students navigate campus life. It provides an interactive campus map, today's events, department contact information, and quick access to key campus resources — all in one place.

---

## Pages

| Page | File | Description |
|---|---|---|
| Login | `login/index.html` | Student sign-in screen with form validation |
| Home | `home/index.html` | Dashboard with live events feed and campus navigation |
| Campus Map | `map/index.html` | Interactive map with clickable building markers |
| Campus Support | `support/index.html` | Department contact cards with live search and filtering |

---

## Features
- **Live events feed** — pulls today's campus events from the Eventbrite API via a secure Netlify serverless function
- **Interactive campus map** — built with Leaflet.js and OpenStreetMap, no API key required
- **Department search** — real-time search filtering across all support departments
- **Category filters** — filter buildings and departments by type on both the map and support pages
- **Slide-in profile drawer** — accessible hamburger menu on every inner page
- **Session-based login** — username persisted across pages using `sessionStorage`
- **Responsive design** — works on desktop, tablet, and mobile

---

## Technical Requirements Met

| Requirement | How it's implemented |
|---|---|
| 3+ HTML pages | Login, Home, Map, Support |
| Semantic HTML | `<nav>`, `<main>`, `<aside>`, `<footer>`, `<article>`, `<section>` throughout |
| Custom CSS | `shared.css` for global styles + per-page CSS files |
| Responsive layout | Bootstrap grid (`col-12 col-md-6 col-lg-4`) + custom media queries |
| Bootstrap integration | Form controls, cards, grid, utility classes (`d-none`, `visually-hidden`, etc.) |
| JavaScript interactivity | Event-driven: login validation, drawer, filters, live search, map interactions |
| External API | Eventbrite API (events) + Leaflet/OpenStreetMap (map) |
| Accessibility | `aria-label`, `aria-hidden`, `aria-expanded`, `aria-live`, keyboard navigation, color contrast |
| Deployment | Netlify (chosen over GitHub Pages to support serverless API functions) |

---

## Tech Stack
- **HTML5** — semantic structure
- **CSS3** — custom properties (variables), flexbox, grid, animations
- **Bootstrap 5.3** — responsive components and utilities
- **JavaScript (ES6+)** — `async/await`, `fetch`, template literals, `sessionStorage`
- **Leaflet.js 1.9.4** — open source interactive maps
- **OpenStreetMap** — free map tile provider
- **Eventbrite API** — live campus events
- **Netlify Functions** — serverless backend for secure API token handling

---

## API Setup

### Eventbrite (Events Feed)
This app uses the Eventbrite API to display live campus events on the home dashboard.  
The API token is stored securely as a Netlify environment variable — it is never exposed in the browser.

To run locally:
1. Install the Netlify CLI: `npm install -g netlify-cli`
2. Run `netlify dev` in the project root
3. Add your token in the Netlify dashboard under **Site configuration → Environment variables**:
   - `EVENTBRITE_TOKEN` — your Eventbrite private token
   - `EVENTBRITE_ORG_ID` — your organization ID from Eventbrite

### Leaflet + OpenStreetMap (Campus Map)
No API key required. Leaflet and OpenStreetMap are completely free and open source.

---

## Deployment
Deployed on **Netlify** instead of GitHub Pages because the Eventbrite API integration requires a serverless backend function to keep the API token secure. GitHub Pages only serves static files and cannot run server-side code.

Netlify provides:
- Free static site hosting
- Free serverless functions (used for the Eventbrite API proxy)
- Automatic deployments from GitHub on every push

---

## Security Notes
- The Eventbrite API token is stored as a Netlify environment variable and never appears in any file pushed to GitHub
- The `netlify/functions/events.js` file calls Eventbrite server-side, so the token is never visible in the browser
- A `.gitignore` is included to prevent any `.env` files from being accidentally committed

---

## Accessibility
- Semantic HTML elements used throughout (`<nav>`, `<main>`, `<aside>`, `<article>`)
- All interactive elements have `aria-label` attributes
- Drawer uses `aria-hidden`, `aria-expanded`, and `aria-controls`
- Dynamic content uses `aria-live="polite"` for screen reader announcements
- Keyboard navigation supported — Escape key closes drawer, Enter activates building cards
- Color contrast meets WCAG AA standards
- `tel:` and `mailto:` links allow mobile users to tap to call or email directly