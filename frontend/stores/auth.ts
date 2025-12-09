import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
  balance: number
}

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

   actions: {
    setAuth(user: User, token: string) {
      const normalizedUser: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        balance: user.balance ?? 0,
      }

      this.user = normalizedUser
      this.token = token

      if (process.client) {
        window.localStorage.setItem(
          'sticker-auth',
          JSON.stringify({ user: this.user, token })
        )
      }
    },

    hydrateFromStorage() {
      if (!process.client) return
      const raw = window.localStorage.getItem('sticker-auth')
      if (!raw) return
      try {
        const parsed = JSON.parse(raw)

        const normalizedUser: User | null = parsed.user
          ? {
              id: parsed.user.id,
              name: parsed.user.name,
              email: parsed.user.email,
              balance: parsed.user.balance ?? 0,
            }
          : null

        this.user = normalizedUser
        this.token = parsed.token
      } catch {
        this.user = null
        this.token = null
      }
    },
    clear() {
      this.user = null
      this.token = null
      if (process.client) {
        window.localStorage.removeItem('sticker-auth')
      }
    }
  }
})
