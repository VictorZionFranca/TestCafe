import { Selector } from 'testcafe';

fixture `Fluxo Completo do Usuário`
    .page('http://127.0.0.1:5500/testcafe-app/src/pages/index.html')
    .beforeEach(async t => {
        await t.eval(() => localStorage.clear());
        await t.setNativeDialogHandler(() => true);
    });

test('Fluxo end-to-end: cadastro, login, dashboard, perfil, configurações, contato, logout', async t => {
    // Cadastro
    await t.navigateTo('http://127.0.0.1:5500/testcafe-app/src/pages/register.html');
    await t.wait(800);
    await t.typeText('#nome', 'Usuário E2E');
    await t.wait(800);
    await t.typeText('#email', 'e2e@exemplo.com');
    await t.wait(800);
    await t.typeText('#senha', 'SenhaForte!2024');
    await t.wait(800);
    await t.typeText('#confirmarSenha', 'SenhaForte!2024');
    await t.wait(800);
    await t.click('button[type="submit"]');
    await t.wait(800);
    // Login
    await t.navigateTo('http://127.0.0.1:5500/testcafe-app/src/pages/index.html');
    await t.wait(800);
    await t.typeText('#email', 'e2e@exemplo.com');
    await t.wait(800);
    await t.typeText('#senha', 'SenhaForte!2024');
    await t.wait(800);
    await t.click('button[type="submit"]');
    await t.wait(800);
    await t.expect(Selector('h2').withText('Bem-vindo ao Dashboard').exists).ok();
    await t.wait(800);

    // Dashboard: postar aviso
    await t.typeText('#mensagemMural', 'Aviso do teste E2E!');
    await t.wait(800);
    await t.click('#muralForm button[type="submit"]');
    await t.wait(800);
    await t.expect(Selector('#lista-mensagens li span').withText('Aviso do teste E2E!').exists).ok();
    await t.wait(800);

    // Navegar para perfil e editar dados
    await t.click(Selector('a').withText('Perfil'));
    await t.wait(800);
    await t.expect(Selector('h2').withText('Perfil do Usuário').exists).ok();
    await t.wait(800);
    await t.typeText('#nome', ' Completo', { speed: 0.5 });
    await t.wait(800);
    await t.typeText('#telefone', '11999999999');
    await t.wait(800);
    await t.click('button[type="submit"]');
    await t.wait(800);
    await t.expect(Selector('#nome').value).contains('Completo');
    await t.expect(Selector('#telefone').value).eql('11999999999');
    await t.wait(800);

    // Navegar para configurações e alterar preferências
    await t.click(Selector('a').withText('Configurações'));
    await t.wait(800);
    await t.expect(Selector('h2').withText('Configurações').exists).ok();
    await t.wait(800);
    await t.click('#tema');
    await t.wait(800);
    await t.click(Selector('#tema option').withText('Escuro'));
    await t.wait(800);
    await t.click('#notificacoes');
    await t.wait(800);
    await t.click('button[type="submit"]');
    await t.wait(800);
    await t.expect(Selector('#banner-feedback').innerText).contains('Preferências salvas');
    await t.wait(800);

    // Navegar para contato e enviar mensagem
    await t.click(Selector('a').withText('Contato'));
    await t.wait(800);
    await t.expect(Selector('h2').withText('Contato').exists).ok();
    await t.wait(800);
    await t.typeText('#contato-nome', 'Usuário E2E');
    await t.wait(800);
    await t.typeText('#contato-email', 'e2e@exemplo.com');
    await t.wait(800);
    await t.typeText('#contato-assunto', 'Dúvida');
    await t.wait(800);
    await t.typeText('#contato-mensagem', 'Mensagem de teste E2E!');
    await t.wait(800);
    await t.click('button[type="submit"]');
    await t.wait(800);
    await t.expect(Selector('#banner-feedback').innerText).contains('Mensagem enviada com sucesso');
    await t.wait(800);

    // Logout
    await t.click(Selector('a').withText('Logout'));
    await t.wait(800);
    await t.expect(Selector('h2').withText('Login').exists).ok();
    await t.wait(800);
});

test('Login com e-mail não cadastrado', async t => {
    await t.wait(800);
    await t.typeText('#email', 'naoexiste@exemplo.com');
    await t.wait(800);
    await t.typeText('#senha', 'qualquercoisa');
    await t.wait(800);
    await t.click('button[type="submit"]');
    await t.wait(800);
    await t.expect(Selector('#erro').innerText).eql('E-mail ou senha incorretos.');
});

test('Registro com e-mail inválido', async t => {
    await t.navigateTo('http://127.0.0.1:5500/testcafe-app/src/pages/register.html');
    await t.wait(800);
    await t.typeText('#nome', 'Teste Email Inválido');
    await t.wait(800);
    await t.typeText('#email', 'emailinvalido');
    await t.wait(800);
    await t.typeText('#senha', 'SenhaForte!2024');
    await t.wait(800);
    await t.typeText('#confirmarSenha', 'SenhaForte!2024');
    await t.wait(800);
    await t.click('button[type="submit"]');
    await t.wait(800);
    await t.expect(Selector('#banner-feedback').innerText).contains('E-mail inválido');
});

test('Editar perfil com campos obrigatórios vazios', async t => {
    // Cadastro e login
    await t.navigateTo('http://127.0.0.1:5500/testcafe-app/src/pages/register.html');
    await t.wait(800);
    await t.typeText('#nome', 'Teste Vazio');
    await t.wait(800);
    await t.typeText('#email', 'vazio@exemplo.com');
    await t.wait(800);
    await t.typeText('#senha', 'SenhaForte!2024');
    await t.wait(800);
    await t.typeText('#confirmarSenha', 'SenhaForte!2024');
    await t.wait(800);
    await t.click('button[type="submit"]');
    await t.wait(800);
    await t.navigateTo('http://127.0.0.1:5500/testcafe-app/src/pages/index.html');
    await t.wait(800);
    await t.typeText('#email', 'vazio@exemplo.com');
    await t.wait(800);
    await t.typeText('#senha', 'SenhaForte!2024');
    await t.wait(800);
    await t.click('button[type="submit"]');
    await t.wait(800);
    await t.click(Selector('a').withText('Perfil'));
    await t.wait(800);
    await t.selectText('#nome').pressKey('delete');
    await t.wait(800);
    await t.click('button[type="submit"]');
    await t.wait(800);
    await t.expect(Selector('#banner-feedback').innerText).contains('Preencha todos os campos obrigatórios');
});

test('Contato com e-mail inválido', async t => {
    await t.navigateTo('http://127.0.0.1:5500/testcafe-app/src/pages/contact.html');
    await t.wait(800);
    await t.typeText('#contato-nome', 'Teste Contato');
    await t.wait(800);
    await t.typeText('#contato-email', 'emailinvalido');
    await t.wait(800);
    await t.typeText('#contato-assunto', 'Teste');
    await t.wait(800);
    await t.typeText('#contato-mensagem', 'Mensagem teste');
    await t.wait(800);
    await t.click('button[type="submit"]');
    await t.wait(800);
    await t.expect(Selector('#banner-feedback').innerText).contains('E-mail inválido');
});

test('Acesso ao dashboard sem login redireciona para login', async t => {
    await t.wait(800);
    await t.navigateTo('http://127.0.0.1:5500/testcafe-app/src/pages/dashboard.html');
    await t.wait(800);
    // Verifica se está na tela de login
    await t.expect(Selector('h2').withText('Login').exists).ok();
    // Verifica se a URL realmente é a de login
    await t.expect(await t.eval(() => window.location.pathname)).contains('index.html');
    // Garante que não existe nenhum elemento do dashboard
    await t.expect(Selector('h2').withText('Bem-vindo ao Dashboard').exists).notOk();
    // Garante que não há usuário logado no localStorage
    await t.expect(await t.eval(() => localStorage.getItem('usuarioLogado'))).eql(null);
}); 