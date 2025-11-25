import { reactive, ref } from 'vue'

/**
 * Composable para manejo de formularios con validación
 * @param {Object} initialState - Estado inicial del formulario
 * @param {Object} validationRules - Reglas de validación
 * @returns {Object} - Estado y métodos del formulario
 */
export function useForm(initialState = {}, validationRules = {}) {
  const formState = reactive({ ...initialState })
  const formRef = ref(null)
  const errors = reactive({})
  const isSubmitting = ref(false)

  /**
   * Resetear el formulario
   */
  const resetForm = () => {
    Object.keys(initialState).forEach(key => {
      formState[key] = initialState[key]
    })
    Object.keys(errors).forEach(key => {
      delete errors[key]
    })
    formRef.value?.resetFields()
  }

  /**
   * Validar un campo específico
   */
  const validateField = (fieldName) => {
    const rules = validationRules[fieldName]
    if (!rules || !rules.length) return true

    for (const rule of rules) {
      if (rule.required && !formState[fieldName]) {
        errors[fieldName] = rule.message || `${fieldName} es requerido`
        return false
      }

      if (rule.min && formState[fieldName].length < rule.min) {
        errors[fieldName] = rule.message || `${fieldName} debe tener al menos ${rule.min} caracteres`
        return false
      }

      if (rule.max && formState[fieldName].length > rule.max) {
        errors[fieldName] = rule.message || `${fieldName} debe tener máximo ${rule.max} caracteres`
        return false
      }

      if (rule.pattern && !rule.pattern.test(formState[fieldName])) {
        errors[fieldName] = rule.message || `${fieldName} no tiene un formato válido`
        return false
      }
    }

    delete errors[fieldName]
    return true
  }

  /**
   * Validar todo el formulario
   */
  const validate = async () => {
    let isValid = true
    Object.keys(validationRules).forEach(fieldName => {
      if (!validateField(fieldName)) {
        isValid = false
      }
    })
    return isValid
  }

  /**
   * Obtener valores del formulario
   */
  const getValues = () => {
    return { ...formState }
  }

  /**
   * Establecer valores del formulario
   */
  const setValues = (values) => {
    Object.keys(values).forEach(key => {
      if (key in formState) {
        formState[key] = values[key]
      }
    })
  }

  return {
    formState,
    formRef,
    errors,
    isSubmitting,
    resetForm,
    validateField,
    validate,
    getValues,
    setValues
  }
}

