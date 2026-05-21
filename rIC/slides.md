---
theme: default
background: https://cover.sli.dev
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## requestIdleCallback 知識分享
  瀏覽器閒置時間的利用
drawings:
  persist: false
transition: slide-left
title: requestIdleCallback 知識分享
---

# requestIdleCallback

瀏覽器閒置時間的利用

---

# 回顧：requestAnimationFrame

上次分享的重點

<div class="mt-6">

**requestAnimationFrame 的特性：**

- 在瀏覽器下一次重繪之前執行
- 通常每秒執行 60 次（60 FPS）
- 適合執行動畫和視覺更新
- 保證在繪製前執行，避免掉幀

**典型用法：**
```javascript
function animate() {
  updateAnimation();
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

</div>

---

## 如果有不緊急的任務

<div class="mt-6">

**常見的低優先級任務：**

- 數據分析和日誌上傳
- 預載入資源
- 背景數據同步
- 快取清理和維護
- 非關鍵的 DOM 更新

<div class="mt-4 p-4 bg-black text-white border border-white rounded">

這些任務如果放在主執行緒執行，可能會影響用戶體驗和頁面效能

</div>

</div>

---

# requestIdleCallback (rIC)

在瀏覽器閒置時執行任務

<div class="mt-6">

**什麼是 requestIdleCallback？**

一個瀏覽器 API，允許開發者在瀏覽器閒置期間執行低優先級任務。

**核心概念：**

- 在瀏覽器空閒時才執行
- 不會影響關鍵的渲染和用戶互動
- 優先級低於動畫和輸入處理
- 系統繁忙時可能延遲執行

</div>

---

# 瀏覽器的工作週期

requestIdleCallback 的執行時機

<div class="mt-4">

**一個 Frame 通常包含：**

1. **輸入事件處理** - 處理用戶點擊、滾動等
2. **requestAnimationFrame** - 執行動畫更新
3. **DOM 布局和繪製** - 計算樣式、布局、繪製
4. **閒置時間** - 如果還有剩餘時間

<div class="mt-4 p-4 bg-black text-white border border-white rounded">

**requestIdleCallback 在第 4 階段執行**

當瀏覽器完成必要工作後，如果這一幀還有剩餘時間，就會執行回調函數。

</div>

</div>

---

# 基本語法

如何使用 requestIdleCallback

<div class="mt-4">

**簽名：**
```javascript
const handle = requestIdleCallback(callback, options);
```

**參數：**

- `callback` - 回調函數，接收 `IdleDeadline` 物件
- `options.timeout` - 超時時間（毫秒）

**基本範例：**
```javascript
function doWork(deadline) {
  console.log('剩餘時間：', deadline.timeRemaining());
  // 執行低優先級任務
}

requestIdleCallback(doWork);
```

</div>

---

# IdleDeadline 物件

掌握閒置時間的關鍵

<div class="mt-4">

**1. timeRemaining()** - 返回剩餘時間（毫秒）

**2. didTimeout** - 是否因超時執行

**應用範例：**
```javascript
function processTask(deadline) {
  while (deadline.timeRemaining() > 0 && tasks.length > 0) {
    const task = tasks.shift();
    task.execute();
  }
  if (tasks.length > 0) {
    requestIdleCallback(processTask);
  }
}
```

</div>

---

# 使用場景

何時應該使用 requestIdleCallback

<div class="mt-4">

**適合的場景：**

- 數據分析和日誌
- 預載入資源
- 背景數據同步
- 快取清理
- 非關鍵 DOM 操作

**不適合的場景：**

- 關鍵渲染路徑上的操作
- 即時反饋的用戶互動
- 時間敏感的動畫效果

</div>

---

# 實戰範例：批次處理任務

分批執行大量計算任務

<div class="mt-2">

```javascript
const tasks = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  execute: () => console.log(`處理任務 ${i}`)
}));

function processTasks(deadline) {
  while (deadline.timeRemaining() > 0 && tasks.length > 0) {
    tasks.shift().execute();
  }

  if (tasks.length > 0) {
    requestIdleCallback(processTasks);
  } else {
    console.log('所有任務完成！');
  }
}

requestIdleCallback(processTasks, { timeout: 2000 });
```

</div>

---

# 實戰範例：預載入資源

利用閒置時間預載圖片

<div class="mt-2">

```javascript
const imagesToPreload = [
  '/images/photo1.jpg',
  '/images/photo2.jpg',
  '/images/photo3.jpg'
];

function preloadImages(deadline) {
  while (deadline.timeRemaining() > 0 && imagesToPreload.length > 0) {
    const img = new Image();
    img.src = imagesToPreload.shift();
    if (imagesToPreload.length > 0) break;
  }

  if (imagesToPreload.length > 0) {
    requestIdleCallback(preloadImages);
  }
}

requestIdleCallback(preloadImages);
```

</div>

---

# requestAnimationFrame vs requestIdleCallback

兩者的對比與協作

<div class="mt-2">

| 特性 | rAF | rIC |
|------|-----|-----|
| **執行時機** | 每一幀繪製前 | 幀結束後的閒置時間 |
| **執行頻率** | 約 60 次/秒 | 不固定 |
| **優先級** | 高 | 低 |
| **適用場景** | 動畫、視覺更新 | 背景任務 |
</div>

---

**協作使用：**
```javascript
// rAF 處理動畫
function animate() {
  updateAnimation();
  requestAnimationFrame(animate);
}

// rIC 處理背景任務
function backgroundWork(deadline) {
  if (deadline.timeRemaining() > 0) doLowPriorityWork();
  requestIdleCallback(backgroundWork);
}
```



---

# 注意事項與最佳實踐

<div class="mt-4">

**關鍵要點：**

1. **檢查時間限制** - 總是使用 `timeRemaining()` 檢查剩餘時間

2. **設置合理 timeout** - 避免任務無限期延遲

3. **任務可中斷** - 將大任務分解成小塊

4. **瀏覽器相容性** - 檢查 `window.requestIdleCallback` 是否存在

</div>

---

# 取消閒置回調

如何取消已排程的任務

<div class="mt-4">

```javascript
// 排程一個閒置回調
const handle = requestIdleCallback(doWork);

// 取消它
cancelIdleCallback(handle);
```

**應用場景：**

```javascript
let idleHandle = null;

function startSync() {
  idleHandle = requestIdleCallback(syncData);
}

function stopSync() {
  if (idleHandle) {
    cancelIdleCallback(idleHandle);
    idleHandle = null;
  }
}
```

</div>

---

# 總結

<div class="mt-6">

**關鍵收穫：**

- 在瀏覽器閒置時執行低優先級任務
- 通過 `timeRemaining()` 掌控執行時間
- 適合數據分析、預載入、背景同步等場景
- 與 requestAnimationFrame 配合使用

**最佳實踐：**

- 將任務分解成小塊，支援中斷
- 總是檢查剩餘時間再執行
- 為重要任務設置 timeout
- 考慮瀏覽器相容性

<div class="mt-4 p-4 bg-black text-white border border-white rounded">
適時使用 requestIdleCallback，讓網頁更流暢
</div>

</div>

---
layout: center
class: text-center
---

# Thanks
