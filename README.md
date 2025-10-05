# Code Roast Club

Roast your code in seconds. Local-first, fast, and a little too honest.

A playful web app where developers paste code and get AI-generated roasts in seconds. Built with React + Tailwind on Vite, and an Express API that talks to OpenAI.


## Highlights
- Local-first roaster (no API key required) with multiple personas and modes (Mild, Brutal, Dad Joke)
- GitHub repository roast and Image OCR roast — available to everyone
- Public Roast Wall with shareable roast detail pages
- Share features: copy to clipboard, save as image, and QR link
- Optional OpenAI integration for richer roasts (set an API key to enable)
- Session-based auth: register, login, and guest mode

## Tech stack
- Frontend: React 18 + Vite, Tailwind, shadcn/ui, Wouter, TanStack Query
- Backend: Express (TypeScript), sessions, Passport local auth
- Extras: Tesseract.js (OCR), html2canvas (image export), qrcode (QR), PWA shell

## Quickstart 

Link: 

## API overview

Roasting
- POST /api/roast — generate a roast (rate-limited by IP)
- POST /api/github-roast — quick roast for public GitHub repos (no tokens required)

Feed & stats
- GET  /api/roasts/public?limit=10 — latest public roasts
- GET  /api/roasts/:id — fetch a single public roast for sharing
- GET  /api/stats — aggregate stats for UI

Usage
- GET  /api/usage — current usage for your IP

Auth (session-backed)
- POST /api/auth/register — create an account and start a session
- POST /api/auth/login — sign in with username/password
- GET  /api/auth/me — current session user
- POST /api/auth/logout — end session
- POST /api/auth/guest — start a temporary guest session

Versioned aliases (for quick browser testing)
- GET  /api/v1 — API index JSON
- POST /api/v1/roast
- POST /api/v1/roast/github
- GET  /api/v1/roasts/public
- GET  /api/v1/roasts/:id

## Project structure
- client/ — React app (Wouter, TanStack Query, Tailwind)
- server/ — Express server, routes, in-memory storage
- shared/ — Zod/Drizzle schemas shared across client/server

## Troubleshooting
- If you see old UI after a rebuild, clear site data or unregister the service worker in DevTools → Application → Service Workers.
- POST endpoints returning HTML usually means a SPA catch-all is intercepting requests; this server uses GET-only fallbacks to avoid that.

# Code Roast Club

A playful web app where developers paste code and get AI-generated roasts in seconds. Built with React + Tailwind on Vite, and an Express API that talks to OpenAI.

## Features
- Paste code and get 3–5 witty roast lines (Mild, Brutal, Dad Joke)
- Personas: Linus Mode, HR-Safe, Gen Z Intern, Boomercoder
- Usage limits (free) with a Pro upsell surface
- Public Roast Wall and shareable roast detail pages
- GitHub repo roasting and image (OCR) roasting available without a subscription

## Quickstart

Link: 