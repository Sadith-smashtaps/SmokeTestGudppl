import { test, expect } from '@playwright/test'
import { promises as fs } from 'fs';
test.describe.configure({ timeout: 60000 });
test.describe.parallel('API Testing', () => {
    const baseURL = 'https://reqres.in/api'
    const data = { method: 'POST' };
    const url = 'https://postman-echo.com/post'; // Replace this with your API endpoint
    const urlOPT = 'https://webhook.site/token/';
    let getOPTURL = '8c7f4ba8-56fc-4af0-a25c-fbb51a7717e4';
    let email = "senuwan+112@smashtaps.com";
    let pwd = "Test123@";

    test('Verify filling only the mandatory fields and clicking on the Next button - GUD-TC-27 @reg', async ({ request, page, context }) => {

        await page.goto('https://next.gudppl.com');
       // await page.pause();

        await page.getByPlaceholder('Enter your email address').click();
        console.log('email from Login = ' + email)
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.waitForTimeout(1500);
        //await page.pause();
        await page.getByPlaceholder('Enter your first name').click();
        await page.getByPlaceholder('Enter your first name').fill('Saman');
        await page.getByPlaceholder('Enter your last name').click();
        await page.getByPlaceholder('Enter your last name').fill('Perera');
        await page.getByPlaceholder('DD').click();
        await page.getByPlaceholder('DD').fill('22');
        await page.getByPlaceholder('MM').click();
        await page.getByPlaceholder('MM').fill('2');
        await page.getByPlaceholder('YYYY').click();
        await page.getByPlaceholder('YYYY').fill('1990');
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1500);
        await page.getByRole('button', { name: 'Back' }).click();
        await page.waitForTimeout(1500);

        await expect.soft(page.getByPlaceholder('Enter your first name')).toHaveValue("Saman");
        await expect.soft(page.getByPlaceholder('Enter your last name')).toHaveValue("Perera");
        await expect.soft(page.getByPlaceholder('DD')).toHaveValue("22");
        await expect.soft(page.getByPlaceholder('MM')).toHaveValue("2");
        await expect.soft(page.getByPlaceholder('YYYY')).toHaveValue("1990");

        expect.soft(await page.locator('label').filter({ hasText: 'boy/man' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeFalsy();
        expect.soft(await page.locator('label').filter({ hasText: 'girl/woman' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeFalsy();
        expect.soft(await page.getByPlaceholder('Let me type...')).toBeEmpty();

      //  await page.pause();
    });
})