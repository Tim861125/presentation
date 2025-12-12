---
theme: seriph
background: https://images.unsplash.com/photo-1557683316-973673baf926
title: IntersectionObserver API
info: |
  ## IntersectionObserver API
  深入探討現代視窗觀察技術
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

# IntersectionObserver API

輕鬆實現現代視窗觀察

---
layout: default
---

# 什麼是 IntersectionObserver？

- 一個 **Web API**，可非同步觀察目標元素與祖先元素或視窗交集的變化

- 提供偵測元素進入或離開可見區域的方式

- **不需要** 滾動事件監聽器或複雜計算

<div class="mt-8 p-4 bg-blue-500 bg-opacity-10 rounded">

**核心優勢**：高效能且不會阻塞主執行緒

</div>

---
layout: default
---

# 為什麼需要它？

### 傳統方法的問題

```javascript
// L 舊方法 - 效能問題
window.addEventListener('scroll', () => {
  const rect = element.getBoundingClientRect();
  if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
    // 元素可見
    loadImage();
  }
});
```

**問題：**
- 每次滾動事件都會觸發（頻率過高）
- 同步版面計算（導致重排）
- 需要手動計算視窗位置
- 難以優化

---
layout: default
---

# 常見使用情境

## 1. 圖片延遲載入
- 減少初始頁面載入時間

## 2. 無限滾動
- 當使用者向下滾動時載入更多內容

## 3. 動畫觸發
- 提升使用者互動體驗

## 4. 分析與可見度追蹤
- 廣告曝光追蹤

---
layout: default
---

# 基本語法

```javascript
// 1. 建立觀察器
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    console.log('Is intersecting:', entry.isIntersecting);
    console.log('Intersection ratio:', entry.intersectionRatio);
  });
});

// 2. 開始觀察元素
observer.observe(document.querySelector('.target'));

// 3. 完成後停止觀察
observer.disconnect();
```
---
layout: default
---

# IntersectionObserverEntry

函式中可用的關鍵屬性：

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.isIntersecting      // Boolean: 元素是否可見？
    entry.intersectionRatio   // Number: 0-1，可見部分的比例
    entry.target              // 被觀察的 DOM 元素
    entry.time                // 觀察的時間戳記
    entry.boundingClientRect  // 目標元素的邊界框
    entry.intersectionRect    // 可見部分的矩形
    entry.rootBounds          // 根元素的邊界框
  });
});
```

---
layout: two-cols
---

# 配置選項

```javascript
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const observer = new IntersectionObserver(
  callback,
  options
);
```

::right::

<div class="ml-4">

**`root`**
- 作為視窗使用的元素
- 預設：`null`（瀏覽器視窗）

**`rootMargin`**
- 偏移根元素的邊界框
- CSS 語法：`"10px 20px 30px 40px"`
- 適合用於預載入

**`threshold`**
- 何時觸發回呼函式
- `0.5` = 50% 可見時觸發
- 可以是陣列：`[0, 0.25, 0.5, 0.75, 1]`

</div>

---
layout: default
---

# Threshold 範例

<div class="grid grid-cols-2 gap-4">

<div>

```javascript
// 任何像素可見時立即觸發
const observer1 = new IntersectionObserver(
  callback,
  { threshold: 0 }
);
```

</div>

<div>

```javascript
// 僅在完全可見時觸發
const observer2 = new IntersectionObserver(
  callback,
  { threshold: 1.0 }
);
```

</div>

<div>

```javascript
// 多個閾值 - 追蹤進度
const observer3 = new IntersectionObserver(
  callback,
  { threshold: [0, 0.25, 0.5, 0.75, 1] }
);
```

</div>

<div>

```javascript
// 在可見前 200px 預載入
const observer4 = new IntersectionObserver(
  callback,
  { rootMargin: '200px' }
);
```

</div>

</div>

---
layout: full
---

<IntersectionObserverDemo />

---
layout: default
---

# 瀏覽器支援

<div class="flex justify-center items-center h-full">

<div class="text-center">

✅ **優秀的瀏覽器支援**

- Chrome 51+ (2016)
- Firefox 55+ (2017)
- Safari 12.1+ (2019)
- Edge 15+ (2017)

<div class="mt-8 p-4 bg-green-500 bg-opacity-10 rounded">

**覆蓋率**：>95% 全球使用者

</div>

<div class="mt-4 text-sm text-gray-500">

舊版瀏覽器：使用 [polyfill](https://github.com/w3c/IntersectionObserver/tree/main/polyfill)

</div>

</div>

</div>

---
layout: default
---

# 最佳實踐

**1. 完成後取消觀察**
```javascript
if (entry.isIntersecting) {
  loadContent();
  observer.unobserve(entry.target); // 不要持續觀察
}
```

**2. 使用適當的閾值**
- 不要使用過多閾值
- 考慮使用者體驗

**3. 組件卸載時中斷連接**
```javascript
onUnmounted(() => observer.disconnect());
```

**4. 考慮使用 rootMargin 提升 UX**
- 在可見前預載入內容
- 更流暢的使用者體驗

---
layout: default
---

# 常見陷阱須避免

❌ **不要觀察太多元素**
- 為不同目的建立獨立的觀察器
- 或有效率地使用單一觀察器

❌ **不要忘記中斷連接**
- 在 SPA 中會造成記憶體洩漏
- 務必在組件生命週期中清理

❌ **不要用於所有滾動效果**
- 固定標題使用 CSS `position: sticky`
- 盡可能使用 CSS 滾動動畫

❌ **不要過度使用 debounce/throttle**
- IntersectionObserver 本身已經優化
- 只在回呼函式執行昂貴操作時才加入

---
layout: center
class: text-center
---

# 總結

**IntersectionObserver** 是一個強大且高效的元素可見性偵測 API

✅ 比滾動事件有更好的效能

✅ 簡潔、宣告式的 API

✅ 多種使用情境：延遲載入、無限滾動、動畫

✅ 優秀的瀏覽器支援

✅ 僅在需要時才結合 debounce/throttle

<div class="mt-8">

## 感謝聆聽！

有任何問題嗎？

</div>

---
layout: end
---

# 參考資料

- [MDN - IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
- [W3C 規範](https://w3c.github.io/IntersectionObserver/)
- [Can I Use - 瀏覽器支援](https://caniuse.com/intersectionobserver)
