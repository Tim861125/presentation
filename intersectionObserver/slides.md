---
theme: seriph
background: https://cover.sli.dev
title: IntersectionObserver API
info: |
  ## IntersectionObserver API
  Deep Dive into Modern Viewport Observation Techniques
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

# IntersectionObserver API

Modern Viewport Observation

---
layout: default
---

# What is IntersectionObserver?

- A **Web API** that asynchronously observes changes in the intersection of a target element with an ancestor element or viewport

- Provides a way to detect when elements enter or leave the visible area

- **No need** for scroll event listeners or complex calculations

<div class="mt-8 p-4 bg-blue-500 bg-opacity-10 rounded">

**Core Advantage**: High performance without blocking the main thread

</div>

---
layout: default
---

# Why Do We Need It?

### Problems with Traditional Approaches

```javascript
// Old approach - Performance issues
window.addEventListener('scroll', () => {
  const rect = element.getBoundingClientRect();
  if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
    // Element is visible
    loadImage();
  }
});
```

**Problems:**
- Triggers on every scroll event (too frequent)
- Synchronous layout calculations (causes reflow)
- Manual viewport position calculations required
- Difficult to optimize

---
layout: default
---

# Common Use Cases

## 1. Lazy Loading Images
- Reduce initial page load time

## 2. Infinite Scroll
- Load more content as users scroll down

## 3. Animation Triggers
- Enhance user interaction experience

## 4. Analytics & Visibility Tracking
- Ad impression tracking

---
layout: default
---

# Basic Syntax

```javascript
// 1. Create observer
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    console.log('Is intersecting:', entry.isIntersecting);
    console.log('Intersection ratio:', entry.intersectionRatio);
  });
});

// 2. Start observing element
observer.observe(document.querySelector('.target'));

// 3. Stop observing when done
observer.disconnect();
```
---
layout: default
---

# IntersectionObserverEntry

Key properties available in the callback:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.isIntersecting      // Boolean: Is element visible?
    entry.intersectionRatio   // Number: 0-1, ratio of visible portion
    entry.target              // The observed DOM element
    entry.time                // Timestamp of observation
    entry.boundingClientRect  // Bounding box of target element
    entry.intersectionRect    // Rectangle of visible portion
    entry.rootBounds          // Bounding box of root element
  });
});
```

---
layout: two-cols
---

# Configuration Options

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
- Element to use as viewport
- Default: `null` (browser viewport)

**`rootMargin`**
- Offset the root element's bounding box
- CSS syntax: `"10px 20px 30px 40px"`
- Useful for preloading

**`threshold`**
- When to trigger the callback
- `0.5` = trigger at 50% visible
- Can be an array: `[0, 0.25, 0.5, 0.75, 1]`

</div>

---
layout: default
---

# Threshold Examples

<div class="grid grid-cols-2 gap-4">

<div>

```javascript
// Trigger immediately when any pixel is visible
const observer1 = new IntersectionObserver(
  callback,
  { threshold: 0 }
);
```

</div>

<div>

```javascript
// Trigger only when fully visible
const observer2 = new IntersectionObserver(
  callback,
  { threshold: 1.0 }
);
```

</div>

<div>

```javascript
// Multiple thresholds - track progress
const observer3 = new IntersectionObserver(
  callback,
  { threshold: [0, 0.25, 0.5, 0.75, 1] }
);
```

</div>

<div>

```javascript
// Preload 200px before visible
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

# Browser Support

- Chrome 51+ (2016)
- Firefox 55+ (2017)
- Safari 12.1+ (2019)
- Edge 15+ (2017)

---
layout: default
---

# Practices

### 1. Unobserve when done
```javascript
if (entry.isIntersecting) {
  loadContent();
  observer.unobserve(entry.target); // Don't keep observing
}
```

### 2. Disconnect on component unmount

```javascript
onUnmounted(() => observer.disconnect());
```

### 3. Use rootMargin to improve UX
- Preload content before it's visible
- Smoother user experience

---
layout: default
---

# Common Pitfalls to Avoid

 **Don't observe too many elements**
- Create separate observers for different purposes
- Or use a single observer efficiently

 **Don't forget to disconnect**
- Can cause memory leaks in SPAs
- Always clean up in component lifecycle

 **Don't use for all scroll effects**
- Use CSS `position: sticky` for fixed headers
- Use CSS scroll animations when possible

---
layout: center
class: text-center
---

# Summary

**IntersectionObserver** is a powerful and efficient API for element visibility detection

✅ Better performance than scroll events

✅ Clean, declarative API

✅ Multiple use cases: lazy loading, infinite scroll, animations

✅ Excellent browser support

✅ Can combine with debounce/throttle when needed

---
layout: end
---

# Thanks
References

- [MDN - IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
- [W3C Specification](https://w3c.github.io/IntersectionObserver/)
- [Can I Use - Browser Support](https://caniuse.com/intersectionobserver)
