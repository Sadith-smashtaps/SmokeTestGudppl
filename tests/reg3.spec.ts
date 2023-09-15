import { test, expect } from '@playwright/test'
import { promises as fs } from 'fs';
test.describe.configure({ timeout: 60000 });
test.describe.parallel('API Testing', async () => {
    const baseURL = 'https://reqres.in/api'
    const data = { method: 'POST' };
    const url = 'https://postman-echo.com/post'; // Replace this with your API endpoint
    const urlOPT = 'https://webhook.site/token/';
    let getOPTURL = '8c7f4ba8-56fc-4af0-a25c-fbb51a7717e4';
    let email = "senuwan+1a5@smashtaps.com";
    let pwd = "Test123@";

    test('Verify filling all the fields and clicking on the Next button - GUD-TC-28 @reg', async ({ request, page, context }) => {
        //This is focussed for an existing user, for a new user covered by smoke testing suite
        await page.goto('https://next.gudppl.com');
        await page.waitForTimeout(3000);
   
        await page.getByPlaceholder('Enter your email address').click();
        console.log('email from Login = ' + email)
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.waitForTimeout(3400);

        await page.getByRole('button', { name: 'Complete your profile now' }).click();
        await page.locator('#root div').filter({ hasText: 'Profile informationFirst name *Last name *Date of birth *I am agirl/womanboy/man' }).nth(2).click();
        await page.getByPlaceholder('Enter your first name').click();
        await page.getByPlaceholder('Enter your first name').click();
        await page.getByPlaceholder('Enter your first name').fill('Monica');
        await page.getByPlaceholder('Enter your last name').click();
        await page.getByPlaceholder('Enter your last name').fill('Geller');
        await page.getByPlaceholder('DD').click();
        await page.getByPlaceholder('DD').fill('12');
        await page.getByPlaceholder('MM').click();
        await page.getByPlaceholder('MM').fill('10');
        await page.getByPlaceholder('YYYY').click();
        await page.getByPlaceholder('YYYY').fill('1980');
        await page.getByText('girl/woman').click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400);

        await page.getByRole('button', { name: 'Back' }).click();
        await page.waitForTimeout(3400);

        await expect.soft(page.getByPlaceholder('Enter your first name')).toHaveValue("Monica");
        await expect.soft(page.getByPlaceholder('Enter your last name')).toHaveValue("Geller");
        //await expect.soft(page.getByPlaceholder('DD')).toHaveValue("12");
        await expect.soft(page.getByPlaceholder('MM')).toHaveValue("10");
        await expect.soft(page.getByPlaceholder('YYYY')).toHaveValue("1980");
        expect.soft(await page.locator('label').filter({ hasText: 'boy/man' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeFalsy();
        expect.soft(await page.locator('label').filter({ hasText: 'girl/woman' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeTruthy();
        expect.soft(await page.getByPlaceholder('Let me type...')).toBeEmpty();

        await page.getByPlaceholder('Enter your first name').click();
        await page.getByPlaceholder('Enter your first name').fill('Rachel');
        await page.getByPlaceholder('Enter your last name').click();
        await page.getByPlaceholder('Enter your last name').fill('Green');
        await page.getByPlaceholder('DD').click();
        await page.getByPlaceholder('DD').fill('13');
        await page.getByPlaceholder('MM').click();
        await page.getByPlaceholder('MM').fill('4');
        await page.getByPlaceholder('YYYY').click();
        await page.getByPlaceholder('YYYY').fill('1981');
        await page.getByPlaceholder('Let me type...').click();
        await page.getByPlaceholder('Let me type...').fill('I\'m a girl');
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400); 

        await page.getByRole('button', { name: 'Back' }).click();
        await page.waitForTimeout(3400);
       
        await expect.soft(page.getByPlaceholder('Enter your first name')).toHaveValue("Rachel");
        await expect.soft(page.getByPlaceholder('Enter your last name')).toHaveValue("Green");
        //await expect.soft(page.getByPlaceholder('DD')).toHaveValue("13");
        await expect.soft(page.getByPlaceholder('MM')).toHaveValue("4");
        await expect.soft(page.getByPlaceholder('YYYY')).toHaveValue("1981");
        expect.soft(await page.locator('label').filter({ hasText: 'boy/man' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeFalsy();
        expect.soft(await page.locator('label').filter({ hasText: 'girl/woman' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeFalsy();
        expect.soft(await page.getByPlaceholder('Let me type...')).toHaveValue("I'm a girl");
   
    });
})