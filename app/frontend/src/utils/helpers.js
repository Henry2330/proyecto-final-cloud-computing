/**
 * Utilidades para manejo de fechas
 */
export const formatDate = (date, format = 'DD/MM/YYYY') => {
  if (!date) return ''
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()

  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', year)
}

/**
 * Validar email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Formatear número de teléfono
 */
export const formatPhone = (phone) => {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phone
}

/**
 * Truncar texto
 */
export const truncate = (text, length = 50) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

/**
 * Capitalizar primera letra
 */
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Formatea un número como moneda
 *
 * @function formatCurrency
 * @param {number} amount - Cantidad a formatear
 * @param {string} [currency='USD'] - Código de moneda (USD, EUR, etc.)
 * @returns {string} Cantidad formateada
 *
 * @example
 * ```javascript
 * formatCurrency(1234.56, 'USD')  // '$1,234.56'
 * formatCurrency(1000, 'EUR')     // '€1,000.00'
 * ```
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined) return ''
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

/**
 * Genera un ID único basado en timestamp y random
 *
 * @function generateId
 * @returns {string} ID único
 *
 * @example
 * ```javascript
 * generateId()  // '1732435200000-abc123def'
 * ```
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Pausa la ejecución por un tiempo determinado
 *
 * @async
 * @function sleep
 * @param {number} ms - Milisegundos a esperar
 * @returns {Promise<void>}
 *
 * @example
 * ```javascript
 * await sleep(1000)  // Espera 1 segundo
 * console.log('Continúa después de 1 segundo')
 * ```
 */
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Clona profundamente un objeto
 *
 * @function deepClone
 * @param {Object} obj - Objeto a clonar
 * @returns {Object} Copia profunda del objeto
 *
 * @example
 * ```javascript
 * const original = { a: { b: 1 } }
 * const copia = deepClone(original)
 * copia.a.b = 2
 * console.log(original.a.b)  // 1 (no se modifica)
 * ```
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Remueve propiedades undefined y null de un objeto
 *
 * @function cleanObject
 * @param {Object} obj - Objeto a limpiar
 * @returns {Object} Objeto sin propiedades undefined/null
 *
 * @example
 * ```javascript
 * cleanObject({ a: 1, b: null, c: undefined, d: 0 })
 * // Resultado: { a: 1, d: 0 }
 * ```
 */
export const cleanObject = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key] = value
    }
    return acc
  }, {})
}

