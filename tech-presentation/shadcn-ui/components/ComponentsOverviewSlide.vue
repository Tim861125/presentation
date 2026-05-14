<template>
  <div class="h-full w-full bg-zinc-950 text-zinc-100 px-12 py-7 flex flex-col overflow-hidden">
    <SlideHeader
      eyebrow="Catalog · 70+ Components"
      title="幾乎你需要的，都有"
      subtitle="從表單到 Dashboard 級資料元件 — 一份完整工具箱。"
    />

    <div class="grid grid-cols-3 gap-2.5 flex-1 min-h-0">
      <ShadCard v-for="group in groups" :key="group.title" v-click
                :title="group.title" dot :color="group.color" size="md">
        <template #header>
          <ShadBadge variant="outline">{{ group.items.length }}</ShadBadge>
        </template>
        <div class="flex flex-wrap gap-1">
          <span v-for="item in group.items" :key="item"
                class="text-[9px] font-mono rounded border border-white/5 bg-white/[0.03] px-1.5 py-0.5 text-zinc-300">
            {{ item }}
          </span>
        </div>
      </ShadCard>
    </div>

    <div v-click class="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
      <div class="flex items-center gap-2 text-[11px] text-zinc-400">
        <span class="text-emerald-400">✦</span>
        全部一行裝進來：
        <code class="font-mono text-zinc-200">pnpm dlx shadcn add --all</code>
      </div>
      <div class="text-[10px] font-mono text-zinc-500">ui.shadcn.com/docs/components</div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
</script>
