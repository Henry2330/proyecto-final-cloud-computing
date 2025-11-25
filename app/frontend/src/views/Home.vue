<template>
  <div class="home-view">
    <a-card title="Bienvenido al Sistema de Gestión">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="12" :lg="8">
          <a-statistic title="Total de Usuarios" :value="userStore.users.length">
            <template #prefix>
              <TeamOutlined />
            </template>
          </a-statistic>
        </a-col>
        <a-col :xs="24" :sm="12" :lg="8">
          <a-statistic title="Usuarios Activos" :value="activeUsers">
            <template #prefix>
              <CheckCircleOutlined style="color: #52c41a" />
            </template>
          </a-statistic>
        </a-col>
        <a-col :xs="24" :sm="12" :lg="8">
          <a-statistic title="Usuarios Inactivos" :value="inactiveUsers">
            <template #prefix>
              <CloseCircleOutlined style="color: #ff4d4f" />
            </template>
          </a-statistic>
        </a-col>
      </a-row>

      <a-divider />

      <a-space direction="vertical" size="large" style="width: 100%">
        <a-alert
          message="Sistema de Gestión de Usuarios"
          description="Administra tus usuarios de forma eficiente y segura. Puedes crear, editar y eliminar usuarios desde el módulo de usuarios."
          type="info"
          show-icon
        />

        <a-button type="primary" size="large" @click="goToUsers">
          <TeamOutlined />
          Ir a Gestión de Usuarios
        </a-button>
      </a-space>
    </a-card>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { TeamOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const activeUsers = computed(() => {
  return userStore.users.filter(u => u.active).length
})

const inactiveUsers = computed(() => {
  return userStore.users.filter(u => !u.active).length
})

const goToUsers = () => {
  router.push('/users')
}

onMounted(() => {
  userStore.fetchUsers()
})
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
}
</style>

