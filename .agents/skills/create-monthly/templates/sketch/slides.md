---
title: YYYY-MM 工作報告
info: |
  YYYY-MM 工作報告
  丁吾心
colorSchema: light
layout: cover
transition: slide-left
fonts:
  provider: none
  sans: system-ui, -apple-system, "Segoe UI", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif
  mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
mdc: true
---

# YYYY-MM 工作報告

本月 **一句話主軸**，產品研發與系統維護進度。

丁吾心 · YYYY-MM

::art::

<TitleSketch />

---

# 目錄

<div class="grid grid-cols-2 gap-x-10 gap-y-4 mt-4">
<div><b class="text-[var(--sk-orange-dark)] font-mono mr-2">01</b><b>主題一</b><div class="text-sm text-[var(--sk-grey)] ml-8">一行摘要</div></div>
<div><b class="text-[var(--sk-orange-dark)] font-mono mr-2">02</b><b>主題二</b><div class="text-sm text-[var(--sk-grey)] ml-8">一行摘要</div></div>
<div><b class="text-[var(--sk-orange-dark)] font-mono mr-2">03</b><b>主題三</b><div class="text-sm text-[var(--sk-grey)] ml-8">一行摘要</div></div>
<div><b class="text-[var(--sk-orange-dark)] font-mono mr-2">04</b><b>下月計畫</b><div class="text-sm text-[var(--sk-grey)] ml-8">一行摘要</div></div>
</div>

---
layout: center
---

<div class="big-quote max-w-3xl">

本月一句話總結：把 <em>重點成果</em> 說成一句話。

</div>

<div class="grid grid-cols-2 gap-6 mt-10 max-w-3xl">
<div class="callout blue">

**主線 A.** 一行說明。

</div>
<div class="callout">

**主線 B.** 一行說明。

</div>
</div>

---
layout: section
---

<div class="eyebrow">WEBPAT · 01</div>

# 主題一

一句副標

---
clicks: 4
---

# 主題一：流程

<FlowScene
  :steps="['需求\n盤點', '設計\n實作', '測試\n驗證', '正式站\n上線']"
  :notes="['一行註解', '一行註解', '一行註解', '一行註解']"
  result="一句成果：上線 / 指標 / 影響"
/>

<div class="scene-caption">一句話說明這張圖的重點。</div>

<!--
[click] 第二步
[click] 第三步
[click] 第四步
[click] 結論
-->

---

# 主題一：重點

<div class="grid grid-cols-2 gap-8">
<div v-click>

### 完成項目
- 重點一，關鍵實作以 `code` 標註
- 重點二
- 重點三

</div>
<div v-click>

### 待辦 / 風險
- 重點一
- 重點二

</div>
</div>

<div class="callout mt-8" v-click>

**次要工作：** 排查項目 · 其他維護事項（以「·」分隔）

</div>

---
layout: section
---

<div class="eyebrow">Thanks</div>

# 工作報告結束

YYYY-MM · 丁吾心
