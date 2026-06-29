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
layout: center
class: text-center
---

# 二、用一個隨行杯，秒懂「侵權」

<div class="text-lg mt-3 opacity-80">假設有人申請了一項「多功能折疊隨行杯」專利，它的<b>申請專利範圍（Claim）</b>寫著：</div>

<div class="mt-6 mx-auto max-w-3xl p-5 rounded-2xl border border-teal-500/40 bg-teal-900/20 text-left text-lg leading-relaxed">
一種隨行杯，<b class="text-teal-300">包含</b>：
<div class="grid grid-cols-3 gap-3 mt-3 text-base">
  <div class="claim-el"><b class="text-teal-300">A</b> 矽膠杯身</div>
  <div class="claim-el"><b class="text-teal-300">B</b> 可拆卸隔熱杯套</div>
  <div class="claim-el"><b class="text-teal-300">C</b> 磁吸防漏杯蓋</div>
</div>
</div>

<div class="mt-6 text-xl">
這個專利的「保護範圍」＝ <span v-mark.circle.orange="1" class="font-mono font-bold text-amber-300">A ＋ B ＋ C</span>
</div>

<div class="mt-3 text-base opacity-70">接下來，看別人做的杯子，到底踩線了沒？</div>

<style>
.claim-el {
  border: 1px solid rgba(45,212,191,0.3);
  border-radius: 10px;
  background: rgba(15,23,42,0.5);
  padding: 0.6rem;
  text-align: center;
}
</style>

<!--
「包含 / comprising」是開放式用語，這是關鍵 —— 等下案例 2 會用到。
-->

---

# 怎麼算「有侵權」？

<div class="opacity-70 mb-3 text-sm">只要產品「裝下」整組 A＋B＋C，就算踩線（全要件原則）</div>

<div class="grid gap-2.5">
  <CaseCard :n="1" title="完全抄襲" combo="A + B + C" :infringe="true">
    矽膠杯身、可拆卸隔熱套、磁吸防漏蓋全都有 —— 完全符合字面所有特徵。這就是最標準的 <b>文義侵權</b>。
  </CaseCard>
  <CaseCard :n="2" title="畫蛇添足" combo="A + B + C + D" :infringe="true">
    多加了一塊「LED 溫度顯示面板（D）」，但因為專利用<b>「包含」</b>這種開放式寫法，只要 A、B、C 都在，<b>多加功能照樣逃不掉</b>。
  </CaseCard>
  <CaseCard :n="3" title="改包裝不改本質" combo="A + B + C′" :infringe="true">
    想避開，把磁吸蓋改成「卡榫扣環（C′）」。但用三要素一比 —— <b>手段</b>都是物理固定、<b>功能</b>都是杯蓋不鬆脫、<b>效果</b>都是防漏，輕易可置換 → 落入 <b>均等論</b>。
  </CaseCard>
</div>

<!--
案例 3 是「均等論」的精髓：改個字面但實質一樣，照樣侵權。
-->

---

# 怎麼算「沒侵權」？

<div class="opacity-70 mb-3 text-sm">少一味、或換成「原理本質不同」的技術，才真正安全</div>

<div class="grid gap-2.5">
  <CaseCard :n="4" title="缺少關鍵特徵" combo="A + C（缺 B）" :infringe="false">
    宣稱杯身特殊雙層設計，<b>完全不需要隔熱套（沒有 B）</b>。產品只有 A＋C，缺了專利要的 B → <b>不滿足全要件原則</b>，不侵權。
  </CaseCard>
  <CaseCard :n="5" title="技術實質不同" combo="A + B + E" :infringe="false">
    杯蓋既非磁吸也非卡榫，而是「靠杯內氣壓差吸住杯緣的氣壓防漏蓋（E）」。<b>工作原理本質不同</b>（磁力 vs 氣壓），超出均等範圍 → 不侵權。
  </CaseCard>
</div>

<div class="mt-5 mx-auto max-w-4xl p-4 rounded-2xl bg-amber-900/20 border border-amber-500/40">
  <div class="text-amber-300 font-bold mb-1">🍱 快速判斷心法：把專利範圍當成「套餐組合」</div>
  <div class="text-sm leading-relaxed">
    別人的產品<b>包含你套餐裡所有東西</b>（不管有沒有加料）→ <b class="text-rose-300">侵權</b>；
    <b>少了任何一樣</b>，或把其中一樣換成<b>原理完全不同</b>的技術 → 通常<b class="text-emerald-300">沒侵權</b>。
  </div>
</div>

---
layout: section
---

# 三、侵權判定的四種類型

<div class="opacity-70 mt-2">AI 比對報告，背後就是依這套法理在跑</div>

---

# 四種侵權類型一次看懂

<div class="max-w-5xl mx-auto text-sm">

| 侵權類型 | 技術特徵比對狀態 | 判定關鍵 |
| --- | --- | --- |
| **文義侵權** | 字面完全吻合（A ＝ A） | 符合全要件原則（All Elements Rule） |
| **均等侵權** | 字面不同、實質相同（A ≈ A′） | 滿足「手段 / 功能 / 效果」三實質原則 |
| **直接侵權** | 行為人直接做出含所有特徵的產品 | 實施了製造、銷售、使用等行為 |
| **間接侵權** | 提供關鍵零件或教唆他人組合 | 具體主觀故意，且零件無其他合理用途 |

</div>

<div class="grid grid-cols-2 gap-4 mt-5 max-w-5xl mx-auto">
  <div class="p-3.5 rounded-xl border border-sky-500/40 bg-sky-900/15 text-sm">
    <b class="text-sky-300">⚖️ 均等論三要素（Way-Function-Result）</b><br>
    <span class="opacity-85">字面不符時，看替代特徵的<b>手段 Way</b>、<b>功能 Function</b>、<b>效果 Result</b> 是否三者皆實質相同 —— 原理本質不同（如磁吸 vs 氣壓）即超出範圍。</span>
  </div>
  <div class="p-3.5 rounded-xl border border-violet-500/40 bg-violet-900/15 text-sm">
    <b class="text-violet-300">🛡️ 兩大防禦手段</b><br>
    <span class="opacity-85"><b>先前技術阻卻</b>：該技術早已是公知；<b>申請歷史禁反言</b>：申請時為過關自己限縮過的範圍，告人時不能再用均等論撈回來。</span>
  </div>
</div>

---
layout: section
---

# 四、最常見的誤解與盲點

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
layout: section
---

# 五、正規 FTO 怎麼做？

<div class="opacity-70 mt-2">看懂人工流程有多費工，就知道 AI 該切進哪一刀</div>

---

# FTO 標準流程：四步

<div class="grid grid-cols-4 gap-3 mt-6">
  <div class="flow">
    <div class="flow-n">1</div>
    <div class="flow-t">確認產品技術特徵</div>
    <div class="flow-d">拆解自家產品的結構、運作方式、關鍵特徵。</div>
  </div>
  <div class="flow">
    <div class="flow-n">2</div>
    <div class="flow-t">搜尋相關專利</div>
    <div class="flow-d">用關鍵字、IPC/CPC 分類、競爭對手找出可疑專利。</div>
  </div>
  <div class="flow flow-hot">
    <div class="flow-n">3</div>
    <div class="flow-t">Claim Mapping<br>權利項比對</div>
    <div class="flow-d">逐一比對產品特徵是否落入請求項範圍 —— <b>最重要、最耗時</b>。</div>
  </div>
  <div class="flow">
    <div class="flow-n">4</div>
    <div class="flow-t">出具 FTO Opinion</div>
    <div class="flow-d">由專利律師給出 Low / Medium / High / Need License。</div>
  </div>
</div>

<div class="mt-8 mx-auto max-w-4xl p-4 rounded-2xl bg-teal-900/25 border border-teal-500/40 text-center">
  💡 第 3 步 <b class="text-teal-300">Claim Mapping</b> 是整個流程最花人力、最需要專業判斷的環節 ——
  <b class="text-amber-300">而這正是這個 AI 功能要自動化的那一步。</b>
</div>

<style>
.flow {
  border: 1px solid rgba(148,163,184,0.2);
  border-radius: 14px;
  background: rgba(30,41,59,0.45);
  padding: 1rem 0.9rem;
  text-align: center;
}
.flow-hot {
  border-color: rgba(45,212,191,0.5);
  background: rgba(13,148,136,0.15);
}
.flow-n {
  width: 2.1rem; height: 2.1rem; line-height: 2.1rem;
  margin: 0 auto 0.55rem;
  border-radius: 50%;
  background: linear-gradient(135deg,#0ea5e9,#2dd4bf);
  color: #042f2e; font-weight: 800;
}
.flow-t { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.4rem; line-height: 1.25; }
.flow-d { font-size: 0.76rem; opacity: 0.78; line-height: 1.4; }
</style>

---

# 萬一發現 Blocking Patent，怎麼辦？

<div class="opacity-70 mb-4 text-sm">比對出「會踩線」不是死路 —— 有四條常見出路</div>

<div class="grid grid-cols-2 gap-4 max-w-5xl mx-auto">
  <div class="sol">
    <div class="sol-h text-teal-300">🛠️ 方案 1：Design Around</div>
    <div class="sol-d">修改設計避開請求項。例如把 <span class="font-mono">A+B+C</span> 改成 <span class="font-mono">A+B+D</span>，跳出保護範圍。<span class="opacity-70">← AI 報告的「建議」就在幫這件事</span></div>
  </div>
  <div class="sol">
    <div class="sol-h text-sky-300">🤝 方案 2：取得授權</div>
    <div class="sol-d">與專利權人簽 License Agreement，付授權金合法使用。</div>
  </div>
  <div class="sol">
    <div class="sol-h text-amber-300">💰 方案 3：收購專利</div>
    <div class="sol-d">直接買下該專利，從根本解決阻擋問題。</div>
  </div>
  <div class="sol">
    <div class="sol-h text-rose-300">⚔️ 方案 4：挑戰有效性</div>
    <div class="sol-d">若該專利其實不具新穎性，可提 IPR、舉發 / 無效宣告。</div>
  </div>
</div>

<style>
.sol {
  border: 1px solid rgba(148,163,184,0.2);
  border-radius: 14px;
  background: rgba(30,41,59,0.45);
  padding: 1rem 1.2rem;
}
.sol-h { font-weight: 800; font-size: 1.05rem; margin-bottom: 0.5rem; }
.sol-d { font-size: 0.85rem; line-height: 1.5; opacity: 0.9; }
</style>

---
layout: center
---

# 六、為什麼要做這個功能？

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

# 七、這個功能怎麼運作？

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

# 八、做了有什麼價值？

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

# 九、目前進度（這次 Demo 的範圍）

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
