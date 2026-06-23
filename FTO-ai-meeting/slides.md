---
theme: seriph
background: https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070
colorSchema: dark
highlighter: shiki
lineNumbers: false
title: FTO × AI 產品比對功能
info: |
  ## FTO × AI 產品比對功能 Demo
  讓使用者在做產品之前，先用 AI 幫他檢查「我的產品會不會踩到這篇專利」。
class: text-center
transition: slide-left
mdc: true
duration: 20min
---

# FTO × AI 產品比對功能

讓使用者在做產品之前，先用 AI 幫他回答一句話

<div class="mt-6 text-2xl text-teal-300 font-semibold">
「我的產品，會不會踩到這篇專利？」
</div>

<div class="abs-br m-6 text-sm opacity-60">
內部 Demo 說明 · PatentPilot 加值功能
</div>

<!--
這次要 demo 的是一個 POC：在專利詳目頁加一顆「FTO 比對」按鈕，
讓使用者貼上自己的產品，AI 即時產出一份初步的侵權風險報告。
-->

---
layout: center
class: text-center
---

# 一、什麼是 FTO？

<div class="text-xl mt-2 mb-8 opacity-80">
FTO = <span class="text-teal-300 font-bold">Freedom to Operate</span>（自由實施）
</div>

<div class="text-2xl leading-relaxed">
我這個產品做出來、賣出去，<br>
<span class="text-amber-300 font-bold">會不會侵犯到別人已經註冊的專利？</span>
</div>

<div class="grid grid-cols-2 gap-6 mt-12 text-left max-w-3xl mx-auto">
  <div class="p-4 rounded-xl border border-slate-600/40 bg-slate-800/40">
    🏠 <b>蓋房子前</b><br>
    <span class="text-sm opacity-75">先確認這塊地有沒有別人的地界，免得房子蓋好被拆。</span>
  </div>
  <div class="p-4 rounded-xl border border-slate-600/40 bg-slate-800/40">
    🏪 <b>開店前</b><br>
    <span class="text-sm opacity-75">先查店名會不會撞到別人的商標。</span>
  </div>
</div>

<div class="mt-8 text-lg">
FTO 就是把產品賣出去之前的 <span v-mark.circle.orange="1" class="font-bold">「地界確認」</span>
</div>

<!--
沒做 FTO 就投產，等於閉著眼睛蓋房子。
可能花幾百萬開模量產，結果收到一張專利侵權警告信 —— 輕則賠錢，重則整批產品下架。
-->

---
layout: section
---

# 二、最常見的誤解與盲點

<div class="opacity-70 mt-2">這些坑，連研發、業務都常踩 —— 也正是這個功能想幫使用者避開的</div>

---

# 七個致命誤解（1 / 2）

<div class="grid gap-3 mt-3">
  <MythCard :n="1" myth="我自己有專利，就可以自由製造販售。">
    <b>有專利 ≠ 可以自由實施。</b> 專利給你的是「禁止別人用」的權利，不是「自己一定能用」的權利。你的產品就算有自己的專利，<b>照樣可能踩到別人的專利</b>。這是最致命的誤解。
  </MythCard>
  <MythCard :n="2" myth="市面上沒看到一模一樣的產品，應該就安全。">
    侵權與否是看專利的 <b>「申請專利範圍（Claims）」</b>，不是比對市面上有沒有同樣的產品。對方可能根本還沒量產，但專利早就把範圍圈起來了。
  </MythCard>
  <MythCard :n="3" myth="我的產品跟專利不完全一樣，改幾個地方就沒事。">
    只要落入某一項請求項的<b>所有技術特徵</b>就算侵權（全要件原則）；就算不是字面一模一樣，<b>功能、手段、結果實質相同</b>也可能因「均等論」被判侵權。
  </MythCard>
  <MythCard :n="4" myth="看專利的標題和摘要，大概就知道有沒有踩到。">
    判斷依據是<b>請求項（尤其是獨立項）</b>，不是標題或摘要。標題看似無關，範圍卻可能涵蓋你的產品；反之亦然。
  </MythCard>
</div>

---

# 七個致命誤解（2 / 2）

<div class="grid gap-3 mt-3">
  <MythCard :n="5" myth="在台灣沒這專利，那我賣到國外也沒問題。">
    <b>專利有地域性。</b> 一篇專利只在它「有註冊的國家」有效。要賣到哪個市場，就得確認<b>那個國家</b>的專利狀況。
  </MythCard>
  <MythCard :n="6" myth="FTO 做過一次，以後就一勞永逸。">
    FTO 是<b>「某個時間點的快照」</b>。新的專利、原本還沒公開的申請案會持續冒出來，風險會隨時間改變，需要在關鍵節點重新確認。
  </MythCard>
  <MythCard :n="7" myth="「能不能申請專利」跟「會不會侵權」是同一件事。">
    這是<b>兩個不同的問題</b>。能申請專利看的是「夠不夠新」；FTO 看的是「會不會踩到別人」。產品很創新、能拿到專利，<b>仍可能同時侵犯別人的專利</b>。
  </MythCard>
</div>

<div class="mt-4 p-3 rounded-xl bg-teal-900/30 border border-teal-500/40 text-center">
  💡 一句話總結：FTO 的核心是<b class="text-teal-300">「比對請求項、看落不落入範圍」</b> —— 而這正是 <b class="text-teal-300">AI 最能幫上忙</b>、最省時間的地方。
</div>

---
layout: center
---

# 三、為什麼要做這個功能？

<div class="text-xl mt-4 text-center opacity-80">
使用者在平台上找到一篇相關專利後，心裡真正想問的是：
</div>

<div class="text-3xl text-center my-8 font-bold text-amber-300">
「那……我的產品到底有沒有踩到它？」
</div>

<div class="max-w-4xl mx-auto">

| 現在的痛點 | 後果 |
| --- | --- |
| 要逐條看完「申請專利範圍」，讀懂法律語言 | 一般工程師 / PM 看不懂、看不完 |
| 要自己比對產品的每個技術特徵 | 耗時、容易漏 |
| 要找專利師做正式鑑定 | 貴、慢，不適合每篇都做 |

</div>

<div class="mt-8 text-center text-lg">
結果：<b>大多數人查完專利，卡在「然後呢？」</b><br>
<span class="text-teal-300 font-bold">這個功能，就是要補上這關鍵的最後一哩路。</span>
</div>

---
layout: section
---

# 四、這個功能怎麼運作？

<div class="opacity-70 mt-2">在專利詳目頁，新增一顆「FTO 比對」按鈕 —— 使用者只要 3 步</div>

---

# 使用者只要 3 步

<div class="grid grid-cols-3 gap-5 mt-6">
  <div class="step">
    <div class="step-n">1</div>
    <div class="step-t">點開面板</div>
    <div class="step-d">一邊是這篇專利，一邊是輸入框。</div>
  </div>
  <div class="step">
    <div class="step-n">2</div>
    <div class="step-t">貼上產品資訊</div>
    <div class="step-d">產品結構、運作方式、主要技術特徵。</div>
  </div>
  <div class="step">
    <div class="step-n">3</div>
    <div class="step-t">按下「開始比對」</div>
    <div class="step-d">AI 即時逐字產出一份 FTO 分析報告。</div>
  </div>
</div>

<div class="mt-8 text-lg font-semibold opacity-85">報告內容包含：</div>

<div class="grid grid-cols-2 gap-3 mt-3 text-sm">
  <div class="rcard">🚦 <b>整體風險等級</b>（高 / 中 / 低）＋ 一句話結論</div>
  <div class="rcard">📋 <b>逐項比對表</b>：每個技術特徵，產品有沒有對應到</div>
  <div class="rcard">🔍 <b>關鍵差異點</b>：哪裡可能踩到、哪裡安全</div>
  <div class="rcard">💡 <b>建議</b>：可以怎麼調整設計來迴避</div>
</div>

<style>
.step {
  border: 1px solid rgba(148,163,184,0.2);
  border-radius: 14px;
  background: rgba(30,41,59,0.45);
  padding: 1.1rem;
  text-align: center;
}
.step-n {
  width: 2.4rem; height: 2.4rem; line-height: 2.4rem;
  margin: 0 auto 0.6rem;
  border-radius: 50%;
  background: linear-gradient(135deg,#0ea5e9,#2dd4bf);
  color: #042f2e; font-weight: 800; font-size: 1.2rem;
}
.step-t { font-weight: 700; font-size: 1.1rem; margin-bottom: 0.4rem; }
.step-d { font-size: 0.82rem; opacity: 0.75; }
.rcard {
  border: 1px solid rgba(148,163,184,0.2);
  border-radius: 10px;
  background: rgba(30,41,59,0.4);
  padding: 0.7rem 0.9rem;
}
</style>

<!--
報告會標明「僅供初步參考，不構成正式法律意見」。
-->

---
layout: center
class: px-8
---

# 🔴 實際操作 Demo

<div class="text-center opacity-70 -mt-2 mb-1 text-sm">點「開始比對」，看 AI 如何逐字串流出一份 FTO 報告</div>

<FtoCompareDemo />

<!--
這頁是現場 demo。點開始比對，AI 會像真實 AI 一樣逐字串流產出報告：
先給整體風險紅綠燈，再逐項比對、指出關鍵差異、給出迴避建議。
注意右下角的免責聲明。
-->

---

# 五、做了有什麼價值？

<div class="grid grid-cols-2 gap-6 mt-6">

<div class="vcard border-teal-500/40">
  <div class="vhead text-teal-300">👤 對使用者</div>
  <ul class="vlist">
    <li>把看不懂的法律語言，變成<b>看得懂的風險紅綠燈</b></li>
    <li>幾秒得到初步答案，<b>不用等專利師、不用先花錢</b></li>
    <li>把「該怎麼修改設計才安全」具體化，直接幫到研發</li>
  </ul>
</div>

<div class="vcard border-sky-500/40">
  <div class="vhead text-sky-300">🏢 對公司 / 平台</div>
  <ul class="vlist">
    <li>從「<b>查得到專利</b>」升級到「<b>幫你做決策</b>」，命中真實需求</li>
    <li>明確的 <b>AI 加值賣點</b>，可作為付費方案的差異化功能</li>
    <li>沿用現有 AI 架構，<b>開發成本低、可快速上線</b></li>
  </ul>
</div>

</div>

<style>
.vcard {
  border: 1px solid; border-radius: 16px;
  background: rgba(30,41,59,0.4); padding: 1.3rem 1.5rem;
}
.vhead { font-size: 1.25rem; font-weight: 800; margin-bottom: 0.8rem; }
.vlist { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.7rem; }
.vlist li { padding-left: 1.2rem; position: relative; line-height: 1.5; }
.vlist li::before { content: "→"; position: absolute; left: 0; color: #2dd4bf; }
</style>

---
layout: center
---

# 六、目前進度（這次 Demo 的範圍）

<div class="text-center text-lg mb-8 opacity-80">
這是一個 <b class="text-teal-300">POC（概念驗證）</b>，目的是讓大家先看到<b>完整的使用體驗</b>
</div>

<div class="max-w-3xl mx-auto flex flex-col gap-3">
  <div class="pcard"><span class="text-green-400 text-xl">✅</span> 完整的前端介面與操作流程（按鈕 → 輸入 → 串流產出報告）</div>
  <div class="pcard"><span class="text-green-400 text-xl">✅</span> 報告以 AI 逐字串流呈現，<b>體感與真實 AI 一致</b></div>
  <div class="pcard"><span class="text-amber-400 text-xl">⚙️</span> 目前分析內容是<b>內建示範範例</b>（讓 Demo 不依賴外部 AI 就能跑）</div>
</div>

<div class="mt-10 max-w-3xl mx-auto p-5 rounded-2xl bg-teal-900/30 border border-teal-500/40 text-center">
  <div class="text-sm opacity-70 mb-1">要變成正式版，只差一步</div>
  <div class="text-lg">把分析引擎接上既有 AI 服務 <b class="text-teal-300">PatentPilot</b>，補一組「FTO 比對」提示詞即可<br><b class="text-amber-300">前端完全不用改</b></div>
</div>

<style>
.pcard {
  display: flex; align-items: center; gap: 0.8rem;
  border: 1px solid rgba(148,163,184,0.2); border-radius: 12px;
  background: rgba(30,41,59,0.4); padding: 0.85rem 1.2rem;
}
</style>

---
layout: center
class: text-center
---

# 一句話總結

<div class="text-3xl leading-relaxed mt-6">
讓使用者在做產品之前，<br>
先用 AI 幫他檢查<br>
<span class="text-teal-300 font-bold">「我的產品，會不會踩到這篇專利？」</span>
</div>

<div class="mt-12 text-lg opacity-70">
查得到專利 → <span class="text-teal-300">幫你做決策</span>
</div>

<div class="abs-br m-6 text-sm opacity-50">
本文件供內部 Demo 說明使用
</div>
