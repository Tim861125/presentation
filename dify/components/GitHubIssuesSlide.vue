<template>
  <div class="h-full flex flex-col justify-center px-2">
    <h2 class="text-2xl font-bold text-white mb-4">GitHub Issues 精選 — 已知限制</h2>
    <div class="space-y-3">
      <IssueCard v-click
        badge="BUG #32565" color="red"
        title="新 Agent Node 無法呼叫工具 → command not found"
        description="1.14.0-rc1 問題，呼叫 Tool 時拋出 command not found"
        solution="→ 暫時降回穩定版，等官方修復再升版"
      />
      <IssueCard v-click
        badge="ISSUE #32555" color="orange"
        title="Loop / Iteration 內部無法使用 Human-in-the-loop Node"
        description="人工審核/確認場景在 Loop 內無法實現"
        solution="→ 改用多個串接的 Workflow，每段各自等待輸入"
      />
      <IssueCard v-click
        badge="ISSUE #32310" color="yellow"
        title="Workflow as Code — 不支援 DSL 版本控制"
        description="Workflow 存在 DB，無法 git diff / code review / CI 整合"
        solution="→ 社群 workaround：用 Claude Code 從自然語言產生 Workflow DSL"
      />
      <IssueCard v-click
        badge="DISCUSSION" color="blue"
        title="Variable Aggregator 只處理單一變數，不支援多變數聚合"
        description="多個分支輸出合併成列表時，行為不符預期"
        solution="→ 用 Code Node 手動合併"
      />
    </div>
  </div>
</template>
