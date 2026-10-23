# xander-bennett.com

Portfolio of **Xander Bennett**, AI engineer in Salt Lake City. Live at **[xander-bennett.com](https://xander-bennett.com)**.

I build AI systems that answer questions about company data, check their own answers, and get tested before anyone relies on them. The site makes that case by following one question through the agent loop of my flagship project, grounded-sql-agent: a text-to-SQL agent grounded in dbt metadata, validated before execution, and gated by evals in CI.

Open to full-time AI engineering roles, Salt Lake City or remote.
[Résumé](https://xander-bennett.com/assets/Alexander_Bennett_Resume.pdf) · [LinkedIn](https://linkedin.com/in/xander-bennett) · [xanderwbennett@gmail.com](mailto:xanderwbennett@gmail.com)

## The loop the page walks through

One question enters at the top of the page: *"Which job families have the most L4 engineers paid below their range midpoint right now?"* Each section is a stage of the loop that answers it. The warehouse is synthetic; no real employee data is used anywhere.

| Stage | What happens | Failure it prevents |
|---|---|---|
| **01 Retrieve** | BM25 over the dbt manifest and catalog: model descriptions, column docs, tests, accepted values, lineage. The top 5 models become the only tables the agent is allowed to reference. | Guessed tables and columns, the most common text-to-SQL failure |
| **02 Draft** | The LLM receives the question plus the five retrieved model docs and returns a single `SELECT` as JSON. | Free-form output that can't be parsed or checked |
| **03 Validate + repair** | Four checks before execution: parses as DuckDB SQL (sqlglot), single read-only `SELECT`, every referenced table ⊆ retrieved set, `EXPLAIN` dry-run. A failure goes back to the model with the exact error, up to 3 repairs. | Unverified SQL touching data |
| **04 Execute** | Read-only DuckDB connection with a 200-row cap. Latency and token cost logged on every run. | Writes, runaway queries, accuracy gains that hide their cost |
| **05 Answer** | A prose answer that cites the models it used, with repairs, latency, and cost attached. One result object served three ways: CLI (Typer), API (FastAPI), and an MCP server (FastMCP) that Claude Desktop or Cursor can call as a tool. | Answers without provenance |
| **06 Prove** | A golden question set graded by result-set match; the SQL text is never compared. CI fails a pull request when execution accuracy or recall@5 drops more than 3 points below the committed baseline, and each run is diffed against the last question by question. | Silent regressions |

**Agent stack:** Python · DuckDB · dbt · sqlglot · Claude · Typer · FastAPI · FastMCP · pytest · ruff

## Status

grounded-sql-agent is in progress, and the site says so. The first green eval run and the first committed baseline (`evals/baseline.json`) are the next milestones, and the source goes public with that first baseline. The v1 targets were written down before any measured numbers exist:

| Metric | v1 target |
|---|---|
| `execution_accuracy` | ≥ 0.80 |
| `retrieval_recall@5` | ≥ 0.90 |
| `failure_rate` (no valid SQL after 3 repairs) | ≤ 0.05 |
| `guardrails` (destructive requests blocked, unanswerable questions refused) | 1.00 |
| `latency_p50` · cost | ≤ 5 s · ≤ $0.01 per question |

Panels on the page that show illustrative data are labeled `example`. Measured numbers replace them as the baseline lands.

## Projects

| Project | What it does | Status |
|---|---|---|
| grounded-sql-agent | Plain-English questions to validated, cited SQL over a dbt-documented warehouse | In progress |
| schema-mapper | Maps messy customer spreadsheet columns onto a standard schema. Confident matches pass through, uncertain ones queue for human review, and every correction becomes a labeled example. | Queued |
| regression-gate | Re-tests an AI feature on every change, diffs results against the previous version, and blocks the release when quality drops | Queued |

Each project goes public once it has a committed baseline.

## How the site is built

The page is structured as the agent loop itself. A live diagram of the loop sits beside the content and follows the reader down the page.

- **One HTML file.** Vanilla HTML, CSS, and JavaScript. No framework, no build step, no runtime dependencies. The only external request is Google Fonts.
- **Canvas-rendered loop.** A 2D canvas in a sticky column draws the six-stage ring. Geometry recomputes from the column size on resize, ambient signals circulate continuously, and a carrier signal advances to the stage in view as you scroll, including the validate-to-draft repair path. Below 960 px it collapses into a compact mini-loop.
- **Motion with restraint.** Scroll reveals run on `IntersectionObserver`. With `prefers-reduced-motion`, reveals are disabled and the loop renders as a static frame. The render loop pauses when the tab is hidden.
- **Two audiences per stage.** Every stage carries the technical description and an "in plain terms" version for non-engineering readers.
- **Synthetic data throughout.** No customer or employee data anywhere on the page.
- **Type and color.** Fraunces (display), IBM Plex Sans (body), JetBrains Mono (code and data). Light theme only, on purpose.
- **Hosting.** GitHub Pages, custom domain via `CNAME`.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## License

MIT, see `LICENSE`.

Designed, written, and built by Xander Bennett.
