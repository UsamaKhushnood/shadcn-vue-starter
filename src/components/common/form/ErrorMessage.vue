<template>
  <p class="text-sm text-destructive mt-[6px]">
    {{ v[name]?.$errors[0]?.$message }}
  </p>
</template>

<script setup>
import { useFieldContext } from './cFieldContext'
import { useFormContext } from './cFormContext'

const { v } = useFormContext()
const { name } = useFieldContext()
</script>
