<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="formRules"
    @finish="handleSubmit"
    layout="vertical"
    class="login-form"
  >
    <FormInput
      v-model="formState.username"
      label="Usuario"
      name="username"
      placeholder="Ingrese su usuario"
      :rules="formRules.username"
    >
      <template #prefix>
        <UserOutlined />
      </template>
    </FormInput>

    <FormPassword
      v-model="formState.password"
      label="Contraseña"
      name="password"
      placeholder="Ingrese su contraseña"
      :rules="formRules.password"
    >
      <template #prefix>
        <LockOutlined />
      </template>
    </FormPassword>

    <a-form-item>
      <BaseButton
        type="primary"
        html-type="submit"
        size="large"
        :loading="loading"
        block
      >
        Iniciar Sesión
      </BaseButton>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import FormInput from '@/components/molecules/FormInput.vue'
import FormPassword from '@/components/molecules/FormPassword.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])

const formRef = ref()
const formState = reactive({
  username: '',
  password: ''
})

const formRules = {
  username: [
    {
      required: true,
      message: 'Por favor ingrese su usuario',
      trigger: 'blur'
    }
  ],
  password: [
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
}

const handleSubmit = () => {
  emit('submit', { ...formState })
}

const resetForm = () => {
  formRef.value?.resetFields()
}

defineExpose({
  resetForm
})
</script>

<style scoped>
.login-form {
  margin-top: 20px;
}
</style>

