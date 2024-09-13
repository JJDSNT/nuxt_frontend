# ObservaTudo - Frontend

Este repositório contém o código do frontend do ObservaTudo, uma aplicação que monitora indicadores através de painéis interativos. O frontend é desenvolvido em [Nuxt.js](https://nuxtjs.org/) e utiliza o [Tailwind CSS](https://tailwindcss.com/) para estilização. O código é analisado por [SonarQube](https://www.sonarqube.org/) para garantir a qualidade e padrões de código.

## Tecnologias Utilizadas

- **Nuxt.js**: Framework de desenvolvimento para Vue.js com SSR (Server-Side Rendering) e rotas automáticas.
- **Tailwind CSS**: Um framework CSS para estilização rápida e eficiente.
- **Axios**: Biblioteca para requisições HTTP.
- **SonarQube**: Ferramenta para análise estática de código, medindo a qualidade do código, cobertura de testes, segurança e mais.

## Estrutura do Projeto

- `components/`: Componentes Vue que compõem as interfaces do usuário.
- `pages/`: Páginas que definem as rotas da aplicação.
- `plugins/axios.js`: Configuração do plugin Axios para chamadas HTTP.
- `store/`: Gerenciamento de estado global com Vuex.
- `assets/`: Arquivos estáticos como imagens e arquivos de estilo.
- `layouts/`: Layouts da aplicação.
- `middleware/`: Middlewares de autenticação e proteção de rotas.

## Instalação

### Requisitos

- [Node.js](https://nodejs.org/) (versão 14+)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passo a Passo

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/observatudo-frontend.git
   cd observatudo-frontend
```

2. Instale as dependências:

```bash
npm install
```
ou
```bash
yarn install
```

Crie um arquivo .env com as seguintes variáveis de ambiente:

```bash
API_BASE_URL=http://localhost:8080/api
```

Inicie o servidor de desenvolvimento:


```bash
npm run dev
```

ou

```bash
yarn dev
```

O frontend estará disponível em http://localhost:3000.



Estrutura das Páginas
/dashboard: Painel principal com a visão geral dos indicadores.
/pesquisa: Página para pesquisar indicadores por eixo, fonte ou nome.
Estilização
Este projeto usa Tailwind CSS para estilização. Caso queira personalizar o design, você pode ajustar o arquivo tailwind.config.js e os estilos no diretório assets/css.

Contribuições
Faça um fork do repositório.
Crie uma branch com sua feature ou correção de bug: git checkout -b minha-feature.
Faça o commit das suas mudanças: git commit -m 'Adiciona nova feature'.
Envie para a branch principal: git push origin minha-feature.
Abra um pull request.
Licença
Este projeto está licenciado sob os termos da licença MIT. Consulte o arquivo LICENSE para mais informações.
