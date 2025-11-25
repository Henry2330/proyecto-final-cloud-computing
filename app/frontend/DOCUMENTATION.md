# 📚 Documentación Completa del Proyecto Frontend

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Estructura de Directorios](#estructura-de-directorios)
4. [Componentes](#componentes)
5. [Stores (Estado Global)](#stores-estado-global)
6. [Servicios](#servicios)
7. [Composables](#composables)
8. [Utilidades](#utilidades)
9. [Configuración](#configuración)
10. [Routing](#routing)
11. [Guía de Desarrollo](#guía-de-desarrollo)

---

## 📖 Introducción

### Descripción General
Sistema de gestión de usuarios desarrollado con Vue 3, implementando arquitectura molecular (Atomic Design) y las mejores prácticas de desarrollo frontend moderno.

### Tecnologías Principales
- **Vue 3.4.21** - Framework progresivo de JavaScript
- **Vite 5.1.5** - Build tool y dev server
- **Vue Router 4.3.0** - Routing oficial de Vue
- **Pinia 2.1.7** - State management
- **Ant Design Vue 4.1.2** - Biblioteca de componentes UI
- **Axios 1.6.7** - Cliente HTTP
- **ESLint + Prettier** - Code quality y formateo

### Requisitos del Sistema
- Node.js >= 16.x
- PNPM >= 8.x
- Navegador moderno con soporte ES2015+

---

## 🏗️ Arquitectura del Proyecto

### Patrón de Diseño: Atomic Design

El proyecto implementa Atomic Design para organizar componentes en niveles jerárquicos:

```
Átomos → Moléculas → Organismos → Templates → Páginas
```

#### 🔹 Átomos (Atoms)
Componentes básicos indivisibles que no pueden ser más simples.

**Ubicación:** `src/components/atoms/`

**Componentes:**
- `BaseButton.vue` - Botón base personalizable
- `Button.vue` - Wrapper de botón con props extendidas
- `Container.vue` - Contenedor genérico con estilos
- `Input.vue` - Input básico reutilizable
- `Loading.vue` - Spinner de carga

**Características:**
- Sin lógica de negocio
- Altamente reutilizables
- Props simples y bien definidas
- Estilos minimalistas

#### 🔹 Moléculas (Molecules)
Combinación de átomos que forman componentes funcionales.

**Ubicación:** `src/components/molecules/`

**Componentes:**
- `AuthCard.vue` - Card especializada para autenticación
- `Card.vue` - Card genérica reutilizable
- `FormInput.vue` - Input con label y validación integrada
- `FormItem.vue` - Item de formulario con estructura
- `FormPassword.vue` - Input de contraseña con validación

**Características:**
- Combinan múltiples átomos
- Propósito específico
- Lógica simple de UI
- Reutilizables en diferentes contextos

#### 🔹 Organismos (Organisms)
Componentes complejos que implementan lógica de negocio.

**Ubicación:** `src/components/organisms/`

**Componentes:**
- `LoginForm.vue` - Formulario completo de autenticación
- `UserForm.vue` - Formulario de gestión de usuarios (CRUD)

**Características:**
- Lógica de negocio compleja
- Gestión de estado interno
- Validaciones avanzadas
- Emisión de eventos personalizados

---

## 📁 Estructura de Directorios

```
app/frontend/
│
├── public/                     # Archivos estáticos públicos
│
├── src/                        # Código fuente
│   │
│   ├── assets/                 # Recursos (imágenes, fuentes, etc.)
│   │
│   ├── components/             # Componentes Vue (Atomic Design)
│   │   ├── atoms/              # Componentes atómicos (5)
│   │   │   ├── BaseButton.vue
│   │   │   ├── Button.vue
│   │   │   ├── Container.vue
│   │   │   ├── Input.vue
│   │   │   └── Loading.vue
│   │   │
│   │   ├── molecules/          # Componentes moleculares (5)
│   │   │   ├── AuthCard.vue
│   │   │   ├── Card.vue
│   │   │   ├── FormInput.vue
│   │   │   ├── FormItem.vue
│   │   │   └── FormPassword.vue
│   │   │
│   │   └── organisms/          # Componentes complejos (2)
│   │       ├── LoginForm.vue
│   │       └── UserForm.vue
│   │
│   ├── composables/            # Composition API hooks
│   │   ├── useForm.js         # Manejo de formularios
│   │   └── useUI.js           # Utilidades de UI
│   │
│   ├── config/                 # Configuración
│   │   └── constants.js       # Constantes de la aplicación
│   │
│   ├── layouts/                # Layouts de página
│   │   └── MainLayout.vue     # Layout principal con navegación
│   │
│   ├── router/                 # Configuración de rutas
│   │   └── index.js           # Router con lazy loading
│   │
│   ├── services/               # Servicios y API
│   │   └── api.js             # Cliente Axios configurado
│   │
│   ├── stores/                 # State management (Pinia)
│   │   ├── auth.js            # Store de autenticación
│   │   └── user.js            # Store de usuarios
│   │
│   ├── utils/                  # Utilidades generales
│   │   └── helpers.js         # Funciones helper
│   │
│   ├── views/                  # Vistas/Páginas
│   │   ├── Home.vue           # Dashboard principal
│   │   ├── Login.vue          # Página de login
│   │   └── Users.vue          # Gestión de usuarios
│   │
│   ├── App.vue                 # Componente raíz
│   └── main.js                 # Punto de entrada
│
├── .env                        # Variables de entorno
├── .env.example                # Ejemplo de variables
├── .eslintrc.cjs               # Configuración ESLint
├── .gitignore                  # Archivos ignorados por Git
├── .prettierrc.json            # Configuración Prettier
├── index.html                  # HTML principal
├── jsconfig.json               # Configuración JavaScript
├── package.json                # Dependencias y scripts
├── vite.config.js              # Configuración Vite
│
└── docs/                       # Documentación
    ├── ARCHITECTURE.md         # Arquitectura del proyecto
    ├── CHECKLIST.md            # Lista de verificación
    ├── ESTADO-FINAL.md         # Estado del proyecto
    └── PROJECT_README.md       # README del proyecto
```

---

## 🧩 Componentes

### Átomos

#### BaseButton.vue
**Propósito:** Botón base altamente configurable.

**Props:**
- `type` (String) - Tipo de botón: 'default', 'primary', 'dashed', 'link'
- `size` (String) - Tamaño: 'small', 'middle', 'large'
- `loading` (Boolean) - Estado de carga
- `disabled` (Boolean) - Botón deshabilitado
- `block` (Boolean) - Botón de ancho completo
- `htmlType` (String) - Tipo HTML: 'button', 'submit', 'reset'
- `danger` (Boolean) - Estilo de peligro

**Eventos:**
- `click` - Emitido al hacer click (si no está loading o disabled)

**Ejemplo de uso:**
```vue
<BaseButton 
  type="primary" 
  size="large" 
  :loading="isLoading"
  @click="handleSubmit"
>
  Enviar
</BaseButton>
```

#### Container.vue
**Propósito:** Contenedor centrado con estilos flex.

**Props:**
- `containerClass` (String) - Clases CSS adicionales

**Ejemplo de uso:**
```vue
<Container container-class="custom-class">
  <p>Contenido centrado</p>
</Container>
```

#### Loading.vue
**Propósito:** Spinner de carga configurable.

**Props:**
- `fullscreen` (Boolean) - Modo pantalla completa
- `size` (String) - Tamaño: 'small', 'default', 'large'
- `tip` (String) - Texto de carga

**Ejemplo de uso:**
```vue
<Loading fullscreen size="large" tip="Cargando datos..." />
```

### Moléculas

#### FormInput.vue
**Propósito:** Input de formulario con validación integrada.

**Props:**
- `modelValue` (String|Number) - Valor del input (v-model)
- `label` (String) - Etiqueta del campo
- `name` (String, required) - Nombre del campo
- `placeholder` (String) - Texto placeholder
- `size` (String) - Tamaño: 'small', 'middle', 'large'
- `type` (String) - Tipo de input: 'text', 'email', 'number'
- `disabled` (Boolean) - Input deshabilitado
- `rules` (Array) - Reglas de validación Ant Design

**Eventos:**
- `update:modelValue` - Emitido al cambiar el valor

**Slots:**
- `prefix` - Icono o contenido al inicio
- `suffix` - Icono o contenido al final

**Ejemplo de uso:**
```vue
<FormInput
  v-model="form.email"
  label="Correo Electrónico"
  name="email"
  type="email"
  placeholder="usuario@ejemplo.com"
  :rules="emailRules"
>
  <template #prefix>
    <MailOutlined />
  </template>
</FormInput>
```

#### FormPassword.vue
**Propósito:** Input de contraseña con validación.

**Props:** (Similares a FormInput excepto type)
- `modelValue` (String) - Valor de la contraseña
- `label` (String) - Etiqueta del campo
- `name` (String, required) - Nombre del campo
- `placeholder` (String) - Texto placeholder
- `size` (String) - Tamaño
- `disabled` (Boolean) - Input deshabilitado
- `rules` (Array) - Reglas de validación

**Ejemplo de uso:**
```vue
<FormPassword
  v-model="form.password"
  label="Contraseña"
  name="password"
  placeholder="Ingrese su contraseña"
  :rules="passwordRules"
>
  <template #prefix>
    <LockOutlined />
  </template>
</FormPassword>
```

#### AuthCard.vue
**Propósito:** Card especializada para páginas de autenticación.

**Props:**
- `title` (String) - Título de la card
- `bordered` (Boolean) - Borde visible
- `className` (String) - Clases CSS adicionales

**Slots:**
- `default` - Contenido principal
- `extra` - Contenido extra en el header

**Ejemplo de uso:**
```vue
<AuthCard title="Iniciar Sesión">
  <LoginForm @submit="handleLogin" />
</AuthCard>
```

### Organismos

#### LoginForm.vue
**Propósito:** Formulario completo de autenticación con validación.

**Props:**
- `loading` (Boolean) - Estado de carga del formulario

**Eventos:**
- `submit` - Emitido al enviar el formulario con credenciales

**Métodos expuestos:**
- `resetForm()` - Resetea el formulario

**Datos del evento submit:**
```javascript
{
  username: String,
  password: String
}
```

**Ejemplo de uso:**
```vue
<LoginForm 
  :loading="isAuthenticating" 
  @submit="handleLogin" 
/>

<script setup>
const handleLogin = async (credentials) => {
  // credentials = { username, password }
  await authStore.login(credentials)
}
</script>
```

#### UserForm.vue
**Propósito:** Formulario CRUD para gestión de usuarios.

**Props:**
- `initialData` (Object|null) - Datos iniciales para edición

**Estructura de initialData:**
```javascript
{
  id: Number,
  name: String,
  email: String,
  role: String,  // 'admin', 'user', 'guest'
  active: Boolean
}
```

**Métodos expuestos:**
- `validate()` - Valida y retorna datos del formulario
- `resetForm()` - Resetea el formulario

**Reglas de validación:**
- `name`: Requerido, mínimo 3 caracteres
- `email`: Requerido, formato email válido
- `role`: Requerido
- `password`: Requerido (solo en creación), mínimo 6 caracteres

**Ejemplo de uso:**
```vue
<template>
  <a-modal v-model:open="visible" @ok="handleSave">
    <UserForm ref="formRef" :initial-data="currentUser" />
  </a-modal>
</template>

<script setup>
const formRef = ref()

const handleSave = async () => {
  const data = await formRef.value.validate()
  await userStore.createUser(data)
}
</script>
```

---

## 🗄️ Stores (Estado Global)

### authStore (auth.js)

**Propósito:** Gestión de autenticación y sesión de usuario.

**Estado:**
```javascript
{
  user: Object|null,      // Usuario autenticado
  token: String|null      // Token JWT
}
```

**Getters:**
- `isAuthenticated` (Computed) - Retorna true si hay token

**Actions:**

#### login(credentials)
```javascript
/**
 * Inicia sesión con credenciales
 * @param {Object} credentials - Credenciales de usuario
 * @param {string} credentials.username - Nombre de usuario
 * @param {string} credentials.password - Contraseña
 * @returns {Promise<Object>} { success: boolean, message?: string }
 */
```

#### logout()
```javascript
/**
 * Cierra sesión y limpia token
 */
```

#### checkAuth()
```javascript
/**
 * Verifica si el token es válido
 * @returns {Promise<boolean>}
 */
```

**Ejemplo de uso:**
```vue
<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const handleLogin = async () => {
  const result = await authStore.login({
    username: 'admin',
    password: 'password123'
  })
  
  if (result.success) {
    router.push('/')
  }
}

// Verificar si está autenticado
if (authStore.isAuthenticated) {
  console.log('Usuario:', authStore.user)
}
</script>
```

### userStore (user.js)

**Propósito:** Gestión de usuarios (CRUD operations).

**Estado:**
```javascript
{
  users: Array,           // Lista de usuarios
  loading: Boolean,       // Estado de carga
  error: String|null      // Mensaje de error
}
```

**Actions:**

#### fetchUsers()
```javascript
/**
 * Obtiene la lista de usuarios
 * @returns {Promise<void>}
 */
```

#### createUser(userData)
```javascript
/**
 * Crea un nuevo usuario
 * @param {Object} userData - Datos del usuario
 * @returns {Promise<Object>} { success: boolean, data?: Object, message?: string }
 */
```

#### updateUser(id, userData)
```javascript
/**
 * Actualiza un usuario existente
 * @param {Number} id - ID del usuario
 * @param {Object} userData - Datos actualizados
 * @returns {Promise<Object>} { success: boolean, data?: Object, message?: string }
 */
```

#### deleteUser(id)
```javascript
/**
 * Elimina un usuario
 * @param {Number} id - ID del usuario
 * @returns {Promise<Object>} { success: boolean, message?: string }
 */
```

**Ejemplo de uso:**
```vue
<script setup>
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'

const userStore = useUserStore()

// Cargar usuarios al montar
onMounted(async () => {
  await userStore.fetchUsers()
})

// Crear usuario
const createNewUser = async () => {
  const result = await userStore.createUser({
    name: 'Juan Pérez',
    email: 'juan@ejemplo.com',
    role: 'user',
    password: 'password123',
    active: true
  })
  
  if (result.success) {
    message.success('Usuario creado')
  }
}

// Acceder a usuarios
console.log(userStore.users)
</script>
```

---

## 🔌 Servicios

### API Service (api.js)

**Propósito:** Cliente HTTP configurado con Axios.

**Configuración:**
```javascript
{
  baseURL: process.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
}
```

**Interceptores:**

#### Request Interceptor
Añade automáticamente el token JWT al header Authorization:
```javascript
Authorization: `Bearer ${token}`
```

#### Response Interceptor
Maneja errores 401 (Unauthorized):
- Cierra sesión automáticamente
- Redirige a login

**Métodos disponibles:**
```javascript
// GET
api.get('/api/users')

// POST
api.post('/api/users', userData)

// PUT
api.put('/api/users/1', userData)

// DELETE
api.delete('/api/users/1')
```

**Ejemplo de uso:**
```javascript
import api from '@/services/api'

// GET con parámetros
const getUsers = async () => {
  const response = await api.get('/api/users', {
    params: { page: 1, limit: 10 }
  })
  return response.data
}

// POST con datos
const createUser = async (userData) => {
  const response = await api.post('/api/users', userData)
  return response.data
}

// Manejo de errores
try {
  await api.get('/api/protected')
} catch (error) {
  console.error('Error:', error.response?.data)
}
```

---

## 🎣 Composables

### useForm (useForm.js)

**Propósito:** Hook para manejo de formularios con validación.

**Parámetros:**
```javascript
useForm(initialState = {}, validationRules = {})
```

**Retorna:**
```javascript
{
  formState: Reactive,           // Estado del formulario
  formRef: Ref,                  // Referencia al formulario
  errors: Reactive,              // Errores de validación
  isSubmitting: Ref,             // Estado de envío
  resetForm: Function,           // Resetear formulario
  validateField: Function,       // Validar campo específico
  validate: Function,            // Validar todo
  getValues: Function,           // Obtener valores
  setValues: Function            // Establecer valores
}
```

**Ejemplo de uso:**
```javascript
import { useForm } from '@/composables/useForm'

const { formState, validate, resetForm, errors } = useForm(
  {
    email: '',
    password: ''
  },
  {
    email: [
      { required: true, message: 'Email requerido' },
      { pattern: /^.+@.+\..+$/, message: 'Email inválido' }
    ],
    password: [
      { required: true, message: 'Contraseña requerida' },
      { min: 6, message: 'Mínimo 6 caracteres' }
    ]
  }
)

const handleSubmit = async () => {
  if (await validate()) {
    console.log('Datos válidos:', formState)
  } else {
    console.log('Errores:', errors)
  }
}
```

### useLoading (useUI.js)

**Propósito:** Gestión de estados de carga.

**Retorna:**
```javascript
{
  isLoading: Ref,                // Estado de carga
  startLoading: Function,        // Iniciar carga
  stopLoading: Function,         // Detener carga
  resetLoading: Function,        // Resetear contador
  withLoading: Function          // Ejecutar con loading
}
```

**Ejemplo de uso:**
```javascript
import { useLoading } from '@/composables/useUI'

const { isLoading, withLoading } = useLoading()

// Método 1: Manual
const fetchData = async () => {
  startLoading()
  try {
    await api.get('/data')
  } finally {
    stopLoading()
  }
}

// Método 2: Automático
const fetchData = async () => {
  await withLoading(async () => {
    await api.get('/data')
  })
}
```

### useDebounce (useUI.js)

**Propósito:** Debouncing de funciones.

**Retorna:**
```javascript
{
  debounce: Function  // Función para crear debounced functions
}
```

**Ejemplo de uso:**
```javascript
import { useDebounce } from '@/composables/useUI'

const { debounce } = useDebounce()

const search = (query) => {
  console.log('Buscando:', query)
  // Llamada a API
}

// Crear función debounced
const debouncedSearch = debounce(search, 300)

// Usar en input
<input @input="debouncedSearch($event.target.value)" />
```

---

## 🛠️ Utilidades

### helpers.js

Colección de funciones utilitarias comunes.

#### formatDate(date, format)
```javascript
/**
 * Formatea una fecha
 * @param {Date|string} date - Fecha a formatear
 * @param {string} format - Formato: 'DD/MM/YYYY', 'DD/MM/YYYY HH:mm'
 * @returns {string} Fecha formateada
 */
formatDate(new Date(), 'DD/MM/YYYY') // '24/11/2025'
```

#### isValidEmail(email)
```javascript
/**
 * Valida formato de email
 * @param {string} email - Email a validar
 * @returns {boolean}
 */
isValidEmail('test@example.com') // true
```

#### truncate(text, length)
```javascript
/**
 * Trunca texto con ellipsis
 * @param {string} text - Texto a truncar
 * @param {number} length - Longitud máxima
 * @returns {string}
 */
truncate('Texto muy largo...', 10) // 'Texto muy ...'
```

#### capitalize(str)
```javascript
/**
 * Capitaliza primera letra
 * @param {string} str - String a capitalizar
 * @returns {string}
 */
capitalize('hola mundo') // 'Hola mundo'
```

#### formatCurrency(amount, currency)
```javascript
/**
 * Formatea moneda
 * @param {number} amount - Cantidad
 * @param {string} currency - Código de moneda
 * @returns {string}
 */
formatCurrency(1234.56, 'USD') // '$1,234.56'
```

#### deepClone(obj)
```javascript
/**
 * Clona objeto profundamente
 * @param {Object} obj - Objeto a clonar
 * @returns {Object}
 */
const clone = deepClone({ a: { b: 1 } })
```

---

## ⚙️ Configuración

### constants.js

Constantes de configuración de la aplicación.

#### API_CONFIG
```javascript
{
  BASE_URL: 'http://localhost:3000',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
}
```

#### USER_ROLES
```javascript
{
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
}
```

#### MESSAGES
```javascript
{
  SUCCESS: {
    LOGIN: 'Inicio de sesión exitoso',
    CREATE: 'Registro creado exitosamente',
    // ...
  },
  ERROR: {
    LOGIN: 'Error al iniciar sesión',
    NETWORK: 'Error de conexión',
    // ...
  }
}
```

#### FORM_RULES
```javascript
{
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Por favor ingrese un email válido'
  },
  PASSWORD: {
    minLength: 6,
    message: 'La contraseña debe tener al menos 6 caracteres'
  }
}
```

---

## 🛣️ Routing

### Configuración de Rutas

#### Rutas Públicas
```javascript
{
  path: '/login',
  name: 'login',
  component: () => import('@/views/Login.vue'),
  meta: { requiresAuth: false }
}
```

#### Rutas Protegidas
```javascript
{
  path: '/',
  component: () => import('@/layouts/MainLayout.vue'),
  meta: { requiresAuth: true },
  children: [
    {
      path: '',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: 'users',
      name: 'users',
      component: () => import('@/views/Users.vue')
    }
  ]
}
```

### Navigation Guards

#### beforeEach
```javascript
router.beforeEach(async (to, from, next) => {
  // 1. Verificar autenticación
  // 2. Actualizar título de página
  // 3. Redirigir si es necesario
})
```

#### afterEach
```javascript
router.afterEach(() => {
  // Scroll al inicio
  window.scrollTo(0, 0)
})
```

### Navegación Programática

```javascript
import { useRouter } from 'vue-router'

const router = useRouter()

// Navegar a ruta
router.push('/')
router.push({ name: 'users' })
router.push({ path: '/users', query: { page: 1 } })

// Reemplazar ruta
router.replace('/login')

// Ir atrás
router.back()

// Ir adelante
router.forward()
```

---

## 👨‍💻 Guía de Desarrollo

### Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Inicia servidor de desarrollo

# Build
pnpm build            # Build de producción
pnpm preview          # Preview del build

# Code Quality
pnpm lint             # Ejecuta ESLint
pnpm format           # Formatea código con Prettier
```

### Convenciones de Código

#### Nombres de Componentes
- PascalCase para componentes: `UserForm.vue`
- camelCase para instancias: `const userForm = ref()`

#### Nombres de Variables
- camelCase: `const userName = 'Juan'`
- UPPER_CASE para constantes: `const API_URL = '...'`

#### Estructura de Componentes Vue
```vue
<template>
  <!-- Template -->
</template>

<script setup>
// Imports
import { ref } from 'vue'

// Props
const props = defineProps({})

// Emits
const emit = defineEmits(['event'])

// Estado local
const state = ref()

// Computed
const computed = computed(() => {})

// Methods
const method = () => {}

// Lifecycle
onMounted(() => {})

// Expose (si es necesario)
defineExpose({ method })
</script>

<style scoped>
/* Estilos */
</style>
```

### Mejores Prácticas

#### 1. Composition API
✅ Usar `<script setup>` para componentes
✅ Extraer lógica reutilizable a composables
✅ Usar refs y reactive apropiadamente

#### 2. Performance
✅ Lazy loading de rutas
✅ Computed para valores derivados
✅ v-memo para listas grandes
✅ KeepAlive para componentes costosos

#### 3. Manejo de Errores
```javascript
try {
  await api.get('/data')
} catch (error) {
  message.error(error.response?.data?.message || 'Error')
}
```

#### 4. Validación
✅ Validación en cliente y servidor
✅ Mensajes de error descriptivos
✅ Feedback visual inmediato

### Agregar Nuevas Funcionalidades

#### 1. Nuevo Componente
```bash
# Crear archivo en la carpeta apropiada
src/components/[atoms|molecules|organisms]/ComponentName.vue
```

#### 2. Nueva Vista
```bash
# Crear vista
src/views/ViewName.vue

# Agregar ruta en router/index.js
{
  path: '/path',
  name: 'viewName',
  component: () => import('@/views/ViewName.vue')
}
```

#### 3. Nuevo Store
```bash
# Crear store
src/stores/storeName.js

# Implementar con Pinia
export const useStoreNameStore = defineStore('storeName', () => {
  // estado, getters, actions
})
```

### Debugging

#### Vue DevTools
- Instalar extensión Vue DevTools
- Inspeccionar componentes
- Ver estado de Pinia
- Timeline de eventos

#### Console Logging
```javascript
// Desarrollo
console.log('Debug:', data)

// Se elimina automáticamente en producción
```

### Testing (Recomendado)

```bash
# Instalar dependencias de testing
pnpm add -D vitest @vue/test-utils

# Ejecutar tests
pnpm test
```

---

## 📦 Build y Deployment

### Variables de Entorno

`.env.production`:
```env
VITE_API_URL=https://api.production.com
```

### Build de Producción

```bash
pnpm build
```

Genera:
```
dist/
├── assets/
│   ├── js/
│   ├── css/
│   └── images/
└── index.html
```

### Optimizaciones Aplicadas

- ✅ Minificación con Terser
- ✅ Tree shaking
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Eliminación de console.log
- ✅ Compresión de assets

---

## 📞 Soporte y Contribución

### Reportar Issues
1. Verificar que el issue no exista
2. Proveer pasos para reproducir
3. Incluir logs de error
4. Especificar versión y navegador

### Contribuir
1. Fork del repositorio
2. Crear branch: `feature/nueva-funcionalidad`
3. Commit cambios con mensajes descriptivos
4. Push a tu fork
5. Crear Pull Request

---

## 📄 Licencia

Este proyecto es parte del curso de Cloud Computing.

---

**Última actualización:** 24/11/2025
**Versión:** 1.0.0
**Autor:** Proyecto Final Cloud Computing

