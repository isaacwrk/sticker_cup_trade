<template>
  <header class="header">
    <NuxtLink to="/" class="logo">
      <span class="logo-badge">🏆</span>
      <span class="logo-text">Sticker shop</span>
    </NuxtLink>

    <nav class="nav" v-if="auth.user">
      <span>Saldo: R$ {{ auth.user.balance.toFixed(2) }}</span>
      <NuxtLink to="/inventory" class="nav-link">Meu inventário</NuxtLink>
      <NuxtLink to="/" class="nav-link">Figurinhas</NuxtLink>
      <NuxtLink to="/cart" class="nav-link">
        Carrinho
        <span v-if="cart.totalItems" class="badge">{{ cart.totalItems }}</span>
      </NuxtLink>
      <NuxtLink v-if="!auth.isAuthenticated" to="/login" class="nav-link">Entrar</NuxtLink>
      <button v-else class="nav-link nav-button" @click="logout">
        Sair ({{ auth.user?.name }})
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const cart = useCartStore()
const auth = useAuthStore()

const router = useRouter()

function logout() {
  auth.clear()
  router.push('/login')
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(to right, rgba(15,23,42,0.95), rgba(8,47,73,0.95));
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(148,163,184,0.3);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.logo-badge {
  font-size: 1.4rem;
}

.logo-text {
  font-size: 1.1rem;
}

.nav {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-link {
  position: relative;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.9rem;
  color: var(--text);
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  transition: all 0.15s ease;
}

.nav-link:hover {
  border-color: rgba(148,163,184,0.7);
  background: rgba(15,23,42,0.7);
}

.nav-button {
  background: rgba(127,29,29,0.7);
  border-color: rgba(248,113,113,0.6);
}

.nav-button:hover {
  background: rgba(127,29,29,0.9);
}

.badge {
  margin-left: 0.25rem;
  padding: 0 0.45rem;
  font-size: 0.75rem;
  border-radius: 999px;
  background: var(--accent);
  color: #1f2933;
}
</style>
