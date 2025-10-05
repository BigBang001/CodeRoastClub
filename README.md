# 🧑‍💻 Code Roast Club

> **Roast your code in seconds.** Local-first, fast, and a little *too* honest.

**Code Roast Club** is a playful, developer-first web app where programmers paste code and instantly receive witty, context-aware roast lines. It transforms debugging into an entertaining experience — the more your code hurts, the more it learns (and laughs).

---

## 🚀 Highlights

* ⚡ **Local-first roast engine** — works without API keys or cloud dependencies
* 🤖 **Multiple humor modes:** *Mild*, *Brutal*, and *Dad Joke*
* 🎭 **Custom personas:** *Linus Mode*, *Gen Z Intern*, *Boomer Coder*, *HR-Safe*
* 🧱 **Public Roast Wall** — discover and share the funniest burns
* 📸 **Extra Features:** GitHub repo roast & Image OCR roast for screenshots
* 🔗 **Share options:** Copy roast text, export as image, or generate QR link
* 👤 **Session-based auth:** Register, log in, or roast anonymously as a guest
* 🏆 **Gamified badges** (upcoming): Roast Rookie, Bug Slayer, Syntax Surgeon

---

## 🧠 Tech Stack

**Frontend:**

* React 18 + Vite
* Tailwind CSS + shadcn/ui
* Wouter (router) + TanStack Query (data fetching)

**Backend:**

* Express (TypeScript)
* Lightweight local roast engine
* Session-based Passport authentication

**Extras:**

* Tesseract.js — OCR for code screenshots
* html2canvas — Export roast results as images
* qrcode — Generate shareable roast QR links
  
---

## 🌐 Live Demo

**[Deployed Project Link](#)** *https://code-roast-club.netlify.app/*

---

## 📁 Project Structure

```
client/   → React app (UI, routes, roast logic)
server/   → Express backend (sessions, roast generation)
shared/   → Shared Zod/Drizzle schemas for validation
```

---

## 🧩 Troubleshooting

* **Old UI after rebuild?**
  Clear site data or unregister the service worker (DevTools → Application → Service Workers).

* **POST endpoints returning HTML?**
  SPA fallback is intercepting requests — this server uses GET-only fallbacks to avoid that issue.

---

## 💡 Hackathon Tagline

> *“Where bad code meets brutal honesty — one roast at a time.”*

---
