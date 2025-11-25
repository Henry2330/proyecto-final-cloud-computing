<template>
  <a-form-item :label="label" :name="name" :rules="itemRules">
    <a-input-password
      :value="modelValue"
      :placeholder="placeholder"
      :size="size"
      :disabled="disabled"
      @input="handleInput"
    >
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix" />
      </template>
    </a-input-password>
  </a-form-item>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'large'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  rules: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const itemRules = computed(() => props.rules)

const handleInput = (e) => {
  emit('update:modelValue', e.target.value)
}
</script>

