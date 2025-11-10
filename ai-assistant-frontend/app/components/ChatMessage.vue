<template>
  <div
    :class="[
      'p-4 rounded-lg max-w-[80%] border-2 shadow-lg',
      role === 'user' 
        ? 'bg-black/80 border-gold-500 self-end ml-auto text-gold-300' 
        : 'bg-black/60 border-gold-300 self-start mr-auto text-white'
    ]"
  >
    <p class="text-base whitespace-pre-wrap">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  role: { type: String, required: true },
  text: { type: String, required: true },
});
</script>

