import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()

  const isAuthenticated = auth.isAuthenticated
  const publicRoutes = ['/login', '/register']

  if (!isAuthenticated && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }
  
  if (isAuthenticated && publicRoutes.includes(to.path)) {
    return navigateTo('/')
  }
})
