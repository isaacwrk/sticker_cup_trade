import { defineStore } from 'pinia'

export interface CartItem {
  id: number
  name: string
  code: string
  team: string
  price: number
  imageUrl?: string | null
  quantity: number
}

interface CartState {
  items: CartItem[]
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: []
  }),

  getters: {
    totalItems: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((acc, item) => acc + item.quantity * item.price, 0)
  },

  actions: {
    hydrate() {
      if (!process.client) return
      const raw = localStorage.getItem('sticker-cart')
      if (!raw) return
      try {
        this.items = JSON.parse(raw)
      } catch {
        this.items = []
      }
    },
    persist() {
      if (process.client) {
        window.localStorage.setItem('sticker-cart', JSON.stringify(this.items))
      }
    },

    add(item: Omit<CartItem, 'quantity'>, quantity = 1) {
      const existing = this.items.find((i) => i.id === item.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ ...item, quantity })
      }
      this.persist()
    },

    remove(id: number) {
      this.items = this.items.filter((i) => i.id !== id)
      this.persist()
    },

    updateQuantity(id: number, quantity: number) {
      const item = this.items.find((i) => i.id === id)
      if (!item) return
      item.quantity = quantity
      if (item.quantity <= 0) {
        this.remove(id)
      } else {
        this.persist()
      }
    },

    clear() {
      this.items = []
      this.persist()
    }
  }
})
