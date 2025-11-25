# 🔐 Documentación del Feature de Login

## Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Arquitectura](#arquitectura)
3. [Componentes](#componentes)
4. [Store de Autenticación](#store-de-autenticación)
5. [Servicios API](#servicios-api)
6. [Flujo de Autenticación](#flujo-de-autenticación)
7. [Protección de Rutas](#protección-de-rutas)
8. [Validaciones](#validaciones)
9. [Manejo de Errores](#manejo-de-errores)
10. [Estilos y UI](#estilos-y-ui)
11. [Ejemplos de Uso](#ejemplos-de-uso)

---

## Visión General

El feature de login es un sistema completo de autenticación que permite a los usuarios iniciar sesión en la aplicación. Utiliza **Vue 3**, **Pinia** para el manejo de estado, **Vue Router** para la navegación, y **Ant Design Vue** para los componentes UI.

### Características Principales

- ✅ Autenticación basada en JWT (JSON Web Tokens)
- ✅ Validación de formularios en tiempo real
- ✅ Manejo centralizado del estado de autenticación
- ✅ Protección de rutas con guards de navegación
- ✅ Interceptores HTTP para manejo automático de tokens
- ✅ Persistencia de sesión en localStorage
- ✅ Manejo robusto de errores
- ✅ UI responsive y moderna

---

## Arquitectura

El feature de login sigue una arquitectura de componentes atómicos y está organizado en capas:

```
┌─────────────────────────────────────────┐
│          View Layer (Login.vue)          │
│  Orquesta el flujo de autenticación      │
└──────────────────┬──────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼────────┐   ┌───────▼────────┐
│  LoginForm      │   │   AuthCard     │
│  (Organism)     │   │   (Molecule)   │
└───────┬────────┘   └────────────────┘
        │
        ├─── FormInput (Molecule)
        ├─── FormPassword (Molecule)
        └─── BaseButton (Atom)
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼────────┐   ┌───────▼────────┐
│  Auth Store     │   │   API Service  │
│  (Pinia)        │   │   (Axios)      │
└────────────────┘   └────────────────┘
```

---

## Componentes

### 1. Login.vue (Vista Principal)

**Ubicación:** `/src/views/Login.vue`

**Responsabilidades:**
- Orquestar el flujo de login
- Manejar el estado de carga
- Mostrar mensajes de éxito/error
- Redirigir después del login exitoso

**Props:** Ninguna

**Eventos:** Ninguno

**Código:**
```vue
<template>
  <Container container-class="login-container">
    <AuthCard title="Iniciar Sesión" class-name="login-card">
      <LoginForm :loading="loading" @submit="handleSubmit" />
    </AuthCard>
  </Container>
</template>
```

**Métodos Principales:**
- `handleSubmit(credentials)`: Maneja el envío del formulario de login

**Dependencias:**
- `useRouter` - Vue Router
- `useAuthStore` - Pinia store
- `message` - Ant Design Vue

---

### 2. LoginForm.vue (Organismo)

**Ubicación:** `/src/components/organisms/LoginForm.vue`

**Responsabilidades:**
- Renderizar el formulario de login
- Validar campos del formulario
- Emitir evento de submit con credenciales

**Props:**
- `loading` (Boolean): Indica si está en proceso de login

**Eventos:**
- `submit`: Emitido cuando el formulario es válido con las credenciales

**Estado Interno:**
```javascript
formState = {
  username: '',
  password: ''
}
```

**Métodos Expuestos:**
- `resetForm()`: Resetea los campos del formulario

---

### 3. AuthCard.vue (Molécula)

**Ubicación:** `/src/components/molecules/AuthCard.vue`

**Responsabilidades:**
- Proveer un contenedor estilizado para contenido de autenticación
- Mostrar título del card

**Props:**
- `title` (String): Título del card
- `bordered` (Boolean): Si muestra borde (default: true)
- `className` (String): Clases CSS adicionales

**Slots:**
- `default`: Contenido principal del card
- `extra`: Contenido extra en el header

---

### 4. FormInput.vue (Molécula)

**Ubicación:** `/src/components/molecules/FormInput.vue`

**Responsabilidades:**
- Wrapper de input con label y validaciones
- Integración con Ant Design Form

**Props:**
- `modelValue`: Valor del input
- `label`: Etiqueta del campo
- `name`: Nombre del campo
- `placeholder`: Texto placeholder
- `rules`: Reglas de validación

---

### 5. FormPassword.vue (Molécula)

**Ubicación:** `/src/components/molecules/FormPassword.vue`

**Responsabilidades:**
- Input específico para contraseñas
- Toggle show/hide password
- Validaciones de contraseña

**Props:** Similar a FormInput

---

## Store de Autenticación

**Ubicación:** `/src/stores/auth.js`

El store de autenticación maneja todo el estado relacionado con la sesión del usuario.

### Estado (State)

```javascript
{
  user: null,        // Datos del usuario autenticado
  token: null,       // JWT token
}
```

### Getters (Computed)

```javascript
isAuthenticated: boolean  // True si existe token
```

### Acciones (Actions)

#### `login(credentials)`

Autentica al usuario con credenciales.

**Parámetros:**
```javascript
credentials = {
  username: string,
  password: string
}
```

**Retorno:**
```javascript
{
  success: boolean,
  message?: string  // Solo en caso de error
}
```

**Proceso:**
1. Llama a `POST /api/auth/login`
2. Guarda token en memoria y localStorage
3. Guarda datos del usuario
4. Retorna resultado

**Ejemplo:**
```javascript
const result = await authStore.login({
  username: 'admin',
  password: 'password123'
})

if (result.success) {
  router.push('/')
}
```

---

#### `logout()`

Cierra la sesión del usuario actual.

**Proceso:**
1. Limpia token de memoria
2. Limpia datos del usuario
3. Remueve token del localStorage

**Ejemplo:**
```javascript
authStore.logout()
router.push('/login')
```

---

#### `checkAuth()`

Verifica si el token actual es válido.

**Retorno:** `Promise<boolean>`

**Proceso:**
1. Verifica si existe token
2. Llama a `GET /api/auth/me`
3. Si es válido, actualiza datos del usuario
4. Si es inválido, ejecuta logout automático

**Ejemplo:**
```javascript
const isValid = await authStore.checkAuth()

if (!isValid) {
  router.push('/login')
}
```

---

## Servicios API

**Ubicación:** `/src/services/api.js`

Configuración de Axios con interceptores.

### Configuración Base

```javascript
baseURL: VITE_API_URL || 'http://localhost:3000'
timeout: 10000
headers: { 'Content-Type': 'application/json' }
```

### Interceptor de Request

**Funcionalidad:**
- Agrega automáticamente el token JWT en el header `Authorization`
- Formato: `Bearer {token}`

```javascript
config.headers.Authorization = `Bearer ${authStore.token}`
```

### Interceptor de Response

**Funcionalidad:**
- Detecta errores 401 (No autorizado)
- Ejecuta logout automático
- Redirige a `/login`

**Flujo en caso de 401:**
```
Request → 401 Response → Logout → Redirect to /login
```

---

## Flujo de Autenticación

### Diagrama de Flujo Completo

```
┌─────────────┐
│   Usuario   │
│ visita /app │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Router Guard    │
│ requiresAuth?   │
└────────┬────────┘
         │
    ┌────┴────┐
    │ NO      │ SÍ
    │         │
    ▼         ▼
┌────────┐  ┌──────────────┐
│ Permite│  │ isAuthenticated?│
│ acceso │  └────────┬─────┘
└────────┘           │
              ┌──────┴──────┐
              │ NO          │ SÍ
              │             │
              ▼             ▼
        ┌──────────┐   ┌─────────┐
        │Redirect  │   │ Permite │
        │/login    │   │ acceso  │
        └──────────┘   └─────────┘
```

### Paso a Paso del Login

1. **Usuario visita `/login`**
   - Router carga `Login.vue`
   - Si ya está autenticado, redirige a `/`

2. **Usuario completa formulario**
   - `LoginForm.vue` valida campos
   - Si válido, emite evento `submit`

3. **Vista maneja el submit**
   - `Login.vue` recibe credenciales
   - Activa estado `loading`
   - Llama a `authStore.login()`

4. **Store procesa el login**
   - `authStore` llama a API
   - API retorna token + datos de usuario

5. **Respuesta exitosa**
   - Token guardado en localStorage
   - Datos de usuario en memoria
   - Mensaje de éxito mostrado
   - Redirige a `/` o ruta guardada

6. **Respuesta fallida**
   - Muestra mensaje de error
   - Formulario permanece con datos
   - Usuario puede reintentar

---

## Protección de Rutas

**Ubicación:** `/src/router/index.js`

### Meta Fields

```javascript
meta: {
  requiresAuth: boolean,  // Requiere autenticación
  title: string,          // Título de la página
  icon: string           // Icono para el menú
}
```

### Router Guard Global

```javascript
router.beforeEach(async (to, from, next) => {
  // 1. Verificar si la ruta requiere auth
  // 2. Si requiere auth y no está autenticado → /login
  // 3. Si es /login y ya está autenticado → /
  // 4. Actualizar título de la página
  // 5. Continuar navegación
})
```

### Ejemplo de Ruta Protegida

```javascript
{
  path: '/',
  component: MainLayout,
  meta: { requiresAuth: true },
  children: [
    {
      path: '',
      name: 'home',
      component: Home,
      meta: { title: 'Inicio' }
    }
  ]
}
```

### Ejemplo de Ruta Pública

```javascript
{
  path: '/login',
  name: 'login',
  component: Login,
  meta: {
    requiresAuth: false,
    title: 'Iniciar Sesión'
  }
}
```

---

## Validaciones

### Validaciones del Formulario

**Campo: Username**
```javascript
rules: [
  {
    required: true,
    message: 'Por favor ingrese su usuario',
    trigger: 'blur'
  }
]
```

**Campo: Password**
```javascript
rules: [
  {
    required: true,
    message: 'Por favor ingrese su contraseña',
    trigger: 'blur'
  },
  {
    min: 4,
    message: 'La contraseña debe tener al menos 4 caracteres',
    trigger: 'blur'
  }
]
```

### Tipos de Validación

- **Required**: Campo obligatorio
- **Min length**: Longitud mínima de caracteres
- **Trigger**: Cuándo se dispara (blur, change, submit)

---

## Manejo de Errores

### Niveles de Manejo

1. **Nivel API (Interceptor)**
   - Maneja errores 401 automáticamente
   - Ejecuta logout y redirige

2. **Nivel Store**
   - Captura errores de peticiones
   - Retorna objeto con `success: false`
   - Incluye mensaje de error

3. **Nivel Vista**
   - Muestra mensajes al usuario
   - Maneja estado de loading
   - Permite reintentar

### Tipos de Errores Manejados

| Error | Código | Acción |
|-------|--------|--------|
| Credenciales inválidas | 401 | Mensaje de error |
| Token expirado | 401 | Logout + Redirect |
| Error de red | - | Mensaje genérico |
| Timeout | 408 | Mensaje de timeout |
| Error servidor | 500 | Mensaje de error del servidor |

### Ejemplos de Mensajes

```javascript
// Éxito
message.success('Inicio de sesión exitoso')

// Error específico
message.error('Usuario o contraseña incorrectos')

// Error genérico
message.error('Error al iniciar sesión')
```

---

## Estilos y UI

### Diseño Visual

- **Color Principal**: Gradiente morado (#667eea → #764ba2)
- **Card**: Fondo blanco con sombra
- **Ancho máximo**: 400px
- **Responsive**: Se adapta a móvil y desktop

### Estructura CSS

**Login Container:**
```css
.login-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

**Auth Card:**
```css
.auth-card {
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### Componentes Ant Design Usados

- `a-form`: Formulario con validación
- `a-form-item`: Item del formulario
- `a-input`: Input de texto
- `a-input-password`: Input de contraseña
- `a-button`: Botón de submit
- `a-card`: Card container
- `message`: Notificaciones toast

---

## Ejemplos de Uso

### Ejemplo 1: Login Básico

```vue
<template>
  <div>
    <button @click="doLogin">Login</button>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const doLogin = async () => {
  const result = await authStore.login({
    username: 'admin',
    password: 'admin123'
  })
  
  if (result.success) {
    router.push('/')
  } else {
    alert(result.message)
  }
}
</script>
```

### Ejemplo 2: Verificar Autenticación en Componente

```vue
<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  const isValid = await authStore.checkAuth()
  
  if (!isValid) {
    router.push('/login')
  }
})
</script>
```

### Ejemplo 3: Logout

```vue
<template>
  <button @click="handleLogout">Cerrar Sesión</button>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
```

### Ejemplo 4: Mostrar Datos del Usuario

```vue
<template>
  <div v-if="authStore.isAuthenticated">
    <p>Bienvenido, {{ authStore.user?.name }}</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>
```

### Ejemplo 5: Petición API Autenticada

```javascript
import api from '@/services/api'

// El token se incluye automáticamente
const fetchUsers = async () => {
  try {
    const response = await api.get('/api/users')
    return response.data
  } catch (error) {
    // Si es 401, el interceptor maneja el logout
    console.error('Error fetching users:', error)
  }
}
```

---

## Variables de Entorno

```bash
# Backend API URL
VITE_API_URL=http://localhost:3000

# En producción
VITE_API_URL=https://api.tudominio.com
```

---

## Endpoints de API Requeridos

El feature de login requiere los siguientes endpoints en el backend:

### POST /api/auth/login

**Request:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "admin",
    "name": "Administrator",
    "email": "admin@example.com"
  }
}
```

**Response (401):**
```json
{
  "message": "Credenciales inválidas"
}
```

### GET /api/auth/me

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": 1,
  "username": "admin",
  "name": "Administrator",
  "email": "admin@example.com"
}
```

**Response (401):**
```json
{
  "message": "Token inválido o expirado"
}
```

---

## Testing

### Test de Componentes

```javascript
import { mount } from '@vue/test-utils'
import LoginForm from '@/components/organisms/LoginForm.vue'

describe('LoginForm', () => {
  it('emits submit event with credentials', async () => {
    const wrapper = mount(LoginForm)
    
    await wrapper.find('input[name="username"]').setValue('admin')
    await wrapper.find('input[name="password"]').setValue('password')
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')[0]).toEqual([{
      username: 'admin',
      password: 'password'
    }])
  })
})
```

### Test del Store

```javascript
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  it('sets token after successful login', async () => {
    const authStore = useAuthStore()
    
    // Mock API call
    vi.spyOn(api, 'post').mockResolvedValue({
      data: {
        token: 'test_token',
        user: { id: 1, username: 'admin' }
      }
    })
    
    await authStore.login({
      username: 'admin',
      password: 'password'
    })
    
    expect(authStore.token).toBe('test_token')
    expect(authStore.isAuthenticated).toBe(true)
  })
})
```

---

## Mejores Prácticas

### Seguridad

1. ✅ **Nunca almacenar contraseñas**: Solo enviar, nunca guardar en frontend
2. ✅ **HTTPS en producción**: Siempre usar conexión segura
3. ✅ **Tokens con expiración**: JWT con tiempo de vida limitado
4. ✅ **Validación en backend**: No confiar solo en validación frontend
5. ✅ **HttpOnly cookies**: Considerar para mayor seguridad (alternativa a localStorage)

### Performance

1. ✅ **Lazy loading**: Componentes cargados bajo demanda
2. ✅ **Cache del token**: Evitar peticiones innecesarias
3. ✅ **Optimización de bundle**: Code splitting por rutas

### UX

1. ✅ **Feedback visual**: Loading states y mensajes claros
2. ✅ **Validación en tiempo real**: Feedback inmediato
3. ✅ **Redirect inteligente**: Volver a la página solicitada después del login
4. ✅ **Mensajes descriptivos**: Errores claros y accionables

---

## Troubleshooting

### Problema: "Token inválido" después de recargar

**Causa:** Token no se está persistiendo correctamente

**Solución:**
```javascript
// Verificar en auth.js
localStorage.setItem('token', token.value)

// Verificar al inicializar
const token = ref(localStorage.getItem('token') || null)
```

### Problema: Redirect loop en login

**Causa:** Guard de navegación mal configurado

**Solución:**
```javascript
router.beforeEach((to, from, next) => {
  // Asegurar que /login no requiere auth
  if (to.path === '/login' && authStore.isAuthenticated) {
    next('/')
    return
  }
  
  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }
  
  next()
})
```

### Problema: CORS errors

**Causa:** Backend no permite peticiones desde el frontend

**Solución Backend:**
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
```

---

## Recursos Adicionales

- [Vue 3 Documentation](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Ant Design Vue](https://antdv.com/)
- [Axios Documentation](https://axios-http.com/)
- [JWT.io](https://jwt.io/)

---

## Changelog

### v1.0.0 (2025-11-24)
- ✅ Implementación inicial del feature de login
- ✅ Autenticación con JWT
- ✅ Protección de rutas
- ✅ Persistencia de sesión
- ✅ Manejo de errores
- ✅ UI responsive

---

## Contribuciones

Para contribuir a este feature:

1. Revisar esta documentación
2. Seguir la arquitectura de componentes atómicos
3. Mantener las validaciones consistentes
4. Agregar tests para nuevas funcionalidades
5. Actualizar esta documentación con cambios

---

**Última actualización:** 2025-11-24  
**Autor:** Henry Vega  
**Versión:** 1.0.0

