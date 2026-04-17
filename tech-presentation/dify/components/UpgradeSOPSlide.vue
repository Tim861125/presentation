<template>
  <div class="h-full flex flex-col justify-center px-2">
    <h2 class="text-2xl font-bold text-white mb-4">升版 SOP</h2>
    <div class="grid grid-cols-2 gap-5">
      <div class="space-y-3">
        <InfoCard title="升版前必做" color="blue">
          <div class="font-mono text-xs text-gray-300 leading-relaxed">
            <span class="text-gray-500"># 1. 備份 DB</span><br>
            docker compose exec db pg_dump \<br>
            &nbsp;&nbsp;-U postgres dify > backup.sql<br>
            <span class="text-gray-500"># 2. 備份 .env</span><br>
            cp .env .env.backup<br>
            <span class="text-gray-500"># 3. 比較新版參數</span><br>
            diff .env .env.example
          </div>
        </InfoCard>
        <InfoCard title="升版步驟" color="green">
          <div class="font-mono text-xs text-gray-300 leading-relaxed">
            git checkout v1.x.x<br>
            docker compose down<br>
            docker compose pull<br>
            docker compose up -d<br>
            docker compose ps
          </div>
        </InfoCard>
      </div>
      <div class="space-y-2">
        <div class="text-xs text-red-400 font-mono mb-2">常見升版失敗</div>
        <div class="rounded border border-red-500/20 bg-red-500/5 p-2.5 text-xs">
          <div class="text-red-300 font-bold">DB Migration 失敗</div>
          <div class="font-mono text-gray-400 mt-0.5">docker compose logs api<br>docker compose exec api flask db upgrade</div>
        </div>
        <div class="rounded border border-orange-500/20 bg-orange-500/5 p-2.5 text-xs">
          <div class="text-orange-300 font-bold">.env 新參數沒填</div>
          <div class="text-gray-400 mt-0.5">diff .env .env.example 後補上再重啟</div>
        </div>
        <div class="rounded border border-yellow-500/20 bg-yellow-500/5 p-2.5 text-xs">
          <div class="text-yellow-300 font-bold">Weaviate Schema 不相容</div>
          <div class="text-gray-400 mt-0.5">需重建向量索引 → 知識庫文件要重新 embedding！</div>
        </div>
        <Callout type="danger">⚠️ 黃金守則：每次只升 1–2 個 minor version</Callout>
      </div>
    </div>
  </div>
</template>
