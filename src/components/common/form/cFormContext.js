import { provide, inject } from 'vue'

export const contextKey = Symbol('cForm')

export function useForm(data) {
  provide(contextKey, data)
}
export function useFormContext() {
  const context = inject(contextKey)
  if (!context) {
    throw new Error('Field components must be used within a CForm')
  }
  return context
}
