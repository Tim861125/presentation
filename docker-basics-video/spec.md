# Docker 底層入門：直式短影片（spec）

> 內容來源與查證連結見 `../docker-basics/spec.md`。這裡只記錄影片版的結構與錄製方式。

## 規格

- 直式 9:16，輸出 1080×1920、30 fps、H.264 mp4，只有字幕不配音
- 手寫風格：沿用 docker-basics 的 rough.js 引擎（`utils/rough-scene.ts`）與配色；簡報的橫式手繪圖全部重排成直式（`components/V*.vue`，viewBox 寬 600）
- Slidev headmatter：`canvasWidth: 540`、`aspectRatio: 9/16`

## 兩個版本

| 檔案 | 版本 | 內容 | 長度 |
|---|---|---|---|
| `short.md` | 簡略版 | 容器 vs VM → namespaces/cgroups → docker run 的路 → Mac 的 VM | 約 69 秒 |
| `slides.md` | 詳細版 | 再加上一句話定義、image layer、`-p 8080:80` 網路 | 約 109 秒 |

## 元件

- `<Sub :lines>`：字幕，第 n 個 click 顯示 `lines[n]`，`lines` 長度 = frontmatter `clicks` + 1
- `<Hold :ms>`：沒有字幕的頁面（封面、結尾）停留多久
- `global-bottom.vue`：頂端進度條

## 錄製

```bash
# 在 repo 根目錄
node_modules/.bin/slidev docker-basics-video/short.md --port 3051
node docker-basics-video/scripts/record.mjs 3051 docker-basics-video/out/short.mp4

node_modules/.bin/slidev docker-basics-video/slides.md --port 3050
node docker-basics-video/scripts/record.mjs 3050 docker-basics-video/out/full.mp4
```

- 每一步停留 `max(2.4 s, 0.9 s + 0.15 s × 單位數)`，一個中文字或一個英文單字算 1 單位；調節奏改 `scripts/record.mjs` 的 `dwell`
- 用 CDP `Page.startScreencast` 抓畫格再用系統 ffmpeg 合成，不需要 Playwright 自帶的 ffmpeg；需要 `/usr/bin/google-chrome`（或設 `CHROME_PATH`）
