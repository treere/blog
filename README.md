# Blog

A personal blog built with SvelteKit and mdsvex.

## Stack

- **SvelteKit** with Svelte 5
- **mdsvex** for markdown blog posts
- **TailwindCSS** with typography plugin
- **PrismJS** for syntax highlighting
- **Static adapter** for deployment

## Writing Posts

Create new posts in `src/content/` as `<slug>.en.svx` + `<slug>.it.svx`:

```svx
---
title: Your Post Title
date: '2026-02-24'
description: A brief description
---

# Your content here
```

URLs: `/en/<slug>` and `/it/<slug>`. If a translation is missing, the English version
is shown with a notice.

## Commands

```sh
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run check    # Type check
npm run format   # Format code
```

## Deployment

Build outputs to `build/`. Deploy to any static host (GitHub Pages, Vercel, Netlify, etc.).
