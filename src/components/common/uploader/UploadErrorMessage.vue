<template>
  <p v-if="message" :class="cn('text-destructive text-xs mt-1', customClass)">{{ message }}</p>
</template>
<script>
import { cn } from '@/lib/utils.js'
export default {
  props: ['message', 'class'],
  computed: {
    customClass() {
      return this.class
    }
  },
  methods: {
    cn
  }
}
</script>
