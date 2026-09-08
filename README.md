# Rushabh Bhosale — The Switchyard

A Next.js 16 / React 19 portfolio. The approved direction and storyboard are in `SWITCHYARD_CONCEPT.md`. All visuals, content, and interactions live in this repository and can be edited directly in VS Code.

## Run locally

Use the existing npm lockfile:

```sh
npm install
npm run dev
```

Open http://localhost:3000/home. `/` redirects to `/home`.

```sh
npm run build
npm start
```

## Source guide

- `app/(main)/home/page.tsx`: homepage writing, experiments, and career history.
- `components/switchyard/Journey.tsx`: GSAP scroll choreography, desktop stations, and accessible project controls.
- `components/switchyard/RouteWorld.tsx`: raw WebGL perspective geometry, camera travel, visibility throttling, and context-loss handling.
- `components/switchyard/ProductSurface.tsx`: original typographic product studies and the existing AnimeSparks screenshot.
- `components/switchyard/Convergence.tsx`: contact route convergence.
- `app/switchyard.css`: complete visual system and responsive/reduced-motion adaptations.
- `utils/switchyard.ts`: selected project copy and verified source/contact destinations. StackPort has no public release URL in the supplied project sources, so its action requests a walkthrough by email.
- `components/Navbar.tsx` and `components/Footer.tsx`: shared navigation and contact system.
- `utils/projects.ts`, `utils/experience.ts`, and `app/(main)/blogs/index.ts`: existing archive, career, and article data.

The project, About, Contact, and writing indexes share the editorial system. Existing MDX articles, Site Inspector APIs, résumé, and legacy routes remain available. The obsolete ad loader was removed from the portfolio shell. Broken legal-page footer destinations were replaced with direct contact channels. Skill percentages were consolidated into a plain skills inventory on About.

## Motion and accessibility

The DOM is the content layer. Desktop motion is enabled only above 800px wide and 649px high, and only without a reduced-motion preference. CSS sticky positioning preserves native scrolling; no wheel or touch event is intercepted. Station buttons move to the appropriate scroll position, and inactive desktop panels are inert.

Mobile, short viewports, reduced motion, and JavaScript-free browsing receive a normal vertical document. With WebGL unavailable, the entry retains a quiet CSS fallback. The renderer caps pixel density, runs at approximately 30fps, pauses outside the spatial chapters or in hidden tabs, cleans up GPU resources, and respects live reduced-motion changes. Product studies are explicitly labeled, not passed off as screenshots.

## Verification

With the dev server running:

```sh
node tests/switchyard.mjs
```

This uses the existing Playwright dependency and Chrome at its standard macOS path. Override `CHROME_PATH`, `PORTFOLIO_URL`, and `PORTFOLIO_SCREENSHOTS` when needed. Screenshots default to `/private/tmp/switchyard-checks`.

The suite covers the WebGL entry, project selection and native scrolling, local links and résumé, mobile navigation, keyboard access, reduced motion, secondary routes, and a WebGL-unavailable fallback. Tests open contact links only as DOM destinations; they do not send messages.

`npm run lint -- <file paths>` uses the Next.js 16 flat ESLint configuration. No additional runtime dependencies were added for the redesign.
