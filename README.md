# xander-bennett.com

Personal site for **Xander Bennett** — analytics engineer in Salt Lake City. Live at [xander-bennett.com](https://xander-bennett.com).

Built as a single-page, single-file static site — no build step, no framework, no dependencies beyond Google Fonts. Designed to look like the analytics tools the work it describes runs in: cream + violet, JetBrains Mono for data, generous whitespace, a "notebook cell" section structure.

## Stack

- Vanilla HTML, CSS, JavaScript (no build step)
- **Fraunces** (display) + **IBM Plex Sans** (body) + **JetBrains Mono** (code) via Google Fonts
- Hosted on GitHub Pages with custom domain via `CNAME`

## Sections

- **Hero** — name, position, a real dbt model with syntax-highlighted SQL and an output table
- **About** — six years across fintech (Addepar) and B2B SaaS (Dorsia, Pave), with stats
- **Stack** — tooling, grouped by category
- **Selected Projects** — three AE projects shipping in the open
- **Contact** — email, LinkedIn, GitHub

## Project roadmap

The site ships with three projects in `Planning` / `In Progress` status. As each ships, its card flips to `Live` with working GitHub, case study, and dbt docs links.

1. **GTM Semantic Layer** — synthetic CRM dataset → dbt staging/intermediate/marts → Looker semantic layer; ~60 models, custom generic tests, dbt docs deployed to GitHub Pages
2. **Marketing Attribution & LTV** — Olist e-commerce data → dbt customer-journey models → Python LTV (BG/NBD) and multi-touch attribution
3. **LLM-Augmented Analytics Workflow** — RAG over warehouse metadata + dbt exposures, semantic-layer-grounded SQL generation

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## License

MIT — see `LICENSE`.
