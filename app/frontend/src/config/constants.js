/**
 * Constantes de configuración de la aplicación
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
}

// Roles de usuario
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
}

export const ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrador',
  [USER_ROLES.USER]: 'Usuario',
  [USER_ROLES.GUEST]: 'Invitado'
}

// Estados
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  BLOCKED: 'blocked'
}

export const STATUS_LABELS = {
  [STATUS.ACTIVE]: 'Activo',
  [STATUS.INACTIVE]: 'Inactivo',
  [STATUS.PENDING]: 'Pendiente',
  [STATUS.BLOCKED]: 'Bloqueado'
}

// Tamaños de paginación
export const PAGE_SIZES = [10, 20, 50, 100]
export const DEFAULT_PAGE_SIZE = 10

// Configuración de formularios
export const FORM_RULES = {
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Por favor ingrese un email válido'
  },
  PASSWORD: {
    minLength: 6,
    message: 'La contraseña debe tener al menos 6 caracteres'
  },
  USERNAME: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
    message: 'El usuario solo puede contener letras, números y guión bajo'
  },
  PHONE: {
    pattern: /^[0-9]{10}$/,
    message: 'Por favor ingrese un teléfono válido de 10 dígitos'
  }
}

// Mensajes de la aplicación
export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Inicio de sesión exitoso',
    LOGOUT: 'Sesión cerrada exitosamente',
    CREATE: 'Registro creado exitosamente',
    UPDATE: 'Registro actualizado exitosamente',
    DELETE: 'Registro eliminado exitosamente'
  },
  ERROR: {
    LOGIN: 'Error al iniciar sesión',
    NETWORK: 'Error de conexión. Por favor intente nuevamente',
    UNAUTHORIZED: 'No tiene permisos para realizar esta acción',
    NOT_FOUND: 'Recurso no encontrado',
    VALIDATION: 'Por favor verifique los datos ingresados',
    GENERIC: 'Ha ocurrido un error. Por favor intente nuevamente'
  },
  WARNING: {
    UNSAVED_CHANGES: '¿Está seguro de salir sin guardar los cambios?',
    DELETE_CONFIRM: '¿Está seguro de eliminar este registro?'
  }
}

// Configuración de navegación
export const NAV_ITEMS = [
  {
    key: 'home',
    path: '/',
    label: 'Inicio',
    icon: 'HomeOutlined'
  },
  {
    key: 'users',
    path: '/users',
    label: 'Usuarios',
    icon: 'TeamOutlined'
  }
]

// Formato de fechas
export const DATE_FORMATS = {
  DEFAULT: 'DD/MM/YYYY',
  WITH_TIME: 'DD/MM/YYYY HH:mm',
  TIME_ONLY: 'HH:mm',
  ISO: 'YYYY-MM-DD'
}

// Configuración de storage
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language'
}

// Tema
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark'
}

