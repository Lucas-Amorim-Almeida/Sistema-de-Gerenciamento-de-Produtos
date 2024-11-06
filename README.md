# API SGP-Sistema de Gerenciamento de Pedidos

## Descrição

A API SGP é uma solução desenvolvida para facilitar o gerenciamento de pedidos de forma simpificada. A API SGP fornece uma forma para gerenciar pedidos através de um CRUD. Ela oferece funcionalidades simplificadas para controle de usuários como um CRUD baseado em nome de usuário e senha, além de contar com um sistema simples de autenticação de usuários utilizando JWT. A API também fornece, de forma bastante simples, funcionalidades relacionadas a minipulação de produtos, isso é, a aplicação disponibiliza um CRUD para a manipulação de Produtos.

---

## Instalação

Antes de começar, certifique-se de ter o Node.js e o npm instalados em sua máquina.

**1. Clone o Repositório:**
`git clone `

**2. Navegue até o Diretório do Projeto:**
`cd `

**3. Instale as Dependências:**
`npm install`

**4. Prepare o Husky**
`npm run rusky:prepare`

**5. Gerar os schemas do Prisma**
`npx prisma generate`

**5. Gerar as Migrations**
`npx prisma migrate`

---

## Scripts Disponíveis

**- Compilação do Código:**
`npm run build`

**- Iniciar a Aplicação:**
`npm start`

**- Modo de Desenvolvimento:**
`npm run dev`

**- Execução de Testes:**
`npm test`

**- Testes em Modo de Observação:**
`npm run test:watch`

**- Execução de Testes Relacionados a Alterações em Andamento:**
`npm run test:staged`

---

## Contribuição

1. Faça o fork do projeto [Fork](https://github.com/Lucas-Amorim-Almeida/Sistema-de-Gerenciamento-de-Produtos/fork)
2. Crie uma branch para sua modificação (git checkout -b feature/nova-feature)
3. Faça o commit das suas alterações (git commit -am 'Adicionando nova feature')
4. Faça o push para a branch (git push origin feature/nova-feature)
5. Crie um novo Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

© 2024 API SGP. Desenvolvido por [Lucas Amorim Almeida](https://github.com/Lucas-Amorim-Almeida)
