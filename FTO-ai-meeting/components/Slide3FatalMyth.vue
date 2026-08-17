<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="MISCONCEPTION"
      title="最致命的誤解：我申請到專利了，所以很安全？"
      subtitle="專利是「排他權」，並非「自由實施許可證」"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="slate" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="slate">😌 常見直覺盲區</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>「我們研發團隊有做出實體產品，當然能賣。」</li>
          <li>「我們自己都已經拿到發明專利了，更不可能侵權。」</li>
          <li>「市場上沒看過一模一樣的競品，應該沒事。」</li>
        </ul>
      </TechCard>

      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">😱 法律與實務真相</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li class="text-rose-300 font-semibold">專利是「禁止別人用」的權利，不是「自己能用」的許可。</li>
          <li>「能不能申請專利」與「會不會侵犯他人專利」是兩件事。</li>
          <li>你的專利產品極可能落入他人更早、更廣義的上位專利保護傘下。</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
