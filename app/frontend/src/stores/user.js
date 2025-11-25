import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useUserStore = defineStore('user', () => {
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/api/users')
      users.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al cargar usuarios'
    } finally {
      loading.value = false
    }
  }

  const createUser = async (userData) => {
    try {
      const response = await api.post('/api/users', userData)
      users.value.push(response.data)
      return { success: true, data: response.data }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Error al crear usuario'
      }
    }
  }

  const updateUser = async (id, userData) => {
    try {
      const response = await api.put(`/api/users/${id}`, userData)
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index] = response.data
      }
      return { success: true, data: response.data }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Error al actualizar usuario'
      }
    }
  }

  /**
   * Elimina un usuario del sistema
   *
   * @async
   * @function deleteUser
   * @param {number} id - ID del usuario a eliminar
   * @returns {Promise<Object>} Resultado de la operación
   * @returns {boolean} returns.success - Indica si fue exitoso
   * @returns {string} [returns.message] - Mensaje de error
   *
   * @example
   * ```javascript
   * const result = await userStore.deleteUser(userId)
   *
   * if (result.success) {
   *   message.success('Usuario eliminado')
   * } else {
   *   message.error(result.message)
   * }
   * ```
   */
  const deleteUser = async id => {
    try {
      await api.delete(`/api/users/${id}`)
      users.value = users.value.filter(u => u.id !== id)
      return { success: true }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Error al eliminar usuario'
      }
    }
  }

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  }
})

