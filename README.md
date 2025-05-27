# ��️ MuJope E-commerce API

Uma API RESTful robusta e moderna para sistemas de e-commerce, desenvolvida com as mais recentes tecnologias do mercado.

## 📋 Sobre o Projeto

A MuJope E-commerce API é um backend completo que fornece todos os endpoints necessários para construir uma plataforma de e-commerce. Desenvolvida com foco em performance, segurança e escalabilidade, esta API oferece uma base sólida para integração com qualquer frontend.

## 🚀 Tecnologias Utilizadas

- **TypeScript** - Linguagem de programação tipada
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web para APIs REST
- **Zod** - Validação de dados e schemas
- **NodeMailer** - Serviço de envio de e-mails
- **Prisma ORM** - ORM moderno para banco de dados
- **PostgreSQL** - Banco de dados relacional

## 🛠️ Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL
- Yarn/NPM/PNPM

## 🔧 Instalação

1. Clone o repositório
```bash
git clone https://github.com/juelsonjunior/mujope-ecommerce.git
```

2. Instale as dependências
```bash
# Usando Yarn
yarn install

# Usando NPM
npm install

# Usando PNPM
pnpm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

4. Execute as migrações do banco de dados
```bash
yarn prisma migrate dev
```

## 🚀 Executando o Projeto

```bash
# Usando Yarn
yarn dev

# Usando NPM
npm run dev

# Usando PNPM
pnpm run dev
```

A API estará rodando em `http://localhost:3000`

## 📦 Endpoints da API

### Autenticação
- [ ] POST /auth/register - Registro de usuários
- [ ] POST /auth/login - Login de usuários
- [ ] POST /auth/refresh-token - Renovação de token

### Produtos
- [ ] GET /products - Listar produtos
- [ ] GET /products/:id - Detalhes do produto
- [ ] POST /products - Criar produto (admin)
- [ ] PUT /products/:id - Atualizar produto (admin)
- [ ] DELETE /products/:id - Remover produto (admin)

### Pedidos
- [ ] POST /orders - Criar pedido
- [ ] GET /orders - Listar pedidos do usuário
- [ ] GET /orders/:id - Detalhes do pedido
- [ ] PUT /orders/:id/status - Atualizar status (admin)

### Carrinho
- [ ] GET /cart - Obter carrinho atual
- [ ] POST /cart/items - Adicionar item ao carrinho
- [ ] PUT /cart/items/:id - Atualizar quantidade
- [ ] DELETE /cart/items/:id - Remover item

## 📊 Status do Projeto

**Versão Atual:** 1.0.0
**Estado:** Em desenvolvimento
**Repositório:** Público

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Contato

Juelson Junior - [@juelsonjunior](https://github.com/juelsonjunior)

Link do Projeto: [https://github.com/juelsonjunior/mujope-ecommerce](https://github.com/juelsonjunior/mujope-ecommerce)
