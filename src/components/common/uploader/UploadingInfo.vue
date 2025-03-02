<template>
  <div v-if="file" :class="cn('border p-4 rounded-lg', customClass)">
    <div class="flex gap-2">
      <FileIcon class="!size-5" height="20px" width="20px"/>
      <div class="w-[calc(100%-28px)]">
        <div class="flex justify-between">
          <h6 class="text-sm capitalize truncate max-w-[80%]">{{ file.name }}</h6>
          <div class="flex">
            <Button v-if="showResize" size="sm" @click="resize(index)">Resize</Button>
            <Button size="sm" variant="transparent" @click="deleteFile(index)">
              <TrashIcon class="!size-5" role="button"/>
            </Button>
          </div>
        </div>
        <h6 class="text-sm font-normal">{{ formatFileSize(file.size) }}</h6>
        <div class="flex items-center gap-2">
          <Progress :modelValue="currentProgress" class="h-2"/>
          <span class="text-sm">{{ currentProgress }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { cn } from '@/lib/utils.js'
import FileIcon from '@/components/icons/FileIcon.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'

export default {
  props: ['currentProgress', 'file', 'totalSize', 'class', 'index', "showResize"],
  inject: ['formatFileSize', 'deleteFile', 'resize'],
  components: {
    FileIcon,
    TrashIcon
  },
  computed: {
    customClass() {
      return this.class
    }
  },
  methods: {
    cn
  }
}
</script>
