<template>
  <section class="auth">
    <h1>Criar conta</h1>

    <form class="form" @submit.prevent="onSubmit">
      <label class="field">
        <span>Nome</span>
        <input v-model="name" required />
      </label>

      <label class="field">
        <span>E-mail</span>
        <input v-model="email" type="email" required />
      </label>

      <label class="field">
        <span>Senha</span>
        <input v-model="password" type="password" required />
      </label>

      <p v-if="error" class="error">{{ error }}</p>

      <button class="btn" type="submit" :disabled="loading">
        {{ loading ? 'Criando...' : 'Criar conta' }}
      </button>
    </form>

    <p class="hint">
      Já tem conta?
      <NuxtLink to="/login">Entrar</NuxtLink>
    </p>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useApi } from '@/composables/useApi'

const auth = useAuthStore()
const { post } = useApi()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

async function onSubmit() {
  error.value = null
  loading.value = true
  try {
    const res = await post<{ user: any; token: string }>('/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value
    })
    auth.setAuth(res.user, res.token)
    router.push('/')
  } catch (err: any) {
    console.error(err)
    error.value = 'Erro ao criar conta.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth {
  max-width: 380px;
  margin: 2.5rem auto 0;
  padding: 1.75rem 1.5rem 2rem;
  border-radius: 1rem;
  background: radial-gradient(circle at top left, #111827, #020617);
  border: 1px solid rgba(148,163,184,0.3);
  box-shadow: 0 15px 35px rgba(15,23,42,0.85);
}

h1 {
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.9rem;
}

input {
  border-radius: 0.5rem;
  border: 1px solid rgba(148,163,184,0.7);
  padding: 0.45rem 0.65rem;
  background: rgba(15,23,42,0.85);
  color: var(--text);
}

input:focus {
  outline: none;
  border-color: var(--accent);
}

.error {
  margin: 0.5rem 0 0;
  font-size: 0.85rem;
  color: #fecaca;
}

.btn {
  margin-top: 0.75rem;
  width: 100%;
  border-radius: 999px;
  border: none;
  padding: 0.5rem 0.75rem;
  background: var(--primary);
  color: #e5e7eb;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.12s ease;
}

.btn:hover:enabled {
  background: var(--primary-dark);
}

.hint {
  margin-top: 0.85rem;
  font-size: 0.85rem;
  text-align: center;
  color: var(--muted);
}

.hint a {
  color: var(--accent);
}
</style>

