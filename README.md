# Token Trading Table

This project is an independent frontend implementation inspired by modern
crypto analytics dashboards. While the overall layout follows common
industry patterns, several interaction and performance-focused improvements
were introduced, including smoother loading states, scoped hover behavior,
and deferred UI updates to improve responsiveness and user experience.


This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```
---

## 🌐 Demo Video (Required Deliverable)

Public YouTube demo video (1–2 min):

➡️ [Demo Link](https://www.youtube.com/watch?v=biMHx_y_Zgo)

---
📦Project Overview

The application displays live token market data across three independent
discovery stages:

New Pairs
Final Stretch
Migrated

Each column operates independently with its own sorting and rendering logic,
allowing smooth interaction even under frequent real-time updates.

✨ Key Features
🔄 Real-Time Market Updates
Live price, liquidity, market cap, and volume updates
Batched WebSocket simulation using requestAnimationFrame
Smooth price-change animations without layout shift

↕️ Per-Column Sorting
Independent sorting per column
ASC/DESC toggles with visual indicators
Memoized comparator-based sorting

⚡ Performance Optimizations
Virtualized token lists using @tanstack/react-virtual
Minimal re-renders via memoized components
Optimized update batching for stable FPS

🎨 UI & Interaction Enhancements
Side-drawer token details (instead of blocking modal)
Improved hover and active-row states
Custom skeleton loaders with staggered animation
Optional compact / comfortable row density

🛠 Tech Stack
Next.js 14 (App Router)
TypeScript (strict)
Tailwind CSS + shadcn/ui + Radix UI
Redux Toolkit
@tanstack/react-virtual
WebSocket mock service


---
## 📐 Architecture
src/
 ├── app/
 
 ├── components/
 
 │     ├── organisms/
 
 │     ├── molecules/
 
 │     ├── ui/
 
 ├── lib/
 
 │     ├── mockData.ts
 
 │     ├── store/
 
 │     ├── websocketMock.ts
 
 ├── types/

### Key Components:

TokenTable — main orchestrator

TokenColumn — virtualized list of tokens

TokenCard — individual token tile

FilterSidebar — filtering UI

PulseHeader — chain switcher + tabs

TickerSettingsModal — ticker configuration

DisplaySettingsModal — UI preferences

---

## 🧠 Design Decisions
1. Why Redux Toolkit?

To avoid prop-drilling across deeply nested components and maintain a global filter & sorting state.

2. WebSocket Batching

To avoid render spikes, updates are buffered:

requestAnimationFrame(() => flushUpdates());


This mirrors real trading UIs.

3. Memoized Sorting System

Sorting uses a comparator map to avoid repeated logic:

const comparator = {
  marketCap: (a, b) => b.marketCap - a.marketCap,
  volume: (a, b) => b.volume24h - a.volume24h,
  ...
}

4. Column Limiting

Each column is capped to MAX = 12 to maintain the intended UI layout.

5. Virtual Rendering

Huge token lists scroll smoothly due to virtual DOM rendering.



