<template>
  <div class="users-view">
    <a-card title="Gestión de Usuarios">
      <template #extra>
        <a-button type="primary" @click="showModal">
          <PlusOutlined />
          Nuevo Usuario
        </a-button>
      </template>

      <a-table
        :columns="columns"
        :data-source="userStore.users"
        :loading="userStore.loading"
        :pagination="{ pageSize: 10 }"
        row-key="id"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'active'">
            <a-tag :color="record.active ? 'green' : 'red'">
              {{ record.active ? 'Activo' : 'Inactivo' }}
            </a-tag>
          </template>

          <template v-else-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="editUser(record)">
                <EditOutlined />
                Editar
              </a-button>
              <a-popconfirm
                title="¿Está seguro de eliminar este usuario?"
                ok-text="Sí"
                cancel-text="No"
                @confirm="deleteUser(record.id)"
              >
                <a-button type="link" danger size="small">
                  <DeleteOutlined />
                  Eliminar
                </a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <!-- Modal de Formulario -->
    <a-modal
      v-model:open="modalVisible"
      :title="isEdit ? 'Editar Usuario' : 'Nuevo Usuario'"
      @ok="handleOk"
      @cancel="handleCancel"
      :confirm-loading="confirmLoading"
      width="600px"
    >
      <user-form ref="userFormRef" :initial-data="currentUser" />
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import UserForm from '@/components/organisms/UserForm.vue'

const userStore = useUserStore()

const modalVisible = ref(false)
const confirmLoading = ref(false)
const isEdit = ref(false)
const currentUser = ref(null)
const userFormRef = ref(null)

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Rol',
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: 'Estado',
    key: 'active',
    width: 100
  },
  {
    title: 'Acciones',
    key: 'action',
    width: 200
  }
]

const showModal = () => {
  isEdit.value = false
  currentUser.value = null
  modalVisible.value = true
}

const editUser = record => {
  isEdit.value = true
  currentUser.value = { ...record }
  modalVisible.value = true
}

const handleOk = async () => {
  try {
    const formData = await userFormRef.value.validate()
    confirmLoading.value = true

    let result
    if (isEdit.value) {
      result = await userStore.updateUser(currentUser.value.id, formData)
    } else {
      result = await userStore.createUser(formData)
    }

    if (result.success) {
      message.success(isEdit.value ? 'Usuario actualizado exitosamente' : 'Usuario creado exitosamente')
      modalVisible.value = false
      userFormRef.value.resetForm()
    } else {
      message.error(result.message)
    }
  } catch (error) {
    console.error('Error de validación:', error)
  } finally {
    confirmLoading.value = false
  }
}

const handleCancel = () => {
  modalVisible.value = false
  userFormRef.value.resetForm()
}

const deleteUser = async id => {
  const result = await userStore.deleteUser(id)
  if (result.success) {
    message.success('Usuario eliminado exitosamente')
  } else {
    message.error(result.message)
  }
}

onMounted(() => {
  userStore.fetchUsers()
})
</script>

<style scoped>
.users-view {
  max-width: 1400px;
  margin: 0 auto;
}
</style>

