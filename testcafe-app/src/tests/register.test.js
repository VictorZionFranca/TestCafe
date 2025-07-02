import { Selector } from 'testcafe';

fixture `Registro de Usuário`
    .page `http://127.0.0.1:5500/testcafe-app/src/pages/register.html`;

test('Registro de novo usuário com sucesso', async t => {
    await t
        .typeText('#nome', 'Novo Usuário')
        .typeText('#email', 'novo@exemplo.com')
        .typeText('#senha', 'senha123')
        .typeText('#confirmarSenha', 'senha123')
        .click('button[type="submit"]')
        .expect(Selector('h1').innerText).eql('Registro realizado com sucesso!');
});

test('Registro de usuário com senhas não coincidentes', async t => {
    await t
        .typeText('#nome', 'Usuário Inválido')
        .typeText('#email', 'invalido@exemplo.com')
        .typeText('#senha', 'senha123')
        .typeText('#confirmarSenha', 'senha456')
        .click('button[type="submit"]')
        .expect(Selector('#erro').innerText).eql('As senhas não coincidem.');
});

test('Registro de usuário com e-mail já existente', async t => {
    await t
        .typeText('#nome', 'Usuário Existente')
        .typeText('#email', 'teste@exemplo.com') // E-mail já existente
        .typeText('#senha', '123456')
        .typeText('#confirmarSenha', '123456')
        .click('button[type="submit"]')
        .expect(Selector('#erro').innerText).eql('E-mail já cadastrado.');
});