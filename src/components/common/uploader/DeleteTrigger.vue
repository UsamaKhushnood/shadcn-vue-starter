<template>
  <Button
    size="icon"
    class="hover:bg-primary hover:text-primary-foreground"
    variant="simple"
    @click="deleteFile(index)"
  >
    <slot>
      <TrashIcon class="!size-5" />
    </slot>
  </Button>
</template>

<script>
import TrashIcon from '@/components/icons/TrashIcon.vue'
export default {
  props: {
    index: {
      type: [String, Number],
      default: ''
    }
  },
  inject: ['deleteFile'],
  components: {
    TrashIcon
  }
}
</script>
