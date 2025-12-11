---
theme: seriph
background: https://images.unsplash.com/photo-1557683316-973673baf926
title: IntersectionObserver API
info: |
  ## IntersectionObserver API
  A technical deep dive into modern viewport observation
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

# IntersectionObserver API

Modern Viewport Observation Made Easy

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

---
layout: default
---

# What is IntersectionObserver?

<v-clicks>

- A **Web API** that asynchronously observes changes in the intersection of a target element with an ancestor element or the viewport

- Provides a way to detect when elements enter or leave the visible area

- **No need** for scroll event listeners or complex calculations

- Available in all modern browsers since 2019

</v-clicks>

<div v-click class="mt-8 p-4 bg-blue-500 bg-opacity-10 rounded">

**Key Benefit**: Efficient performance without blocking the main thread

</div>

---
layout: default
---

# Why Do We Need It?

### Traditional Approach Problems

<v-clicks>

```javascript
// L Old way - Performance issues
window.addEventListener('scroll', () => {
  const rect = element.getBoundingClientRect();
  if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
    // Element is visible
    loadImage();
  }
});
```

**Issues:**
- Fires on every scroll event (too frequent)
- Synchronous layout calculations (causes reflow)
- Manual viewport math
- Hard to optimize

</v-clicks>

---
layout: default
---

# Common Use Cases

<v-clicks>

**1. Lazy Loading Images**
- Load images only when they're about to enter viewport
- Reduce initial page load time

**2. Infinite Scroll**
- Load more content as user scrolls down
- Better UX than pagination

**3. Animation Triggers**
- Trigger animations when elements become visible
- Engaging user experience

**4. Analytics & Visibility Tracking**
- Track which content users actually see
- Ad impression tracking

</v-clicks>

---
layout: default
---

# Basic Syntax

```javascript {all|1-7|9-10|12-13|all}
// 1. Create observer with callback
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    console.log('Is intersecting:', entry.isIntersecting);
    console.log('Intersection ratio:', entry.intersectionRatio);
  });
});

// 2. Start observing elements
observer.observe(document.querySelector('.target'));

// 3. Stop observing when done
observer.disconnect();
```

<v-click>

<div class="mt-4 p-4 bg-green-500 bg-opacity-10 rounded">

**That's it!** Just 3 simple steps.

</div>

</v-click>

---
layout: default
---

# IntersectionObserverEntry

Key properties available in callback:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.isIntersecting      // Boolean: is element visible?
    entry.intersectionRatio   // Number: 0-1, how much is visible
    entry.target              // The observed DOM element
    entry.time                // Timestamp of observation
    entry.boundingClientRect  // Target's bounding box
    entry.intersectionRect    // Visible portion rectangle
    entry.rootBounds          // Root's bounding box
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

<v-clicks>

**`root`**
- The element used as viewport
- Default: `null` (browser viewport)

**`rootMargin`**
- Offset the root's bounding box
- CSS-like syntax: `"10px 20px 30px 40px"`
- Useful for pre-loading

**`threshold`**
- When to trigger callback
- `0.5` = trigger at 50% visible
- Can be array: `[0, 0.25, 0.5, 0.75, 1]`

</v-clicks>

</div>

---
layout: default
---

# Threshold Examples

<div class="grid grid-cols-2 gap-4">

<div>

```javascript
// Trigger immediately when any pixel visible
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
// Pre-load 200px before visible
const observer4 = new IntersectionObserver(
  callback,
  { rootMargin: '200px' }
);
```

</div>

</div>

---
layout: default
---

# Practical Example: Lazy Loading

```javascript {all|1-3|5-14|16-20|all}
// Mark images with data-src instead of src
<img data-src="image.jpg" class="lazy-image" alt="Description">


const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // Load the image
      img.classList.add('loaded');
      observer.unobserve(img);   // Stop observing this image
    }
  });
}, { rootMargin: '50px' }); // Start loading 50px before visible

// Observe all lazy images
document.querySelectorAll('.lazy-image').forEach(img => {
  imageObserver.observe(img);
});
```

---
layout: default
---

# Performance Optimization

## Debounce vs Throttle with IntersectionObserver

While IntersectionObserver is already optimized, combining it with debounce/throttle can help when:

<v-clicks>

- **Debounce**: Execute action only after observation settles
  - Useful for expensive operations (API calls, heavy DOM updates)
  - Waits for "quiet period" before executing

- **Throttle**: Limit execution rate during continuous observations
  - Useful for analytics tracking, animations
  - Ensures consistent execution intervals

</v-clicks>

<v-click>

<div class="mt-4 p-4 bg-yellow-500 bg-opacity-10 rounded">

**Note**: IntersectionObserver itself is already async and efficient. Use debounce/throttle only when your callback does expensive work.

</div>

</v-click>

---
layout: full
---

<IntersectionObserverDemo />

---
layout: default
---

# Browser Support

<div class="flex justify-center items-center h-full">

<div class="text-center">

 **Excellent Browser Support**

- Chrome 51+ (2016)
- Firefox 55+ (2017)
- Safari 12.1+ (2019)
- Edge 15+ (2017)

<div class="mt-8 p-4 bg-green-500 bg-opacity-10 rounded">

**Coverage**: >95% of global users

</div>

<div class="mt-4 text-sm text-gray-500">

For older browsers: Use [polyfill](https://github.com/w3c/IntersectionObserver/tree/main/polyfill)

</div>

</div>

</div>

---
layout: default
---

# Best Practices

<v-clicks>

**1. Unobserve when done**
```javascript
if (entry.isIntersecting) {
  loadContent();
  observer.unobserve(entry.target); // Don't keep observing
}
```

**2. Use appropriate thresholds**
- Don't use too many threshold values
- Consider user experience

**3. Disconnect when component unmounts**
```javascript
onUnmounted(() => observer.disconnect());
```

**4. Consider rootMargin for better UX**
- Pre-load content before visible
- Smoother user experience

</v-clicks>

---
layout: default
---

# Common Pitfalls to Avoid

<v-clicks>

L **Don't observe too many elements**
- Create separate observers for different purposes
- Or use a single observer efficiently

L **Don't forget to disconnect**
- Memory leaks in SPAs
- Always cleanup in component lifecycle

L **Don't use for every scroll effect**
- CSS `position: sticky` for sticky headers
- CSS scroll animations where possible

L **Don't over-complicate with debounce/throttle**
- IntersectionObserver is already optimized
- Only add if callback does expensive work

</v-clicks>

---
layout: center
class: text-center
---

# Summary

<v-clicks>

**IntersectionObserver** is a powerful, efficient API for detecting element visibility

 Better performance than scroll events

 Clean, declarative API

 Multiple use cases: lazy loading, infinite scroll, animations

 Excellent browser support

 Combine with debounce/throttle only when needed

</v-clicks>

<div v-click class="mt-8">

## Thank You!

Questions?

</div>

---
layout: end
---

# References

- [MDN - IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
- [W3C Specification](https://w3c.github.io/IntersectionObserver/)
- [Can I Use - Browser Support](https://caniuse.com/intersectionobserver)
