<template>
  <div>
    <div class="mb-[6px]" v-if="label">
      <Label>{{ label }}<span class="text-destructive" v-if="required"> *</span></Label>
    </div>
    <div>
      <slot :handleBlur="handleBlur" :message="errorMessage"></slot>
      <slot name="message" :message="errorMessage">
        <p v-if="showMessage && errorMessage" class="text-xs text-destructive mt-1">
          {{ errorMessage }}
        </p>
      </slot>
    </div>
  </div>
</template>
<script setup>
import { useField } from './cFieldContext'
import { useFormContext } from './cFormContext'
import { computed } from 'vue'

const { v } = useFormContext()

const props = defineProps({
  name: {
    type: String
  },
  label: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  showMessage: {
    type: Boolean,
    default: true
  }
})

const errorMessage = computed(() => {
  return v[props.name]?.$errors[0]?.$message
})

const handleBlur = async () => {
  await v[props.name]?.$touch()
}

useField({
  name: props.name,
  handleBlur: handleBlur
})
</script>
