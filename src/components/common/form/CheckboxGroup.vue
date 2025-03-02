<template>
  <div :class="cn('space-y-3', props.class)">
    <div v-for="(option, index) in options" :key="index">
      <slot :option="option" :index="index" :isChecked="isChecked" :handleChange="handleChange">
        <div class="flex items-center gap-1">
          <Checkbox
            :id="`${index}-${option.value}`"
            class="data-[state=checked]:bg-muted2 data-[state=checked]:border-muted2"
            :checked="isChecked(option.value)"
            @update:checked="(checked) => handleChange(option.value, checked)"
          />
          <Label :for="`${index}-${option.value}`" class="cursor-pointer">
            {{ option.label }}
          </Label>
        </div>
      </slot>
    </div>
  </div>
</template>
<script setup>
import { cn } from '@/lib/utils'
import { useCheckbox } from './useCheckbox'
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: [Array, String, Number] },
  class: { type: null },
  name: { type: null },
  options: { type: Array },
  radio: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const selected = ref(props.modelValue)

const isChecked = (value) => {
  return selected.value?.includes(value)
}

const handleChange = (value, checked) => {
  if (props.radio) {
    selected.value = value
    emit('update:modelValue', value)
  } else {
    const newValue = checked
      ? [...(selected.value || []), value]
      : (selected.value || []).filter((v) => v !== value)
    selected.value = newValue
    emit('update:modelValue', newValue)
  }
}

useCheckbox({
  handleChange: handleChange,
  isChecked: isChecked
})
</script>
