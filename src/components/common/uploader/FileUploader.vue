<template>
  <div>
    <slot
        :addListeners="addListeners"
        :deleteFile="deleteFile"
        :dragOver="dragOver"
        :edit="edit"
        :error="error"
        :files="files"
        :formatFileSize="formatFileSize"
        :getFilePreview="getFilePreview"
        :handleDragLeave="handleDragLeave"
        :handleDragOver="handleDragOver"
        :handleDrop="handleDrop"
        :handleFileSelect="handleFileSelect"
        :handleUpload="handleUpload"
        :readers="readers"
        :reset="reset"
        :resize="resize"
        :triggerFileInput="triggerFileInput"
        :uniqueID="uniqueID"
    >
      <DragnDropArea
          v-if="files.length === 0"
          :description="description"
          :dragOver="dragOver"
          :vertical="vertical"
      >
      </DragnDropArea>

      <template v-for="(reader, readerIndex) in readers" :key="readerIndex">
        <UploadingInfo
            :class="{ hidden: reader?.showPreview }"
            :currentProgress="reader?.currentProgress"
            :file="files[readerIndex]"
            :index="readerIndex"
            :totalSize="reader?.totalSize"
        />
        <FilePreview
            :file="files[readerIndex]"
            :index="readerIndex"
            :showPreview="reader?.showPreview"
        />
      </template>

      <UploadErrorMessage :message="error.message"/>
    </slot>

    <input
        :id="uniqueID"
        :ref="uniqueID"
        :accept="accept"
        :multiple="multiple"
        aria-hidden="true"
        class="hidden"
        type="file"
        @change="handleFileSelect"
    />
  </div>
</template>

<script>
import {uniqueId} from 'lodash'
import DragnDropArea from './DragnDropArea.vue'
import UploadingInfo from './UploadingInfo.vue'
import UploadErrorMessage from './UploadErrorMessage.vue'
import FilePreview from './FilePreview.vue'
import {useToast} from "@/components/ui/toast/index.js";

const {toast} = useToast()

export default {
  components: {
    DragnDropArea,
    UploadingInfo,
    UploadErrorMessage,
    FilePreview
  },

  props: {
    accept: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: 'PNG, JPG (max. 800x400px)'
    },
    maxFileSize: {
      type: Number,
      default: 5 // 5MB
    },
    multiple: {
      type: Boolean,
      default: false
    },
    maxFiles: {
      type: [Number, String],
      default: 10
    },
    vertical: {
      type: Boolean,
      default: false
    },
    disabled: {type: Boolean, default: false}
  },

  emits: ['fileSelected', 'error', 'update:modelValue'],

  data() {
    return {
      uniqueID: uniqueId('uploader-'),
      dragOver: false,
      readers: [],
      files: [],
      error: {}
    }
  },

  provide() {
    return {
      uniqueID: this.uniqueID,
      dragOver: this.dragOver,
      file: this.files,
      error: this.error,
      readers: this.readers,
      // functions
      edit: this.edit,
      deleteFile: this.deleteFile,
      resize: this.resize,
      reset: this.reset,
      handleDragOver: this.handleDragOver,
      handleDragLeave: this.handleDragLeave,
      handleDrop: this.handleDrop,
      triggerFileInput: this.triggerFileInput,
      handleFileSelect: this.handleFileSelect,
      handleUpload: this.handleUpload,
      addListeners: this.addListeners,
      formatFileSize: this.formatFileSize,
      getFilePreview: this.getFilePreview
    }
  },

  methods: {
    handleDragOver() {
      this.dragOver = true
    },

    handleDragLeave() {
      this.dragOver = false
    },

    handleDrop(event) {
      if (this.disabled) {
        toast({
          title: `Max ${this.maxFiles} files allowed only`,
          variant: 'destructive'
        })
        return
      }
      this.dragOver = false
      this.handleUpload(event.dataTransfer.files)
    },

    triggerFileInput() {
      if (this.disabled) {
        toast({
          title: `Max ${this.maxFiles} files allowed only`,
          variant: 'destructive'
        })
        return
      }
      this.$refs[this.uniqueID].click()
    },

    handleFileSelect(event) {
      this.handleUpload(event.target.files)
    },

    handleUpload(e) {
      let files = Array.from(e)

      if (!this.multiple) {
        this.readers = []
        this.files = []
        files = [e[0]]
      } else {
        const totalFiles = this.files.length + files.length
        if (totalFiles > this.maxFiles) {
          // Modify these lines to properly handle exceeding maxFiles
          const allowedNewFiles = this.maxFiles - this.files.length
          files = files.slice(0, allowedNewFiles)
        }
      }

      setTimeout(() => {
        const startIndex = this.readers.length
        files.forEach((file, i) => {
          const reader = new FileReader()
          this.readers.push({
            reader,
            showPreview: false,
            totalSize: 0,
            currentProgress: 0
          })

          this.$nextTick(() => {
            this.handleFileUpload(file, startIndex + i)
            this.addListeners(reader, startIndex + i)
            reader.readAsDataURL(file)
          })
        })

        this.resetInputVal()
      })
    },

    addListeners(reader, index) {
      reader.addEventListener('loadstart', (e) => this.handleEvent(e, index))
      reader.addEventListener('load', (e) => this.handleEvent(e, index))
      reader.addEventListener('loadend', (e) => this.handleEvent(e, index))
      reader.addEventListener('progress', (e) => this.handleEvent(e, index))
      reader.addEventListener('error', (e) => this.handleEvent(e, index))
      reader.addEventListener('abort', (e) => this.handleEvent(e, index))
    },

    handleEvent(event, index) {
      const currentReader = this.readers[index]

      if (event.type === 'error') {
        this.error = currentReader.reader.error
      }

      if (['loadend', 'load'].includes(event.type)) {
        currentReader.filePreview = currentReader.reader.result
        setTimeout(() => {
          currentReader.showPreview = true
        }, 500)
      }

      if (event.type === 'progress') {
        currentReader.currentProgress = Number((event.loaded / event.total).toFixed(1) * 100)
      }

      if (event.type === 'loadstart') {
        console.log(event.total)

        currentReader.totalSize = event.total
      }
    },

    handleFileUpload(file, index) {
      this.error = {}
      if (this.validateFile(file)) {
        this.files.push(file)
        this.$emit('fileSelected', this.files)
        this.$emit('update:modelValue', this.files)
      }
    },

    validateFile(file) {
      if (file.size > this.maxFileSize * 1024 * 1024) {
        this.error = {
          message: `File ${file.name} exceeds maximum size of ${this.formatFileSize(this.maxFileSize)}`
        }
        this.$emit('error', this.error.message)
        return false
      }

      if (this.accept) {
        const fileType = file.type
        const acceptedTypes = this.accept.split(',').map((type) => type.trim())

        if (
            !acceptedTypes.some((type) => {
              return fileType.match(type) || file.name.toLowerCase().endsWith(type.toLowerCase())
            })
        ) {
          this.error = {
            message: `Please upload ${this.accept}`
          }
          this.$emit('error', this.error.message)
          return false
        }
      }

      return true
    },

    formatFileSize(bytes) {
      if (!bytes) return
      const units = ['B', 'KB', 'MB', 'GB']
      let size = bytes
      let unitIndex = 0

      while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024
        unitIndex++
      }

      return `${size.toFixed(1)} ${units[unitIndex]}`
    },

    getFilePreview(file) {
      if (!file) return ''
      return URL.createObjectURL(file)
    },

    removeFile(index) {
      this.readers[index].reader.abort()
      this.$nextTick(() => {
        this.files.splice(index, 1)
        this.readers.splice(index, 1)
      })
    },

    deleteFile(index) {
      this.files.splice(index, 1)
      this.readers.splice(index, 1)
      this.$emit('delete')
      if (!this.multiple) {
        this.reset()
      }
      this.resetInputVal()
    },

    resize(index) {
      this.$emit('resize', index)
    },

    resetInputVal() {
      this.$refs[this.uniqueID].value = null
    },

    reset() {
      this.files = []
      this.readers = []
      this.error = {}
      if (this.multiple) {
        this.$emit('update:modelValue', this.files)
      } else {
        this.$emit('update:modelValue', this.files[0])
      }
    },
    edit(index) {
      this.resetInputVal()
      this.$refs[this.uniqueID].click()
    }
  },

  beforeUnmount() {
    if (this.filePreview) {
      URL.revokeObjectURL(this.filePreview)
    }
  }
}
</script>
