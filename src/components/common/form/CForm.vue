<template>
  <form @submit.prevent="handleSubmit">
    <slot :v="v" :invalid="v.$invalid" :error="v.$error" :reset="reset"></slot>
  </form>
</template>
<script setup>
import { useForm } from './cFormContext'
import { useVuelidate } from '@vuelidate/core'
import { reactive } from 'vue'

const props = defineProps({
  initialValues: {
    type: Object
  },
  schema: {
    type: Object
  },
  onSubmit: {
    type: Function
  }
})

const state = reactive(props.initialValues)
const v = useVuelidate(props.schema, state, { $lazy: true })

const handleSubmit = async () => {
  const isValid = await v.value.$validate()
  if (isValid && props.onSubmit) {
    props.onSubmit(state)
  }
}

const reset = () => {
  v.value.$reset
}

defineExpose({
  reset,
  v
})

useForm({
  schema: props.schema,
  v: v.value
})
</script>
