# Sistema de Cadastro, Login e Dashboard com TestCafe

Este projeto é um sistema web, com páginas de login, registro, dashboard, perfil, configurações, contato e testes automatizados usando TestCafe.

# **O que é TestCafe?**

> TestCafe é uma ferramenta open source para automação de testes end-to-end (E2E) em aplicações web. Com ela, é possível simular interações reais do usuário (como cliques, preenchimento de formulários, navegação entre páginas, etc.) em diferentes navegadores, garantindo que o sistema funcione corretamente do ponto de vista do usuário final. O TestCafe é fácil de configurar, não depende de WebDriver, suporta múltiplos browsers (incluindo headless) e permite escrever testes em JavaScript ou TypeScript de forma simples e robusta. 

## Funcionalidades
- Cadastro e login de usuários (com validação e feedback visual)
- Dashboard protegido (mural de avisos por usuário)
- Edição de perfil (com upload de foto, telefone, data de nascimento)
- Página de configurações (tema claro/escuro, notificações)
- Página de contato (formulário de mensagem)
- Modo escuro real para todo o sistema
- Banners de feedback para sucesso e erro
- Navegação moderna e responsiva
- Teste automatizado único cobrindo todo o fluxo do usuário

## Testes Realizados
1. Fluxo end-to-end: cadastro, login, dashboard, perfil, configurações, contato, logout
2. Login com e-mail não cadastrado
3. Registro com e-mail inválido
4. Editar perfil com campos obrigatórios vazios
5. Contato com e-mail inválido
6. Acesso ao dashboard sem login redireciona para login

---

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
npx testcafe chrome src/tests/
```

---

## Como rodar o projeto

1. **Clone o repositório e abra a pasta**
2. **Abra o diretório `testcafe-app` em seu editor**
3. **Abra o arquivo `index.html` com Live Server, VSCode Live Preview, ou outro servidor local**
   - O endereço padrão será algo como: `http://127.0.0.1:5500/testcafe-app/src/pages/index.html`

---

## Como funciona o fluxo do sistema

1. **Cadastro:**
   - Acesse "Registrar" na tela de login.
   - Preencha nome, e-mail e senha.
   - O sistema valida o e-mail e mostra um banner de sucesso ou erro.
   - Após cadastro, redireciona para o login.

2. **Login:**
   - Informe e-mail e senha cadastrados.
   - Se correto, vai para o dashboard.
   - Se errado, mostra banner de erro.

3. **Dashboard:**
   - Exibe mural de avisos do usuário logado.
   - Permite postar e deletar avisos.
   - Navegação para perfil, configurações, contato e logout.

4. **Perfil:**
   - Exibe e permite editar nome, e-mail, telefone, data de nascimento e foto.
   - Valida campos obrigatórios e e-mail duplicado.
   - Mostra banner de sucesso ou erro.

5. **Configurações:**
   - Permite escolher tema claro/escuro e ativar notificações.
   - Preferência de tema é salva e aplicada em todas as páginas.

6. **Contato:**
   - Formulário para enviar mensagem.
   - Valida e-mail e campos obrigatórios.
   - Mostra banner de sucesso ou erro.

7. **Logout:**
   - Limpa o login e retorna para a tela de login.

---

## Modo Escuro
- O tema escuro pode ser ativado nas configurações.
- A escolha é salva no navegador e aplicada automaticamente em todas as páginas.
- O visual muda para tons escuros e azulados, com contraste otimizado.

---

## Banners de Feedback
- Mensagens de sucesso e erro aparecem no topo da tela (ex: registro realizado, e-mail inválido, campos obrigatórios).
- Todos os formulários usam banners para feedback ao usuário e para facilitar testes automatizados.

---

## Teste Automatizado End-to-End

O arquivo `src/tests/all-flows.test.js` cobre todo o fluxo do usuário, incluindo cenários extras de erro.

### Como rodar o teste:

1. **Certifique-se de que o servidor local está rodando** (ex: Live Server)
2. **No terminal, execute:**
   ```bash
   npx testcafe chrome src/tests/all-flows.test.js
   ```
   Ou para rodar em modo headless:
   ```bash
   npx testcafe chrome:headless src/tests/all-flows.test.js
   ```

- O teste executa cadastro, login, dashboard, perfil, configurações, contato, logout e vários cenários de erro.
- Há uma espera de 800ms entre cada ação para facilitar a visualização.

---

## Dicas para manutenção
- Toda a validação é feita via JavaScript, sem required ou type="email" nos inputs.
- O tema escuro é salvo no localStorage e aplicado em todas as páginas.
- Para adicionar mais testes, basta criar novos arquivos em `src/tests/` ou adicionar cenários ao `all-flows.test.js`.
- Para alterar o tempo de espera dos testes, edite os valores de `t.wait(800)`.

---

## Contato
Se tiver dúvidas ou quiser sugerir melhorias, fique à vontade para abrir uma issue ou contribuir!
