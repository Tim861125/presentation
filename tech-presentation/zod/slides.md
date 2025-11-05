---
theme: seriph
background: https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920
title: Zod - TypeScript Schema Validation
info: |
  ## Zod Technical Report
  TypeScript Data Validation Best Practices
class: text-center
highlighter: shiki
transition: slide-left
mdc: true
---
# Zod

TypeScript-first Schema Validation Library

---

# What is Zod?



<br>

- A TypeScript-first schema declaration and validation library

---

# Why Do We Need Zod?

<div grid="~ cols-2 gap-4">

<div>

## The Problem

```ts {1-5|7-13}
// TypeScript only checks at compile time
interface User {
  name: string;
  age: number;
}

// Runtime type is not guaranteed
const data = await fetch('/api/user')
  .then(r => r.json()) as User;

// What if API response changes?
// What if fields are missing?
// What if types don't match?
```

</div>

<div v-click>

## The Solution

```ts
// Zod provides runtime validation
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string(),
  age: z.number()
});

// Validate at runtime
const user = UserSchema.parse(data);
// user is guaranteed to be correct
```

</div>

</div>

---

# safeParse() parse()

<ZodDemo />

---

# Basic Type Validation

<div grid="~ cols-2 gap-4">

<div>

```ts
// String
z.string()
z.string().min(3).max(100)
z.string().email()
z.string().url()
z.string().uuid()
z.string().regex(/^\d{4}$/)

// Number
z.number()
z.number().int()
z.number().positive()
z.number().min(0).max(100)

// Boolean
z.boolean()
```

</div>

<div>

```ts
// Date
z.date()
z.date().min(new Date("2020-01-01"))

// Enum
z.enum(["admin", "user", "guest"])

// Literal
z.literal("hello")
z.literal(42)

// Optional & Nullable
z.string().optional()  // string | undefined
z.string().nullable()  // string | null
z.string().nullish()   // string | null | undefined

// Default values
z.string().default("guest")
z.number().default(0)
```

</div>

</div>

---

# Object Validation

```ts
// Basic object
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
});

// Nested object
const ProfileSchema = z.object({
  user: UserSchema,
  settings: z.object({
    theme: z.enum(['light', 'dark']),
    notifications: z.boolean(),
  }),
});

// Partial fields & picking
UserSchema.partial()              // All fields optional
UserSchema.pick({ name: true })   // Only keep name
UserSchema.omit({ id: true })     // Exclude id
```

---

# Array Validation

```ts
// Basic array
z.array(z.string())           // string[]
z.string().array()            // Same as above

// Array length constraints
z.array(z.number()).min(1).max(10)
z.array(z.string()).nonempty()   // At least one element

// Tuple
z.tuple([z.string(), z.number(), z.boolean()])
// [string, number, boolean]
```

---

# Validation Methods

<div grid="~ cols-2 gap-4">

<div>

## parse vs safeParse

```ts
const schema = z.string();

// parse - throws error on failure
try {
  const result = schema.parse("hello");
  // result: string
} catch (error) {
  // ZodError
}

// safeParse - returns Result object
const result = schema.safeParse("hello");

if (result.success) {
  console.log(result.data);  // string
} else {
  console.log(result.error); // ZodError
}
```

</div>

<div>

## Async Validation

```ts
// Use parseAsync
const username = await asyncSchema
  .parseAsync("john");

// Or use safeParseAsync
const result = await asyncSchema
  .safeParseAsync("john");
```

</div>

</div>

---
layout: center
class: text-center
---

# Zod v4 Major Improvements

Key updates from v3 to v4

---

# Performance Improvements

<div grid="~ cols-2 gap-4">

<div>

## Speed Boost

- **Faster validation**: Rewritten core engine
- **Memory optimization**: ~30% reduction

```ts
// v4 Performance benchmarks
// Simple objects: ~2-3x faster
// Complex nested: ~1.5-2x faster
```

</div>

<div>

## Bundle Size

- Core code size reduced by **~15%**
- Better tree-shaking support

</div>

</div>

---
layout: two-cols
---

# Performance

Comprehensive performance optimizations

::right::

<v-clicks>

### Runtime Speed

- **String parsing** 14x faster
- **Array parsing** 7x faster
- **Object parsing** 6.5x faster

<br>

### Compilation Performance

- Chaining `.extend()` & `.omit()`
  - v3: 4000ms
  - v4: 400ms (10x faster)

</v-clicks>

---

# 📦 Bundle Size Optimization

Three options for different needs

| Version | Gzip Size | vs v3 |
|---------|-----------|-------|
| Zod v3 | 12.47 kb | - |
| Zod v4 (regular) | 5.36 kb | **-57%** |
| Zod v4 (mini) | 1.88 kb | **-85%** |

<v-click>

### Zod Mini - Functional API
```ts
// Regular Zod
z.string().email().optional()

// Zod Mini (better tree-shaking)
optional(email(string()))
```

</v-click>

---
layout: two-cols
---

# New Schema Types

More practical validation types

::right::

<v-clicks>

### Basic Types
```ts
// File validation
z.file()

const fileSchema = z.file();

const avatarSchema = z.file({
  type: ["image/jpeg", "image/png", "image/webp"],
  maxSize: 2 * 1024 * 1024,  // 2MB
  minSize: 1024               // at least 1KB
});
```

<br>

```ts
// Template literals
const userIdSchema
    = z.templateLiteral`user_${z.string()}`;

userIdSchema.parse("user_123");        // v
userIdSchema.parse("user_abc");        // v
userIdSchema.parse("admin_123");       // x
userIdSchema.parse("user_");           // x
```
</v-clicks>

---
layout: two-cols
---

# New Schema Types

More practical validation types

### BigInt Formats

::right::

<v-clicks>

```ts
// Environment boolean
z.stringbool()const strbool = z.stringbool();

strbool.parse("true")         // => true
strbool.parse("1")            // => true
strbool.parse("yes")          // => true
strbool.parse("on")           // => true
strbool.parse("y")            // => true
strbool.parse("enabled")      // => true

strbool.parse("false");       // => false
strbool.parse("0");           // => false
strbool.parse("no");          // => false
strbool.parse("off");         // => false
strbool.parse("n");           // => false
strbool.parse("disabled");    // => false

```

### Number Formats
```ts
z.int8()    // -128 to 127
z.uint32()  // 0 to 4,294,967,295
z.float32() // 32-bit float
z.float64() // 64-bit float
```

</v-clicks>

---

# Recursive Object Support

<div grid="~ cols-2 gap-8">

<div>

```ts
//  v3
const category = z.object({
  name: z.string(),
  subcategories: z.array(category)  // X
});

// v3 need to do
type Category = z.infer<typeof categorySchema>;
const categorySchema: z.ZodType<Category> =
z.lazy(() =>
  z.object({
    name: z.string(),
    subcategories: z.array(categorySchema)
  })
);
```

</div>

<div>

<v-clicks>

```ts
// v4: Native support
const category = z.object({
  name: z.string(),
  subcategories: z.lazy(() => z.array(category))
});
```
</v-clicks>

</div>

</div>

---

# 🏷️ Metadata System

Strongly-typed metadata support

<v-clicks>

```ts
const myRegistry = z.registry<{ title: string; description: string }>();
const emailSchema = z.email();

emailSchema.register(myRegistry, { title: "Email address", description: "..." })
// => returns emailSchema

const loginSchema = z.object({
  email: z.email().register(uiRegistry, {
    label: "Email",
    placeholder: "example@email.com",
    inputType: "email",
  }),

  password: z.string().min(8).register(uiRegistry, {
    label: "Password",
    placeholder: "At least 8 characters",
    inputType: "password",
  }),
});
```

</v-clicks>

---

<test />

---
layout: two-cols
---

# 🔧 API Improvements

More concise and consistent

::right::

<v-clicks>

### String formats promoted to top-level
```ts
// ❌ v3 (deprecated)
z.string().email()

// ✅ v4 (recommended)
z.email()

// Custom regex
z.email({
  regex: z.emailRegex.rfc5322
})
```

### Literal supports multiple values
```ts
z.literal("a", "b", "c")
// equivalent to
z.union([
  z.literal("a"),
  z.literal("b"),
  z.literal("c")
])
```

</v-clicks>

---

# 🎨 Enhanced Error Handling

More user-friendly error messages

<v-clicks>

### Unified error parameter
```ts
// ❌ v3: Multiple parameters
z.string({
  required_error: "Required",
  invalid_type_error: "Invalid type"
})

// ✅ v4: Unified error
z.string({
  error: "Please enter a valid string"
})
```

</v-clicks>

---

# 🔄 Refinements Built-in

More flexible method chaining

<v-clicks>

```ts
// ❌ v3: Cannot interleave
z.string()
  .min(5)
  // .refine(...) ← Can't add here!
  .max(10)

// ✅ v4: Freely interleave
z.string()
  .min(5)
  .refine(val => val.includes("@"))
  .max(50)
```

### New method: .overwrite()
```ts
// Transform data without changing type
z.number().overwrite(val => val ** 2).max(100)
```

</v-clicks>

---

# 🎯 Enhanced Discriminated Unions

More powerful union types

<v-clicks>

```ts

import { z } from 'zod';

const mySchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('circle'), radius: z.number() }),
  z.object({ type: z.literal('square'), size: z.number() }),
  z.object({ type: z.literal('rectangle'), width: z.number(), height: z.number() })
]);

// ✅ 有效
mySchema.parse({ type: 'circle', radius: 10 });
mySchema.parse({ type: 'square', size: 5 });

// ❌ 無效 - type 不匹配
mySchema.parse({ type: 'triangle', base: 5 });

const MyResult = z.discriminatedUnion("status", [
  // simple literal
  z.object({ status: z.literal("aaa"), data: z.string() }),
  // union discriminator
  z.object({ status: z.union([z.literal("bbb"), z.literal("ccc")]) }),
  // pipe discriminator
  z.object({ status: z.literal("fail").transform(val => val.toUpperCase()) }),
]);

const BaseError = z.object({ status: z.literal("failed"), message: z.string() });
const MyResult = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), data: z.string() }),
  z.discriminatedUnion("code", [
    BaseError.extend({ code: z.literal(400) }),
    BaseError.extend({ code: z.literal(401) }),
    BaseError.extend({ code: z.literal(500) })
  ])
]);
```

</v-clicks>

---
layout: center
class: text-center
---

# 📊 Performance Summary

<div class="grid grid-cols-2 gap-8 mt-8">

<div v-click>
<div class="text-6xl mb-4">14×</div>
<div class="text-xl">String Parsing Speed</div>
</div>

<div v-click>
<div class="text-6xl mb-4">100×</div>
<div class="text-xl">TS Compilation</div>
</div>

<div v-click>
<div class="text-6xl mb-4">-85%</div>
<div class="text-xl">Bundle Size (Mini)</div>
</div>

<div v-click>
<div class="text-6xl mb-4">9/10</div>
<div class="text-xl">Top Issues Resolved</div>
</div>

</div>

---
layout: end
class: text-center
---

# Thanks

<div class="pt-12 text-sm opacity-75">

📚 References
<br>[zod.dev/v4/changelog](https://zod.dev/v4/changelog)
<br>[Zod Documentation](https://zod.dev) ·
<br>[GitHub](https://github.com/colinhacks/zod) ·

</div>
