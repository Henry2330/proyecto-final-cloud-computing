<template>
  <Container container-class="login-container">
    <AuthCard title="Iniciar Sesión" class-name="login-card">
      <LoginForm :loading="loading" @submit="handleSubmit" />
    </AuthCard>
  </Container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { message } from 'ant-design-vue'
import Container from '@/components/atoms/Container.vue'
import AuthCard from '@/components/molecules/AuthCard.vue'
import LoginForm from '@/components/organisms/LoginForm.vue'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

const handleSubmit = async (credentials) => {
  loading.value = true
  try {
    const result = await authStore.login(credentials)

    if (result.success) {
      message.success('Inicio de sesión exitoso')
      router.push('/')
    } else {
      message.error(result.message)
    }
  } catch (error) {
    message.error('Error al iniciar sesión')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>

