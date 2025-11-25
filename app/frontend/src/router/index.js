import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
      meta: {
        requiresAuth: false,
        title: 'Iniciar Sesión'
      }
    },
    {
      path: '/',
      component: () => import(/* webpackChunkName: "layout" */ '@/layouts/MainLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
          meta: {
            title: 'Inicio',
            icon: 'HomeOutlined'
          }
        },
        {
          path: 'users',
          name: 'users',
          component: () => import(/* webpackChunkName: "users" */ '@/views/Users.vue'),
          meta: {
            title: 'Usuarios',
            icon: 'TeamOutlined'
          }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      redirect: '/'
    }
  ]
})

// Guard de navegación global
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // Actualizar título de la página
  document.title = to.meta.title ? `${to.meta.title} - Sistema de Gestión` : 'Sistema de Gestión'

  // Verificar autenticación
  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

// Guard después de cada navegación
router.afterEach((to, from) => {
  // Scroll al inicio en cada cambio de ruta
  window.scrollTo(0, 0)
})

export default router

