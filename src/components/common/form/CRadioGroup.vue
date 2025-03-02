<template>
  <RadioGroup v-model="modelValue" class="gap-4">
    <div v-for="(option, index) in options" :key="option.value" class="flex items-center space-x-2">
      <RadioGroupItem :id="option.value" :value="option.value"/>
      <Label :for="option.value">{{ option.label }}</Label>
    </div>
  </RadioGroup>
</template>
<script setup>
import {useVModel} from '@vueuse/core'

const props = defineProps({
  modelValue: {type: [Array, String, Number]},
  options: {type: Array}
})

const emits = defineEmits(['update:modelValue'])

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})
</script>
