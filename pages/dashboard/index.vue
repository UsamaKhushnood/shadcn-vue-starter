<script>
export const description = 'A login page with a muted background color.';
</script>

<script setup>
import LoginForm from '@/components/LoginForm.vue';
import { GalleryVerticalEnd } from 'lucide-vue-next';
</script>

<template>
  <div
    class="flex min-h-svh flex-col items-center justify-center ga
    <div class="flex w-full max-w-sm flex-col gap-6">
      <a href="#" class="flex items-center gap-2 self-center font-medium">
        <div
          class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"
        >
          <GalleryVerticalEnd class="size-4" />
        </div>
        Acme Inc.
      </a>
      <LoginForm />
    </div>
  </div>
</template>
