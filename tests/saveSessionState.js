const { chromium } = require('playwright');

(async () => {
    // Launch the browser
    const browser = await chromium.launch({
        headless: false // Set to true if you don’t need to see the browser UI
    });

    // Create a new browser context (without any prior session)
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Go to the login page of your app
    await page.goto('https://next.gudppl.com');
    
    // Begin the login process (adjust selectors as needed for Google login)
    await page.getByRole('button', { name: 'Continue with Google' }).click();
    await page.getByRole('textbox', { name: 'Email or phone' }).fill('automationsadith@gmail.com');
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    await page.waitForTimeout(20000); // Adjust timeout as needed for the page load
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('Bachu@121989');
    await page.getByRole('button', { name: 'Next', exact: true }).click();

    // Wait for any post-login element or confirmation that the login was successful
    await page.waitForTimeout(10000); // Adjust timeout if necessary

    // Save the authenticated session state to auth.json
    await context.storageState({ path: 'auth.json' });

    // Close the browser
    await browser.close();

    console.log('Session state saved to auth.json');
})();
