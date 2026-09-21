---
theme: tech
colorSchema: dark
highlighter: shiki
css: unocss
title: requestAnimationFrame 深入解析
info: |
  requestAnimationFrame 深入解析
  探索瀏覽器動畫的最佳實踐
transition: fade
mdc: true
layout: full
---

<Slide1Cover />

---
layout: full
---

<Slide2WhatIsRaf />

---
layout: full
---

<Slide3WhyNeedRaf />

---
layout: full
---

<Slide4RenderPipeline />

---
layout: full
---

<Slide5AnimationDemo />

---
layout: full
---

<Slide6ComputationBestPractice />

---
layout: full
---

<Slide7CancelAnimation />

---
layout: full
---

<Slide8UseCases />

---
layout: full
---

<Slide9Summary />

---
layout: tech-content
eyebrow: References
title: 參考文獻
---

<div class="grid grid-cols-2 gap-x-10 gap-y-4 text-lg text-slate-300">
  <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">MDN：Window.requestAnimationFrame()</div>
    <div class="text-sm text-slate-400 break-all">https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame</div>
  </a>
  <a href="https://html.spec.whatwg.org/multipage/image-bitmaps.html#animation-frame-callbacks" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">HTML 標準：動畫幀回調（Animation frame callbacks）</div>
    <div class="text-sm text-slate-400 break-all">https://html.spec.whatwg.org/multipage/image-bitmaps.html#animation-frame-callbacks</div>
  </a>
  <a href="https://web.dev/learn/performance/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">web.dev：Learn Performance</div>
    <div class="text-sm text-slate-400 break-all">https://web.dev/learn/performance/</div>
  </a>
  <a href="https://ithelp.ithome.com.tw/articles/10315062" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">瀏覽器渲染原理與流程</div>
    <div class="text-sm text-slate-400 break-all">https://ithelp.ithome.com.tw/articles/10315062</div>
  </a>
  <a href="https://www.liuxing.io/blog/how-browser-rendering-works/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">瀏覽器渲染工作原理</div>
    <div class="text-sm text-slate-400 break-all">https://www.liuxing.io/blog/how-browser-rendering-works/</div>
  </a>
  <a href="https://nacho.coderbridge.io/2020/11/07/rendering-path/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">關鍵渲染路徑（Critical Rendering Path）</div>
    <div class="text-sm text-slate-400 break-all">https://nacho.coderbridge.io/2020/11/07/rendering-path/</div>
  </a>
  <a href="https://codingnote.cc/zh-hk/p/499959/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">瀏覽器渲染流程筆記</div>
    <div class="text-sm text-slate-400 break-all">https://codingnote.cc/zh-hk/p/499959/</div>
  </a>
  <a href="https://israynotarray.com/other/20250424/3992645625/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">瀏覽器渲染與性能優化</div>
    <div class="text-sm text-slate-400 break-all">https://israynotarray.com/other/20250424/3992645625/</div>
  </a>
</div>

---
layout: full
---

<Slide10End />
