<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img 
        src="/assets/vector.jpg" 
        alt="Background" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/30 z-10"></div>
    </div>

    <!-- Floating Upload Button -->
    <div class="fixed bottom-20   z-30">
      <UButton 
        to="/upload"
        size="xl"
        class="rounded-full w-40 h-20 bg-black border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center justify-center"
      >
        <span class="text-2xl">📄 Upload</span>
      </UButton>
    </div>
    
    <!-- Content -->
    <UContainer class="relative z-20 min-h-screen flex items-center justify-center py-10">
      <UCard class="max-w-2xl w-full bg-black/80 backdrop-blur-sm border-2 border-gold-500">
        <div class="text-center mb-6">
          <h1 class="text-3xl font-bold text-gold-500 drop-shadow-lg">💬 Chat with AI Assistant</h1>
        </div>

        <!-- Chat Messages -->
        <div class="space-y-4 h-[400px] overflow-y-auto border-2 border-gold-500 rounded-lg p-4 bg-black/60">
          <ChatMessage
            v-for="(msg, i) in messages"
            :key="i"
            :role="msg.role"
            :text="msg.text"
          />
        </div>

        <!-- Input Form -->
        <form @submit.prevent="sendMessage" class="mt-6 flex space-x-3">
          <UInput 
            v-model="question" 
            placeholder="Ask your question..." 
            class="flex-1"
            :ui="{
              base: 'bg-black border-2 border-gold-500 text-white placeholder-gray-400',
              color: {
                white: {
                  outline: 'shadow-none bg-black border-2 border-gold-500 text-white'
                }
              }
            }"
          />
          <UButton 
            type="submit" 
            :loading="isLoading" 
            size="xl"
            class="bg-black border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black font-bold px-6 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Send
          </UButton>
        </form>
      </UCard>
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

:deep(.border-gold-300) {
  border-color: #F4C430;
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

/* Style scrollbar for the chat container */
:deep(.overflow-y-auto) {
  scrollbar-width: thin;
  scrollbar-color: #FFD700 #000000;
}

:deep(.overflow-y-auto::-webkit-scrollbar) {
  width: 6px;
}

:deep(.overflow-y-auto::-webkit-scrollbar-track) {
  background: #000000;
}

:deep(.overflow-y-auto::-webkit-scrollbar-thumb) {
  background: #FFD700;
  border-radius: 3px;
}

:deep(.overflow-y-auto::-webkit-scrollbar-thumb:hover) {
  background: #F4C430;
}
</style>


<script setup lang="ts">
import axios from "axios";
const config = useRuntimeConfig();

const question = ref("");
const messages = ref<{ role: string; text: string }[]>([]);
const isLoading = ref(false);

const sendMessage = async () => {
  if (!question.value.trim()) return;

  const userMessage = { role: "user", text: question.value };
  messages.value.push(userMessage);
  question.value = "";

  isLoading.value = true;
  try {
    const res = await axios.post(`${config.public.apiBase}/query`, {
      question: userMessage.text,
    });

    messages.value.push({ role: "assistant", text: res.data.answer || "No response." });
  } catch (err) {
    messages.value.push({ role: "assistant", text: "❌ Error: Unable to fetch answer." });
  } finally {
    isLoading.value = false;
  }
};
</script>
