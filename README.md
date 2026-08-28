# Wayfarer — run locally in VS Code

## 1. Extensions
You don't strictly need any extension to run this (it's a Node server), but these help:
- **ESLint** or **Prettier** — optional, for code formatting.
- No Live Server needed — the Node server serves the page itself.

## 2. Requirements
- [Node.js](https://nodejs.org) installed (v18+ recommended, includes `fetch`).
- An Anthropic API key from https://console.anthropic.com

## 3. Setup
Open this folder in VS Code, then in the integrated terminal (`` Ctrl+` ``):

```bash
npm install
cp .env.example .env
```

Open `.env` and paste your real API key in place of `your-api-key-here`.

## 4. Run it

```bash
npm start
```

Then open **http://localhost:3000** in your browser.

## How it works
- `server.js` is a small Express server. It serves `public/index.html` and exposes one route, `/api/plan-trip`, which forwards your itinerary prompt to the Anthropic API using the key from `.env`.
- `public/index.html` calls `/api/plan-trip` instead of calling Anthropic directly — so your API key never reaches the browser.
- Never commit your real `.env` file (it's already excluded from anything you'd zip/share — just don't remove that habit).
