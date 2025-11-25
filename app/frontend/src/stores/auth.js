import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  const isAuthenticated = computed(() => !!token.value)

  const login = async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials)
      token.value = response.data.token
      user.value = response.data.user
      localStorage.setItem('token', token.value)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Error al iniciar sesión'
      }
    }
  }

  /**
   * Cierra la sesión del usuario actual
   *
   * @function logout
   * @description
   * - Limpia el token de memoria
   * - Limpia datos del usuario
   * - Remueve token del localStorage
   *
   * @example
   * ```javascript
   * authStore.logout()
   * router.push('/login')
   * ```
   */
  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  /**
   * Verifica si el token actual es válido
   *
   * @async
   * @function checkAuth
   * @returns {Promise<boolean>} true si el token es válido, false en caso contrario
   * @description
   * Hace una petición al backend para verificar el token.
   * Si el token es inválido, cierra la sesión automáticamente.
   *
   * @example
   * ```javascript
   * const isValid = await authStore.checkAuth()
   *
   * if (!isValid) {
   *   router.push('/login')
   * }
   * ```
   */
  const checkAuth = async () => {
    if (!token.value) return false
    try {
      const response = await api.get('/api/auth/me')
      user.value = response.data
      return true
    } catch (error) {
      logout()
      return false
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
})

