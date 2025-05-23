import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

test('Login with Google account', async () => {
  // Create a persistent context to retain login information
  const browser = await chromium.launch({
    headless: false
  });

  // Use the first page in the context
  const page = browser.pages()[0] || await browser.newPage();

  await page.goto('https://next.gudppl.com'); // Replace with the URL of your app
  await page.getByRole('button', { name: 'Continue with Google' }).click();
  //await page.getByRole('textbox', { name: 'Email or phone' }).fill('automationsadith@gmail.com');
  //await page.getByRole('button', { name: 'Next', exact: true }).click();
  //await page.getByRole('textbox', { name: 'Enter your password' }).fill('Bachu@121989');
  //await page.getByRole('button', { name: 'Next', exact: true }).click();
  //await page.getByRole('button', { name: 'Continue' }).click();
  await page.goto('https://next.gudppl.com/user-onboarding');
  console.log('Login from a Google Account' )
  await page.waitForTimeout(500);

  // Optionally add assertions here to verify successful login
  
  // Close the context (comment out this line if you want to keep the browser open for inspection)
  // await browserContext.close();
});
