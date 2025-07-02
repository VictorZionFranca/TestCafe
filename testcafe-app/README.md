# TestCafe App

Este projeto é uma aplicação web simples que utiliza TestCafe para realizar testes automatizados. A aplicação consiste em um sistema de login, registro de usuários, visualização e edição de perfil, e um painel de controle.

## Estrutura do Projeto

```
testcafe-app
├── src
│   ├── pages
│   │   ├── dashboard.html         # Página do painel de controle
│   │   ├── index.html             # Página de login
│   │   ├── profile.html           # Página de perfil do usuário
│   │   ├── register.html          # Página de registro de novos usuários
│   │   ├── scripts.js              # Lógica de interação das páginas
│   │   ├── style.css               # Estilos CSS para as páginas
│   │   └── success.html            # Página exibida após login bem-sucedido
│   └── tests
│       ├── dashboard.test.js       # Testes para a página do painel de controle
│       ├── login.test.js           # Testes para a página de login
│       ├── profile.test.js         # Testes para a página de perfil
│       └── register.test.js        # Testes para a página de registro
├── package.json                    # Configuração do npm
├── README.md                       # Documentação do projeto
└── testcafe.config.js             # Configurações do TestCafe
```

## Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até o diretório do projeto:
   ```
   cd testcafe-app
   ```

3. Instale as dependências:
   ```
   npm install
   ```

## Uso

Para executar os testes automatizados, utilize o seguinte comando:
```
npx testcafe chrome src/tests/*.test.js
```

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Crie um fork do repositório, faça suas alterações e envie um pull request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.