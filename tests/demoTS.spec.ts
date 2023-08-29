import { test, expect } from '@playwright/test'
import { promises as fs } from 'fs';

test.describe.configure({timeout:60000});
test.describe.serial('API Testing', () => {

    const baseURL = 'https://reqres.in/api'

    const data = { method: 'POST' };
    const url = 'https://postman-echo.com/post'; // Replace this with your API endpoint
    const urlOPT = 'https://webhook.site/token/';

    let getOPTURL = '8c7f4ba8-56fc-4af0-a25c-fbb51a7717e4';
    let email = "90057d02-fb2d-4e1a-a695-f1fb5a856ba3@email.webhook.site";
    let pwd = "Smash@123";
   

    async function appendToFile(filePath: string, content: string): Promise<void> {
        await fs.appendFile(filePath, content);
    }

    test('Create new user with OTP and email verification @reg', async ({ request, page, context }) => {



        //////////////get the UUID//////////////////////

        const response = await request.post(urlOPT)
        const responseBody = JSON.parse(await response.text())

        //expect (responseBody.id).toBe(1000)
        expect(response.status()).toBe(201)
        console.log(response)
        console.log(responseBody)
        console.log(responseBody.uuid)

        getOPTURL = responseBody.uuid

        const response1 = await request.get('https://webhook.site/token/' + getOPTURL + '/requests?page=1&password=&query=&sorting=oldest')
        expect(response1.status()).toBe(200)
        console.log(response1)
        const responseBody1 = JSON.parse(await response1.text())
        console.log(responseBody1.data.uuid)
        /////////////////////////////////////////////////////////////
        await page.goto('https://next.gudppl.com/signup');
        // await page.pause()


        //      const { chromium } = require('playwright');

        // (async () => {
        //   const browser = await chromium.launch({
        //     headless: false
        //   });
        //   const context = await browser.newContext();
        //  await page.locator('div').filter({ hasText: 'Log In to your accountContinue with GoogleContinue with FacebookContinue with Ap' }).nth(3).click();
        // await page.getByText('Create an account').click();
        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill(responseBody.uuid + '@email.webhook.site');
        email = responseBody.uuid + '@email.webhook.site';
        console.log('email is = ' + email)        
        await page.getByPlaceholder('Enter your email address').press('Tab');
        await page.getByPlaceholder('Enter a new password').fill('import { test, expect } from \'@playwright/test\';  test(\'test\', async ({ page }) => { });');
        await page.getByPlaceholder('Enter a new password').click();
        await page.getByPlaceholder('Enter a new password').press('Home');
        await page.getByPlaceholder('Enter a new password').press('Shift+End');
        await page.getByPlaceholder('Enter a new password').fill(pwd);
        await page.getByRole('checkbox').check();
        await page.getByRole('button', { name: 'Create account' }).click();
        test.slow();


        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        // ...        
        // Before making the API request
        await delay(47000); // Wait for 30 seconds

        await page.locator('input').first().click();
        //await page.waitForURL('https://next.gudppl.com/verify-email');
        //////////////////////////GET Verification Code//////////////////////////////////
        const response2 = await request.get('https://webhook.site/token/' + getOPTURL + '/requests?page=1&password=&query=&sorting=oldest')
        expect(response2.status()).toBe(200)
        console.log(response2)
        const responseBody2 = JSON.parse(await response2.text())
        console.log(responseBody2)

        // Access the data array from the response
        const dataArray = responseBody2.data;
        let text_content = "";
        // Iterate through each object in the data array
        for (const obj of dataArray) {
            text_content = obj.text_content;
            console.log(`Hostname: ${text_content}`);
            // You can use the hostname value as needed, e.g., for further processing
        }

        const text = text_content;

        // Use regular expression to extract the code
        const codeMatch = text.match(/\d{6}/);
        let verificationCode = "";
        if (codeMatch) {
            verificationCode = codeMatch[0];
            console.log(`Verification Code: ${verificationCode}`);
        } else {
            console.log("Verification code not found.");
        }

        console.log(`Verification Code: ${verificationCode}`);

        ///////////////////////////////////////////////////////////////

        const inputString = verificationCode;
        const charArray = inputString.split(""); // Split the string into an array of characters
        console.log(charArray); // This will print ["3", "1", "8", "4", "0", "3"]


        /////////////////////////////////////
        await page.locator('input').first().fill(charArray[0]);
        await page.locator('input:nth-child(2)').fill(charArray[1]);
        await page.locator('input:nth-child(3)').fill(charArray[2]);
        await page.locator('input:nth-child(4)').fill(charArray[3]);
        await page.locator('input:nth-child(5)').fill(charArray[4]);
        await page.locator('input:nth-child(6)').fill(charArray[5]);
        await page.getByRole('button', { name: 'Submit' }).click();


        //await delay(5000);
        //await page.pause()        
        //await page.goto('https://next.gudppl.com/user-onboarding');
        await page.waitForTimeout(5000);


        await expect.soft(page.locator(`//div[@class='MuiAlert-message css-1xsto0d']`)).toHaveText("Email Verified Successfully");
        await page.waitForTimeout(5000);
        /////////////////writing email id to the text files/////////////////////////////
        const filePath = './pages/emailsIDs.txt';
        const emailID = '\n'+ email;
        await appendToFile(filePath, emailID);
        //////////////////////////////////////////////////////
        // await expect.soft(page.getByRole('heading', { name: 'Profile information' })).toHaveText("Profile information")
        // await expect.soft(page.getByText('First name *')).toHaveText("First name *")
        // await expect.soft(page.locator(`//h6[normalize-space()='Profile information']`)).toHaveText("Profile information");


        // ---------------------
        // await context.close();
        //await browser.close();
        //})();
        ////////////////////////////////////////Login with created user//////////////////////////////////////////
        // await page.waitForLoadState();
        // await page.goto('https://next.gudppl.com/');

        // await page.getByPlaceholder('Enter your email address').click();
        // await page.getByPlaceholder('Enter your email address').fill(email);
        // await page.getByPlaceholder('Enter your password').fill(pwd);
        // await page.getByRole('button', { name: 'Continue', exact: true }).click();
        // await page.getByPlaceholder('Enter your first name').click();
        // await page.getByPlaceholder('Enter your first name').fill('messi');
        // await page.getByPlaceholder('Enter your last name').fill('leo');



    });

    test('Login with verified user and complete profile preferences with all 7 steps', async ({ page }) => {        
        //await test.setTimeout(50000);
        await page.goto('https://next.gudppl.com');
        //await page.waitForURL('**https://next.gudppl.com/');      

        await page.getByPlaceholder('Enter your email address').click();
        console.log('email from Login = ' + email)
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();

        //////////////////////////////////////////////////////////
        await page.getByPlaceholder('Enter your first name').click();
        await page.getByPlaceholder('Enter your first name').fill('Monica');
        await page.getByPlaceholder('Enter your last name').click();
        await page.getByPlaceholder('Enter your last name').fill('Geller');
        await page.getByPlaceholder('DD').click();
        await page.getByPlaceholder('DD').fill('10');
        await page.getByPlaceholder('MM').click();
        await page.getByPlaceholder('MM').fill('10');
        await page.getByPlaceholder('YYYY').click();
        await page.getByPlaceholder('YYYY').fill('1982');
        await page.locator('label').filter({ hasText: 'girl/woman' }).getByLabel('controlled').check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400);

        await page.getByLabel('Animal welfare').check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4000);
        await page.getByRole('button', { name: 'climate_action' }).click();
        await page.getByRole('button', { name: 'life_water' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400);

        await page.getByPlaceholder('Add skills and talents').click();
        await page.getByPlaceholder('Add skills and talents').fill('Account');
        await page.getByRole('option', { name: 'Accounting' }).click();
        await page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(1).check();
        await page.getByRole('row', { name: 'Sinhala delete' }).getByRole('checkbox').nth(3).check();
        await page.getByRole('row', { name: 'Tamil delete' }).getByRole('checkbox').nth(4).check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400);

        await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).check();
        await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).check();
        await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(3).check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4000);

        await page.getByPlaceholder('Your phone number').click();
        await page.getByPlaceholder('Your phone number').fill('774455886');
        await page.getByLabel('Open').click();
        await page.getByPlaceholder('Select your country').fill('Sri');
        await page.getByRole('option', { name: 'Sri Lanka' }).click();
        await page.locator('.css-rqmb9f').click();
        await page.locator('#react-select-2-input').fill('Colombo');
        await page.getByText('Colombo', { exact: true }).click({ timeout: 2000 });
        await page.getByPlaceholder('Write few sentences about you').click();
        await page.getByPlaceholder('Write few sentences about you').fill('Hi my name is Monica Geller');
        await page.getByRole('button', { name: 'Complete' }).click();
        await page.waitForTimeout(3500);

        await page.getByText('Yay... you got the worm!').click();
        await expect.soft(page.getByText('Yay... you got the worm!')).toHaveText("Yay... you got the worm!");
        // await expect.soft(page.locator(`//div[@class='MuiAlert-message css-1xsto0d']`)).toHaveText("Profile Updated Successfully");
        //await expect.soft(page.locator(`//a[normalize-space()='help center']`)).toHaveText("help center");
        // await page.waitForTimeout(1500);



    })

   

})

