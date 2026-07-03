<script setup>
// 依 p1 (drawio) 解析出的房間配置，座標已正規化（原點平移、左右對稱化）
// type 對應配色；render 順序：走廊/大空間先畫，套房衛浴最後疊上
const rooms = [
  // 走廊（原圖未畫好，依左右鏡像補齊）
  { x: 30,  y: 60,  w: 190, h: 160, label: '', type: 'hall' },
  { x: 480, y: 60,  w: 190, h: 160, label: '', type: 'hall' },

  // 客廳
  { x: 0,   y: 220, w: 220, h: 190, label: '客廳', type: 'living' },
  { x: 480, y: 220, w: 220, h: 190, label: '客廳', type: 'living' },

  // 廚房
  { x: 90,  y: 0,   w: 260, h: 60,  label: '廚房', type: 'kitchen' },
  { x: 350, y: 0,   w: 260, h: 60,  label: '廚房', type: 'kitchen' },

  // 房間
  { x: 220, y: 60,  w: 90,  h: 90,  label: '房間', type: 'bed' },
  { x: 220, y: 150, w: 130, h: 130, label: '房間', type: 'bed' },
  { x: 220, y: 280, w: 130, h: 130, label: '房間', type: 'bed' },
  { x: 390, y: 60,  w: 90,  h: 90,  label: '房間', type: 'bed' },
  { x: 350, y: 150, w: 130, h: 130, label: '房間', type: 'bed' },
  { x: 350, y: 280, w: 130, h: 130, label: '房間', type: 'bed' },

  // 陽台
  { x: 0,   y: 410, w: 350, h: 60,  label: '陽台', type: 'balcony' },
  { x: 350, y: 410, w: 350, h: 60,  label: '陽台', type: 'balcony' },
  { x: 310, y: 60,  w: 80,  h: 90,  label: '陽台', type: 'balcony' },

  // 衛浴（角落）
  { x: 30,  y: 0,   w: 60,  h: 60,  label: '衛浴', type: 'bath' },
  { x: 610, y: 0,   w: 60,  h: 60,  label: '衛浴', type: 'bath' },
]

// 套房附屬衛浴（疊在房間角落，較小）
const ensuites = [
  { x: 280, y: 280, w: 70, h: 30, label: '衛浴' },
  { x: 350, y: 280, w: 70, h: 30, label: '衛浴' },
]

// 大門（客廳對外開口，含開門弧線）
const doors = [
  { hinge: '0,235',   arc: 'M 0 270 A 35 35 0 0 1 0 200' },
  { hinge: '700,235', arc: 'M 700 270 A 35 35 0 0 0 700 200' },
]

const styles = {
  living:  { fill: '#dbeafe', stroke: '#3b82f6' },
  bed:     { fill: '#fef3c7', stroke: '#f59e0b' },
  kitchen: { fill: '#dcfce7', stroke: '#22c55e' },
  bath:    { fill: '#cffafe', stroke: '#06b6d4' },
  balcony: { fill: '#ecfccb', stroke: '#84cc16' },
  hall:    { fill: 'url(#hatch)', stroke: '#9ca3af' },
}

const legend = [
  { label: '客廳', type: 'living' },
  { label: '房間', type: 'bed' },
  { label: '廚房', type: 'kitchen' },
  { label: '衛浴', type: 'bath' },
  { label: '陽台', type: 'balcony' },
]

const fontFor = (r) => Math.min(18, Math.max(10, Math.min(r.w, r.h) * 0.26))
</script>

<template>
  <div class="w-full flex flex-col items-center gap-2">
    <svg viewBox="-16 -16 732 502" class="w-full max-h-[470px]">
      <defs>
        <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse"
                 patternTransform="rotate(45)">
          <rect width="8" height="8" fill="#f3f4f6" />
          <line x1="0" y1="0" x2="0" y2="8" stroke="#d1d5db" stroke-width="1.5" />
        </pattern>
      </defs>

      <!-- 房間 -->
      <g v-for="(r, i) in rooms" :key="i">
        <rect :x="r.x" :y="r.y" :width="r.w" :height="r.h"
              :fill="styles[r.type].fill" :stroke="styles[r.type].stroke"
              stroke-width="2.5" rx="2" />
        <text :x="r.x + r.w / 2" :y="r.y + r.h / 2"
              text-anchor="middle" dominant-baseline="central"
              :style="{ fontSize: fontFor(r) + 'px', fontWeight: 600 }"
              fill="#374151">{{ r.label }}</text>
      </g>

      <!-- 套房衛浴 -->
      <g v-for="(e, i) in ensuites" :key="'e' + i">
        <rect :x="e.x" :y="e.y" :width="e.w" :height="e.h"
              :fill="styles.bath.fill" :stroke="styles.bath.stroke"
              stroke-width="2" rx="2" />
        <text :x="e.x + e.w / 2" :y="e.y + e.h / 2"
              text-anchor="middle" dominant-baseline="central"
              style="font-size: 11px" fill="#374151">{{ e.label }}</text>
      </g>

      <!-- 大門 -->
      <g v-for="(d, i) in doors" :key="'d' + i" fill="none" stroke="#6b7280" stroke-width="2">
        <path :d="d.arc" stroke-dasharray="4 3" />
      </g>
    </svg>

    <div class="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs">
      <div v-for="l in legend" :key="l.label" class="flex items-center gap-1.5">
        <span class="inline-block w-4 h-4 rounded-sm border"
              :style="{ background: styles[l.type].fill, borderColor: styles[l.type].stroke }" />
        <span>{{ l.label }}</span>
      </div>
    </div>
  </div>
</template>
