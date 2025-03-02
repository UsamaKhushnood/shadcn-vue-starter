<template>
  <Input @blur="handleBlur" />
</template>
<script setup>
import { useFieldContext } from '@/components/common/form/cFieldContext.js'
const { handleBlur } = useFieldContext()
</script>
