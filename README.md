# EIF Fellowship portfolio site

A static, single-page portfolio for the three EIF synthetic-data sprints. It contains fellowship work only, not resume or work-history content.

## Local development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

Vite builds the static site into `dist/` with the project-site base path `/DataModelling-Sprints/`. JetBrains Mono is bundled locally; the site makes no runtime API or external font requests. The eight chart images under `public/figures/` are exported unchanged from the saved Deliverable 3a notebook outputs; `public/kenid.jpg` is the portrait used in the hero.

## GitHub Pages

This folder is intended to become the root contents of repository `kenDRoger/DataModelling-Sprints`. Its `.github/workflows/pages.yml` workflow is manual-only and has not been run. After finalizing site content, place this folder's contents at the target repository root, set its Pages source to **GitHub Actions**, and run the workflow manually only when you authorize publishing. The intended URL is `https://kendroger.github.io/DataModelling-Sprints/`. This local project has not been pushed or deployed.
