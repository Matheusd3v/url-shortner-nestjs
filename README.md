# 🚀 URL Shortener API

API REST para encurtamento de URLs com autenticação de usuários, redirecionamento com contagem de cliques, CRUD completo de URLs, validações e testes de integração. Projeto desenvolvido como parte de um teste técnico.

---

## ✨ Features

- 🔐 Autenticação com JWT
- 🔗 Encurtamento de URL com e sem login
- 🔡 Geração de códigos curtos com até 6 caracteres
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
- 🔭 Observabilidade com OpenTelemetry + Honeycomb (desabilitável por env)
- 🧠 API aderente ao nível 2 da maturidade REST

---

## 📚 Documentação da API

> Acesse: [http://localhost:3000/api/doc](http://localhost:3000/api/doc)

---

## 🛠️ Tecnologias

- Node.js (v22.14)
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

- Node.js (v22.14) — ⚠️ Outras versões podem causar incompatibilidades
- Docker + Docker Compose
- Npm
- Nvm
- Arquivo `.env` criado com base no `.env.example`

### Ambiente com Docker (Recomendado)

```bash
docker-compose up --build
```

A API estará disponível na porta `3000` e o banco na `5432`.

---

### Ambiente local (sem Docker)

Use a versão correta do Node:
```bash
nvm use
```

Instale as dependências:
```bash
npm ci
```

Atualize o Prisma:
```bash
npm run prisma:generate
```

Execute o projeto:
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
> - O comando deve ser executado localmente (fora do container)

Cada suíte de testes:
- Cria um banco de dados único
- Executa as migrations
- Roda os testes de forma isolada
- Remove o banco após a execução

---

## 🔭 Observabilidade
![Alt Opentelemetry logo](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5L3WOqREqLtH-tSyMV-AgtjpvPqxqN7MHKQ&s)

A aplicação está integrada com [OpenTelemetry](https://opentelemetry.io/) para rastreamento de requisições (traces), com visualização via [Honeycomb](https://www.honeycomb.io/).

### Configuração

Adicione no `.env`:

```env
OTEL_SERVICE_NAME=url-shortener-api
OTEL_EXPORTER_OTLP_ENDPOINT=https://api.honeycomb.io
OTEL_EXPORTER_OTLP_HEADERS=x-honeycomb-team=SEU_TOKEN,x-honeycomb-dataset=nome-do-dataset
```

A observabilidade será **desativada automaticamente** se as variáveis de ambiente não estiverem presentes.

---

## 📦 Releases (Git Tags)

- `v0.1.0` – Criação do encurtador sem autenticação com contagem de cliques
- `v0.2.0` – Cadastro de usuários, autenticação e CRUD de URLs
- `v0.3.0` – Observabilidade com OpenTelemetry e integração com Honeycomb
- `v0.4.0` – Correção de login e estrutura para uso com Kubernetes

---

## 🐋 Kubernetes

Na pasta `k8s`, foram incluídos arquivos para deploy do projeto com Kubernetes.

- `start.sh`: Inicializa o projeto em ambiente local com Minikube ou Kind
- `delete.sh`: Remove toda a estrutura criada
- Inclui deployment da aplicação e statefulset para o PostgreSQL

---

## 📈 Escalabilidade e desafios

Para escalar horizontalmente, os principais desafios incluem:

- Processar contagem de cliques via eventos assíncronos
- Usar cache (ex: Redis) na rota de redirecionamento
- Utilizar filas para desacoplar a contagem de acessos
- Tornar o sistema multi-tenant por separação de domínios

---

## 🧠 Pontos de melhoria futuros

- Adicionar cache com Redis
- Deploy com Terraform + Kubernetes

---

## 🙋‍♂️ Autor

[LinkedIn - Matheus Gomes](https://www.linkedin.com/in/matheus-gomes-de-almeida96/)