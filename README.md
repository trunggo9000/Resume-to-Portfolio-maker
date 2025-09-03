## Instant Port Maker

Generate a polished, single‑page developer portfolio instantly. Customize layout, theme, and animations, preview live, then download the ready‑to‑host static site.

### Tech stack
- **Vite** (React + TypeScript)
- **Tailwind CSS** with **tailwindcss-animate** and typography
- **shadcn/ui** (Radix UI primitives)
- **React Hook Form** + **Zod** for forms/validation
- **React Router** for routing

## Getting started

### Prerequisites
- Node 18+ and npm (project includes `package-lock.json`)

### Install
```bash
npm install
```

### Development
```bash
npm run dev
```
Then open the URL printed in the terminal (usually `http://localhost:5173`).

### Build
```bash
npm run build
```
Outputs a production build in `dist/`.

### Preview production build
```bash
npm run preview
```

## Usage
1. Open the app.
2. Fill in your details in the portfolio form (about, projects, links, etc.).
3. Customize theme colors, layout, and animations using the customizers.
4. Preview the result live.
5. Click the download button to export a zipped, static portfolio you can host anywhere.

## Project scripts
- **dev**: Start Vite dev server
- **build**: Create production build
- **build:dev**: Development‑mode build (useful for debugging built output)
- **preview**: Preview the production build locally
- **lint**: Run ESLint

## Project structure
```
src/
  components/           # UI blocks and customizers (theme, layout, animation)
    ui/                 # shadcn/ui components
  hooks/                # React hooks (e.g., toast, mobile)
  pages/                # Routes (Index, NotFound)
  lib/                  # Utilities
  main.tsx              # App entry
  App.tsx, App.css      # App shell & styles
```

## Styling
- Tailwind is configured in `tailwind.config.ts` and `postcss.config.js`.
- Global styles live in `src/index.css`.

## Deployment
Any static host works (Netlify, Vercel static, GitHub Pages, Cloudflare Pages, S3, etc.):
1. `npm run build`
2. Upload the `dist/` directory to your host

## Troubleshooting
- If styles look off, ensure Tailwind content globs in `tailwind.config.ts` include your file paths.
- Delete `.vite` and `node_modules`, then reinstall if hot reload misbehaves:
```bash
rm -rf node_modules .vite && npm install
```
- Windows PowerShell users may need to allow scripts: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

## License
MIT



