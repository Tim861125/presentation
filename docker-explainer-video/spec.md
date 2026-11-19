# Docker 底層觀念：動畫解說影片（spec）

> 內容依據：`../docker-basics/spec.md`（Docker 官方文件查證過的來源都列在那裡）。
> 這不是簡報錄影，而是以時間軸驅動的手繪動畫：請求會在元件間移動、鏡頭會拉近、封包的位址會被改寫。

## 規格

- 直式 9:16，1080×1920、30 fps、H.264 mp4，只有字幕不配音，約 4 分 20 秒
- 手寫風格：rough.js 筆觸逐筆畫出，白底點陣、藍 `#4f61ab` + 琥珀 `#f5a700`，與 docker-basics 簡報一致
- 貫穿例子：`docker run --rm alpine true`；網路段用 `-p 8080:80` 的 nginx

## 分鏡

| # | 章節 | 長度 | 畫面 |
|---|---|---|---|
| 0 | 開場 | 11 s | 終端機打出 `docker run --rm alpine true`，「這不到一秒裡到底發生了什麼？」 |
| 1 | 容器不是小 VM | 27 s | VM 疊出自己的 kernel、開機進度條 → 換成三個容器共用一顆 kernel →「啟動 = 開一個行程」 |
| 2 | 隔離：namespaces | 34 s | kernel 上一群行程 → sh 周圍蓋牆 → 鏡頭拉近「我看到的：PID 1」→ 拉遠「主機看：PID 24817」→ 六種 namespace |
| 3 | 限制與過濾 | 30 s | cgroups 記憶體 / CPU 量表撞到上限 → seccomp 關卡：read、write 通過，reboot 被擋 |
| 4 | 檔案從哪來：image | 32 s | Dockerfile 逐行打字，每行飛下來疊成 layer → 兩個容器各加可寫層 → `/etc/hosts` copy_up → 刪容器、volume |
| 5 | docker run 的旅程 | 40 s | 「請求」沿 CLI → dockerd → containerd → shim → runc 往下走 → clone 出行程 → runc 離開、shim 當 parent → `--rm` 收尾 |
| 6 | Mac 上的 Docker | 30 s | 筆電裡藏一台 Linux VM，指令經 vsock 進去 → VM 開機速度、記憶體、層數是比較重點 |
| 7 | 網路怎麼通 | 34 s | 封包 `localhost:8080` → iptables 改寫成 `172.17.0.2:80` → docker0 → veth → eth0 → nginx；刪容器 = 拔線 |
| 8 | 重點整理 | 22 s | 五張重點卡片逐一出現 |

## 結構

- `src/engine.ts`：時間軸引擎。`Video` 串接各幕（交叉淡化）、`Scene` 有局部時間 / 字幕 / 鏡頭、`Item` 控制筆畫進度與移動、`Draw` 包 rough.js 畫圖；一切由 `renderAt(秒)` 決定
- `src/story.ts`：分鏡腳本（每一幕的元素、出現時間、字幕）
- `index.html`：1080×1920 舞台（SVG + 標題 + 進度條 + 字幕）
- `scripts/render.mjs`：`bun build` 打包 → Chrome 逐格 `renderAt(t)` + 截圖 → ffmpeg

## 算繪

```bash
# 在 repo 根目錄
node docker-explainer-video/scripts/render.mjs --still 20,52,160   # 抽幾格檢查 → out/stills/
node docker-explainer-video/scripts/render.mjs                     # 完整影片 → out/docker-explainer.mp4
# 選項：--fps 30 --workers 4 --from 30 --to 60 --out <path>
```

需要 bun、ffmpeg、Chrome（`CHROME_PATH`，預設 `/usr/bin/google-chrome`）與 root 的 `playwright-core`。
