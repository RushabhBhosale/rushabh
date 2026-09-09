# Rushabh Bhosale — The Switchyard

A Next.js 16 / React 19 portfolio. The approved direction and storyboard are in `SWITCHYARD_CONCEPT.md`. All visuals, content, and interactions live in this repository and can be edited directly in VS Code.

## Run locally

Use the existing npm lockfile:

```sh
npm install
npm run dev
```

Open http://localhost:3000/home for the classic portfolio. The circling car in
the hero enters the interactive experience at http://localhost:3000/switchyard.
`/` redirects to `/home`.

```sh
npm run build
npm start
```

## Current prototype

The `/switchyard` experience is one pinned viewport: activation → hero → origin → StackPort junction → next world area. Scroll moves the camera and environmental typography through the same journey clock. Entering StackPort inserts an optional project route that physically merges back. The other world regions are deferred while this slice is refined.

The architecture, itinerary and fallback behavior are documented in [design/SWITCHYARD_WORLD.md](design/SWITCHYARD_WORLD.md).

## Source guide

- `components/switchyard/Journey.tsx`: stage and waypoint content.
- `components/switchyard/useJourneyController.ts`: shared scroll clock and DOM depth transforms.
- `components/switchyard/journey-model.ts`: main and optional branch itinerary.
- `components/switchyard/world-path.ts`: main spline and branch geometry.
- `components/switchyard/RouteWorld.tsx`: raw WebGL camera, track geometry, projected content pins and environment.
- `components/switchyard/OpeningSequence.tsx`: first-visit and return-visit activation.
- `components/switchyard/WorldMap.tsx`: route map and direct portfolio index.
- `app/switchyard.css`: visual system and responsive layouts.
- `utils/switchyard.ts` and `ProductSurface.tsx`: project copy and labeled product studies.

All changes are local source files that can be inspected and edited in VS Code. The existing project, About, Contact and writing pages remain accessible through direct navigation. Reduced motion or unavailable WebGL displays a compact direct index. Normal mobile browsing retains the pinned world.

## Verification

With the dev server running:

```sh
node tests/switchyard.mjs
node tests/switchyard-opening.mjs
npm run build
```

The checks use Playwright and Chrome at its standard macOS path. Override `CHROME_PATH`, `PORTFOLIO_URL`, and `PORTFOLIO_SCREENSHOTS` when needed. The current test default is `http://[::1]:3000` to avoid another local service bound to IPv4 port 3000. Screenshots and a browser recording go to `/private/tmp/switchyard-slice`; video recording requires `npx playwright install ffmpeg` once.

The journey suite covers both paths, pinning, same-canvas continuity, reverse travel, the map, phone viewports, direct links, and reduced-motion/WebGL/JavaScript fallbacks. Run the opening timing check separately from recording. Browser emulation does not verify physical phone GPU performance.

`npm run lint -- <file paths>` uses the Next.js 16 flat ESLint configuration. No runtime dependency was added for the journey.
