import { Selector } from 'testcafe';

fixture `Dashboard Page`
    .page `http://127.0.0.1:5500/testcafe-app/src/pages/dashboard.html`;

test('Dashboard elements are present', async t => {
    // Check if the dashboard title is visible
    const title = Selector('h1');
    await t.expect(title.innerText).eql('Dashboard', 'The dashboard title is not correct');

    // Check if the user info section is visible
    const userInfo = Selector('.user-info');
    await t.expect(userInfo.visible).ok('User info section is not visible');

    // Check if the navigation links are present
    const navLinks = Selector('nav a');
    await t.expect(navLinks.count).gt(0, 'No navigation links found');

    // Check if the logout button is present
    const logoutButton = Selector('#logout');
    await t.expect(logoutButton.visible).ok('Logout button is not visible');
});

test('Dashboard navigation works', async t => {
    // Click on a navigation link and check if it redirects correctly
    const profileLink = Selector('nav a').withText('Profile');
    await t.click(profileLink);

    // Verify that the URL is correct after navigation
    await t.expect(Selector('h1').innerText).eql('Profile', 'Did not navigate to the Profile page');
});

// Run tests using the command: npx testcafe chrome src/tests/