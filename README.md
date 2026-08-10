---
# 🛒 Megashop Variedades — E-commerce React

Uma aplicação web moderna e responsiva de e-commerce (SPA) desenvolvida para simular um ecossistema completo de marketplace.

---
## 🚀 Tecnologias Utilizadas

*  **React.js** (com Vite)

*  **React Router DOM** (Navegação SPA)

*  **Context API** (Gerenciamento de Estado Global)

*  **Bootstrap 5 & CSS Customizado** (Layout e Responsividade)

*  **DummyJSON API** (Consumo de dados de produtos em tempo real)

*  **LocalStorage** (Persistência do carrinho de compras e dados)
---
## ✨ Funcionalidades

* 🛍️ **Catálogo de Produtos:** Exibição dinâmica por categorias consumidas via API REST.

* 🔍 **Busca em Tempo Real:** Filtragem instantânea de produtos no catálogo.

* 🛒 **Carrinho de Compras Interativo:** Drawer/gaveta lateral com controle de quantidade, cálculo de total e persistência de dados.

* 🔐 **Autenticação & Formulários:** Telas de Login, Cadastro e Solicitação com validação de dados e feedback visual em tempo real.

* 📱 **Layout Totalmente Responsivo:** Adaptado para dispositivos Mobile, Tablet e Desktop.

---
## 🛠️ Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação localmente em sua máquina:

### 1. Clonar o repositório

    git  clone

### 2. Acessar a pasta do projeto

    cd  Projeto_React_Megashop_Variedades

### 3. Instalar as dependências
> ⚠️ Nota importante: A pasta node_modules não é enviada para o GitHub
> (está no .gitignore). Por isso, execute o comando abaixo para baixar e
> instalar todas as dependências necessárias do  projeto:

    npm  install

### 4. Iniciar o servidor de desenvolvimento

    npm  run  dev

> Após o comando, acesse o link gerado no seu terminal (geralmente
> http://localhost:5173) para visualizar o projeto rodando no seu
> navegador.

---
## 📂 Estrutura do Projeto
```text
src/
├── api/ # Configurações e chamadas à API RESTful
├── components/ # Componentes reutilizáveis (Header, Footer, ErrosForm)
├── contexto/ # Context API para gerenciamento de estado global
├── pages/ # Páginas da aplicação (Home, Produtos, Carrinho, Usuario, Solicitacao)
├── App.jsx # Definição de rotas da aplicação
└── main.jsx # Ponto de entrada do React```
Desenvolvido por Cássio Gabriel 🚀