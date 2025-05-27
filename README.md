# 🛍️ MuJope E-commerce

Um sistema de e-commerce moderno e robusto desenvolvido com as mais recentes tecnologias do mercado.

## 📋 Sobre o Projeto

O MuJope E-commerce é uma plataforma completa de vendas online que oferece uma experiência de compra segura e intuitiva para os usuários. O sistema foi desenvolvido com foco em performance, segurança e escalabilidade.

## 🚀 Tecnologias Utilizadas

- **TypeScript** - Linguagem de programação tipada
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Zod** - Validação de dados
- **NodeMailer** - Envio de e-mails
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

O servidor estará rodando em `http://localhost:3000`

## 📦 Funcionalidades

- [ ] Autenticação de usuários
- [ ] Catálogo de produtos
- [ ] Carrinho de compras
- [ ] Sistema de pagamentos
- [ ] Área do administrador
- [ ] Gestão de pedidos
- [ ] Relatórios de vendas

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

Seu Nome - [@seu_twitter](https://twitter.com/seu_twitter) - email@exemplo.com

Link do Projeto: [https://github.com/seu-usuario/mujope-ecommerce](https://github.com/seu-usuario/mujope-ecommerce)
