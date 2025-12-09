// composables/useApi.ts
import { useAuthStore } from '@/stores/auth'

export function useApi() {
  const config = useRuntimeConfig()
  const auth = useAuthStore()

  const baseURL = config.public.apiBase

  async function get<T>(url: string, authRequired = false): Promise<T> {
    try {
      return await $fetch<T>(url, {
        baseURL,
        headers: authRequired && auth.token
          ? { Authorization: `Bearer ${auth.token}` }
          : {},
      })
    } catch (error: any) {
      // puxa message do back se tiver
      const message =
        error?.data?.message ||
        error?.message ||
        'Erro inesperado ao chamar API.'
      throw new Error(message)
    }
  }

  async function post<T>(
    url: string,
    body: any,
    authRequired = false
  ): Promise<T> {
    try {
      return await $fetch<T>(url, {
        method: 'POST',
        baseURL,
        body,
        headers: authRequired && auth.token
          ? { Authorization: `Bearer ${auth.token}` }
          : {},
      })
    } catch (error: any) {
      // aqui está o pulo do gato
      const message =
        error?.data?.message ||
        error?.message ||
        'Erro inesperado ao chamar API.'
      throw new Error(message)
    }
  }

  return { get, post }
}
