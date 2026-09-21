# Ecologies of LLM Practices

[![Build and deploy](https://github.com/medialab/ecologies-of-llm-practices/actions/workflows/deploy.yml/badge.svg)](https://github.com/medialab/ecologies-of-llm-practices/actions/workflows/deploy.yml)

Official website for [Ecologies of LLM Practices (EL2MP)](https://ecologiesofllm.medialab.sciencespo.fr/), a research project by [médialab, Sciences Po](https://medialab.sciencespo.fr/).

The project studies how large language models enter professional practices and ordinary knowledge work, and what kinds of effort, judgement, and adaptation their use creates. The website presents the project’s research questions, participatory protocol, workbook, audiovisual archive, and contributors.

<img width="5088" height="3344" alt="image" src="https://github.com/user-attachments/assets/62df338f-bd8c-4336-9876-6cfabe0ee1a7" />

## Website

- [Live website](https://ecologiesofllm.medialab.sciencespo.fr/): project overview, research questions, and interactive protocol
- [Artificial Inquiries](https://ecologiesofllm.medialab.sciencespo.fr/artificial_inquiries): a printable vademecum for participatory inquiry with LLMs
- [Tedium](https://ecologiesofllm.medialab.sciencespo.fr/tedium): an audiovisual exploration of LLMs in professional practice
- [Co-Inquirers and research team](https://ecologiesofllm.medialab.sciencespo.fr/inquirers): project contributors and research team

## Local development

This project uses [Bun](https://bun.sh/) as its package manager and runtime.

```bash
bun install
bun run dev
```

The development server runs at [http://localhost:3000](http://localhost:3000).

## Useful commands

| Command | What it does |
|---------|--------------|
| `bun run dev` | Start the local development server |
| `bun run check` | Run Svelte and TypeScript checks |
| `bun run build` | Create the production build in `build/` |
| `bun run preview` | Preview the production build locally |
| `bun run deploy` | Publish the existing `build/` directory to `gh-pages` |

There is currently no automated test suite. Run `bun run check` and `bun run build` before opening a pull request.

## Project structure

```text
src/
├── routes/
│   ├── +page.svelte                 # Project overview and interactive protocol
│   ├── artificial_inquiries/        # Workbook and exercise materials
│   ├── inquirers/                   # Co-inquirers and research team
│   ├── tedium/                      # Audiovisual archive and exhibition
│   └── MentionsLegales/             # Legal information
├── lib/
│   ├── components/                  # Shared interface components
│   ├── database/                    # Project content and media loaders
│   ├── media/                       # Images, video, icons, and logos
│   └── stores/                      # Shared state and animations
└── app.css                          # Global styles and Tailwind components

static/
├── fonts/                           # Site fonts
├── og_images/                       # Social and Open Graph images
├── ia/                              # Machine-readable site metadata
├── CNAME                            # Custom-domain configuration
├── sitemap.xml                      # Search-engine sitemap
└── robots.txt                       # Crawler rules
```

## Updating content and media

- Edit shared project copy, research cards, and Tedium content in `src/lib/database/global_db.ts`.
- Edit route-specific copy in the corresponding `src/routes/*/+page.ts` files.
- Add or replace images, videos, icons, and logos under `src/lib/media/`.
- Media loaders for the Tedium and Artificial Inquiries galleries live in `src/lib/database/media.ts`.

Large video files use [Git LFS](https://git-lfs.com/). Install Git LFS and pull the media objects before working with the complete archive:

```bash
git lfs install
git lfs pull
```

## Deployment

The site is deployed to GitHub Pages at [ecologiesofllm.medialab.sciencespo.fr](https://ecologiesofllm.medialab.sciencespo.fr/).

The workflow in `.github/workflows/deploy.yml` runs on pushes and pull requests targeting `main`:

1. Checks out the repository with Git LFS enabled.
2. Installs dependencies with `bun install --frozen-lockfile`.
3. Runs `bun run build`.
4. Adds the GitHub Pages `.nojekyll` marker.
5. Deploys the build on pushes to `main`.

The custom domain is defined in `static/CNAME`, and the project is configured for root hosting with `kit.paths.base = ""`.
