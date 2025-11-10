<template>
  <div class="min-h-screen relative overflow-hidden">

    <div class="absolute inset-0 z-0">
        <img 
            src="/assets/vector.jpg" 
            alt="Background" 
            class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/30 z-10"></div>
    </div>
    
    <div class="absolute inset-0 bg-black/30 z-10"></div>
    
    <UContainer class="relative z-20 min-h-screen flex flex-col  pt-52">
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold mb-6 text-gold-500 drop-shadow-lg">🤖 AI Assistant Frontend</h1>
        <p class="text-xl text-white mb-12 drop-shadow">
          Welcome! Choose an action below:
        </p>
      </div>

      <div class="flex justify-center gap-8">
        <UButton 
          to="/upload" 
          size="xl"
          class="bg-black border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black font-bold text-lg px-8 py-4 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          📄 Upload Document
        </UButton>
        <UButton 
          to="/chat" 
          size="xl"
          class="bg-black border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black font-bold text-lg px-8 py-4 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          💬 Chat with Assistant
        </UButton>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
/* Custom gold color palette */
:deep(.text-gold-500) {
  color: #FFD700;
}

:deep(.text-gold-300) {
  color: #F4C430;
}

:deep(.border-gold-500) {
  border-color: #FFD700;
}

:deep(.bg-gold-500) {
  background-color: #FFD700;
}

:deep(.hover\\:bg-gold-500:hover) {
  background-color: #FFD700;
}

:deep(.hover\\:text-black:hover) {
  color: #000000;
}

/* Ensure buttons have proper z-index */
:deep(.flex.justify-center) {
  position: relative;
  z-index: 30;
}
</style>