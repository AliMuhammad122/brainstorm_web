# QR Code Dine-In Ordering (Boilerplate)

This is a starter React 19 project scaffolded with Vite. It includes:

- React 19
- Vite
- Tailwind CSS
- Ant Design (antd)
- Redux Toolkit
- react-icons

Quick start

1. Install dependencies

   npm install

2. Start dev server

   npm run dev

Notes on running

- If you're used to `npm start`, this project includes a `start` script that runs the dev server:

   npm start

- Ensure you have a recent Node.js installed (Node 18+ recommended). Verify with:

  node -v
  npm -v

- The `public/` folder contains static assets that are copied as-is to the build output. For example, `/favicon.svg` and `/site.webmanifest` live in `public/` and are referenced from the root `index.html`.

- This project was converted to Next.js (pages router). Important notes:

   - Run the dev server with `npm run dev` (or `npm start`).
   - The Next.js pages live in the `pages/` directory (e.g. `pages/index.jsx`).
   - Global styles are in `styles/globals.css` and are imported from `pages/_app.jsx`.
   - The `public/` folder remains the place for static assets (favicon, manifest, robots).

If you'd like, I can convert the store to a Next.js-friendly layout (e.g. with SSR support) or add API routes for backend actions.

3. Build

   npm run build

Notes

- Tailwind is configured via `tailwind.config.cjs` and `postcss.config.cjs`.
- The sample `App.jsx` shows AntD usage, react-icons, and a simple Redux counter slice.

If you prefer TypeScript, I can convert the project to TS next.
