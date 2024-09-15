# ObservaTudo - Frontend

Este repositório contém o código do frontend do [ObservaTudo](https://github.com/JJDSNT/java_backend), uma aplicação que monitora indicadores através de painéis interativos.

## Tecnologias Utilizadas

- **Nuxt.js**: Framework de desenvolvimento para Vue.js com SSR (Server-Side Rendering) e rotas automáticas, proporcionando uma experiência fluida no desenvolvimento de aplicativos de uma página (SPA) ou renderizados no servidor.
- **Pinia**: Sistema de gerenciamento de estado para Vue.js, oferecendo uma alternativa simples e moderna ao Vuex, com suporte a TypeScript e integração nativa com Vue 3, possibilitando a centralização e o compartilhamento de estados entre componentes.
- **DaisyUI**: Uma biblioteca de componentes para Tailwind CSS que simplifica a criação de interfaces de usuário com componentes pré-estilizados, facilitando a construção de UIs consistentes e personalizáveis.


## SonarQube

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=JJDSNT_nuxt_frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=JJDSNT_nuxt_frontend)
&nbsp;
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=JJDSNT_nuxt_frontend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=JJDSNT_nuxt_frontend)
&nbsp;
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=JJDSNT_nuxt_frontend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=JJDSNT_nuxt_frontend)
&nbsp;
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=JJDSNT_nuxt_frontend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=JJDSNT_nuxt_frontend)
&nbsp;
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=JJDSNT_nuxt_frontend&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=JJDSNT_nuxt_frontend)
&nbsp;
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=JJDSNT_nuxt_frontend&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=JJDSNT_nuxt_frontend)
&nbsp;
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=JJDSNT_nuxt_frontend&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=JJDSNT_nuxt_frontend)
&nbsp;
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=JJDSNT_nuxt_frontend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=JJDSNT_nuxt_frontend)
&nbsp;
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=JJDSNT_nuxt_frontend&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=JJDSNT_nuxt_frontend)
&nbsp;
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=JJDSNT_nuxt_frontend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=JJDSNT_nuxt_frontend)
&nbsp;
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=JJDSNT_nuxt_frontend&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=JJDSNT_nuxt_frontend)

## Estrutura do Projeto

- `components/`: Componentes Vue que compõem as interfaces do usuário.
- `pages/`: Páginas que definem as rotas da aplicação.
- `plugins/`: Plugins que registram bibliotecas e funcionalidades globais e configuram aspectos reutilizáveis em toda a aplicação. 
- `store/`: Gerenciamento de estado global com Pinia.
- `assets/`: Arquivos estáticos como imagens e arquivos de estilo.
- `layouts/`: Layouts da aplicação.
- `middleware/`: Middlewares de autenticação e proteção de rotas.
- `public/` : Arquivos estáticos que não precisam de processamento, servidos diretamente no servidor.
- `composables/` : Funções reutilizáveis baseadas nos Composition API do Vue, que ajudam a compartilhar lógica entre os componentes.
- `nuxt.config.ts`: Arquivo de configuração principal do Nuxt, onde você define configurações globais, plugins, middlewares e outras opções específicas da aplicação.

## Instalação

### Requisitos

- [Node.js](https://nodejs.org/) (versão 14+)
- [npm](https://www.npmjs.com/)

### Passo a Passo

1. Clone o repositório:

```bash
git clone https://github.com/JJDSNT/nuxt_frontend.git
```
&&
```bash
cd nuxt_frontend
```
2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo .env com as seguintes variáveis de ambiente:

```bash
API_BASE_URL=http://localhost:8080/api
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em http://localhost:3000.


## Estrutura das Páginas
/ :Painel principal com a visão geral dos indicadores.

/pesquisa :Página para pesquisar indicadores por eixo, fonte ou nome.

## Estilização

Este projeto usa Tailwind CSS para estilização.

Caso queira personalizar o design, você pode ajustar o arquivo tailwind.config.js e os estilos no diretório assets/css.

## Contribuições
Faça um fork do repositório.

Crie uma branch com sua feature ou correção de bug:
```bash
 git checkout -b minha-feature.
```
Faça o commit das suas mudanças:
```bash
git commit -m 'Adiciona nova feature'.
```
Envie para a branch principal:
```bash
git push origin minha-feature.
```
Abra um pull request.

## Licença
Este projeto está licenciado sob os termos da licença MIT.

Consulte o arquivo LICENSE para mais informações.
