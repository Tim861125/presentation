<script setup lang="ts">
import { ref, computed } from 'vue'

interface Tool {
  name: string
  desc: string
  usage: string
  category: Category
}

type Category = '導航操作' | 'DevTools 追蹤' | 'DevTools 檢查' | '環境模擬'

const searchQuery = ref('')
const activeCategory = ref<'全部' | Category>('全部')
const expandedTool = ref<string | null>(null)

const categories = ['全部', '導航操作', 'DevTools 追蹤', 'DevTools 檢查', '環境模擬'] as const

const tools: Tool[] = [
  // 導航操作
  { name: 'navigate', desc: '導航到指定 URL', usage: '打開目標頁面進行 Debug 分析', category: '導航操作' },
  { name: 'click', desc: '點擊頁面元素', usage: '模擬使用者點擊，觸發互動後追蹤性能', category: '導航操作' },
  { name: 'fill', desc: '填寫輸入框', usage: '表單自動填入，配合登入流程測試', category: '導航操作' },
  { name: 'select', desc: '選擇下拉選項', usage: '操作 select 元素，測試不同篩選條件', category: '導航操作' },
  { name: 'screenshot', desc: '截取螢幕截圖', usage: '記錄頁面視覺狀態，附加至報告', category: '導航操作' },
  { name: 'evaluate_js', desc: '執行 JavaScript', usage: '在頁面上下文執行程式碼，提取數據', category: '導航操作' },
  { name: 'wait_for_element', desc: '等待元素出現', usage: '動態載入內容等待，確保 trace 完整', category: '導航操作' },
  // DevTools 追蹤
  { name: 'start_trace', desc: '開始性能追蹤記錄', usage: '開始錄製 CDP performance trace', category: 'DevTools 追蹤' },
  { name: 'stop_trace', desc: '停止性能追蹤', usage: '結束錄製，準備收集分析資料', category: 'DevTools 追蹤' },
  { name: 'get_trace_data', desc: '取得完整追蹤資料', usage: '分析 LCP / INP / 長任務 / Render-blocking', category: 'DevTools 追蹤' },
  { name: 'get_performance_metrics', desc: '取得即時性能指標', usage: '查詢 CWV 數值（LCP/CLS/FID）', category: 'DevTools 追蹤' },
  { name: 'get_layout_metrics', desc: '取得版面配置指標', usage: '分析頁面佈局效能與 CLS 根因', category: 'DevTools 追蹤' },
  // DevTools 檢查
  { name: 'get_console_messages', desc: '取得 Console 訊息', usage: '自動排查 JS 錯誤與警告', category: 'DevTools 檢查' },
  { name: 'get_network_requests', desc: '取得 Network 請求列表', usage: '分析 API 耗時、狀態碼、資源大小', category: 'DevTools 檢查' },
  { name: 'get_accessibility_tree', desc: '取得 Accessibility 樹', usage: 'A11y 無障礙分析與 WCAG 合規檢查', category: 'DevTools 檢查' },
  { name: 'get_dom_snapshot', desc: '取得 DOM 快照', usage: '檢查頁面 DOM 結構，分析元素層級', category: 'DevTools 檢查' },
  { name: 'get_resource_content', desc: '取得資源檔案內容', usage: '讀取 JS / CSS 原始碼進行分析', category: 'DevTools 檢查' },
  { name: 'get_cookies', desc: '取得瀏覽器 Cookies', usage: '檢查認證 Token 與 Session 狀態', category: 'DevTools 檢查' },
  { name: 'get_local_storage', desc: '取得 LocalStorage 資料', usage: '檢查本地儲存資料是否正確', category: 'DevTools 檢查' },
  { name: 'get_page_source', desc: '取得頁面 HTML 原始碼', usage: '分析 SSR 渲染結果與 SEO 標籤', category: 'DevTools 檢查' },
  { name: 'inspect_element', desc: '檢查元素 CSS 屬性', usage: '取得計算後樣式，排查 UI 異常', category: 'DevTools 檢查' },
  // 環境模擬
  { name: 'emulate_network', desc: '模擬網路條件', usage: '測試 3G / 4G / 離線等弱網情境', category: '環境模擬' },
  { name: 'emulate_device', desc: '模擬裝置類型', usage: '手機 / 平板 RWD 響應式測試', category: '環境模擬' },
  { name: 'set_viewport', desc: '設定視窗尺寸', usage: '指定解析度測試斷點排版', category: '環境模擬' },
  { name: 'set_geolocation', desc: '設定地理位置', usage: '測試地區性功能（地圖、在地化）', category: '環境模擬' },
  { name: 'set_timezone', desc: '設定時區', usage: '測試跨時區日期時間顯示', category: '環境模擬' },
  { name: 'set_user_agent', desc: '設定 User Agent', usage: '模擬不同瀏覽器環境的相容性測試', category: '環境模擬' },
]

const filteredTools = computed(() =>
  tools.filter(t => {
    const matchCat = activeCategory.value === '全部' || t.category === activeCategory.value
    const q = searchQuery.value.toLowerCase()
    const matchSearch = !q || t.name.toLowerCase().includes(q) || t.desc.includes(searchQuery.value)
    return matchCat && matchSearch
  })
)

const catStyle: Record<Category, { border: string; badge: string; dot: string }> = {
  '導航操作':     { border: '#3b82f6', badge: 'rgba(59,130,246,0.15)', dot: '#60a5fa' },
  'DevTools 追蹤': { border: '#10b981', badge: 'rgba(16,185,129,0.15)', dot: '#34d399' },
  'DevTools 檢查': { border: '#8b5cf6', badge: 'rgba(139,92,246,0.15)', dot: '#a78bfa' },
  '環境模擬':     { border: '#f97316', badge: 'rgba(249,115,22,0.15)', dot: '#fb923c' },
}

function toggleExpand(name: string) {
  expandedTool.value = expandedTool.value === name ? null : name
}
</script>

<template>
  <div class="tools-library">
    <!-- Toolbar -->
    <div class="toolbar">
      <input v-model="searchQuery" placeholder="🔍 搜尋工具名稱..." class="search-input" />
      <div class="cat-tabs">
        <button
          v-for="cat in categories" :key="cat"
          @click="activeCategory = cat as any"
          :class="['cat-btn', { active: activeCategory === cat }]"
        >{{ cat }}</button>
      </div>
    </div>

    <!-- Grid -->
    <div class="tools-grid">
      <div
        v-for="tool in filteredTools" :key="tool.name"
        @click="toggleExpand(tool.name)"
        class="tool-card"
        :style="{ borderLeftColor: catStyle[tool.category].border }"
        :class="{ expanded: expandedTool === tool.name }"
      >
        <div class="card-top">
          <code class="t-name">{{ tool.name }}</code>
          <span class="t-badge" :style="{ background: catStyle[tool.category].badge, color: catStyle[tool.category].dot }">
            {{ tool.category }}
          </span>
        </div>
        <div class="t-desc">{{ tool.desc }}</div>
        <div v-if="expandedTool === tool.name" class="t-usage">
          <span class="usage-icon">💡</span> {{ tool.usage }}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      顯示 {{ filteredTools.length }} / {{ tools.length }} 個工具 &nbsp;·&nbsp; 點擊工具卡片查看使用場景
    </div>
  </div>
</template>

<style scoped>
.tools-library {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 360px;
}
.toolbar {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
}
.search-input {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(100, 116, 139, 0.4);
  border-radius: 6px;
  color: #e2e8f0;
  padding: 5px 10px;
  font-size: 11px;
  width: 170px;
  outline: none;
  transition: border-color 0.2s;
}
.search-input:focus { border-color: rgba(59, 130, 246, 0.6); }
.search-input::placeholder { color: #64748b; }
.cat-tabs {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
.cat-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(100, 116, 139, 0.3);
  border-radius: 5px;
  color: #64748b;
  padding: 3px 8px;
  cursor: pointer;
  font-size: 10px;
  transition: all 0.15s;
  white-space: nowrap;
}
.cat-btn.active, .cat-btn:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
  color: #93c5fd;
}
.tools-grid {
  flex: 1;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  align-content: start;
  padding-right: 2px;
}
.tool-card {
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-left: 3px solid;
  border-radius: 7px;
  padding: 7px 8px;
  cursor: pointer;
  transition: all 0.15s;
  font-size: 11px;
}
.tool-card:hover {
  background: rgba(30, 41, 59, 0.75);
  border-color: rgba(255, 255, 255, 0.15);
}
.tool-card.expanded {
  background: rgba(30, 58, 138, 0.2);
  border-top-color: rgba(59, 130, 246, 0.4);
  border-right-color: rgba(59, 130, 246, 0.4);
  border-bottom-color: rgba(59, 130, 246, 0.4);
}
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4px;
  margin-bottom: 3px;
}
.t-name {
  color: #60a5fa;
  font-size: 10.5px;
  font-weight: bold;
  font-family: monospace;
}
.t-badge {
  font-size: 9px;
  padding: 1px 4px;
  border-radius: 3px;
  flex-shrink: 0;
  font-weight: bold;
  white-space: nowrap;
}
.t-desc {
  color: #94a3b8;
  font-size: 10px;
  line-height: 1.35;
}
.t-usage {
  margin-top: 5px;
  color: #fde68a;
  font-size: 10px;
  background: rgba(251, 191, 36, 0.08);
  border-radius: 4px;
  padding: 3px 5px;
  line-height: 1.35;
}
.usage-icon { margin-right: 2px; }
.footer {
  text-align: center;
  color: #475569;
  font-size: 10px;
  flex-shrink: 0;
  padding-bottom: 2px;
}
</style>
