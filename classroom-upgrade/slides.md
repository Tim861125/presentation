---
theme: seriph
background: ''
title: 教室空間升級估價報告
info: |
  ## 教室空間升級估價報告
  天花板 ‧ 門外 ‧ 門內 ‧ 設備
class: text-center
colorSchema: dark
highlighter: shiki
transition: slide-left
mdc: true
---

<div class="absolute inset-0 -z-1" style="background: linear-gradient(135deg, #0f2027 0%, #144552 45%, #1b6e6e 100%)" />
<div class="absolute -top-32 -right-32 w-150 h-150 rounded-full -z-1" style="background: radial-gradient(circle, rgba(45,212,191,0.25), transparent 70%)" />
<div class="absolute -bottom-40 -left-32 w-150 h-150 rounded-full -z-1" style="background: radial-gradient(circle, rgba(56,189,248,0.18), transparent 70%)" />

<div class="relative">

# 教室空間升級估價報告

<div class="text-xl opacity-80 mt-2">天花板 ‧ 門外 ‧ 門內 ‧ 設備</div>

<div class="text-sm opacity-50 mt-8">報告日期：2026-05-31</div>

</div>

---
layout: center
class: px-12
---

# 升級項目總覽

<div class="grid grid-cols-4 gap-4 mt-8">
  <div class="rounded-xl bg-white/5 border border-white/10 p-5 text-center">
    <div class="text-3xl">💡</div>
    <div class="font-semibold mt-2">天花板升級</div>
    <div class="text-xs opacity-60 mt-1">照明 ‧ 石膏板 ‧ 循環扇</div>
    <div class="text-teal-300 font-mono font-bold mt-3">$14,120</div>
  </div>
  <div class="rounded-xl bg-white/5 border border-white/10 p-5 text-center">
    <div class="text-3xl">🚪</div>
    <div class="font-semibold mt-2">門外改善</div>
    <div class="text-xs opacity-60 mt-1">軌道燈 ‧ logo ‧ 鐵門美化</div>
    <div class="text-teal-300 font-mono font-bold mt-3">約 $4,000</div>
  </div>
  <div class="rounded-xl bg-white/5 border border-white/10 p-5 text-center">
    <div class="text-3xl">📋</div>
    <div class="font-semibold mt-2">門內改善</div>
    <div class="text-xs opacity-60 mt-1">白板牆 ‧ 置物整潔</div>
    <div class="text-teal-300 font-mono font-bold mt-3">$2,000~3,000</div>
  </div>
  <div class="rounded-xl bg-white/5 border border-white/10 p-5 text-center">
    <div class="text-3xl">🔊</div>
    <div class="font-semibold mt-2">設備</div>
    <div class="text-xs opacity-60 mt-1">功放機櫃</div>
    <div class="text-teal-300 font-mono font-bold mt-3">$3,234</div>
  </div>
</div>

<div class="flex justify-end items-baseline gap-4 mt-8 pr-2">
  <div class="text-lg opacity-70">總計約</div>
  <div class="text-3xl font-bold text-teal-300 font-mono">$23,354 ~ 24,354</div>
</div>

<!--
整體升級估價報告，包含照明、天花板與通風三大項目。
-->

---
layout: section
---

# 一、天花板升級
<div class="opacity-60 mt-2">照明 ‧ 輕鋼架石膏板 ‧ 節能循環扇</div>

---
layout: image-right
image: /diagram.png
class: flex flex-col justify-center
---

# 升級後效果示意圖

<v-clicks>

- 💡 全面更換 **高流明 LED 平板燈**，亮度均勻、無眩光
- 🧱 翻新 **輕鋼架石膏板**，天花板整潔明亮
- 🌀 加裝 **節能循環扇**，提升空氣流通與舒適度

</v-clicks>

<div v-click class="mt-8 text-sm opacity-60">
右圖為三項升級整合後的整體效果示意。
</div>

---
layout: center
class: px-12
---

# 天花板 — 估價明細

<div class="flex flex-col gap-3 mt-6">
  <QuoteItem :index="1" name="LED 平板燈" spec="60×60cm ‧ 48W ‧ 4800LM ‧ 5700K 白光"
    image="/ceiling_shopee1.jpg" :price="320" :qty="18" unit="盞" />
  <QuoteItem :index="2" name="輕鋼架石膏板" spec="60×60cm ‧ 一箱 9 片裝"
    image="/seiling_shopee2.jpg" :price="60" :qty="78" unit="片" />
  <QuoteItem :index="3" name="六輕節能循環扇" spec="603×603mm ‧ DC 直流節能 ‧ 適用 4~6 坪"
    image="/fan_shopee.jpg" :price="1840" :qty="2" unit="台" />
</div>

<div class="flex justify-end items-baseline gap-4 mt-8 pr-2">
  <div class="text-lg opacity-70">總計</div>
  <div class="text-4xl font-bold text-teal-300 font-mono">$14,120</div>
</div>

---
layout: two-cols
layoutClass: gap-8
---

# ① LED 平板燈

<div class="text-sm leading-relaxed">

| 項目 | 規格 |
| --- | --- |
| 瓦數 | 48W |
| 電壓 | 100–240V |
| 流明 | 4800 LM（實測） |
| 色溫 | 5700K（白光建議） |
| 顯色性 | RA ≥ 80 |
| 壽命 | > 25,000 hr |
| 尺寸 | 60×60×3.5 cm |

</div>

<div class="mt-4 text-lg">
單價 <span class="font-mono">$320</span> × <span class="font-mono">18</span> 盞
= <span class="font-bold text-teal-300 font-mono">$5,760</span>
</div>

::right::

<img :src="'/ceiling_shopee1.jpg'" class="rounded-xl w-full max-h-100 object-contain mt-12" />

---
layout: two-cols
layoutClass: gap-8
---

# ② 輕鋼架石膏板

<div class="text-sm leading-relaxed">

- 標準 **60×60cm** 輕鋼架適用規格
- 一箱 **9 片**裝，多款表面紋路可選
- 可刷卡、可開立證明、快速到貨
- 適合大面積天花板整新

</div>

<div class="mt-6 text-lg">
單價 <span class="font-mono">$60</span> × <span class="font-mono">78</span> 片
= <span class="font-bold text-teal-300 font-mono">$4,680</span>
</div>

<div class="mt-2 text-sm opacity-60">
（約 9 箱用量，依實際格數調整）
</div>

::right::

<img :src="'/seiling_shopee2.jpg'" class="rounded-xl w-full max-h-100 object-contain mt-12" />

---
layout: two-cols
layoutClass: gap-8
---

# ③ 六輕節能循環扇

<div class="text-sm leading-relaxed">

| 項目 | 規格 |
| --- | --- |
| 型號 | TGC160D（DC 直流） |
| 額定電壓 | 110V~220V |
| 消耗功率 | 29W |
| 安裝尺寸 | 603×603×218 mm |
| 噪音值 | 50 dBA |
| 適用坪數 | 4~6 坪 |

</div>

<div class="mt-4 text-lg">
單價 <span class="font-mono">$1,840</span> × <span class="font-mono">2</span> 台
= <span class="font-bold text-teal-300 font-mono">$3,680</span>
</div>

::right::

<img :src="'/fan_shopee.jpg'" class="rounded-xl w-full max-h-100 object-contain mt-12" />

---
layout: section
---

# 二、門外改善
<div class="opacity-60 mt-2">門面形象 ‧ 照明 ‧ 鐵門美化</div>

---
layout: center
class: px-12
---

# 門外 — 估價明細

<div class="flex flex-col gap-3 mt-6">
  <CostItem :index="1" name="加裝軌道燈照門面、固定鐵門"
    spec="軌道燈打亮門面，鐵門固定不晃動" cost="約 $1,000 內" />
  <CostItem :index="2" name="投影燈加裝展示 LOGO"
    spec="門口投影校名／LOGO，提升識別與形象" cost="約 $2,000" />
  <CostItem :index="3" name="鐵門美化（多方案示意）"
    spec="門面包板／彩繪設計，整體質感升級" cost="約 $1,000" />
</div>

<div class="flex justify-end items-baseline gap-4 mt-6 pr-2">
  <div class="text-lg opacity-70">小計約</div>
  <div class="text-3xl font-bold text-teal-300 font-mono">$4,000</div>
</div>

---
layout: center
class: px-8
---

# 門面設計示意

<div class="grid grid-cols-2 gap-8 mt-4">
  <div class="text-center">
    <img :src="'/door-out-design1.jpg'" class="rounded-xl h-90 mx-auto object-contain" />
    <div class="text-sm opacity-70 mt-2">方案 A｜深色沉穩 ‧ 植栽牆 ‧ 軌道燈</div>
  </div>
  <div class="text-center">
    <img :src="'/door-out-design2.jpg'" class="rounded-xl h-90 mx-auto object-contain" />
    <div class="text-sm opacity-70 mt-2">方案 B｜明亮活力 ‧ 撞色設計 ‧ 植栽牆</div>
  </div>
</div>

---
layout: center
class: px-12
---

# 鐵門美化方案

<img :src="'/door-iron-options.png'" class="rounded-xl max-h-105 mx-auto object-contain mt-2" />

<div class="text-sm opacity-60 text-center mt-2">方案 1 現代金屬質感 ‧ 方案 2 活力動感設計 ‧ 方案 3 經典學術風格</div>

---
layout: section
---

# 三、門內改善
<div class="opacity-60 mt-2">公布欄白板牆 ‧ 置物空間整潔</div>

---
layout: center
class: px-12
---

# 門內 — 估價明細

<div class="flex flex-col gap-3 mt-6">
  <CostItem :index="1" name="進門右側新增白板牆（公布欄）"
    spec="高 120cm × 寬 150cm，作為公告與教學白板" cost="$1,000 ~ 1,500" />
  <CostItem :index="2" name="掛衣區牆面更新（掛勾牆／洞洞板）"
    spec="方案 D 簡約掛勾牆或 E 洞洞板收納牆，置物更整潔有序" cost="$1,000 ~ 1,500" />
</div>

<div class="flex justify-end items-baseline gap-4 mt-6 pr-2">
  <div class="text-lg opacity-70">小計約</div>
  <div class="text-3xl font-bold text-teal-300 font-mono">$2,000 ~ 3,000</div>
</div>

---
layout: center
class: px-8
---

# 門內現況與規劃

<div class="grid grid-cols-2 gap-8 mt-4">
  <div class="text-center">
    <img :src="'/door-in-whiteboard.jpg'" class="rounded-xl h-85 mx-auto object-contain" />
    <div class="text-sm opacity-70 mt-2">右側白板牆（120×150cm）作公布欄</div>
  </div>
  <div class="text-center">
    <img :src="'/door-in-storage.jpg'" class="rounded-xl h-85 mx-auto object-contain" />
    <div class="text-sm opacity-70 mt-2">掛衣區牆面方案 D 簡約掛勾牆 ／ E 洞洞板收納牆</div>
  </div>
</div>

---
layout: section
---

# 四、設備
<div class="opacity-60 mt-2">影音功放機櫃</div>

---
layout: two-cols
layoutClass: gap-8
---

# 功放機櫃

<div class="text-sm leading-relaxed">

- 多層開放式收納，整合 **擴大機、影音設備**
- 底部附 **滾輪**，移動／清潔方便
- 中式雕花側板，質感與通風兼顧
- 線材集中收納，桌面與機櫃整齊

</div>

<div class="mt-8 text-lg">
功放機櫃　<span class="font-bold text-teal-300 font-mono">$3,234</span>
</div>

::right::

<img :src="'/av-cabinet.webp'" class="rounded-xl w-full max-h-100 object-contain mt-12" />

---
layout: section
---

# 總估價

---
layout: center
class: text-center
---

# 估價總結

<div class="mx-auto max-w-2xl mt-6">
  <table class="w-full text-left">
    <thead class="opacity-60 text-sm">
      <tr>
        <th class="py-2">分類</th>
        <th class="py-2">項目</th>
        <th class="py-2 text-right">小計</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-t border-white/10">
        <td class="py-3">天花板升級</td>
        <td class="py-3 text-sm opacity-70">LED 平板燈 ‧ 石膏板 ‧ 循環扇</td>
        <td class="py-3 text-right font-mono">14,120</td>
      </tr>
      <tr class="border-t border-white/10">
        <td class="py-3">門外改善</td>
        <td class="py-3 text-sm opacity-70">軌道燈 ‧ LOGO 投影 ‧ 鐵門美化</td>
        <td class="py-3 text-right font-mono">約 4,000</td>
      </tr>
      <tr class="border-t border-white/10">
        <td class="py-3">門內改善</td>
        <td class="py-3 text-sm opacity-70">白板牆公布欄 ‧ 置物整潔</td>
        <td class="py-3 text-right font-mono">2,000~3,000</td>
      </tr>
      <tr class="border-t border-white/10">
        <td class="py-3">設備</td>
        <td class="py-3 text-sm opacity-70">功放機櫃</td>
        <td class="py-3 text-right font-mono">3,234</td>
      </tr>
      <tr class="border-t-2 border-teal-400/50 text-teal-300 text-xl font-bold">
        <td class="py-4" colspan="2">總計約</td>
        <td class="py-4 text-right font-mono">$23,354 ~ 24,354</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="text-xs opacity-40 mt-6">※ 門外與門內為工材費估列、部分為區間估價；天花板與設備為材料估價，未含安裝施工費用，實際以現場丈量為準。</div>
