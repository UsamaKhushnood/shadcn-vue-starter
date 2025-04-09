<template>
  <ConfigProvider>
    <RouterView></RouterView>
  </ConfigProvider>
</template>
<script>
import { ConfigProvider } from 'radix-vue'

export default {
  components: {
    ConfigProvider
  }
}
</script>
