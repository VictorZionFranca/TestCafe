import { Selector } from 'testcafe';

fixture `Login Page`
    .page `http://127.0.0.1:5500/testcafe-app/src/pages/index.html`;

test('Successful login with valid credentials', async t => {
    await t
        .typeText('#email', 'teste@exemplo.com')
        .typeText('#senha', '123456')
        .click('button[type="submit"]')
        .expect(Selector('h1').innerText).eql('Login realizado com sucesso!');
});

test('Unsuccessful login with invalid credentials', async t => {
    await t
        .typeText('#email', 'invalid@exemplo.com')
        .typeText('#senha', 'wrongpassword')
        .click('button[type="submit"]')
        .expect(Selector('#erro').innerText).eql('E-mail ou senha incorretos.');
});