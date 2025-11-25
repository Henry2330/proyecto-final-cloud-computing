import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable para manejo de loading states
 * @returns {Object} - Loading state y métodos
 */
export function useLoading(initialState = false) {
  const isLoading = ref(initialState)
  const loadingCount = ref(0)

  const startLoading = () => {
    loadingCount.value++
    isLoading.value = true
  }

  const stopLoading = () => {
    loadingCount.value = Math.max(0, loadingCount.value - 1)
    if (loadingCount.value === 0) {
      isLoading.value = false
    }
  }

  const resetLoading = () => {
    loadingCount.value = 0
    isLoading.value = false
  }

  /**
   * Ejecutar una función asíncrona con loading automático
   */
  const withLoading = async (fn) => {
    startLoading()
    try {
      const result = await fn()
      return result
    } finally {
      stopLoading()
    }
  }

  return {
    isLoading,
    startLoading,
    stopLoading,
    resetLoading,
    withLoading
  }
}

/**
 * Composable para debounce
 */
export function useDebounce() {
  let timeout = null

  const debounce = (fn, delay = 300) => {
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => fn(...args), delay)
    }
  }

  onUnmounted(() => {
    clearTimeout(timeout)
  })

  return { debounce }
}

/**
 * Composable para detección de click fuera
 */
export function useClickOutside(callback) {
  const elementRef = ref(null)

  const handleClickOutside = (event) => {
    if (elementRef.value && !elementRef.value.contains(event.target)) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  return { elementRef }
}


