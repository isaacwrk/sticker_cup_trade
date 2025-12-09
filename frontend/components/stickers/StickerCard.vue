<script setup lang="ts">
interface Sticker {
  id: number
  code: string
  name: string
  team: string
  rarity: string
  price: number
  imageUrl?: string | null
}

const props = defineProps<{
  sticker: Sticker
  quantity?: number
  showAddButton?: boolean
}>()

const emit = defineEmits<{
  (e: 'add-to-cart', sticker: Sticker): void
}>()

const rarityLabel = computed(() => {
  switch (props.sticker.rarity) {
    case 'legendary':
      return 'Lendária'
    case 'rare':
      return 'Rara'
    default:
      return 'Comum'
  }
})
</script>

<template>
  <div class="card">
    <div class="card-header">
      <span class="code">{{ sticker.code }}</span>
      <span class="rarity" :data-rarity="sticker.rarity">
        {{ rarityLabel }}
      </span>
    </div>

    <div class="card-body">
      <div class="image-placeholder">
        <span v-if="sticker.imageUrl">IMG</span>
        <span v-else>{{ sticker.team }}</span>
      </div>

      <h3 class="name">{{ sticker.name }}</h3>
      <p class="team">{{ sticker.team }}</p>
    </div>

    <div class="card-footer">
      <div class="price">
        R$ {{ Number(sticker.price).toFixed(2) }}
      </div>
    
      <span v-if="quantity !== undefined" class="qty-badge">
        x{{ quantity }}
      </span>
     
      <button
        v-if="showAddButton !== false"
        type="button"
        class="btn-add"
        @click="emit('add-to-cart', sticker)"
      >
        Adicionar
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 0.9rem;
  padding: 0.75rem;
  background: radial-gradient(circle at top left, #020617, #020617);
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.8);
  gap: 0.4rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #9ca3af;
}

.code {
  font-weight: 600;
  color: #e5e7eb;
}

.rarity {
  padding: 0.12rem 0.5rem;
  border-radius: 999px;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.rarity[data-rarity='legendary'] {
  background: linear-gradient(90deg, #fbbf24, #f97316);
  color: #111827;
}

.rarity[data-rarity='rare'] {
  background: rgba(59, 130, 246, 0.2);
  color: #bfdbfe;
}

.rarity[data-rarity='common'] {
  background: rgba(148, 163, 184, 0.2);
  color: #e5e7eb;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.image-placeholder {
  height: 96px;
  border-radius: 0.7rem;
  background: radial-gradient(circle at top, #1f2937, #020617);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #9ca3af;
  margin-bottom: 0.2rem;
}

.name {
  margin: 0;
  font-size: 0.95rem;
  color: #e5e7eb;
}

.team {
  margin: 0;
  font-size: 0.8rem;
  color: #9ca3af;
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.35rem;
}

.price {
  font-weight: 600;
  font-size: 0.9rem;
  color: #fbbf24;
}

/* badge de quantidade (inventário) */
.qty-badge {
  margin-left: auto;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.2);
  color: #bbf7d0;
  font-size: 0.75rem;
}

/* botão adicionar (catálogo) */
.btn-add {
  margin-left: auto;
  border-radius: 999px;
  border: none;
  padding: 0.3rem 0.7rem;
  background: rgba(59, 130, 246, 0.25);
  color: #dbeafe;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.12s ease, transform 0.08s ease;
}

.btn-add:hover {
  background: rgba(59, 130, 246, 0.4);
  transform: translateY(-1px);
}
</style>
