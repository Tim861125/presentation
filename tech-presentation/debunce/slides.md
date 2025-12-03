---
theme: seriph
background: https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop
title: JavaScript Debounce & Throttle
info: |
  ## JavaScript Performance Optimization
  A Complete Guide to Debounce and Throttle
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Debounce & Throttle

A Complete Guide to Event Optimization

---
layout: default
---

# Why Do We Need Optimization?

In real-world development, certain events are **triggered frequently**:

<v-clicks>

- **scroll** - Scroll events (can trigger dozens of times per second)
- **resize** - Window size changes
- **input** - Input field content changes
- **mousemove** - Mouse movement

</v-clicks>

<v-click>

## The Problem

If we execute complex operations on every event trigger:
- Sending API requests
- DOM operations and rendering
- Complex calculations

This leads to **performance issues** and **resource waste**!

</v-click>

---
layout: two-cols
---

# Debounce

## Core Concept

<div class="text-lg">

> Combines multiple function calls into **one**, executing with a **delay** after the last trigger

</div>

<v-click>

## Analogy

Like an elevator door:
- Someone enters → restart timer
- Wait for a period with no one entering
- Then actually close the door

</v-click>

::right::

<v-click>

## Timeline Visualization

```
Trigger: ▼ ▼ ▼ ▼ ▼     ▼
Time:    ━━━━━━━━━━━━━━━━━━━━
Execute:              ✓     ✓
         └─delay─┘      └─delay─┘
```

<div class="mt-8 p-4 bg-blue-500 bg-opacity-10 rounded">

**Key Characteristics**:
- Only executes the last call
- Has delay
- Suited for "wait until complete" scenarios

</div>

</v-click>

---
layout: default
---

# Debounce Use Cases

<div class="grid grid-cols-2 gap-4">

<v-click>

<div class="p-4 border border-blue-500 rounded">

## Search Autocomplete

```javascript
// User types "hello"
// h -> no request
// he -> no request
// hel -> no request
// hell -> no request
// hello -> wait 300ms → send request ✓
```

**Avoid**: Sending API request for each character

</div>

</v-click>

<v-click>

<div class="p-4 border border-green-500 rounded">

## Form Validation

```javascript
// Email input field
// user@ -> no validation
// user@gm -> no validation
// user@gmail -> no validation
// user@gmail.com -> wait 500ms → validate ✓
```

**Benefit**: Wait for user to finish typing before validating

</div>

</v-click>

</div>

<v-click>

<div class="mt-6 p-4 bg-yellow-500 bg-opacity-10 rounded">

**Usage Principle**: Scenarios where you need to wait for user to "complete action"

</div>

</v-click>

---
layout: default
---

# Debounce Implementation

<div class="grid grid-cols-2 gap-8">

<div>

## Core Logic

```javascript {all|2|4-5|6-9|all}
function debounce(callback, delay) {
  let timerID;

  return function debouncedCallback(...args) {
    // Clear previous timer
    clearTimeout(timerID);
    // Set new timer
    timerID = setTimeout(() => {
      callback.apply(this, args)
    }, delay);
  }
}
```

</div>

<div>

<v-click at="1">

## Usage Example

```javascript
const searchAPI = (keyword) => {
  console.log('Search:', keyword);
  // Call API...
};

const debouncedSearch = debounce(searchAPI, 300);

// User types rapidly
debouncedSearch('h');    // Timer 1
debouncedSearch('he');   // Cancel 1, Timer 2
debouncedSearch('hel');  // Cancel 2, Timer 3
debouncedSearch('hell'); // Cancel 3, Timer 4

// After 300ms, execute last call
// Output: Search: hell
```

</v-click>

</div>

</div>

---
layout: two-cols
---

# Throttle

## Core Concept

<div class="text-lg">

> Ensures function executes at a **fixed rate**. Within a set interval, executes at most once.

</div>

<v-click>

## Analogy

Like a water faucet limiter:
- No matter how much water flows
- The throughput is fixed
- Drips at a fixed rhythm

</v-click>

::right::

<v-click>

## Timeline Visualization

```
Trigger: ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
Time:    ━━━━━━━━━━━━━━━━━━━━
Execute: ✓   ✓   ✓   ✓   ✓
         └─interval─┘
```

<div class="mt-8 p-4 bg-green-500 bg-opacity-10 rounded">

**Key Characteristics**:
- Executes multiple times at fixed rate
- Immediate response to first trigger
- Suited for "continuous monitoring" scenarios

</div>

</v-click>

---
layout: default
---

# Throttle Use Cases

<div class="grid grid-cols-2 gap-4">

<v-click>

<div class="p-4 border border-purple-500 rounded">

## Infinite Scroll

```javascript
// User scrolls page
window.addEventListener('scroll',
  throttle(() => {
    // Check if at bottom every 200ms
    if (isBottom()) {
      loadMoreData();
    }
  }, 200)
);
```

**Benefit**: Periodic checking without excessive frequency

</div>

</v-click>

<v-click>

<div class="p-4 border border-pink-500 rounded">

## Real-time Data Updates

```javascript
// Stock price updates
socket.on('price-update',
  throttle((data) => {
    // Update UI every 1000ms
    updateChart(data);
  }, 1000)
);
```

**Benefit**: Avoid excessive rendering, maintain smoothness

</div>

</v-click>

</div>

<v-click>

<div class="mt-6 p-4 bg-yellow-500 bg-opacity-10 rounded">

**Usage Principle**: Scenarios requiring continuous monitoring with periodic response

</div>

</v-click>

---
layout: default
---

# Throttle Implementation

<div class="grid grid-cols-2 gap-8">

<div>

## Core Logic

```javascript {all|2|5|7-11|all}
function throttle(callback, delay) {
  let timerID = null;

  return function throttledFunction(...args) {
    // If timer exists, still in cooldown
    if (timerID) return;

    // Set timer, clear after execution
    timerID = setTimeout(() => {
      callback.apply(this, args);
      timerID = null;  // Cooldown ends
    }, delay);
  }
}
```

</div>

<div>

<v-click at="1">

## Usage Example

```javascript
let count = 0;
const logScroll = () => {
  count++;
  console.log('Scroll count:', count);
};

const throttledLog = throttle(logScroll, 1000);

// User scrolls rapidly (assume every 100ms)
// 0ms   - Execute ✓ (1st time)
// 100ms - Ignore (in cooldown)
// 200ms - Ignore (in cooldown)
// ...
// 1000ms - Execute ✓ (2nd time)
// 1100ms - Ignore (in cooldown)
// ...
```

</v-click>

</div>

</div>

---
layout: two-cols
---

# Debounce vs Throttle

## Core Differences

<v-click>

| Feature | Debounce | Throttle |
|---------|----------|----------|
| **Execution Timing** | Delayed after last trigger | Fixed intervals |
| **Execution Count** | Once | Multiple (rate-limited) |
| **Delay** | Has delay | Immediate response |
| **Use Case** | Wait for completion | Continuous monitoring |

</v-click>

::right::

<v-click>

## Visual Comparison

**Debounce**
```
Input:   ████████░░░░░██░░░░
Execute:         ✓      ✓
```

**Throttle**
```
Input:   ████████████████████
Execute: ✓   ✓   ✓   ✓   ✓
```

</v-click>

<v-click>

<div class="mt-4 p-4 bg-blue-500 bg-opacity-10 rounded text-sm">

**Memory Tips**:
- Debounce = **De**lay until the end
- Throttle = Flow control valve, fixed rate

</div>

</v-click>

---
layout: center
---

# Interactive Demo

<DebounceThrottleDemo />

---
layout: center
class: text-center
---

# Practical Guidelines

<div class="grid grid-cols-2 gap-8 mt-8 text-left">

<v-click>

<div class="p-6 bg-blue-500 bg-opacity-10 rounded">

## Choose Debounce

- Search input fields
- Form validation
- Auto-save drafts
- Layout adjustments after resize

**Core**: Wait for action completion

</div>

</v-click>

<v-click>

<div class="p-6 bg-green-500 bg-opacity-10 rounded">

## Choose Throttle

- Infinite scroll loading
- Real-time data visualization
- Drag position updates
- Scroll animations

**Core**: Continuous monitoring with response

</div>

</v-click>

</div>

<v-click>

<div class="mt-8 p-6 bg-yellow-500 bg-opacity-10 rounded">

**Production Recommendation**: Use mature libraries (e.g., Lodash) instead of custom implementations

```javascript
import { debounce, throttle } from 'lodash';
```

</div>

</v-click>

---
layout: end
class: text-center
---

# Thank You!

<div class="mt-8">

## Key Takeaways

<v-clicks>

- **Debounce**: Wait for completion, execute once with delay
- **Throttle**: Continuous monitoring, execute at fixed rate
- Choose the right optimization based on scenario
- Use mature libraries in production

</v-clicks>

</div>

<div class="mt-12 text-sm opacity-50">
Reference: https://www.shubo.io/javascript-debounce-throttle/
</div>
