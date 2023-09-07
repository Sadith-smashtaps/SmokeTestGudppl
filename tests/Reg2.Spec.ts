import { test, expect } from '@playwright/test'
import { promises as fs } from 'fs';
test.describe.configure({ timeout: 60000 });
test.describe.parallel('API Testing', () => {
    const baseURL = 'https://reqres.in/api'
    const data = { method: 'POST' };
    const url = 'https://postman-echo.com/post'; // Replace this with your API endpoint
    const urlOPT = 'https://webhook.site/token/';
    let getOPTURL = '8c7f4ba8-56fc-4af0-a25c-fbb51a7717e4';
    let email = "90057d02-fb2d-4e1a-a695-f1fb5a856ba3@email.webhook.site";
    let pwd = "Smash@123";


    test('Verify the login functionality with different user name password combinations - GUD-TC-230 @reg', async ({ request, page, context }) => {
 
        
        await page.goto('https://next.gudppl.com');
        //await page.pause()

        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill('waruni+3.com');
        await page.getByPlaceholder('Enter your password').click();
        await page.getByPlaceholder('Enter your password').fill('Udgfuj');
        await page.getByRole('button', { name: 'Continue', exact: true }).click();        
        //await page.getByText('Invalid email address').click();
        //await page.getByText('Password must contain minimum six characters, at least one letter, one number an').click();
        expect.soft(await page.getByText('Invalid email address')).toHaveText("Invalid email address");
        expect.soft(await page.getByText('Password must contain minimum six characters, at least one letter, one number an')).toHaveText("Password must contain minimum six characters, at least one letter, one number and one special character");        
        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill('waruni+3@smashtaps.com');
        await page.getByPlaceholder('Enter your password').click();
        await page.getByPlaceholder('Enter your password').fill('User@12345');
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        //await page.getByText('Wrong Username / Password').click();
        await expect.soft(await page.getByText('Wrong Username / Password')).toHaveText("Wrong Username / Password");

        
        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill('waruni+com');
        await page.getByPlaceholder('Enter your password').click();
        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill('');
        await page.getByPlaceholder('Enter your password').click();
        await page.getByPlaceholder('Enter your password').fill('');
        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill('waruni+3@smashtaps.com');
        await page.getByPlaceholder('Enter your password').click();
        await page.getByPlaceholder('Enter your password').fill('User@12345');
        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill('waruni+3.com');
        //await page.getByText('Invalid email address').click();
        expect.soft(await page.getByText('Invalid email address')).toHaveText("Invalid email address");
        
        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill('waruni+3@smashtaps.com');
        await page.getByPlaceholder('Enter your password').click();
        await page.getByPlaceholder('Enter your password').fill('User@123');
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        //await page.getByText('Welcome', { exact: true }).click();
        expect.soft(await page.getByText('Welcome', { exact: true })).toHaveText("Welcome ");
      



        await page.waitForTimeout(1500);

       

    })






})