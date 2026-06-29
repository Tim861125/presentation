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
duration: 10min
---

# FTO × AI 產品比對功能

<div class="text-xl mt-3 opacity-80">
FTO = <span class="text-teal-300 font-bold">Freedom to Operate</span>（自由實施）：我的產品做出來、賣出去，<span class="text-amber-300 font-bold">會不會踩到別人的專利？</span>
</div>

<div class="grid grid-cols-2 gap-5 mt-8 text-left max-w-3xl mx-auto">
  <div class="p-4 rounded-xl border border-slate-600/40 bg-slate-800/40">
    🏠 <b>賣產品前做 FTO</b><br>
    <span class="text-sm opacity-75">就像蓋房子前先確認地界 —— 沒做就投產，等於閉眼蓋房子，可能整批被下架。</span>
  </div>
  <div class="p-4 rounded-xl border border-amber-500/40 bg-amber-900/15">
    😵 <b>現在的痛點</b><br>
    <span class="text-sm opacity-75">使用者在平台查到一篇相關專利後，卡在一句 ——「那……<b class="text-amber-300">我到底有沒有踩到它？</b>」</span>
  </div>
</div>

<div class="mt-8 text-xl">
這個功能，就是用 AI 幫他回答 <span v-mark.circle.orange="1" class="font-bold text-teal-300">「我的產品，會不會踩到這篇專利？」</span>
</div>

<div class="abs-br m-6 text-sm opacity-60">
內部 Demo 說明 · PatentPilot 加值功能
</div>

<!--
全場一句話：把「查得到專利」升級成「幫你做決策」。
-->

---

# 一、最致命的誤解 ⚠️

<div class="text-center text-2xl mt-2 mb-6">
「我把產品做出來、還去<b>申請了專利</b>，這樣應該<span class="line-through opacity-60">就沒事了吧？</span>」
<div class="text-amber-300 font-bold mt-2">❌ 其實——你還是有可能踩到別人的專利。</div>
</div>

<div class="grid grid-cols-2 gap-5 max-w-5xl mx-auto">
  <div class="p-5 rounded-xl border border-slate-600/40 bg-slate-800/40">
    <div class="text-slate-300 font-bold mb-2">😌 直覺以為</div>
    <ul class="list-none p-0 flex flex-col gap-2 text-sm opacity-90">
      <li>「我有做出產品，當然能賣。」</li>
      <li>「我還申請到專利了，更安全。」</li>
      <li>「市面上沒看到一樣的，應該沒事。」</li>
    </ul>
  </div>
  <div class="p-5 rounded-xl border border-rose-500/40 bg-rose-900/15">
    <div class="text-rose-300 font-bold mb-2">😱 真相</div>
    <ul class="list-none p-0 flex flex-col gap-2 text-sm opacity-90">
      <li>專利是「<b>禁止別人用</b>」的權利，<br>不是「<b>自己一定能用</b>」的許可證。</li>
      <li>「<b>能不能申請</b>」和「<b>會不會侵權</b>」是兩件事。</li>
      <li>你的產品可能用到<b>別人更早、更上位</b>的專利特徵。</li>
    </ul>
  </div>
</div>

<div class="mt-6 max-w-4xl mx-auto p-4 rounded-xl bg-teal-900/30 border border-teal-500/40 text-center">
  🏠 就像：你蓋了一棟很特別的房子（＝拿到專利），<b class="text-amber-300">不代表這塊地不是別人的</b>。
  房子能不能蓋，要看<b class="text-teal-300">「有沒有踩到別人的地界」</b> —— 這就是 FTO 要回答的問題。
</div>

---

# 二、FTO 專利分析完整流程

<div class="opacity-70 text-sm -mt-1 mb-3">目的不是「申請自己的專利」，而是確認產品上市/製造/販售時 <b class="text-amber-300">會不會踩到別人的有效專利</b>，避開高額訴訟與下架風險。</div>

<div class="flex flex-col gap-2.5 max-w-5xl mx-auto">
  <div class="step">
    <div class="sno">1</div>
    <div><b>界定產品技術特徵</b> <span class="en">Feature List</span><br><span class="sdesc">拆解產品列出技術特徵表（結構/材料/製程/演算法），<b>不能只拿產品名稱去搜</b>。</span></div>
  </div>
  <div class="step">
    <div class="sno">2</div>
    <div><b>確立檢索範圍</b> <span class="en">Scope</span><br><span class="sdesc">專利有<b>地域性與時效性</b>：鎖定目標國家、仍有效/審查中的專利、主要競爭對手。</span></div>
  </div>
  <div class="step">
    <div class="sno">3</div>
    <div><b>執行專利檢索</b> <span class="en">Search</span><br><span class="sdesc">以關鍵字＋IPC/CPC 分類號＋對手名交叉檢索：上千件 → 初篩出數十件高相關威脅。</span></div>
  </div>
  <div class="step step-hi">
    <div class="sno">4</div>
    <div><b>權利要求書比對</b> <span class="en">Claim Mapping</span> <span class="tag">最核心</span><br><span class="sdesc">產品特徵 vs 請求項逐項比對、做 Claim Chart，判文義/均等侵權 — <b class="text-teal-300">正是本 AI 功能切入、最省時間的一步</b>。</span></div>
  </div>
  <div class="step">
    <div class="sno">5</div>
    <div><b>風險評估與控管策略</b> <span class="en">Risk & Strategy</span><br><span class="sdesc">風險分級（高/中/低）＋擬定應對策略，由律師出具正式 <b>FTO 法律意見書</b>。</span></div>
  </div>
</div>

<style>
.step { display: flex; gap: 0.9rem; align-items: flex-start; padding: 0.5rem 0.9rem; border-radius: 10px; background: rgba(30,41,59,0.4); border: 1px solid rgba(148,163,184,0.18); }
.step-hi { background: rgba(13,148,136,0.18); border-color: rgba(45,212,191,0.5); }
.sno { flex: none; width: 1.9rem; height: 1.9rem; border-radius: 50%; background: #2dd4bf; color: #042f2e; font-weight: 800; display: flex; align-items: center; justify-content: center; }
.en { font-size: 0.72rem; color: #94a3b8; font-weight: 600; }
.sdesc { font-size: 0.82rem; opacity: 0.85; line-height: 1.4; }
.tag { font-size: 0.62rem; background: #f59e0b; color: #422006; padding: 0.05rem 0.4rem; border-radius: 6px; font-weight: 800; margin-left: 0.3rem; }
</style>

---
layout: center
class: px-8
---

# 三、這個功能怎麼用？ 🔴 實際 Demo

<div class="text-center opacity-75 -mt-1 mb-1 text-sm">
3 步：<b>① 點開面板 → ② 貼上產品資訊 → ③ 按「開始比對」</b>，AI 即時逐字串流出報告（風險燈號 · 逐項比對 · 關鍵差異 · 迴避建議）
</div>

<FtoCompareDemo />

<!--
現場 demo：點「開始比對」，AI 會像真實 AI 一樣逐字串流產出報告。
注意右下角免責聲明：僅供初步參考，不構成正式法律意見。
-->

---
hide: true
---

# 四、踩到高風險專利？5 大應對策略

<div class="grid grid-cols-2 gap-3 max-w-5xl mx-auto mt-1">
  <div class="scard"><b class="text-emerald-300">① 迴避設計</b> <span class="en">Design Around</span><br><span class="sdesc">改結構/材料/製程繞開對方請求項 —— <b>最常見、成本最低</b>。</span></div>
  <div class="scard"><b class="text-emerald-300">② 提出舉發</b> <span class="en">Invalidation</span><br><span class="sdesc">攻對方專利瑕疵（缺新穎性/進步性），向官方申請撤銷其專利權。</span></div>
  <div class="scard"><b class="text-emerald-300">③ 洽談授權</b> <span class="en">Licensing</span><br><span class="sdesc">付權利金合法使用，把法律風險轉成<b>可控的商業成本</b>。</span></div>
  <div class="scard"><b class="text-emerald-300">④ 交叉授權</b> <span class="en">Cross-Licensing</span><br><span class="sdesc">自身也握有對方要的專利時互相授權，達成「恐怖平衡」。</span></div>
  <div class="scard col-span-2"><b class="text-emerald-300">⑤ 調整上市市場</b><br><span class="sdesc">某國專利壁壘太高且無法繞過時，放棄該市場或延後上市至專利過期。</span></div>
</div>

<div class="mt-4 max-w-5xl mx-auto p-3.5 rounded-xl bg-amber-900/20 border border-amber-500/45">
  💡 <b class="text-amber-300">為什麼一定要正式 FTO 意見書？</b>
  <span class="text-sm opacity-90">在美國等地，上市前由外部律師出具的 FTO 意見書，是企業已盡「<b>善意注意義務</b>」的強力證據，可免除/降低因<b>故意侵權</b>被判 <b class="text-amber-300">最高 3 倍懲罰性賠償</b> 的巨大風險。</span>
</div>

<div class="mt-3 text-center text-lg font-bold">
價值：把最核心、最耗時的「第 4 步逐項比對」交給 AI 幾秒完成 —— <span class="text-teal-300">讓 FTO 從「上市後的昂貴訴訟」，提前成「設計階段就能做的即時體檢」。</span>
</div>

<style>
.scard { padding: 0.55rem 0.85rem; border-radius: 10px; background: rgba(30,41,59,0.4); border: 1px solid rgba(148,163,184,0.18); }
.en { font-size: 0.7rem; color: #94a3b8; font-weight: 600; }
.sdesc { font-size: 0.8rem; opacity: 0.85; line-height: 1.4; }
</style>
