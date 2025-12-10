<template>
  <header class="header">
    <NuxtLink to="/" class="logo">
      <span class="logo-badge">🏆</span>
      <span class="logo-text">Sticker shop</span>
    </NuxtLink>

    <nav class="nav" v-if="auth.user">
      <div class="balance">
        <span class="balance-label">Saldo:</span>
        <span class="balance-amount">R$ <span v-if="showBalance">{{ auth.user.balance.toFixed(2) }}</span><span v-else>•••••</span></span>
        <button class="eye-btn" @click="toggleBalance" :aria-pressed="showBalance" :aria-label="showBalance ? 'Ocultar saldo' : 'Exibir saldo'">
          <svg v-if="showBalance" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 2l20 20"></path>
            <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24"></path>
            <path d="M1 12s4-7 11-7c2.03 0 3.92.4 5.65 1.1"></path>
          </svg>
        </button>
      </div>
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
import { ref } from 'vue'

const showBalance = ref(false)

function toggleBalance() {
  showBalance.value = !showBalance.value
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

.balance {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: rgba(15,23,42,0.12);
}
.balance-label {
  font-size: 0.85rem;
  color: var(--muted, #cbd5e1);
}
.balance-amount {
  font-weight: 600;
  font-size: 0.95rem;
}
.eye-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0.15rem;
  margin-left: 0.15rem;
  color: var(--text);
  cursor: pointer;
}
.eye-btn svg { display: block; }
</style>
