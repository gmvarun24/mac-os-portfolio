# mac-os-portfolio

A macOS-style portfolio built with React + Vite. It features a desktop-like interface with a dock, draggable folders, window-based apps (Finder, Terminal, Safari, Photos, Resume, Contact), startup animation with sound, and simple state management using Zustand.

<img src="/images/logo.svg" alt="Portfolio logo" />

---

## Quick start

Requirements:
- Node.js (recommend v18+)
- npm (or yarn/pnpm)

Install and run locally:

```bash
# clone
git clone https://github.com/gmvarun24/mac-os-portfolio.git
cd mac-os-portfolio

# install dependencies
npm install

# start development server
npm run dev
# open http://localhost:5173 (Vite default)
```

Build for production and preview:

```bash
# build
npm run build

# preview the production build locally
npm run preview
```

Lint (JS/React rules):

```bash
npm run lint
```

---

## Project overview

- Entry point: index.html -> src/main.jsx -> src/App.jsx
- The app shows a macOS-like desktop with:
  - Navbar (top bar with time and icons)
  - Welcome text and large "Portfolio" title
  - Desktop icons (folders and files) generated from central content
  - Dock with app icons and magnification animation (GSAP)
  - Window components (Finder, Safari, Terminal, Resume, Text, Image, Contact, Photos)
  - Startup screen with sound (public/sounds/mac-startup.mp3)
- Centralized content and configuration are stored in src/constants/index.js — add projects, socials, blog posts, photos here.

---

## Important files & directories

- index.html — app root and metadata
- vite.config.js — Vite config and path aliases
- package.json — scripts and dependencies
- src/main.jsx — React bootstrap
- src/App.jsx — top-level composition of UI and windows
- src/components/* — shared UI: Navbar, Dock, Home, Startup, Welcome, WindowControls, etc.
- src/windows/* — window apps. Each window is a separate component (Terminal.jsx, Finder.jsx, Resume.jsx, ...)
- src/constants/index.js — all content (locations/projects, dockApps, navLinks, socials, etc.)
- src/store/window.js — global window state (open/close/focus) using Zustand
- public/* — static assets (images, icons, sounds, files/resume.pdf)

---

## How the window system works

- Window state is centralized in src/constants -> WINDOW_CONFIG and managed by src/store/window.js (Zustand).
- Each window key in WINDOW_CONFIG matches a component exported from src/windows/index.js.
- You can open/close/focus windows from anywhere via the window store.

Open a window programmatically:

```js
import useWindowStore from "#store/window";

// inside a component
const openWindow = useWindowStore((s) => s.openWindow);
openWindow("finder", /* optional data */);
```

---

## Customize content

All visible content (projects, dock apps, nav links, socials, gallery) lives in src/constants/index.js.

Example: add a new project inside the `WORK_LOCATION.children` list:

```js
// src/constants/index.js (inside WORK_LOCATION.children)
{
  id: 99,
  name: "MyNewProject",
  icon: "/images/folder.png",
  kind: "folder",
  position: "top-20 left-10",
  windowPosition: "top-[25vh] left-10",
  children: [
    {
      id: 1,
      name: "MyNewProject.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      description: [
        "Brief description of the project.",
        "Tech stack and links.",
      ],
    },
    {
      id: 2,
      name: "mynewproject.com",
      icon: "/images/safari.png",
      kind: "file",
      fileType: "url",
      href: "https://mynewproject.example",
    },
  ],
}
```

Add a new dock app:
- Add an entry to `dockApps` in src/constants/index.js
- Add a matching window config in WINDOW_CONFIG
- Create the window component under src/windows and export it from src/windows/index.js

Example dock entry:

```js
// constants
{
  id: "myapp",
  name: "My App",
  icon: "myapp-icon.png",
  canOpen: true,
}
```

Example window config (append to WINDOW_CONFIG):
```js
myapp: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null }
```

Create `src/windows/MyApp.jsx` and export it via src/windows/index.js.

---

## Aliases (vite.config.js)

Vite config defines convenient path aliases:

- "#components" -> src/components
- "#constants"  -> src/constants
- "#store"      -> src/store
- "#hoc"        -> src/hoc
- "#windows"    -> src/windows

Use them like:

```js
import { Welcome } from "#components";
import useWindowStore from "#store/window";
import { locations } from "#constants";
```

To change aliases, edit vite.config.js.

---

## Assets & public folder

- All static assets are served from the public directory and referenced by absolute paths starting with `/`.
  - Examples: `/images/logo.svg`, `/sounds/mac-startup.mp3`, `/files/resume.pdf`
- Resume is available at: /files/resume.pdf (included in repo)
- Images used by desktop/finder and dock are under public/images and public/icons.

Embed images in README or app docs using raw HTML (required by this project):

```html
<img src="/images/casual_me.jpg" alt="Varun" />
```

---

## Styling & animation

- Tailwind CSS is used for styling (configured via @tailwindcss/vite plugin).
- GSAP is used for animations and Draggable interactions. The Dock magnification and the draggable desktop icons use GSAP + Draggable.
- Font weight variation interactions in Welcome component use GSAP to animate font variation settings.

---

## Common troubleshooting

- Dev server port: Vite defaults to 5173. If it's already in use, specify a port:
  npm run dev -- --port 3000
- Audio autoplay blocked: Browsers often block autoplay. Startup audio plays only if allowed; you may need to interact with the page first. Startup.jsx already catches playback errors and logs them.
- Broken image paths: Ensure images referenced in src/constants or components use absolute paths starting with `/images/...` or `/icons/...`.
- Windows not opening: Confirm the key exists in both WINDOW_CONFIG and src/windows/index.js. The Dock uses matching app id and window key.
- Linting: `npm run lint` runs ESLint. Add or adjust rules in eslint.config.js.

---

## Deployment

This is a static bundle built by Vite. Typical steps:

1. Build: `npm run build` — produces dist/
2. Host dist/ on any static host (Netlify, Vercel, GitHub Pages, S3 + CloudFront, etc.)
3. If deploying to a subpath, update Vite `base` in vite.config.js to match the public base path.

Example Vercel:
- Push repo to GitHub and connect to Vercel — build command `npm run build`, output directory `dist`.

---

## Accessibility & Responsiveness

- The project is designed for desktop and tablet screens (see Welcome.jsx message).
- Buttons include aria-labels in the Dock; keep adding accessible attributes when you add interactive elements.
- Consider keyboard navigation and focus management if you want to improve accessibility for window controls.

---

## Contributing

- Bug reports, feature requests and PRs are welcome.
- Suggested workflow:
  - Fork repository
  - Create a branch: feature/your-feature
  - Commit changes and open a PR with a clear description and screenshots where relevant
- Add tests (not included) or update docs when adding features.

---

## Notes & suggestions

- Add a LICENSE file to clarify reuse/permission.
- Add TypeScript if you want stronger type safety and improved DX; the repo already includes @types/react dev deps.
- If you want to add analytics or server APIs, create a separate API server and consume it from this frontend.

---

If you need a short guide on how to add a new window component or how to add custom animations with GSAP, tell me which window you want to extend and I’ll provide a focused example.