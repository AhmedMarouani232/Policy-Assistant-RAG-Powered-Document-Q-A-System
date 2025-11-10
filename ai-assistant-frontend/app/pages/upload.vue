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

    <!-- Floating Chat Button -->
    <div class="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-30">
      <UButton 
        to="/chat"
        size="4xl"
        class="rounded-full w-30 h-20 bg-black border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center justify-center"
      >
        <span class="text-2xl">💬Chat</span>
      </UButton>
    </div>
    
    <UContainer class="relative z-20 min-h-screen flex items-center justify-center">
      <UCard class="max-w-lg w-full bg-black/80 backdrop-blur-sm border-2 border-gold-500">
        <div class="text-center mb-6">
          <h1 class="text-3xl font-bold text-gold-500 drop-shadow-lg">📄 Upload Document</h1>
        </div>

        <form @submit.prevent="handleUpload" class="space-y-6">
          <UInput 
            type="file" 
            @change="onFileChange" 
            class="text-white"
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
            class="w-full bg-black border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black font-bold text-lg py-4 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Upload
          </UButton>
        </form>

        <p v-if="message" class="mt-6 text-center text-sm text-gold-300">
          {{ message }}
        </p>
      </UCard>
    </UContainer>
  </div>
</template>

<script setup>
const { uploadDocument } = useApi()

const isLoading = ref(false)
const message = ref('')
const messageType = ref('success') // 'success' or 'error'
const selectedFile = ref(null)

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    message.value = '' // Clear previous messages
  }
}

const handleUpload = async () => {
  if (!selectedFile.value) {
    message.value = 'Please select a file first'
    messageType.value = 'error'
    return
  }

  isLoading.value = true
  message.value = ''
  
  try {
    const result = await uploadDocument(selectedFile.value)
    message.value = 'File uploaded successfully!✅'
    messageType.value = 'success'
    
    // Reset form
    selectedFile.value = null
    const fileInput = document.querySelector('input[type="file"]')
    if (fileInput) fileInput.value = ''
    
  } catch (error) {
    message.value = error.message
    messageType.value = 'error'
  } finally {
    isLoading.value = false
  }
}
</script>

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

/* Style the file input */
:deep(input[type="file"]) {
  color: white;
}

:deep(input[type="file"]::file-selector-button) {
  background: #FFD700;
  color: black;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  margin-right: 12px;
  cursor: pointer;
}

:deep(input[type="file"]::file-selector-button:hover) {
  background: #F4C430;
}
</style>