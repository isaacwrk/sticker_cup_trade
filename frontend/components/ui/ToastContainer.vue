<script setup lang="ts">
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()
</script>

<template>
  <div class="toast-wrapper">
    <TransitionGroup name="toast" tag="div">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="toast"
        :data-type="toast.type"
      >
        <span class="toast-message">{{ toast.message }}</span>
        <button class="toast-close" @click="toastStore.remove(toast.id)">×</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-wrapper {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* animação */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(12px);
}

.toast {
  min-width: 220px;
  max-width: 320px;
  padding: 0.6rem 0.75rem;
  border-radius: 0.6rem;
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: rgba(15, 23, 42, 0.95);
  color: #e5e7eb;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.85);
}

.toast[data-type='success'] {
  border-color: rgba(34, 197, 94, 0.7);
}
.toast[data-type='error'] {
  border-color: rgba(248, 113, 113, 0.9);
}
.toast[data-type='info'] {
  border-color: rgba(59, 130, 246, 0.7);
}

.toast-message {
  flex: 1;
}

.toast-close {
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  font-size: 1rem;
  padding: 0 0.15rem;
}
</style>
