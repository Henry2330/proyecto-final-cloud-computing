<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    layout="vertical"
  >
    <a-form-item label="Nombre" name="name">
      <a-input v-model:value="formState.name" placeholder="Ingrese el nombre del usuario" />
    </a-form-item>

    <a-form-item label="Email" name="email">
      <a-input
        v-model:value="formState.email"
        type="email"
        placeholder="Ingrese el email del usuario"
      />
    </a-form-item>

    <a-form-item label="Rol" name="role">
      <a-select v-model:value="formState.role" placeholder="Seleccione un rol">
        <a-select-option value="admin">Administrador</a-select-option>
        <a-select-option value="user">Usuario</a-select-option>
        <a-select-option value="guest">Invitado</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item v-if="!initialData" label="Contraseña" name="password">
      <a-input-password
        v-model:value="formState.password"
        placeholder="Ingrese la contraseña"
      />
    </a-form-item>

    <a-form-item label="Estado" name="active">
      <a-switch v-model:checked="formState.active" />
      <span style="margin-left: 8px">
        {{ formState.active ? 'Activo' : 'Inactivo' }}
      </span>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: null
  }
})

const formRef = ref()
const formState = reactive({
  name: '',
  email: '',
  role: undefined,
  password: '',
  active: true
})

const rules = {
  name: [
    {
      required: true,
      message: 'Por favor ingrese el nombre',
      trigger: 'blur'
    },
    {
      min: 3,
      message: 'El nombre debe tener al menos 3 caracteres',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: 'Por favor ingrese el email',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: 'Por favor ingrese un email válido',
      trigger: 'blur'
    }
  ],
  role: [
    {
      required: true,
      message: 'Por favor seleccione un rol',
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      message: 'Por favor ingrese la contraseña',
      trigger: 'blur'
    },
    {
      min: 6,
      message: 'La contraseña debe tener al menos 6 caracteres',
      trigger: 'blur'
    }
  ]
}

watch(
  () => props.initialData,
  newData => {
    if (newData) {
      Object.assign(formState, {
        name: newData.name || '',
        email: newData.email || '',
        role: newData.role || undefined,
        active: newData.active !== undefined ? newData.active : true
      })
    }
  },
  { immediate: true }
)

const validate = async () => {
  await formRef.value.validate()
  return { ...formState }
}

const resetForm = () => {
  formRef.value.resetFields()
  Object.assign(formState, {
    name: '',
    email: '',
    role: undefined,
    password: '',
    active: true
  })
}

defineExpose({
  validate,
  resetForm
})
</script>

