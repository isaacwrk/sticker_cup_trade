<template>
  <section class="cart">
    <h1>Seu carrinho</h1>

    <div v-if="!items.length" class="empty">
      Seu carrinho está vazio.
      <NuxtLink to="/">Ver figurinhas</NuxtLink>
    </div>

    <div v-else class="layout">
      <ul class="list">
        <li v-for="item in items" :key="item.id" class="row">
          <div class="info">
            <h3>{{ item.name }}</h3>
            <p class="meta">
              {{ item.code }} · {{ item.team }}
            </p>
          </div>

          <div class="controls">
            <input
              type="number"
              min="1"
              :value="item.quantity"
              @change="onChangeQuantity(item.id, $event)"
            />
            <span class="price">
              R$ {{ (item.price * item.quantity).toFixed(2) }}
            </span>
            <button class="remove" @click="remove(item.id)">✕</button>
          </div>
        </li>
      </ul>

      <aside class="summary">
        <h2>Resumo</h2>
        <p>Total de itens: {{ totalItems }}</p>
        <p>Total: <strong>R$ {{ totalPrice.toFixed(2) }}</strong></p>
        <button class="btn" @click="checkout" :disabled="!items.length || loading">
          {{ loading ? 'Enviando pedido...' : 'Finalizar compra' }}
        </button>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToastStore } from '@/stores/toast'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useApi } from '@/composables/useApi'

const cart = useCartStore()
const auth = useAuthStore()
const { post } = useApi()
const router = useRouter()
const toast = useToastStore()


const { items, totalItems, totalPrice } = storeToRefs(cart)
const loading = ref(false)

function onChangeQuantity(id: number, event: Event) {
  const value = Number((event.target as HTMLInputElement).value || '1')
  cart.updateQuantity(id, value)
}

function remove(id: number) {
  cart.remove(id)
}

async function checkout() {
  if (!auth.isAuthenticated) {
    router.push('/login')
    return
  }

  loading.value = true
  try {
    const payload = {
      items: items.value.map((i) => ({
        stickerId: i.id,
        quantity: i.quantity
      }))
    }

    const res = await post<{ data: any; balance: number }>('/v1/orders', payload, true)
    auth.user!.balance = res.balance
    cart.clear()
    toast.success('Compra realizada com sucesso!')
    router.push('/')
  } catch (error: unknown) {
      if (error instanceof Error) { 
      toast.error(`Error: ${error.message}`); 
    } else {
      toast.error("Ocorreu um erro, tente novamente em instantes.");
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.cart {
  max-width: 960px;
  margin: 1.5rem auto 0;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(260px, 1fr);
  gap: 1.25rem;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0.25rem;
  border-bottom: 1px solid rgba(148,163,184,0.3);
}

.info h3 {
  margin: 0;
  font-size: 0.95rem;
}

.meta {
  margin: 0.15rem 0 0;
  font-size: 0.8rem;
  color: var(--muted);
}

.controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.controls input {
  width: 60px;
  border-radius: 0.5rem;
  border: 1px solid rgba(148,163,184,0.7);
  padding: 0.25rem 0.4rem;
  background: rgba(15,23,42,0.8);
  color: var(--text);
}

.price {
  font-weight: 600;
}

.remove {
  border: none;
  background: transparent;
  color: #fecaca;
  cursor: pointer;
}

.summary {
  padding: 1rem 1rem 1.25rem;
  border-radius: 1rem;
  background: radial-gradient(circle at top left, #111827, #020617);
  border: 1px solid rgba(148,163,184,0.3);
}

.summary h2 {
  margin: 0 0 0.75rem;
}

.summary p {
  margin: 0.2rem 0;
}

.btn {
  margin-top: 0.85rem;
  width: 100%;
  border-radius: 999px;
  border: none;
  padding: 0.5rem 0.75rem;
  background: var(--accent);
  color: #111827;
  font-weight: 600;
  cursor: pointer;
}

.empty {
  margin-top: 2rem;
  text-align: center;
  color: var(--muted);
}

.empty a {
  margin-left: 0.25rem;
  color: var(--accent);
}
</style>
