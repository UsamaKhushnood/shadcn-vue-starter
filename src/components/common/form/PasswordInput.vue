<template>
  <div class="relative">
    <Input
      class="pr-12"
      :type="showPassword ? 'text' : 'password'"
      v-bind="$attrs"
      @blur="handleBlur"
    />
    <div
      class="absolute top-1/2 right-0 -translate-y-1/2 mr-4 cursor-pointer hover:text-"
      @click="showPassword = !showPassword"
    >
      <Eye v-if="showPassword" size="18" class="text-muted-foreground" />
      <EyeOff v-else size="18" class="text-muted-foreground" />
    </div>
  </div>
</template>
<script setup>
import { Eye, EyeOff } from 'lucide-vue-next'
import { useFieldContext } from '@/components/common/form/cFieldContext.js'
import { ref } from 'vue'

const { handleBlur } = useFieldContext()

defineOptions({
  inheritAttrs: false
})

const showPassword = ref(false)
</script>
