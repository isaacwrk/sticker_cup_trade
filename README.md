# Sticker Trade – E-commerce de Figurinhas da Copa

Aplicação **fullstack** para compra, venda e gerenciamento de figurinhas da Copa do Mundo.

- **Back-end:** AdonisJS (Node.js) + SQLite  
- **Front-end:** Nuxt 3 + TypeScript + Pinia  
- **Autenticação:** Token de acesso (Bearer)  
- **Regras de negócio:**  
  - Saldo inicial por usuário  
  - Limite de quantidade por raridade  
  - Inventário próprio por usuário  
  - Venda de figurinhas com crédito em saldo  
  - Carrinho persistido em `localStorage`

---

## Sumário

- [Arquitetura Geral](#arquitetura-geral)
- [Stack Técnica](#stack-técnica)
- [Back-end (AdonisJS)](#back-end-adonisjs)
  - [Modelos / Entidades](#modelos--entidades)
  - [Regras de Negócio no Back-end](#regras-de-negócio-no-back-end)
  - [Rotas Principais da API](#rotas-principais-da-api)
- [Front-end (Nuxt 3)](#front-end-nuxt-3)
  - [Fluxos Principais](#fluxos-principais)
  - [Gerenciamento de Estado](#gerenciamento-de-estado)
  - [Proteção de Rotas](#proteção-de-rotas)
- [Como Rodar Localmente](#como-rodar-localmente)
  - [Pré-requisitos](#pré-requisitos)
  - [Back-end](#back-end)
  - [Front-end](#front-end)
- [Banco de Dados / SQLite](#banco-de-dados--sqlite)
- [Deploy (Sugestão)](#deploy-sugestão)
- [Possíveis Melhorias Futuras](#possíveis-melhorias-futuras)

---

## Arquitetura Geral

Monorepo com front e back separados:

```bash
sticker-trade/
  backend/
    sticker-trade-api/     # API REST em AdonisJS
  frontend/
    sticker-trade-frontend/ # Nuxt 3 (SPA/SSR) com Pinia
  README.md
