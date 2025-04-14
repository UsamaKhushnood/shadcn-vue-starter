<template>
  <div class="relative w-full items-center">
    <Input v-model="modelValue" id="search" type="text" placeholder="Search..." class="pl-10"
      @keyup.enter="MakeSearch" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-4">
      <Search class="size-4 text-muted-foreground" />
    </span>
    <span v-if="loading" class="absolute end-0 inset-y-0 flex items-center justify-center px-4">
      <Spinner class="size-4" />
    </span>
    <span v-else-if="searched" class="absolute end-0 inset-y-0 flex items-center justify-center px-4"
      @click="clearSearch" role="button">
      <X class="size-5 text-muted-foreground" />
    </span>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { Search, X } from 'lucide-vue-next'
import { useVModel } from '@vueuse/core'
import Spinner from './Spinner.vue'

const props = defineProps({
  defaultValue: { type: [String, Number], required: false },
  modelValue: { type: [String, Number], required: false },
  loading: { type: Boolean, default: false },
})

const emits = defineEmits(['update:modelValue', 'clear', 'search'])

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})


const search = ref('')
const searched = ref(false)

const MakeSearch = () => {
  searched.value = true
  emits('search', search.value)
}


const clearSearch = () => {
  searched.value = false
  emits('clear')
}



</script>