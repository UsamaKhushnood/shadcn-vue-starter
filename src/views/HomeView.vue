<template>
  <main
    class="min-h-screen flex flex-col items-center justify-center p-4 bg-[radial-gradient(#625757,transparent_1px)] [background-size:16px_16px]">
    <div class="max-w-3xl text-center space-y-8">
      <h1
        class="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-50 to-green-800 animate-gradient-x">

        Welcome to Your Vue Application
      </h1>

      <p class="text-xl text-muted-foreground">
        Start building something amazing with Vue.js and Shadcn UI
      </p>

      <div class="flex gap-4 justify-center">
        <Button size="lg" variant="default">
          Get Started
          <ArrowRight class="ml-2 h-4 w-4" />
        </Button>

        <Button size="lg" variant="outline">
          Documentation
          <Book class="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
        <Card class="p-6">
          <CardHeader>
            <CardTitle>Fast & Modern</CardTitle>
          </CardHeader>
          <CardContent>
            Built with Vue 3 and Vite for lightning-fast development
          </CardContent>
        </Card>

        <Card class="p-6">
          <CardHeader>
            <CardTitle>Beautiful UI</CardTitle>
          </CardHeader>
          <CardContent>
            Powered by Shadcn UI components for a polished look
          </CardContent>
        </Card>

        <Card class="p-6">
          <CardHeader>
            <CardTitle>Customizable</CardTitle>
          </CardHeader>
          <CardContent>
            Easily extend and customize to match your needs
          </CardContent>
        </Card>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ArrowRight, Book } from 'lucide-vue-next'
</script>

<style scoped>
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 15s ease infinite;
}

@keyframes gradient-x {
  0% {
    background-position: 0% 50%
  }

  50% {
    background-position: 100% 50%
  }

  100% {
    background-position: 0% 50%
  }
}
</style>
