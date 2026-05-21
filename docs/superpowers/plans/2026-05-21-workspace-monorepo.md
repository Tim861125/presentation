# Workspace Monorepo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert 24 self-contained Slidev decks into a single bun workspace monorepo with hoisted shared dependencies.

**Architecture:** Add a root `package.json` declaring `workspaces: ["*"]` that owns the four shared deps (`@slidev/cli`, `@slidev/theme-default`, `@slidev/theme-seriph`, `vue`) pinned to the newest versions in the repo today. Strip those deps from each deck. Replace 24 deck-level `bun.lock` files with one root `bun.lock`. Deploy configs and slide content stay untouched.

**Tech Stack:** Bun, Slidev, Vue 3. The repo has no test framework — verification is via `bun install` succeeding and `bun run dev`/`build` working in sample decks.

**Spec:** `docs/superpowers/specs/2026-05-21-workspace-monorepo-design.md`

---

## Task 1: Delete the empty `browserRendering/` shell

**Why first:** Removing it before workspace declaration means bun never has to look at it. Also a small, independent commit to start clean.

**Files:**
- Delete: `browserRendering/` (entire directory)

- [ ] **Step 1: Verify the directory has no source or `package.json`**

Run:
```bash
find browserRendering -maxdepth 2 -not -path '*/node_modules*'
```

Expected output (only the dir itself + the node_modules dir, nothing else):
```
browserRendering
browserRendering/node_modules
```

If anything else appears, STOP and ask — the deck has unexpected content.

- [ ] **Step 2: Delete the directory**

Run:
```bash
rm -rf browserRendering
```

- [ ] **Step 3: Verify deletion**

Run:
```bash
ls -d browserRendering 2>&1
```

Expected output:
```
ls: cannot access 'browserRendering': No such file or directory
```

- [ ] **Step 4: Commit**

Run:
```bash
git add -A
git commit -m "chore: drop empty browserRendering deck shell

The directory contained no source, no package.json — only a leftover
node_modules from before the structure flatten. Removes the shell.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Fix duplicate / wrong `name` fields in deck `package.json`

**Why next:** bun workspaces requires every package name to be unique. Five decks currently have wrong or duplicated names that will reject workspace setup.

**Files:**
- Modify: `csp/package.json` — name: `browserrendering` → `csp`
- Modify: `rAF/package.json` — name: `browserrendering` → `raf`
- Modify: `mjml/package.json` — name: `my-first-presentation` → `mjml`
- Modify: `rIC/package.json` — name: `test` → `ric`
- Modify: `month261/package.json` — name: `month251` → `month261`

- [ ] **Step 1: Inspect current name fields to confirm the bug**

Run:
```bash
for f in */package.json; do
  name=$(jq -r .name "$f")
  echo "$f → $name"
done | sort -k3
```

Expected (5 mismatched names visible):
```
...
csp/package.json → browserrendering
rAF/package.json → browserrendering
mjml/package.json → my-first-presentation
month261/package.json → month251
rIC/package.json → test
...
```

- [ ] **Step 2: Apply the 5 renames via jq**

Run:
```bash
jq '.name = "csp"' csp/package.json > csp/package.json.tmp && mv csp/package.json.tmp csp/package.json
jq '.name = "raf"' rAF/package.json > rAF/package.json.tmp && mv rAF/package.json.tmp rAF/package.json
jq '.name = "mjml"' mjml/package.json > mjml/package.json.tmp && mv mjml/package.json.tmp mjml/package.json
jq '.name = "ric"' rIC/package.json > rIC/package.json.tmp && mv rIC/package.json.tmp rIC/package.json
jq '.name = "month261"' month261/package.json > month261/package.json.tmp && mv month261/package.json.tmp month261/package.json
```

- [ ] **Step 3: Verify all names are now unique**

Run:
```bash
for f in */package.json; do jq -r .name "$f"; done | sort | uniq -d
```

Expected output: **empty** (no duplicates).

- [ ] **Step 4: Verify the 5 renamed values**

Run:
```bash
for d in csp rAF mjml rIC month261; do
  printf "%-12s %s\n" "$d" "$(jq -r .name "$d/package.json")"
done
```

Expected:
```
csp          csp
rAF          raf
mjml         mjml
rIC          ric
month261     month261
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "fix(decks): correct duplicate / scaffold-leftover package names

Five decks still had the default name from \`npx slidev create\`
(\"browserrendering\", \"my-first-presentation\", \"test\") or a typo
(\"month251\" in month261). Workspaces require unique names; fix
ahead of declaring the root workspace.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Create root `package.json` declaring workspaces + shared deps

**Files:**
- Create: `package.json` (at repo root)

- [ ] **Step 1: Verify no root `package.json` exists yet**

Run:
```bash
ls package.json 2>&1
```

Expected:
```
ls: cannot access 'package.json': No such file or directory
```

If one exists, STOP and ask — the spec assumed none.

- [ ] **Step 2: Write root `package.json`**

Create `package.json` with this exact content:
```json
{
  "name": "presentation-decks",
  "private": true,
  "workspaces": ["*"],
  "dependencies": {
    "@slidev/cli": "^52.15.2",
    "@slidev/theme-default": "latest",
    "@slidev/theme-seriph": "latest",
    "vue": "^3.5.33"
  }
}
```

- [ ] **Step 3: Verify the file is valid JSON and matches spec**

Run:
```bash
jq -e '.workspaces == ["*"] and .dependencies."@slidev/cli" == "^52.15.2" and .dependencies.vue == "^3.5.33"' package.json
```

Expected output:
```
true
```

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "feat: add root package.json with bun workspaces

Declares workspaces: [\"*\"] and pins the four shared Slidev deps
to their newest versions in the repo (@slidev/cli@52.15.2,
vue@3.5.33). Decks will get those deps via hoisting after their
own package.json files are stripped in the next commit.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Remove shared deps from every deck `package.json`

**Why:** With the four shared deps now declared in root, each deck's own listing of them is redundant. Removing them prevents version drift and lets hoisting take over.

**Files (modify):** All `*/package.json` except `package.json` (root). Concretely 24 files.

- [ ] **Step 1: Snapshot current deck dep counts**

Run:
```bash
for f in */package.json; do
  count=$(jq '.dependencies | length' "$f")
  printf "%-25s %d deps\n" "$f" "$count"
done
```

Note this output — you'll diff against it after the change.

- [ ] **Step 2: Strip the four shared deps from every deck**

Run:
```bash
for f in */package.json; do
  jq 'del(.dependencies."@slidev/cli", .dependencies."@slidev/theme-default", .dependencies."@slidev/theme-seriph", .dependencies.vue)' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
done
```

- [ ] **Step 3: Confirm shared deps are gone from every deck**

Run:
```bash
grep -lE '"@slidev/(cli|theme-)|"vue"' */package.json
```

Expected output: **empty** (no deck mentions the shared deps in dependencies anymore).

- [ ] **Step 4: Spot-check decks with deck-specific deps still listed correctly**

Run:
```bash
echo "--- debunce ---"; jq '.dependencies' debunce/package.json
echo "--- intersectionObserver ---"; jq '.dependencies' intersectionObserver/package.json
echo "--- zod ---"; jq '.dependencies' zod/package.json
echo "--- shadcn-ui ---"; jq '.dependencies' shadcn-ui/package.json
echo "--- shadcn-ui devDeps ---"; jq '.devDependencies' shadcn-ui/package.json
```

Expected:
- `debunce`: `{"element-plus": "^2.11.9"}`
- `intersectionObserver`: `{"element-plus": "^2.12.0"}`
- `zod`: `{"zod": "^4.1.12"}`
- `shadcn-ui` dependencies: 8 entries (`@vueuse/core`, `class-variance-authority`, `clsx`, `lucide-vue-next`, `reka-ui`, `tailwind-merge`, `tw-animate-css`) — NO `@slidev/*` or `vue`
- `shadcn-ui` devDeps: `{"@tailwindcss/vite": "^4.3.0", "tailwindcss": "^4.3.0"}`

- [ ] **Step 5: Spot-check a deck that had ONLY shared deps now has empty `dependencies`**

Run:
```bash
jq '.dependencies' dify/package.json
jq '.dependencies' month264/package.json
```

Expected for both:
```
{}
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor(decks): strip shared deps from each package.json

Removes @slidev/cli, @slidev/theme-default, @slidev/theme-seriph,
and vue from all 24 decks. They now come from the root workspace's
single pinned version. Deck-specific deps (element-plus, reka-ui,
zod, tailwind, etc.) stay in their own deck.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Drop all deck `bun.lock` files and run root install

**Why:** Per-deck lockfiles will conflict with the root workspace lock that bun is about to generate. Remove them, then `bun install` once at the root to produce the unified lockfile and the hoisted `node_modules`.

**Files:**
- Delete: `*/bun.lock` (24 files)
- Create: `bun.lock` (at repo root, generated by `bun install`)

- [ ] **Step 1: List all current deck lockfiles**

Run:
```bash
ls */bun.lock | wc -l
```

Expected output: `24` (one per deck).

- [ ] **Step 2: Delete every deck-level lockfile**

Run:
```bash
rm */bun.lock
```

- [ ] **Step 3: Verify they're gone**

Run:
```bash
find . -maxdepth 2 -name "bun.lock"
```

Expected output: **empty** (no root `bun.lock` yet either).

- [ ] **Step 4: Run root install**

Run:
```bash
bun install
```

Expected: bun reports installing packages, recognises 24 workspaces, no errors. The command may take 30-90 seconds the first time. If it errors with `Workspace name "X" conflicts`, Task 2 missed a rename — STOP and report.

- [ ] **Step 5: Verify the root lockfile and hoisted node_modules exist**

Run:
```bash
ls bun.lock && ls node_modules/@slidev/cli/package.json
```

Expected:
```
bun.lock
node_modules/@slidev/cli/package.json
```

- [ ] **Step 6: Verify Slidev resolves to the root install from a deck**

Run:
```bash
cd shadcn-ui && bun pm ls 2>/dev/null | grep @slidev/cli | head -1 && cd ..
```

Expected: a line mentioning `@slidev/cli@52.15.x` resolvable from inside `shadcn-ui/`.

- [ ] **Step 7: Commit lockfile change**

```bash
git add -A
git commit -m "chore: collapse 24 deck lockfiles into one root bun.lock

After workspace declaration and shared-dep removal, only the root
needs a lockfile. \`bun install\` at root generates it and creates
a hoisted node_modules covering every deck.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Update root `CLAUDE.md` and `README.md` for workspace layout

**Why:** Both files currently say "No root `package.json`, no workspace tooling" — flatly wrong now. Quick-start instructions also need to change from one step to two.

**Files:**
- Modify: `CLAUDE.md`
- Modify: `README.md`

- [ ] **Step 1: Update `CLAUDE.md` "Repository shape" section**

Replace this block in `CLAUDE.md`:
```markdown
## Repository shape

A mono-repo of **independent Slidev decks**. There is no root `package.json`, no workspace tooling, and no root-level scripts. Every deck sits directly at the repo root as a self-contained Slidev project with its own `package.json`, `bun.lock`, `node_modules`, and deployment config.

Two kinds of decks, distinguished by directory name:

- **Technical deep-dives** — topic-named directories (e.g. `dify`, `shadcn-ui`, `chromeDevToolsMcp`, `zod`)
- **Monthly work reports** — `month<YYMM>` directories (e.g. `month264` for 2026-04)

A single root `.gitignore` covers build output, dependencies, and editor/OS noise for every deck — individual decks don't need their own.

**Always `cd` into a specific deck directory before running any command.** Running commands at the repo root will do nothing useful.
```

With this block:
```markdown
## Repository shape

A **bun workspace monorepo** of Slidev decks. The root `package.json` declares `workspaces: ["*"]` and owns the four shared deps (`@slidev/cli`, `@slidev/theme-default`, `@slidev/theme-seriph`, `vue`) at a single pinned version. Each deck has its own `package.json` for deck-specific deps and shares the root `node_modules` via bun hoisting. There is one lockfile at the root.

Two kinds of decks, distinguished by directory name:

- **Technical deep-dives** — topic-named directories (e.g. `dify`, `shadcn-ui`, `chromeDevToolsMcp`, `zod`)
- **Monthly work reports** — `month<YYMM>` directories (e.g. `month264` for 2026-04)

A single root `.gitignore` covers build output, dependencies, and editor/OS noise for every deck.

**First setup:** run `bun install` once at the repo root. After that, `cd` into a deck and use its scripts as usual.
```

- [ ] **Step 2: Update `CLAUDE.md` "Commands" section**

Replace this block:
```markdown
## Commands (run inside a deck directory)

Bun is the package manager (every deck ships a `bun.lock`); `npm`/`pnpm` work as fallbacks.

​```bash
bun install        # first-time setup for a deck
bun run dev        # start dev server with live reload, opens browser
bun run build      # static build to dist/
bun run export     # export to PDF
​```
```

With this block:
```markdown
## Commands

Bun is the package manager. Only the repo root has `bun.lock`.

​```bash
# At repo root, once after cloning:
bun install

# Inside any deck directory:
cd <deck>
bun run dev        # dev server with live reload, opens browser
bun run build      # static build to dist/
bun run export     # export to PDF
​```
```

- [ ] **Step 3: Update `CLAUDE.md` "Conventions when adding a new deck"**

Replace this block:
```markdown
## Conventions when adding a new deck

- Copy structure from a recent deck (`shadcn-ui` or `month264` are current).
- For tech topics, write a `spec.md` of source research before writing slides — this is the project's working pattern.
- Component-heavy structure is preferred when slides have significant custom layout or interactivity; markdown-heavy is fine for text/bullet decks.
```

With this block:
```markdown
## Conventions when adding a new deck

Do **not** run `npx slidev create` — it produces a standalone project that conflicts with the workspace. Instead:

1. `cp -r shadcn-ui <new-deck>` (or `month264` for a monthly report)
2. Edit `<new-deck>/package.json`: set `name` to `<new-deck>`, and remove any stray `bun.lock` inside the deck if the copy brought one
3. Run `bun install` at the repo root to wire the new deck into the workspace

Then:

- For tech topics, write a `spec.md` of source research before writing slides — this is the project's working pattern.
- Component-heavy structure is preferred when slides have significant custom layout or interactivity; markdown-heavy is fine for text/bullet decks.
```

- [ ] **Step 4: Update `README.md` Quick start section**

Replace this block in `README.md`:
```markdown
## Quick start

​```bash
cd <deck>
bun install
bun run dev     # dev server with live reload
bun run build   # static build to dist/
bun run export  # export to PDF
​```
```

With this block:
```markdown
## Quick start

​```bash
# Once after cloning (at repo root):
bun install

# In any deck directory:
cd <deck>
bun run dev     # dev server with live reload
bun run build   # static build to dist/
bun run export  # export to PDF
​```
```

- [ ] **Step 5: Visually verify both edits landed**

Run:
```bash
grep -n "bun workspace monorepo\|First setup\|First time setup\|At repo root, once" CLAUDE.md README.md
```

Expected: at least 3 hits — the phrases now exist where they should.

- [ ] **Step 6: Commit**

```bash
git add CLAUDE.md README.md
git commit -m "docs: update CLAUDE.md and README.md for workspace layout

Replaces the \"no root package.json, no workspace tooling\" claim
with the new reality. Adds the two-step setup flow (root install
once, then cd into a deck) and the new-deck scaffold instructions
(cp existing deck, rename, root install — not \`npx slidev create\`).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Acceptance — verify dev and build work in three sample decks

**Why:** This is the spec's verification step (§8). Three decks, picked for variety: `shadcn-ui` (heaviest deck-specific deps), `month264` (newest deck, plain), `debunce` (older deck with `element-plus`).

**Files:** None modified. This task verifies; no commit produced.

- [ ] **Step 1: Verify `shadcn-ui` dev server starts**

Run:
```bash
cd shadcn-ui && timeout 15 bun run dev > /tmp/shadcn-dev.log 2>&1 &
DEV_PID=$!
sleep 10
grep -E "(Server|localhost|public slide show|error)" /tmp/shadcn-dev.log | head -5
kill $DEV_PID 2>/dev/null
cd ..
```

Expected: log shows `public slide show` URL or `Server` line; no `Error` lines.

If it errors, the most likely cause is a stale resolution — try `rm -rf node_modules && bun install` at root and retry.

- [ ] **Step 2: Verify `shadcn-ui` builds to `dist/`**

Run:
```bash
cd shadcn-ui && bun run build 2>&1 | tail -5 && ls -d dist && cd ..
```

Expected: build prints `✓ built in Xs` or similar, `dist` directory exists.

- [ ] **Step 3: Verify `month264` builds**

Run:
```bash
cd month264 && bun run build 2>&1 | tail -3 && ls -d dist && cd ..
```

Expected: build succeeds; `dist` exists.

- [ ] **Step 4: Verify `debunce` builds (uses `element-plus`)**

Run:
```bash
cd debunce && bun run build 2>&1 | tail -3 && ls -d dist && cd ..
```

Expected: build succeeds; `element-plus` resolves; `dist` exists.

- [ ] **Step 5: Confirm disk usage improvement**

Run:
```bash
du -sh node_modules
du -sch */node_modules 2>/dev/null | tail -1
```

Expected: root `node_modules` ~500 MB-1 GB; sum of deck-level `node_modules` should be small or zero (only deck-specific deps not hoisted, if any).

- [ ] **Step 6: Clean up the test artifacts (optional)**

Run:
```bash
rm -rf shadcn-ui/dist month264/dist debunce/dist
```

(These were generated by acceptance builds; `.gitignore` already covers them so this is purely housekeeping.)

- [ ] **Step 7: Report acceptance result**

Tell the user:
- Which of the 3 decks built cleanly
- Final disk size (root `node_modules` + sum of any leftover deck `node_modules`)
- Any unexpected warnings worth flagging

If all 3 built cleanly: the workspace migration is complete. If any deck failed, follow the §7 rollback in the spec (re-pin the failing deck's `@slidev/cli` to its original version inside its own `package.json`).

---

## Self-Review Notes

- **Spec coverage:** §4.1 → Task 3; §4.2 → Task 4; §4.3 → Task 2; §4.4 → Task 5; §4.5 → Task 1; §5.1/§5.2 → Task 6; §8 → Task 7. All sections covered.
- **No tests because there is no test framework.** Verification is `bun install` succeeding (Task 5) and three decks running `dev`/`build` (Task 7). This is the right pattern for a config-only refactor.
- **One commit per task** except Task 7 (acceptance, no commit). Six commits total.
