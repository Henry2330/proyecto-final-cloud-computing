import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor de request
api.interceptors.request.use(
  config => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * Interceptor de Response
 *
 * @description
 * Maneja automáticamente errores de autenticación (401):
 * - Cierra la sesión del usuario
 * - Limpia el token
 * - Redirige a la página de login
 *
 * @param {import('axios').AxiosResponse} response - Respuesta exitosa
 * @returns {import('axios').AxiosResponse} Respuesta sin modificar
 *
 * @param {import('axios').AxiosError} error - Error de la petición
 * @returns {Promise<never>} Promise rechazada con el error
 *
 * @example
 * // Si recibe un 401:
 * // 1. authStore.logout()
 * // 2. window.location.href = '/login'
 */
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

