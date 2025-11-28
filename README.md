# New Website — Initial Scaffold

This repository contains a minimal, high-performance static website scaffold intended for zero-cost hosting (GitHub Pages, Cloudflare Pages, Netlify). It's intentionally lightweight (no external fonts, minimal JS) for great Core Web Vitals out of the box.

Local preview

Open `index.html` in a browser or run a small static server. On PowerShell you can run:

```powershell
cd 'C:\Users\nirma\Desktop\New Website'
# If you have Python installed (quick static server):
python -m http.server 8000
# Then open http://localhost:8000
```

Deploy options (zero cost)
- GitHub Pages: push `master`/`main` and enable Pages in repo settings. Use a `gh-pages` branch or Pages from `main` root.
- Cloudflare Pages: connect this repo to Cloudflare Pages (free tier) — supports automatic builds and a global CDN.
- Netlify: drag-and-drop or connect the repo for automatic builds.

Next suggested steps
- Replace placeholder content with your pages and components.
- Add analytics that respect privacy (e.g., Plausible or Fathom) or use server-side event capture if needed.
- Add contact form integration (Formspree or Netlify Forms) or a serverless endpoint — SMS will incur cost.

Commands I used / helpful commands

```powershell
cd 'C:\Users\nirma\Desktop\New Website'
git add .
git commit -m "Add initial static scaffold"
```

If you'd like, I can now:
- Convert this into an SSG (Astro, Next.js, or SvelteKit) for dynamic pages
- Add CI/CD to automatically deploy to Cloudflare Pages or GitHub Pages
- Build a contact workflow using a free tier provider
# Environment Variable Update - 11/29/2025 03:56:36
