<script setup lang="ts">
import { useApi } from '@/composables/useApi'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import StickerCard from '@/components/stickers/StickerCard.vue'

interface Sticker {
  id: number
  code: string
  name: string
  team: string
  rarity: string
  price: number
  imageUrl?: string | null
}

interface InventoryItem {
  id: number
  quantity: number
  sticker: Sticker
}

const { get, post } = useApi()
const auth = useAuthStore()

const loading = ref(true)
const error = ref<string | null>(null)
const balance = ref<number>(0)
const items = ref<InventoryItem[]>([])
const selling = ref(false)
const toast = useToastStore()

async function load() {
  loading.value = true
  error.value = null
  try {
    const res = await get<{ balance: number; items: InventoryItem[] }>(
      '/v1/inventory',
      true
    )
    balance.value = res.balance
    items.value = res.items
    if (auth.user) {
      auth.user.balance = res.balance
    }
  } catch (err: unknown) {
    console.error(err)
    error.value = 'Erro ao carregar inventário'
    toast.error(error.value)
  } finally {
    loading.value = false
  }
}

async function sellOne(item: InventoryItem) {
  if (item.quantity <= 0 || selling.value) return
  selling.value = true
  try {
    const res = await post<{ balance: number; item: InventoryItem | null }>(
      '/v1/inventory/sell',
      { stickerId: item.sticker.id, quantity: 1 },
      true
    )

    balance.value = res.balance
    if (auth.user) auth.user.balance = res.balance

    if (res.item) {
      const idx = items.value.findIndex(
        (i) => i.sticker.id === res.item!.sticker.id
      )
      if (idx !== -1) {
        items.value[idx] = res.item
      }
    } else {
      items.value = items.value.filter(
        (i) => i.sticker.id !== item.sticker.id
      )
    }

    toast.success('Figurinha vendida com sucesso!')
  } catch (err: any) {
    console.error(err)
    toast.error('Erro ao vender figurinha.')
  } finally {
    selling.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="inventory">
    <header class="inventory-header">
      <h1>Meu inventário</h1>
      <p class="balance">
        Saldo: <span>R$ {{ balance.toFixed(2) }}</span>
      </p>
    </header>

    <p v-if="loading">Carregando...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <div v-else>
      <p v-if="!items.length" class="empty">
        Você ainda não tem figurinhas no inventário.
      </p>

      <div v-else class="grid">
        <div
          v-for="item in items"
          :key="item.id"
          class="inventory-card"
        >
          <StickerCard
            :sticker="item.sticker"
            :quantity="item.quantity"
            :show-add-button="false"
          />

          <button
            class="btn-sell"
            type="button"
            :disabled="item.quantity <= 0 || selling"
            @click="sellOne(item)"
          >
            Vender 1 (R$ {{ item.sticker.price.toFixed(2) }})
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 0.5rem;
}
.inventory-card {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  max-width: 300px;
}

.btn-sell {
  align-self: stretch;
  border-radius: 999px;
  border: 1px solid rgba(248, 250, 252, 0.1);
  padding: 0.3rem 0.75rem;
  background: rgba(22, 163, 74, 0.15);
  color: #bbf7d0;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.12s ease, transform 0.08s ease;
}

.btn-sell:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-sell:not(:disabled):hover {
  background: rgba(22, 163, 74, 0.35);
  transform: translateY(-1px);
}
</style>
