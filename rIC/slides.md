---
theme: tech
colorSchema: dark
highlighter: shiki
css: unocss
title: requestIdleCallback 知識分享
info: |
  requestIdleCallback 知識分享
  瀏覽器閒置時間的利用
transition: fade
mdc: true
layout: full
---

<Slide1Cover />

---
layout: full
---

<Slide2ReviewRaf />

---
layout: full
---

<Slide3LowPriorityTasks />

---
layout: full
---

<Slide4WhatIsRic />

---
layout: full
---

<Slide5BrowserWorkCycle />

---
layout: full
---

<Slide6BasicSyntax />

---
layout: full
---

<Slide7IdleDeadline />

---
layout: full
---

<Slide8UseCases />

---
layout: full
---

<Slide9BatchTasksDemo />

---
layout: full
---

<Slide10PreloadResources />

---
layout: full
---

<Slide11RafVsRic />

---
layout: full
---

<Slide12BestPractices />

---
layout: full
---

<Slide13CancelIdleCallback />

---
layout: full
---

<Slide14Summary />

---
layout: tech-content
eyebrow: References
title: 參考文獻
---

<div class="grid grid-cols-2 gap-x-10 gap-y-4 text-lg text-slate-300">
  <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">MDN Web Docs：Window.requestIdleCallback()</div>
    <div class="text-sm text-slate-400 break-all">https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback</div>
  </a>
  <a href="https://developers.google.com/web/updates/2015/08/using-idle-callbacks" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">Using requestIdleCallback（Google 官方教學）</div>
    <div class="text-sm text-slate-400 break-all">https://developers.google.com/web/updates/2015/08/using-idle-callbacks</div>
  </a>
  <a href="https://web.dev/learn/performance/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">web.dev：Learn performance 效能學習課程</div>
    <div class="text-sm text-slate-400 break-all">https://web.dev/learn/performance/</div>
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/API/IdleDeadline" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">MDN Web Docs：IdleDeadline</div>
    <div class="text-sm text-slate-400 break-all">https://developer.mozilla.org/en-US/docs/Web/API/IdleDeadline</div>
  </a>
</div>

---
layout: full
---

<Slide15End />
