<template>
  <section>
    <header class="grid-header">
      <h1 class="title">Figurinhas da Copa</h1>
      <p class="subtitle">
        Monte seu álbum, compre figurinhas e use o saldo para trocar com outros colecionadores.
      </p>
    </header>

    <div v-if="loading" class="state">
      Carregando figurinhas...
    </div>
    <div v-else-if="error" class="state state-error">
      {{ error }}
    </div>
    <div v-else-if="!stickers.length" class="state">
      Nenhuma figurinha encontrada.
    </div>
    <div v-else class="grid">
      <StickerCard
        v-for="sticker in stickers"
        :key="sticker.id"
        :sticker="sticker"
        @add-to-cart="onAddToCart"
        :show-add-button="canAdd(sticker)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import StickerCard from './StickerCard.vue'
import { useCartStore } from '@/stores/cart'
import { useApi } from '@/composables/useApi'
import { useToastStore } from '#imports'


type Sticker = {
  id: number
  name: string
  code: string
  team: string
  price: number
  imageUrl: string
  rarity: string
}

type InventoryItem = {
  id: number
  quantity: number
  sticker: Sticker
}

const cart = useCartStore()
const { get } = useApi()
const toast = useToastStore()

const stickers = ref<Sticker[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const ownedByStickerId = ref<Record<number, number>>({})

async function load() {
  loading.value = true
  error.value = null
  try {
    const [stickersRes, inventoryRes] = await Promise.all([
      get<{ data: Sticker[] }>('/v1/stickers', true),
      get<{ balance: number; items: InventoryItem[] }>('/v1/inventory', true),
    ])
    stickers.value = stickersRes.data ?? []

    const map: Record<number, number> = {}
    for (const item of inventoryRes.items ?? []) {
      map[item.sticker.id] = item.quantity
    }
    ownedByStickerId.value = map
  } catch (err: any) {
    console.error(err)
    error.value = 'Erro ao carregar figurinhas.'
  } finally {
    loading.value = false
  }
}

function getMaxByRarity(rarity: string): number {
  switch (rarity) {
    case 'legendary':
      return 1
    case 'rare':
      return 2
    case 'common':
    default:
      return 4
  }
}

function getRarityLabel(rarity: string): string {
  switch (rarity) {
    case 'legendary':
      return 'lendária'
    case 'rare':
      return 'rara'
    default:
      return 'comum'
  }
}

function canAdd(sticker: Sticker): boolean {
  const owned = ownedByStickerId.value[sticker.id] ?? 0
  const inCart =
    cart.items.find((i) => i.id === sticker.id)?.quantity ?? 0

  const total = owned + inCart
  const max = getMaxByRarity(sticker.rarity)

  return total < max
}

function onAddToCart(sticker: Sticker) {
  const owned = ownedByStickerId.value[sticker.id] ?? 0
  const inCart =
    cart.items.find((i) => i.id === sticker.id)?.quantity ?? 0

  const max = getMaxByRarity(sticker.rarity)
  const rarityLabel = getRarityLabel(sticker.rarity)

  const totalAfterAdd = owned + inCart + 1

  if (totalAfterAdd > max) {
    toast.error(
      `Limite atingido para ${sticker.name} (${rarityLabel}). Máximo de ${max} por usuário.`
    )
    return
  }

  cart.add(
    {
      id: sticker.id,
      name: sticker.name,
      code: sticker.code,
      team: sticker.team,
      price: sticker.price,
      imageUrl: sticker.imageUrl ?? null,
    },
    1
  )
}


onMounted(load)
</script>

<style scoped>
.grid-header {
  margin-bottom: 1.5rem;
}

.title {
  margin: 0;
  font-size: 1.6rem;
}

.subtitle {
  margin: 0.35rem 0 0;
  font-size: 0.9rem;
  color: var(--muted);
}

.state {
  padding: 2rem 1rem;
  text-align: center;
  color: var(--muted);
}

.state-error {
  color: #fecaca;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1.1rem;
}
</style>
