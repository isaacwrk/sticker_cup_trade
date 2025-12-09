<template>
  <footer class="footer">
    <p>Sticker Trade &copy; {{ year }} · Projeto de teste técnico</p>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  padding: 1.25rem;
  text-align: center;
  font-size: 0.85rem;
  color: var(--muted);
  border-top: 1px solid rgba(148,163,184,0.3);
  background: radial-gradient(circle at top left, #0f172a, #020617);
}
</style>
