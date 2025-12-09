import { defineStore } from 'pinia'

type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: number
  type: ToastType
  message: string
}

interface ToastState {
  toasts: Toast[]
}

let nextId = 1

export const useToastStore = defineStore('toast', {
  state: (): ToastState => ({
    toasts: [],
  }),

  actions: {
    push(message: string, type: ToastType = 'info', timeout = 3000) {
      const id = nextId++
      this.toasts.push({ id, type, message })

      if (timeout > 0 && process.client) {
        setTimeout(() => {
          this.remove(id)
        }, timeout)
      }
    },

    success(message: string, timeout = 3000) {
      this.push(message, 'success', timeout)
    },

    error(message: string, timeout = 4000) {
      this.push(message, 'error', timeout)
    },

    info(message: string, timeout = 3000) {
      this.push(message, 'info', timeout)
    },

    remove(id: number) {
      this.toasts = this.toasts.filter((t) => t.id !== id)
    },
  },
})
