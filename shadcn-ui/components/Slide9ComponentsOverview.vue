<template>
  <div class="h-full w-full bg-zinc-950 text-zinc-100 px-12 py-7 flex flex-col overflow-hidden">
    <SlideHeader
      eyebrow="Catalog · 70+ Components"
      title="幾乎你需要的，都有"
      subtitle="從表單到 Dashboard 級資料元件 — 一份完整工具箱。"
    />

    <div class="grid grid-cols-3 gap-2.5 flex-1 min-h-0">
      <Card v-for="group in groups" :key="group.title" v-click
            class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
        <CardHeader class="px-3 gap-0.5">
          <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
            <span class="size-1.5 rounded-full" :class="dotColor[group.color]" />
            {{ group.title }}
          </CardTitle>
        </CardHeader>
        <CardContent class="px-3">
          <div class="flex flex-wrap gap-1">
            <span v-for="item in group.items" :key="item"
                  class="text-[9px] font-mono rounded border border-white/5 bg-white/[0.03] px-1.5 py-0.5 text-zinc-300">
              {{ item }}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const groups = [
  { title: '表單與輸入', color: 'blue',
    items: ['Button', 'Checkbox', 'Input', 'OTP', 'Select', 'Slider', 'Switch', 'Textarea', 'Toggle', 'Radio'] },
  { title: '顯示與佈局', color: 'green',
    items: ['Accordion', 'Alert', 'Avatar', 'Badge', 'Breadcrumb', 'Card', 'Carousel', 'Separator', 'Skeleton'] },
  { title: '覆蓋層', color: 'purple',
    items: ['Alert Dialog', 'Dialog', 'Drawer', 'Hover Card', 'Popover', 'Sheet', 'Tooltip'] },
  { title: '導覽', color: 'cyan',
    items: ['Command', 'Context Menu', 'Dropdown', 'Menubar', 'Navigation', 'Pagination'] },
  { title: '資料呈現', color: 'orange',
    items: ['Chart', 'Data Table', 'Progress', 'Scroll Area', 'Table', 'Tabs'] },
  { title: '特殊元件', color: 'pink',
    items: ['Calendar', 'Combobox', 'Date Picker', 'Empty', 'Kbd', 'Resizable', 'Sidebar', 'Sonner'] },
]

const dotColor: Record<string, string> = {
  blue: 'bg-blue-400',
  green: 'bg-emerald-400',
  purple: 'bg-purple-400',
  cyan: 'bg-cyan-400',
  orange: 'bg-orange-400',
  pink: 'bg-pink-400',
}
</script>
