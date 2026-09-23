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

<div class="grid grid-cols-2 gap-3">
  <ReferenceCard index="1" title="MDN：Content Security Policy (CSP) 總覽" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP" />
  <ReferenceCard index="2" title="MDN：Content-Security-Policy 標頭" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy" />
  <ReferenceCard index="3" title="MDN：script-src 指令" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src" />
  <ReferenceCard index="4" title="web.dev：使用 Strict CSP 保護網站" href="https://web.dev/articles/strict-csp" />
  <ReferenceCard index="5" title="CSP 指令與來源快速參考" href="https://content-security-policy.com/" />
  <ReferenceCard index="6" title="W3C：Content Security Policy 規範" href="https://w3c.github.io/webappsec-csp/" />
</div>
