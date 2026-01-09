---
theme: default
background: https://cover.sli.dev
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Event Delegation 知識分享

drawings:
  persist: false
transition: slide-left
title: Event Delegation 知識分享
---

# Event Delegation

事件委派：更有效率的事件處理模式

---

# 今天的內容

- 什麼是 Event Delegation
- 為什麼需要它
- Event Bubbling 機制
- 實作方式與範例
- 優勢與限制
- 實際應用場景

---

# 什麼是 Event Delegation

Event Delegation 是一種基於事件冒泡機制的設計模式

**核心概念**

在父元素上設置一個事件監聽器，來處理所有子元素的事件

而不是在每個子元素上分別設置監聽器

---

# 傳統方式的問題

假設有一個按鈕列表：

```html
<div id="button-container">
  <button>按鈕 1</button>
  <button>按鈕 2</button>
  <button>按鈕 3</button>
</div>
```

傳統做法：為每個按鈕添加監聽器

```javascript
const buttons = document.querySelectorAll('button')
buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    console.log(event.target.innerText)
  })
})
```

問題：3 個按鈕 = 3 個監聽器

---

# Event Bubbling 機制

當事件在 DOM 元素上觸發時，會經歷三個階段：

1. **捕獲階段**：從根元素往下傳遞到目標元素
2. **目標階段**：到達目標元素
3. **冒泡階段**：從目標元素往上傳遞回根元素

Event Delegation 利用的就是冒泡階段

事件會從子元素「冒泡」到父元素

---

# Event Delegation 解決方案

使用 Event Delegation：只需一個監聽器

```javascript
const container = document.querySelector('#button-container')
container.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    console.log(event.target.innerText)
  }
})
```

關鍵：檢查 `event.target` 來判斷是哪個子元素觸發事件

---

# 程式碼對比

**傳統方式：3 個監聽器**
```javascript
const buttons = document.querySelectorAll('button')
buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    console.log(event.target.innerText)
  })
})
```

**Event Delegation：1 個監聽器**
```javascript
const container = document.querySelector('#button-container')
container.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    console.log(event.target.innerText)
  }
})
```

---

# 主要優勢
**1. 減少記憶體使用**
- 一個監聽器 vs 多個監聽器
- 降低記憶體佔用

**2. 程式碼更簡潔**
- 集中管理事件處理邏輯
- 更容易維護

**3. 支援動態內容**
- 新增的元素自動擁有事件處理
- 不需要重新綁定事件

**4. 效能提升**
- 減少事件綁定的開銷

---

# 實際應用場景

**1. 動態列表**
```javascript
const list = document.getElementById('item-list')
list.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    console.log(`點擊了：${event.target.textContent}`)
  }
})
```

**2. 表單輸入處理**
```javascript
const form = document.getElementById('user-form')
form.addEventListener('input', (event) => {
  console.log(`${event.target.name} 的值改變了`)
})
```

---

# 注意事項與限制

**不是所有事件都會冒泡**

以下事件不支援冒泡，無法使用 Event Delegation：

- `focus` / `blur`
- `scroll`
- `mouseenter` / `mouseleave`
- `resize`

---
layout: two-cols
---

### note
<div class="mr-2">
```
<div id="wrapper">
  <span>
    <button>
      <span class="icon">🔥</span>
      Click Me!
    </button>
  </span>
</div>

```
</div>

::right::

```
const wrapper = document.getElementById("wrapper");

wrapper.addEventListener("click", (event) => {

  // not good
  if (event.target.tagName === "BUTTON") {
    console.log("Button clicked!");
  }

  // good
  const button = event.target.closest("button");
  if (!button) return;

  console.log("Button clicked:", button.textContent);
});
```

---

# 總結

Event Delegation 是一個強大的模式

**優點**
- 減少記憶體使用
- 支援動態內容
- 程式碼更易維護

**何時使用**
- 有大量相似元素需要處理事件時
- 內容會動態新增/移除時
- 想要優化效能時

**記住**：善用事件冒泡，讓父元素幫你管理子元素的事件

---
layout: center
class: text-center
---

# Thanks
