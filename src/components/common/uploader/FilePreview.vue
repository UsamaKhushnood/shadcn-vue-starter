<template>
  <div :class="cn('flex items-center', customClass)" v-if="showPreview">
    <div
      class="rounded-lg border bg-background size-[100px] p-4 flex items-center justify-center mr-2"
    >
      <img width="64px" height="64px" class="rounded-full size-16" :src="getFilePreview(file)" />
    </div>
    <div v-if="showControls">
      <slot name="controls">
        <EditTrigger />
        <DeleteTrigger />
      </slot>
    </div>
  </div>
</template>
<script>
import { cn } from '@/lib/utils.js'
export default {
  props: {
    file: {
      type: Object
    },
    showPreview: {
      type: Boolean
    },
    class: {
      type: String,
      default: ''
    },
    index: {
      type: [String, Number],
      default: ''
    },
    showControls: {
      type: Boolean,
      default: true
    }
  },
  inject: ['getFilePreview'],
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
