import { provide, inject } from 'vue'

export const contextKey = Symbol('checkboxGroup')

export function useCheckbox(data) {
  provide(contextKey, data)
}
export function useCheckboxContext() {
  const context = inject(contextKey)
  if (!context) {
    throw new Error('Field components must be used within a checkboxGroup')
  }
  return context
}
