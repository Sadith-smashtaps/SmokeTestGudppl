import { expect, Page } from "@playwright/test";
import { promises as fs } from 'fs';

export default class LoginPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    emailClick = ()=>this.page.getByPlaceholder('Enter your email address');
    emailFill = ()=>this.page.getByPlaceholder('Enter your email address');
    pwdFill = ()=>this.page.getByPlaceholder('Enter your password');
    loginButton = ()=>this.page.getByRole('button', { name: 'Continue', exact: true });

    async appendToFile(filePath: string, content: string): Promise<void> {
        await fs.appendFile(filePath, content);
    }


    public async goto(request: any){        
        await this.page.goto('https://next.gudppl.com');

        const baseURL = 'https://reqres.in/api'


        const urlOPT = 'https://webhook.site/token/';

        let getOPTURL = '8c7f4ba8-56fc-4af0-a25c-fbb51a7717e4';
        let email = "56e06b8a-ea0e-4f1a-9493-166d80d6a99d@email.webhook.site";
        let pwd = "Smash@123";

        // await this.page.goto('https://next.gudppl.com/signup');
        // await this.page.waitForTimeout(5000);

       // const browser: Browser = await chromium.launch({ headless: false });
        //const context = await browser.newContext();
        //const page: Page = await context.newPage();

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
        await this.page.goto('https://next.gudppl.com/signup');
        await this.page.pause()


        //      const { chromium } = require('playwright');

        // (async () => {
        //   const browser = await chromium.launch({
        //     headless: false
        //   });
        //   const context = await browser.newContext();
        //  await page.locator('div').filter({ hasText: 'Log In to your accountContinue with GoogleContinue with FacebookContinue with Ap' }).nth(3).click();
        // await page.getByText('Create an account').click();
        await this.page.getByPlaceholder('Enter your email address').click();
        await this.page.getByPlaceholder('Enter your email address').fill(responseBody.uuid + '@email.webhook.site');
        email = responseBody.uuid + '@email.webhook.site';
        console.log('email is = ' + email)
        await this.page.getByPlaceholder('Enter your email address').press('Tab');
        await this.page.getByPlaceholder('Enter a new password').fill('import { test, expect } from \'@playwright/test\';  test(\'test\', async ({ page }) => { });');
        await this.page.getByPlaceholder('Enter a new password').click();
        await this.page.getByPlaceholder('Enter a new password').press('Home');
        await this.page.getByPlaceholder('Enter a new password').press('Shift+End');
        await this.page.getByPlaceholder('Enter a new password').fill(pwd);
        await this.page.getByRole('checkbox').check();
        await this.page.getByRole('button', { name: 'Create account' }).click();
        //test.slow();


        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        // ...        
        // Before making the API request
        await delay(47000); // Wait for 30 seconds

        await this.page.locator('input').first().click();
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
        await this.page.locator('input').first().fill(charArray[0]);
        await this.page.locator('input:nth-child(2)').fill(charArray[1]);
        await this.page.locator('input:nth-child(3)').fill(charArray[2]);
        await this.page.locator('input:nth-child(4)').fill(charArray[3]);
        await this.page.locator('input:nth-child(5)').fill(charArray[4]);
        await this.page.locator('input:nth-child(6)').fill(charArray[5]);
        await this.page.getByRole('button', { name: 'Submit' }).click();


        //await delay(5000);
        //await page.pause()        
        //await page.goto('https://next.gudppl.com/user-onboarding');
        await this.page.waitForTimeout(5000);


        await expect.soft(this.page.getByText('Email Verified Successfully')).toHaveText("Email Verified Successfully");
        await this.page.waitForTimeout(5000);
        /////////////////writing email id to the text files/////////////////////////////
        const filePath = './pages/emailsIDs.txt';
        const emailID = '\n' + email;
        await this.appendToFile(filePath, emailID);


    }

    public async login(email:string , pwd:string ){

        await this.emailClick().click();
        await this.emailFill().fill(email);
        await this.pwdFill().fill(pwd);
        await this.loginButton().click();        
        //console.log('email from Login = ' + email)        

    }



}
