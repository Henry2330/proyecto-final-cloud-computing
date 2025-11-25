<template>
  <a-layout class="main-layout">
    <a-layout-header class="header">
      <div class="logo">Sistema de Gestión</div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :items="menuItems"
        class="menu"
      />
      <div class="user-section">
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item key="profile">
                <UserOutlined />
                Perfil
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="logout" @click="handleLogout">
                <LogoutOutlined />
                Cerrar Sesión
              </a-menu-item>
            </a-menu>
          </template>
          <a-button type="text" class="user-button">
            <UserOutlined />
            {{ authStore.user?.name || 'Usuario' }}
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </div>
    </a-layout-header>

    <a-layout-content class="content">
      <div class="content-wrapper">
        <router-view />
      </div>
    </a-layout-content>

    <a-layout-footer class="footer"> Sistema de Gestión © 2025 </a-layout-footer>
  </a-layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { UserOutlined, LogoutOutlined, DownOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const selectedKeys = ref([route.name])

const menuItems = [
  {
    key: 'home',
    label: 'Inicio',
    icon: () => h(HomeOutlined),
    onClick: () => router.push('/')
  },
  {
    key: 'users',
    label: 'Usuarios',
    icon: () => h(TeamOutlined),
    onClick: () => router.push('/users')
  }
]

watch(
  () => route.name,
  newName => {
    selectedKeys.value = [newName]
  }
)

const handleLogout = () => {
  authStore.logout()
  message.success('Sesión cerrada exitosamente')
  router.push('/login')
}
</script>

<script>
import { h } from 'vue'
export default {
  name: 'MainLayout'
}
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  background: #001529;
  padding: 0 24px;
}

.logo {
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-right: 40px;
  white-space: nowrap;
}

.menu {
  flex: 1;
  min-width: 0;
}

.user-section {
  margin-left: auto;
}

.user-button {
  color: rgba(255, 255, 255, 0.85);
}

.user-button:hover {
  color: white;
}

.content {
  padding: 24px;
  background: #f0f2f5;
}

.content-wrapper {
  background: white;
  padding: 24px;
  min-height: calc(100vh - 134px);
  border-radius: 4px;
}

.footer {
  text-align: center;
  background: #f0f2f5;
}
</style>

