# YDUQS - Desafio Front-end 

Bem-vindo ao meu projeto do desafio para a YDUQS! Este projeto foi desenvolvido com foco absoluto em qualidade técnica, performance, e fidelidade visual baseada no Figma. 

Para este projeto com foco front-end mas com parte no back também, estruturei este repositório como um **Monorepo**, contendo tanto a aplicação Front-end quanto uma API Back-end.

---

# Tecnologias Utilizadas

O projeto foi construído utilizando JavaScript/TypeScript:

# Front-end
* *React + Vite*: Para um ambiente de desenvolvimento ultra-rápido e build otimizado.
* *TypeScript*: Tipagem estática garantindo segurança e menos bugs.
* *Material UI (MUI)*: Sistema de design avançado. Utilizei bastante a prop `sx` e o sistema de breakpoints (`xs`, `md`, `lg`) para garantir um layout responsivo em qualquer tela.
* *React Hook Form + Zod*: Para o formulário de matrícula.
* *Lucide React*: Ícones leves e customizáveis.
* *React Testing Library*: Testes com React Testing Library

# Back-end
* *NestJS*: Framework Node.js corporativo com injeção de dependências e arquitetura modular.
* *Prisma ORM*: Modelagem de dados moderna e tipada.
* *Seed Automático*: Script configurado para popular o banco de dados com a oferta inicial do desafio.
* *Docker*: Para o banco de dados


---

# Arquitetura e Boas Práticas (Destaques)

* *Data-Driven UI*: Componentes complexos como o `Footer` gigante não possuem textos soltos no HTML. Os links são consumidos através de arrays mapeados, facilitando manutenção futura.
* *Design Responsivo*: Adaptações como troca de `flex-direction` (column-reverse) no mobile e ajustes de `padding` precisos para Laptops.
* *Formatadores Nativos*: Uso do `Intl.NumberFormat` combinado com `useMemo` para formatação de moeda (BRL) otimizada e livre de gargalos de processamento.

---

# Como Executar o Projeto Localmente

Certifique-se de ter o *Node.js* (v18+) instalado em sua máquina.

# 1. Rodando o Back-end (API)
Abra um terminal na pasta raiz e navegue até o back-end:

cd yduqs-j0-primeira-compra-back-end

# Instale as dependências
npm install

# Rode a migração/seed do banco de dados caso seja necessário
npx prisma db push
npm run seed

# Inicie o servidor
npm run start:dev

A API estará rodando em `http://localhost:3000`.

# 2. Rodando o Front-end (Interface)
Abra outro terminal na pasta raiz e navegue até o front-end:

cd yduqs-j0-primeira-compra-front-end

# Instale as dependências
npm install

# Inicie o ambiente de desenvolvimento
npm run dev

A aplicação abrirá no seu navegador, geralmente em `http://localhost:5173`.

---


Desenvolvido com dedicação por Nicolas Sandoli feitosa.

