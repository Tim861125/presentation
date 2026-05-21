# Presentation Decks

A mono-repo of independent [Slidev](https://sli.dev/) decks. Each deck sits directly at the repo root as a self-contained project (its own `package.json`, `bun.lock`, deployment config). For architecture and conventions, see [CLAUDE.md](./CLAUDE.md).

## Quick start

```bash
cd <deck>
bun install
bun run dev     # dev server with live reload
bun run build   # static build to dist/
bun run export  # export to PDF
```

## Decks

### 技術分享 / Technical deep-dives

| Deck | Topic |
|------|-------|
| [`ChromeDevTool`](./ChromeDevTool) | Google Chrome DevTools |
| [`chromeDevToolsMcp`](./chromeDevToolsMcp) | Chrome DevTools MCP — 工具介紹與實戰 |
| [`csp`](./csp) | CSP 知識分享 |
| [`debunce`](./debunce) | JavaScript Debounce & Throttle |
| [`dify`](./dify) | Dify — LLM Node & Workflow API |
| [`eventDelegation`](./eventDelegation) | Event Delegation |
| [`httpyac`](./httpyac) | httpYac Technical Overview |
| [`intersectionObserver`](./intersectionObserver) | IntersectionObserver API |
| [`mcp`](./mcp) | Model Context Protocol |
| [`mcp2`](./mcp2) | MCP Transport |
| [`mjml`](./mjml) | MJML 技術分享 |
| [`OAuth2`](./OAuth2) | OAuth 2.0 技術分享 |
| [`rAF`](./rAF) | requestAnimationFrame 深入解析 |
| [`rIC`](./rIC) | requestIdleCallback |
| [`shadcn-ui`](./shadcn-ui) | shadcn/ui — Foundation for your design system |
| [`zod`](./zod) | Zod — TypeScript schema validation |

### 月度工作報告 / Monthly reports

| Deck | Period |
|------|--------|
| [`month25a`](./month25a) | 2025-10 |
| [`month25b`](./month25b) | 2025-11 |
| [`month25c`](./month25c) | 2025-12 |
| [`month261`](./month261) | 2026-01 |
| [`month262`](./month262) | 2026-02 |
| [`month263`](./month263) | 2026-03 |
| [`month264`](./month264) | 2026-04 |
| [`ppt26415`](./ppt26415) | 2026-04-15 special |

## Deployment

Each deck deploys independently via `netlify.toml` / `vercel.json` pointing at its own `dist/`. No aggregate build.
