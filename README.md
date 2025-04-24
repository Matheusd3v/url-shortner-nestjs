# 🚀 URL Shortener API

API REST para encurtamento de URLs com autenticação de usuários, redirecionamento com contagem de cliques, CRUD completo de URLs, validações e testes de integração. Projeto desenvolvido como parte de um teste técnico.

---

## ✨ Features

- 🔐 Autenticação com JWT
- 🔗 Encurtamento de URL com e sem login
- 👤 Cadastro e login de usuários
- 🔁 Redirecionamento com contagem de cliques
- 📝 Listagem, edição e exclusão lógica de URLs do usuário
- 🧪 Testes de integração automatizados
- 📦 Docker + Docker Compose
- 🛂 Validações de entrada
- 📃 Documentação Swagger
- 🧱 Git tags por release
- ✅ CI com GitHub Actions
- ⚙️ Pre-commit / pre-push hooks com lint e format
- 🧾 Soft delete com `deletedAt`

---

## 📚 Documentação da API

> Acesse: [http://localhost:3000/api/doc](http://localhost:3000/api/doc)

---

## 🛠️ Tecnologias

- Node.js
- NestJS
- Prisma (PostgreSQL)
- Swagger
- Docker + Docker Compose
- Jest + Supertest
- Lefthook + commit linter
- GitHub Actions

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos

- Node.js (v22.14)
- Docker + Docker Compose
- Npm
- Nvm
- Arquivo `.env` criado com base no `.env.example`

### Ambiente com Docker (Recomendado)

```bash
docker-compose up --build
```

Após o warm-up, a API estará disponível na porta `3000` e o banco na `5432`.

---

### Ambiente local

Use a mesma versão node do projeto
```bash
nvm use
```

Instale as dependencias
```bash
npm ci
```

Atualize o prisma
```bash
npm run prisma:generate
```

Execute o projeto
```bash
npm run start
```

---

## 🧪 Rodando os testes

```bash
npm run test:e2e
```

> ⚠️ Para executar os testes de integração:
> - O `docker-compose` precisa estar rodando
> - O comando precisa ser executado localmente (fora do container)

Os testes foram configurados para que:
- A cada suíte de testes, um banco com nome único é criado
- As migrations são aplicadas
- Os testes rodam de forma totalmente isolada
- O banco é excluído ao final

---

## 📦 Releases (Git Tags)

- `v0.1.0` – Criação do encurtador sem autenticação com contagem de cliques
- `v0.2.0` – Cadastro de usuários, autenticação e CRUD de URLs

---

## 📈 Escalabilidade e desafios

Caso o sistema precise escalar horizontalmente, os principais desafios serão:

- Processar contagem de cliques via eventos assíncronos
- Utilizar cache (ex: Redis) na rota de redirecionamento
- Utilizar filas para desacoplar a contagem de acessos
- Tornar o sistema multi-tenant por separação de domínios

---

## 🧠 Pontos de melhoria futuros

- Adicionar cache com Redis
- Rastreabilidade (OpenTelemetry)
- Deploy com Terraform + Kubernetes

---

## 🙋‍♂️ Autor

[LinkedIn - Matheus Gomes](https://www.linkedin.com/in/matheus-gomes-de-almeida96/)