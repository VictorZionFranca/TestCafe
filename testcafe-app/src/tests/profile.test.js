import { Selector } from 'testcafe';

fixture `Profile Page`
    .page `http://127.0.0.1:5500/testcafe-app/src/pages/profile.html`;

test('User can view and edit profile information', async t => {
    // Check if the profile information is displayed correctly
    const nameInput = Selector('#name');
    const emailInput = Selector('#email');
    const passwordInput = Selector('#password');
    const updateButton = Selector('#updateButton');
    const successMessage = Selector('#successMessage');

    // Assert that the name and email fields are visible
    await t
        .expect(nameInput.visible).ok()
        .expect(emailInput.visible).ok()
        .expect(passwordInput.visible).ok();

    // Fill in the form with new information
    await t
        .typeText(nameInput, 'Novo Nome')
        .typeText(emailInput, 'novoemail@exemplo.com')
        .typeText(passwordInput, 'novaSenha123')
        .click(updateButton);

    // Assert that the success message is displayed
    await t
        .expect(successMessage.innerText).eql('Perfil atualizado com sucesso!');
});