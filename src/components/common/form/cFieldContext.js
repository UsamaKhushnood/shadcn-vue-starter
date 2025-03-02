import { provide, inject, readonly } from 'vue'

export const contextKey = Symbol('cField')

export function useField(data) {
  provide(contextKey, readonly(data))
}
export function useFieldContext() {
  const context = inject(contextKey)
  if (!context) {
    throw new Error('Field components must be used within a CField')
  }
  return context
}
