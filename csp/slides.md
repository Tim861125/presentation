---
theme: tech
colorSchema: dark
highlighter: shiki
css: unocss
title: CSP 知識分享
info: |
  Content Security Policy 知識分享
  移除 'unsafe-inline' 後的解決方案
transition: fade
mdc: true
layout: full
---

<Slide1Cover />

---
layout: full
---

<Slide2WhatIsCsp />

---
layout: full
---

<Slide3TheProblem />

---
layout: full
---

<Slide4WhyRemoveUnsafeInline />

---
layout: full
---

<Slide5SolutionsOverview />

---
layout: full
---

<Slide6ScriptHash />

---
layout: full
---

<Slide7ScriptHashCaveats />

---
layout: full
---

<Slide8UsingNonce />

---
layout: full
---

<Slide9NonceDetails />

---
layout: full
---

<Slide10ExternalScript />

---
layout: full
---

<Slide11ExternalScriptData />

---
layout: full
---

<Slide12ThirdPartyServices />

---
layout: full
---

<Slide13Comparison />

---
layout: full
---

<Slide14BestPractices />

---
layout: full
---

<Slide15MigrationSteps />

---
layout: full
---

<Slide16Summary />

---
layout: full
---

<Slide17QA />

---
layout: tech-content
eyebrow: References
title: 參考文獻
---

<div class="grid grid-cols-2 gap-x-10 gap-y-4 text-lg text-slate-300">
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">MDN：Content Security Policy (CSP) 總覽</div>
    <div class="text-sm text-slate-400 break-all">https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP</div>
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">MDN：Content-Security-Policy 標頭</div>
    <div class="text-sm text-slate-400 break-all">https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy</div>
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">MDN：script-src 指令</div>
    <div class="text-sm text-slate-400 break-all">https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src</div>
  </a>
  <a href="https://web.dev/articles/strict-csp" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">web.dev：使用 Strict CSP 保護網站</div>
    <div class="text-sm text-slate-400 break-all">https://web.dev/articles/strict-csp</div>
  </a>
  <a href="https://content-security-policy.com/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">CSP 指令與來源快速參考</div>
    <div class="text-sm text-slate-400 break-all">https://content-security-policy.com/</div>
  </a>
  <a href="https://w3c.github.io/webappsec-csp/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">W3C：Content Security Policy 規範</div>
    <div class="text-sm text-slate-400 break-all">https://w3c.github.io/webappsec-csp/</div>
  </a>
</div>
