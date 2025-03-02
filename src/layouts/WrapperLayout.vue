<template>
  <ConfigProvider>
    <TheHeader />
    <RouterView></RouterView>
  </ConfigProvider>
</template>
<script>
import { ConfigProvider } from 'radix-vue'
import TheHeader from '@/components/common/TheHeader.vue'

export default {
  components: {
    TheHeader,
    ConfigProvider
  }
}
</script>
