<template>
  <Button
    size="icon"
    class="hover:bg-primary hover:text-primary-foreground"
    variant="simple"
    @click="edit(index)"
  >
    <slot>
      <PencilIcon class="!size-5" />
    </slot>
  </Button>
</template>

<script>
import PencilIcon from '@/components/icons/PencilIcon.vue'
export default {
  props: {
    index: {
      type: [String, Number],
      default: ''
    }
  },
  inject: ['edit'],
  components: {
    PencilIcon
  }
}
</script>
