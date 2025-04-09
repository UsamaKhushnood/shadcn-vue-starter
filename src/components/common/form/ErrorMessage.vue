<template>
  <p class="text-xs text-destructive mt-1">
    {{ v[name]?.$errors[0]?.$message }}
  </p>
</template>

<script setup>
import { useFieldContext } from './cFieldContext'
import { useFormContext } from './cFormContext'

const { v } = useFormContext()
const { name } = useFieldContext()
</script>
