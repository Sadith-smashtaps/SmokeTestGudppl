import { test, expect } from '@playwright/test'
import { promises as fs } from 'fs';
import Utils from '../Functions/utils';
import utils from '../Functions/utils';

test.describe.configure({ timeout: 60000 });
test.describe.parallel('API Testing', () => {

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

    test('Verify the resend verification code button functionality - GUD-TC-103 @reg', async ({ request, page, context }) => {

        //////////////get the UUID//////////////////////
        const response = await request.post(urlOPT)
        const responseBody = JSON.parse(await response.text())
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

        ///////////////////Sign Up Page//////////////////////////////////////////
        await page.goto('https://next.gudppl.com/signup');
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
        await delay(22000); // Wait for 30 seconds
        await page.locator('input').first().click();

        //////////////////////////GET Verification Code from api//////////////////////////////////
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
            console.log(`Verification Code 1: ${verificationCode}`);
        } else {
            console.log("Verification code not found.");
        }

        console.log(`Verification Code 1 : ${verificationCode}`);
        //////////Resend the email verification code//////////////

        await page.getByRole('button', { name: 'Resend verification code' }).click();
        await expect.soft(page.getByText('Resend the email verification code')).toHaveText("Resend the email verification code");
        await page.waitForTimeout(20000);

        //////////////Take verificatin Code Again//////////////
        //////////////////////////GET Verification Code from api//////////////////////////////////
        const response3 = await request.get('https://webhook.site/token/' + getOPTURL + '/requests?page=1&password=&query=&sorting=oldest')
        expect(response3.status()).toBe(200)
        console.log(response3)
        const responseBody3 = JSON.parse(await response3.text())
        console.log('resend verification code = ' + responseBody3)

        // Access the data array from the response
        const dataArray1 = responseBody3.data;
        let text_content1 = "";
        // Iterate through each object in the data array
        for (const obj of dataArray1) {
            text_content1 = obj.text_content;
            console.log(`Hostname: ${text_content1}`);
            // You can use the hostname value as needed, e.g., for further processing
        }

        const text1 = text_content1;

        // Use regular expression to extract the code
        const codeMatch1 = text1.match(/\d{6}/);
        let verificationCode1 = "";
        if (codeMatch1) {
            verificationCode1 = codeMatch1[0];
            console.log(`Verification Code 2: ${verificationCode1}`);
        } else {
            console.log("Verification code not found.");
        }

        console.log(`Resent Verification Code 2: = ${verificationCode1}`);

        /////////////////Anaylyze first verificatin code and second verification code/////////////////////

        // function isVariableEmpty(variable: any): boolean {
        //     return variable === undefined || variable === null || variable === '';
        // }
        const utils = new Utils(page);

        let verifictioncodeStatus = utils.isVariableEmpty(verificationCode);

        if (await verifictioncodeStatus === true) {
            await expect.soft(true,'Verification code 1 is empty').toBe(false);
        } else {
            if (verificationCode !== verificationCode1) {

                console.log(`Verification Code 01: = ${verificationCode}`);
                console.log(`Resent Verification Code 02: = ${verificationCode1}`);

                /////////////////////////Split the verification code and enter into the UI//////////////////////////////////////
                const inputString = verificationCode1;
                const charArray = inputString.split(""); // Split the string into an array of characters
                console.log(charArray); // This will print ["3", "1", "8", "4", "0", "3"]
                await page.locator('input').first().fill(charArray[0]);
                await page.locator('input:nth-child(2)').fill(charArray[1]);
                await page.locator('input:nth-child(3)').fill(charArray[2]);
                await page.locator('input:nth-child(4)').fill(charArray[3]);
                await page.locator('input:nth-child(5)').fill(charArray[4]);
                await page.locator('input:nth-child(6)').fill(charArray[5]);
                await page.getByRole('button', { name: 'Submit' }).click();
                await page.waitForTimeout(5000);

                await expect.soft(page.getByText('Email Verified Successfully')).toHaveText("Email Verified Successfully");
                await page.waitForTimeout(5000);

            } else {
                await expect.soft(verificationCode,'verification code 1 should not be equal to verification code 2').not.toBe(verificationCode1);
                console.log(`Verification Code 0001: = ${verificationCode}`);
                console.log(`Resent Verification Code 0002: = ${verificationCode1}`);
            }

        }

        /////////////////writing email id to the text files/////////////////////////////
        const filePath = './pages/emailsIDs.txt';
        const emailID = '\n' + email;
        await appendToFile(filePath, emailID);

    });


   



})

