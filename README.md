# Presentation Decks

A Slidev monorepo for technical sharing and monthly work reports. For architecture guidelines and conventions, see [AGENTS.md](./AGENTS.md).

## Quick start

```bash
# 1. 安裝依賴（在根目錄執行一次即可）：
bun install

# 2. 列出所有可用的簡報：
bun run dev

# 3. 啟動指定簡報（會自動開啟瀏覽器）：
bun run dev <deck名稱>
# 例如：
bun run dev debounce
bun run dev shadcn-ui
bun run dev month267

# 4. 構建或匯出 PDF：
bunx --bun slidev build <deck名稱>/slides.md
bunx --bun slidev export <deck名稱>/slides.md
```

## 共用主題 (Dark Tech Theme)

專案在 `packages/slidev-theme-tech` 提供全域暗黑科技風主題：

- **啟用方式**：在 `slides.md` 的 frontmatter 設定 `theme: tech`
- **全域自動註冊元件**：`<SlideShell>`, `<SlideHeader>`, `<JsonCard>`, `<TechCard>`, `<TechBadge>`
- **共用 Layouts**：`layout: full`（全版客製元件）、`layout: tech-cover`（科技封面）、`layout: tech-content`（標準內文）、`layout: tech-two-cols`（雙欄比較）、`layout: tech-section`（章節轉折）

## Decks 清單

### 💡 技術分享 (22 個)

| Deck | 主題 |
|---|---|
| [`ChromeDevTool`](./ChromeDevTool) | Google Chrome DevTools |
| [`chromeDevToolsMcp`](./chromeDevToolsMcp) | Chrome DevTools MCP — 工具介紹與實戰展示 |
| [`citus`](./citus) | Citus `create_distributed_table` |
| [`citus-v2`](./citus-v2) | Citus create_distributed_table (Part 2) |
| [`csp`](./csp) | CSP 知識分享 |
| [`debounce`](./debounce) | JavaScript Debounce & Throttle |
| [`dify`](./dify) | Dify — LLM Node & Workflow API |
| [`eventDelegation`](./eventDelegation) | Event Delegation 知識分享 |
| [`FTO-ai-meeting`](./FTO-ai-meeting) | FTO × AI 產品比對功能 |
| [`httpyac`](./httpyac) | httpYac Technical Overview |
| [`intersectionObserver`](./intersectionObserver) | IntersectionObserver API |
| [`mcp`](./mcp) | Model Context Protocol |
| [`mcp2`](./mcp2) | MCP Transport |
| [`mjml`](./mjml) | MJML 技術分享 |
| [`OAuth2`](./OAuth2) | OAuth 2.0 技術分享 |
| [`opensearch-hybrid-search`](./opensearch-hybrid-search) | Hybrid Search on OpenSearch |
| [`opensearch-hybrid-search-part2`](./opensearch-hybrid-search-part2) | OpenSearch Hybrid Search 技術深潛 (Part 2) |
| [`ppt26415`](./ppt26415) | 2026-03 特殊報告 |
| [`rAF`](./rAF) | requestAnimationFrame 深入解析 |
| [`rIC`](./rIC) | requestIdleCallback 知識分享 |
| [`shadcn-ui`](./shadcn-ui) | shadcn/ui — The Foundation for your Design System |
| [`zod`](./zod) | Zod - TypeScript Schema Validation |

### 📅 月度工作報告 (10 個)

| Deck | 期間 |
|---|---|
| [`month25a`](./month25a) | 2025-10 |
| [`month25b`](./month25b) | 2025-11 |
| [`month25c`](./month25c) | 2025-12 |
| [`month261`](./month261) | 2026-01 |
| [`month262`](./month262) | 2026-02 |
| [`month263`](./month263) | 2026-03 |
| [`month264`](./month264) | 2026-04 |
| [`month265`](./month265) | 2026-05 |
| [`month266`](./month266) | 2026-06 |
| [`month267`](./month267) | 2026-07 |

## 新增簡報

1. 建立目錄 `<deck名稱>`
2. 在目錄內建立 `slides.md`（可參考既有簡報）與選用的 `spec.md`
3. 執行 `bun run dev <deck名稱>` 即可開始開發
