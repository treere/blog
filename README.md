# Blog

A personal blog built with SvelteKit and mdsvex.

## Stack

- **SvelteKit** with Svelte 5
- **mdsvex** for markdown blog posts
- **TailwindCSS** with typography plugin
- **PrismJS** for syntax highlighting
- **Static adapter** for deployment

## Writing Posts

Create new posts in `src/routes/` using the `.svx` or `.md` format:

```svx
---
title: Your Post Title
date: '2026-02-24'
description: A brief description
---

# Your content here
```

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
