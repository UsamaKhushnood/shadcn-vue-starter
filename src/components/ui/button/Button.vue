<script setup>
import { cn } from '@/lib/utils';
import { Primitive } from 'reka-ui';
import { buttonVariants } from '.';
import Spinner from '@/components/common/Spinner.vue';

const props = defineProps({
  variant: { type: null, required: false },
  size: { type: null, required: false },
  class: { type: null, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false, default: 'button' },
  loading: { type: Boolean, required: false, default: false },
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(buttonVariants({ variant, size }), props.class)">
    <Spinner v-if="loading" class="w-4 h-4 mx-auto" />
    <slot v-else />
  </Primitive>
</template>
