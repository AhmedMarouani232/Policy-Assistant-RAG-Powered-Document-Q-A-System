// composables/useApi.ts - Alternative with useFetch
export const useApi = () => {
  const uploadDocument = async (file: File) => {
    const formData = new FormData()
    formData.append('docs', file)
    
    const { data, error } = await useFetch('/upload', {
      baseURL: 'http://localhost:3001',
      method: 'POST',
      body: formData
    })
    
    if (error.value) {
      throw new Error(`Upload failed: ${error.value.message}`)
    }
    
    return data.value
  }
  
  return {
    uploadDocument
  }
}