import { test, expect, chromium } from '@playwright/test'
import { promises as fs } from 'fs';
import utils from '../Functions/utils';


test.describe.configure({ timeout: 600000 });
test.describe.serial('API Testing', () => {

    const { chromium } = require('playwright');
    const baseURL = 'https://reqres.in/api'

    const data = { method: 'POST' };
    const url = 'https://postman-echo.com/post'; // Replace this with your API endpoint
    const urlOPT = 'https://webhook.site/token/';

    let getOPTURL = '8c7f4ba8-56fc-4af0-a25c-fbb51a7717e4';
    let email = "07d28f33-a909-410c-8759-6c84eb5490f7@email.webhook.site";
    let pwd = "Smash@123";//Smash@123 //User@123
    let orgName = "Org167834";
     //this account is use as an admin test cases.
     //these credential will change in the run time.


    let email2 = "wishu1219+183@gmail.com";
    let pwd2 = "Bachu@121989";
    //this account is use as a supporter test cases.
    //these credential will not change in the run time.

    //let email3 = "blingc360@gmail.com";
    //let pwd3 = "Bachu@121989";

    async function appendToFile(filePath: string, content: string): Promise<void> {
        await fs.appendFile(filePath, content);
    }
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    test('Create new user with OTP and email verification GUD-TC-78,GUD-TC-81 @create', async ({ request, page, context }) => {



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
        await page.goto('https://strong-druid-08a763.netlify.app/');
        await page.getByText('Create an account').click();
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


        await expect.soft(page.getByText('Email Verified Successfully')).toHaveText("Email Verified Successfully");
        await page.waitForTimeout(5000);
        /////////////////writing email id to the text files/////////////////////////////
        const filePath = './pages/emailsIDs.txt';
        const emailID = '\n' + email;
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

    test('Login with verified user and complete profile preferences with all 7 steps GUD-TC-13  @reg', async ({ page }) => {
        //await test.setTimeout(50000);
        await page.goto('https://strong-druid-08a763.netlify.app/');
        // await page.pause();        

        await page.getByPlaceholder('Enter your email address').click();
        console.log('email from Login = ' + email)
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();

        //////////////////////////////////////////////////////////
        // await page.getByRole('button', { name: 'Complete your profile now' }).click();
        //await page.getByRole('button', { name: 'Upload picture' }).click();
        //await page.getByRole('img', { name: '/images/profilePictures/elephant.png' }).click();
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
        //await page.getByRole('button', { name: 'Skip to Home' }).click();
        //await page.waitForTimeout(3400);
        //await expect.soft(page.getByRole('heading', { name: 'Hello, Monica. Welcome to gudppl!' })).toHaveText("Hello, Monica. Welcome to gudppl!");
        //await page.getByRole('button', { name: 'Complete your profile now' }).click();
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
        //await page.getByRole('option', { name: 'Accounting' }).click();   
        await page.getByRole('option', { name: 'Accounting', exact: true }).click();
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
        //await page.locator('.css-rqmb9f').click();
        //await page.locator('#react-select-2-input').fill('Colombo');
        //await page.locator('.css-h14o9r-B').click();
        //await page.locator('//div[@id='react-select-3-placeholder']//ancestor::div[1]//div[2]').click();        
        // Using XPath selector
        // const buttonXPath = "//div[@id='react-select-3-placeholder']//ancestor::div[1]//div[2]";
        const dropDownXPath = "//label[normalize-space()='Country']/../..//div[2]//div//div//div//div[2]";
        const dropDownElement = await page.locator(dropDownXPath);
        await dropDownElement.click();

        const dropDownType = "//label[normalize-space()='Country']/../..//div[2]//div//div//div//div[2]//input";
        const dropDownElementType = await page.locator(dropDownType);
        await dropDownElementType.fill('Colombo');

        //await page.locator('#react-select-3-input').fill('Colombo');
        await page.getByText('Colombo', { exact: true }).click({ timeout: 3000 });
        await page.getByPlaceholder('Write few sentences about you').click();
        await page.getByPlaceholder('Write few sentences about you').fill('Hi my name is Monica Geller');
        await page.getByRole('button', { name: 'Complete' }).click();
        await page.waitForTimeout(3500);

        await expect.soft(page.getByRole('heading', { name: 'Hello, Monica. Welcome to gudppl!' })).toHaveText("Hello, Monica. Welcome to gudppl!");





    })


   

    test('Create multiple organizations - GUD-TC-942 @skip', async ({ page }) => {

        // Login
        await page.goto('https://strong-druid-08a763.netlify.app/');
        await page.getByPlaceholder('Enter your email address').click();
        console.log('email ID Login is = ' + email);
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.waitForTimeout(1000);
    
        // Loop to create multiple organizations
        const numberOfOrganizations = 2; // Specify how many organizations you want to create
    
        for (let i = 1; i <= numberOfOrganizations; i++) {
            const randomNumber = getRandomNumber(1, 100588) + i; // Ensure unique names
             orgName = 'Org' + randomNumber;
    
            console.log(`Creating organization ${i}: ${orgName}`);
    
            await page.getByRole('button', { name: 'Organizations' }).click();
            await page.getByRole('button', { name: 'Create an organization' }).click();
            await page.getByPlaceholder('Enter organization name').click();
            await page.getByPlaceholder('Enter organization name').fill(orgName);
            await page.getByLabel('BusinessSmall/medium business, company, or multi-national company').check();
            await page.getByLabel('Yes').check();
            await page.getByRole('button', { name: 'Next' }).click();
            await page.waitForTimeout(500);
            await page.getByPlaceholder('Who we are and the positive impact we wish to make in the community').click();
            await page.getByPlaceholder('Who we are and the positive impact we wish to make in the community').fill('This is created by automation');
            await page.getByPlaceholder('Your phone number').click();
            await page.getByPlaceholder('Your phone number').fill('774444444');
            await page.getByRole('button', { name: 'Open' }).click();
            await page.getByPlaceholder('Select your country').fill('Sri lanka');
            await page.getByRole('option', { name: 'Sri Lanka' }).click();
            await page.waitForTimeout(500);
            await page.locator("//span[normalize-space()='Location *']/../div/div[2]//div//div//div//div[2]").click();
            await page.locator("//span[normalize-space()='Location *']/../div/div[2]//div//div//div//div[2]//input").fill('Dehiwala');
            await page.waitForTimeout(500);
            await page.getByText('Dehiwala-Mount Lavinia', { exact: true }).click();
            await page.getByText('Animal welfare').click();
            await page.getByText('Education').click();
            await page.getByText('People').click();
            await page.getByRole('button', { name: 'No Poverty' }).click();
            await page.getByRole('button', { name: 'Clean Water and Sanitation' }).click();
            await page.getByRole('button', { name: 'Sustainable Cities and Communities' }).click();
            await page.getByRole('button', { name: 'Peace, Justice and Strong Institutions' }).click();
            await page.getByRole('button', { name: 'Next' }).click();
            await page.getByLabel('51-100').check();
            await page.locator('input[name="website"]').click();
            await page.locator('input[name="website"]').fill('https://www.rugbyworldcup.com/2024');
            await page.locator('input[name="profileInformation"]').click();
            await page.locator('input[name="profileInformation"]').fill('https://www.espncricinfo.com/');
            await page.getByLabel('I verify that I am an authorized representative of this organization and have the right to act on its behalf in the creation and management of this profile. The organization and I agree to gudppl\'s Terms & Conditions.').check();
            await page.getByRole('button', { name: 'Complete' }).click();
            await page.getByRole('button', { name: 'Got it' }).click();
            await page.waitForTimeout(500);
    
            // Verification after creation
            await expect.soft(page.getByText(orgName)).toBeVisible();
            expect.soft(page.getByRole('cell', { name: `groupIcon ${orgName} Business` }).getByText('Business')).not.toBeNull();
            expect.soft(
                await page.getByRole('row', { name: `groupIcon ${orgName} Business Animal welfare Education People 0 hours 1` })
                          .getByRole('cell', { name: 'Animal welfare Education People' })
            ).not.toBeNull();
            expect.soft(
                await page.getByRole('row', { name: `groupIcon ${orgName} Business Animal welfare Education People 0 hours 1` })
                          .getByText('0 hours')
            ).not.toBeNull();
            expect.soft(
                await page.getByRole('row', { name: `groupIcon ${orgName} Business Animal welfare Education People 0 hours 1` })
                          .getByText('1', { exact: true })
            ).not.toBeNull();
    
            console.log(`Organization ${orgName} created successfully.`);
        }
    });

    test('add hours and approve @skip', async ({ page }) => {

        await page.goto('https://strong-druid-08a763.netlify.app/');


        await page.getByPlaceholder('Enter your email address').click();
        console.log('email ID Login for third test case is = ' + email)
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();

        await page.waitForTimeout(1000);

        await page.getByRole('button', { name: 'Add hours' }).click();
        await page.getByPlaceholder('Host organization name').click();
        await page.getByPlaceholder('Host organization name').fill(orgName);
        await page.getByRole('heading', { name: orgName }).click();
        await page.getByPlaceholder('Name of coordinator/supervisor').click();
        await page.getByPlaceholder('Name of coordinator/supervisor').fill('rajapaksha');
        //await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div/div/div[1]/div[2]/div/input").fill('16/09/2023');
        //await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div/div/div[2]/div[2]/div/input").fill('17/09/2023');
        await page.getByPlaceholder('DD/MM/YYYY').first().click();
        await page.getByPlaceholder('DD/MM/YYYY').first().fill('16/09/2023');
        await page.getByPlaceholder('DD/MM/YYYY').nth(1).click();
        await page.getByPlaceholder('DD/MM/YYYY').nth(1).fill('17/09/2023');
        for (let i = 0; i < 2; i++) {
            await page.locator('.MuiButtonGroup-root > button').first().click();
        }
        
        for (let i = 0; i < 6; i++) {
            await page.locator('div:nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiButtonGroup-root > button').first().click();
        }
        
        //await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div[2]/div/div[2]/div/div/input").fill('02');
        //await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div[2]/div/div[3]/div/div/input").fill('30');
        //await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div[3]/div/div[2]/div/div/textarea").first().fill('activity decription');
        await page.getByPlaceholder('Add description').click();
        await page.getByPlaceholder('Add description').fill('activity description')
        await page.getByLabel('Remote').check();
        await page.getByRole('button', { name: 'Animal welfare' }).click();
        await page.getByRole('button', { name: 'Zero Hunger' }).click();
        await page.getByRole('button', { name: 'No Poverty' }).click();
        await page.getByPlaceholder('Add skills and talents').click();
        await page.getByPlaceholder('Add skills and talents').fill('art ');
        await page.getByRole('option', { name: 'Art exhibitions and curation' }).click();
        
        
        //await page.getByPlaceholder('Organization name').click();
        //await page.getByPlaceholder('Organization name').fill(orgName);
        //await page.getByRole('heading', { name: orgName }).click();
        //await page.getByPlaceholder('Enter name of volunteer coordinator/supervisor').click();
        //await page.getByPlaceholder('Enter name of volunteer coordinator/supervisor').fill('rajapaksha');
        //await page.getByRole('button', { name: 'Invite to verify hours' }).click();
        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'Submit' }).click();
        //await page.getByRole('button', { name: 'Got it!' }).click();
        //await page.getByRole('button', { name: 'Got it' }).click();
        //await page.waitForTimeout(15000);
        // ...existing code...

// Set up a listener to print all network responses and their payloads
page.on('response', async (response) => {
    try {
        const url = response.url();
        const status = response.status();
        const contentType = response.headers()['content-type'] || '';
        let body = '';
        if (contentType.includes('application/json')) {
            body = await response.json();
        } else {
            body = await response.text();
        }
        console.log(`Response: ${url} [${status}]`);
        console.log('Payload:', body);
    } catch (e) {
        // Ignore errors for non-JSON responses
    }
});

// Click the "Got it" button
await page.getByRole('button', { name: 'Got it' }).click();
await page.waitForTimeout(15000);

// ...existing code...
        //await expect(page.getByRole('button', { name: /got it/i })).toBeVisible({ timeout: 30000 });
        //await page.getByRole('button', { name: /got it/i }).click();

        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        //await page.getByText('Pending').nth(1).click();
        await expect.soft(page.locator('p').filter({ hasText: 'Pending' })).toBeVisible();
        //await page.getByText('activity decription').first().click();
        await expect.soft(page.getByText('activity description')).toBeVisible();
        //await page.getByRole('heading', { name: '2h 30m' }).first().click();
        await expect.soft(page.getByRole('heading', { name: '2h 30m' })).toBeVisible();
        await page.getByRole('tab', { name: 'Pending' }).click();
        await page.getByText('Pending').nth(1).click();
        await page.getByRole('heading', { name: '2h 30m' }).first().click();
        await page.getByText('activity description').first().click();
        await page.getByRole('button', { name: 'Organizations' }).click();
        await page.getByRole('button', { name: 'Verify Hours' }).first().click();
        //await page.getByRole('button', { name: 'Verify Hours' }).click();

        await page.getByText('pending').nth(1).click();
        await page.getByRole('table', { name: 'responsive table' }).getByRole('button').first().click();

        await page.getByRole('button', { name: 'Approve' }).click();
        //await page.getByRole('button', { name: 'Got it!' }).click();
        await page.getByRole('button', { name: 'Got it' }).click();
        await page.waitForTimeout(120000);
        await page.getByText('approved').first().click();
        //await page.getByRole('button', { name: 'Profile' }).click();
        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        await page.getByText('Verified').first().click();
        await page.getByRole('tab', { name: 'Approved' }).click();
        await page.getByText('Verified').first().click();



    })

    test('add hours with decline @skip', async ({ page }) => {

        await page.goto('https://strong-druid-08a763.netlify.app/');

        await page.getByPlaceholder('Enter your email address').click();
        console.log('email ID Login for third test case is = ' + email)
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();

        await page.waitForTimeout(1000);

        await page.getByRole('button', { name: 'Add hours' }).click();
        await page.getByPlaceholder('Host organization name').click();
        await page.getByPlaceholder('Host organization name').fill(orgName);
        await page.getByRole('heading', { name: orgName }).click();
        await page.getByPlaceholder('Name of coordinator/supervisor').click();
        await page.getByPlaceholder('Name of coordinator/supervisor').fill('rajapaksha');
        //await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div/div/div[1]/div[2]/div/input").fill('16/09/2023');
        //await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div/div/div[2]/div[2]/div/input").fill('17/09/2023');
        //await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div[2]/div/div[2]/div/div/input").fill('02');
        //await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div[2]/div/div[3]/div/div/input").fill('30');
        //await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div[3]/div/div[2]/div/div/textarea").first().fill('activity decription');
        await page.getByPlaceholder('DD/MM/YYYY').first().click();
        await page.getByPlaceholder('DD/MM/YYYY').first().fill('16/09/2023');
        await page.getByPlaceholder('DD/MM/YYYY').nth(1).click();
        await page.getByPlaceholder('DD/MM/YYYY').nth(1).fill('17/09/2023');
        for (let i = 0; i < 2; i++) {
            await page.locator('.MuiButtonGroup-root > button').first().click();
        }
        
        for (let i = 0; i < 6; i++) {
            await page.locator('div:nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiButtonGroup-root > button').first().click();
        }
        await page.getByPlaceholder('Add description').click();
        await page.getByPlaceholder('Add description').fill('activity description')
        await page.getByLabel('Remote').check();
        await page.getByRole('button', { name: 'Animal welfare' }).click();
        await page.getByRole('button', { name: 'Zero Hunger' }).click();
        await page.getByRole('button', { name: 'No Poverty' }).click();
        await page.getByPlaceholder('Add skills and talents').click();
        await page.getByPlaceholder('Add skills and talents').fill('art ');
        await page.getByRole('option', { name: 'Art exhibitions and curation' }).click();
        //await page.getByLabel('Remote').check();
        //await page.getByPlaceholder('Add description').click();
        //await page.getByPlaceholder('Add description').fill('activity description')
        //await page.getByPlaceholder('Add skills and talents').click();
        //await page.getByPlaceholder('Add skills and talents').fill('art ');
        //await page.getByRole('option', { name: 'Art exhibitions and curation' }).click();
        //await page.getByRole('button', { name: 'Animal welfare' }).click();
        //await page.getByRole('button', { name: 'Zero Hunger' }).click();
        //await page.getByRole('button', { name: 'No Poverty' }).click();
        //await page.getByPlaceholder('Organization name').click();
        //await page.getByPlaceholder('Organization name').fill(orgName);
        //await page.getByRole('heading', { name: orgName }).click();
        //await page.getByPlaceholder('Enter name of volunteer coordinator/supervisor').click();
        //await page.getByPlaceholder('Enter name of volunteer coordinator/supervisor').fill('rajapaksha');
        //await page.getByRole('button', { name: 'Invite to verify hours' }).click();
        await page.getByRole('button', { name: 'Submit' }).click();
        //await page.getByRole('button', { name: 'Got it!' }).click();
        await page.getByRole('button', { name: 'Got it' }).click();
        await page.waitForTimeout(12000);

        await page.getByRole('button', { name: 'Organizations' }).click();
        await page.waitForTimeout(1000);
        await page.getByRole('table', { name: 'responsive table' }).getByText(orgName).click();
        await page.waitForTimeout(5000);
        await page.getByTestId('ChevronRightIcon').nth(1).click();           
        //await page.getByRole('cell', { name: 'pending' }).getByRole('button').click();
        await page.getByRole('table', { name: 'responsive table' }).getByRole('button').first().click();
      
  
        await page.getByRole('button', { name: 'Deny' }).click();
        await page.getByRole('textbox').click();
        await page.getByRole('textbox').fill('This is wrong');
        await page.getByRole('button', { name: 'Decline' }).click();
        await page.getByText('declined', { exact: true }).click();
        await page.waitForTimeout(3000);
        //await page.getByRole('row', { name: 'MG Monica Geller 2h 30m 16/09/2024 - 16/09/2024 declined' }).getByText('16/09/2024 - 16/09/2024').click();
        //await page.getByRole('row', { name: 'Monica Geller 2h 30m 16/09/2023 - 17/09/2023 Remote declined' }).getByRole('cell', { name: '16/09/2023 - 17/09/2023' }).click();
        await page.getByRole('button', { name: 'Profile' }).click();
        await page.getByRole('paragraph').filter({ hasText: 'Declined' }).click();
        await page.getByText('16/09/2023 - 17/09/2023').first().click();
        await page.getByRole('tab', { name: 'Declined' }).click();
        await page.getByRole('paragraph').filter({ hasText: 'Declined' }).click();
        //await page.getByText('16/09/2024 - 16/09/2024').click();


    })

    test('add hours with Amendments @', async ({ page }) => {

        await page.goto('https://strong-druid-08a763.netlify.app/');

        await page.getByPlaceholder('Enter your email address').click();
        console.log('email ID Login for third test case is = ' + email)
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();

        await page.waitForTimeout(1000);

        await page.getByRole('button', { name: 'Add hours' }).click();
        await page.getByPlaceholder('Host organization name').click();
        await page.getByPlaceholder('Host organization name').fill(orgName);
        await page.getByRole('heading', { name: orgName }).click();
        await page.getByPlaceholder('Name of coordinator/supervisor').click();
        await page.getByPlaceholder('Name of coordinator/supervisor').fill('rajapaksha');
        //await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div/div/div[1]/div[2]/div/input").fill('16/09/2023');
        //await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div/div/div[2]/div[2]/div/input").fill('17/09/2023');
        //await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div[2]/div/div[2]/div/div/input").fill('08');
        //await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div[2]/div/div[3]/div/div/input").fill('30');
        //await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div[3]/div/div[2]/div/div/textarea").first().fill('activity decription');
        await page.getByPlaceholder('DD/MM/YYYY').first().click();
        await page.getByPlaceholder('DD/MM/YYYY').first().fill('16/09/2023');
        await page.getByPlaceholder('DD/MM/YYYY').nth(1).click();
        await page.getByPlaceholder('DD/MM/YYYY').nth(1).fill('17/09/2023');
        for (let i = 0; i < 8; i++) {
            await page.locator('.MuiButtonGroup-root > button').first().click();
        }
        
        for (let i = 0; i < 6; i++) {
            await page.locator('div:nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiButtonGroup-root > button').first().click();
        }
        await page.getByPlaceholder('Add description').click();
        await page.getByPlaceholder('Add description').fill('activity description')
        await page.getByLabel('Remote').check();
        await page.getByRole('button', { name: 'Animal welfare' }).click();
        await page.getByRole('button', { name: 'Zero Hunger' }).click();
        await page.getByRole('button', { name: 'No Poverty' }).click();
        await page.getByPlaceholder('Add skills and talents').click();
        await page.getByPlaceholder('Add skills and talents').fill('art ');
        await page.getByRole('option', { name: 'Art exhibitions and curation' }).click();
    
        //await page.getByPlaceholder('Organization name').click();
        //await page.getByPlaceholder('Organization name').fill(orgName);
        //await page.getByRole('heading', { name: orgName }).click();
        //await page.getByPlaceholder('Enter name of volunteer coordinator/supervisor').click();
        //await page.getByPlaceholder('Enter name of volunteer coordinator/supervisor').fill('rajapaksha');
        //await page.getByRole('button', { name: 'Invite to verify hours' }).click();
        await page.getByRole('button', { name: 'Submit' }).click();
        //await page.getByRole('button', { name: 'Got it!' }).click();
        await page.getByRole('button', { name: 'Got it' }).click();
        await page.waitForTimeout(12000);


        await page.getByRole('button', { name: 'Organizations' }).click();
        await page.waitForTimeout(1000);
        await page.getByRole('table', { name: 'responsive table' }).getByText(orgName).click();
        await page.waitForTimeout(5000);
        await page.getByTestId('ChevronRightIcon').nth(1).click();        
        await page.getByRole('cell', { name: 'pending' }).getByRole('button').click();
        //await page.getByRole('table', { name: 'responsive table' }).getByRole('button').first().click();
      

        //await page.getByRole('button', { name: 'View request' }).click();
        //await page.getByText('pending', { exact: true }).click();
        //await page.getByRole('cell', { name: 'pending' }).getByRole('button').click();
        await page.getByRole('button', { name: 'Amend' }).click();
        // await page.locator('[id="\\:r4j\\:"]').click();
        // await page.locator('[id="\\:r4j\\:"]').fill('08');
        //await page.getByText('activity decription').fill('activity decription amendm');
        await page.getByPlaceholder('Add description').fill('activity description amendment');
        await page.getByRole('button', { name: 'Disaster relief' }).click();
        await page.getByRole('button', { name: 'Good Health and Well-being' }).click();
        //await page.getByLabel('Good Health and Well-being').click();
        await page.locator('textarea').nth(2).click();
        await page.locator('textarea').nth(2).fill('I just amended');
        //await page.getByPlaceholder('Enter reason to modify').click();
        //await page.getByPlaceholder('Enter reason to modify').fill('I just amended');
        await page.getByRole('button', { name: 'Amend & Approve' }).click();
        //await page.getByText('8h 30m').click();     
        // await page.getByRole('row', { name: 'MG Monica Geller 8h 30m 16/09/2024 - 17/09/2024 Remote approved' }).getByText('approved').click();
        // await page.getByRole('row', { name: 'MG Monica Geller 8h 30m 16/09/2024 - 17/09/2024 Remote approved' }).getByRole('button').click();

        //await page.getByText('8h 30m').click();
        await page.getByRole('button', { name: 'Got it' }).click();
        //await page.getByText('Disaster relief').click();
        //await page.getByText('activity description amendment').click();
        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        await page.getByText('Verified').first().click();
        await page.getByRole('tab', { name: 'Approved' }).click();
        await page.getByText('Verified').first().click();



    })

    test('User Profile  ', async ({ page }) => {
        //GUD-1443 bug is open
        await page.goto('https://strong-druid-08a763.netlify.app/');
        await page.waitForTimeout(3000);

        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.waitForTimeout(3400);
        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        //await page.pause();
        await page.getByRole('button', { name: 'Edit profile' }).click();
        await page.waitForTimeout(1500);

        await page.getByPlaceholder('Enter your first name').click();
        await page.getByPlaceholder('Enter your first name').fill('Monicaz');
        await page.getByPlaceholder('Enter your last name').click();
        await page.getByPlaceholder('Enter your last name').fill('Gellerz');
        await page.locator('form div').filter({ hasText: 'Date of birth *' }).nth(1).click();
        await page.getByPlaceholder('DD').click();
        await page.getByPlaceholder('DD').fill('5');
        await page.getByPlaceholder('MM').fill('5');
        await page.getByPlaceholder('YYYY').fill('1985');
        await page.locator('label').filter({ hasText: 'boy/man' }).getByRole('checkbox', { name: 'controlled' }).check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1500);
        await page.getByLabel('Education').check();
        await page.getByLabel('People').check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1500);
        await page.getByRole('button', { name: 'no_poverty' }).click();
        await page.getByRole('button', { name: 'zero_hunger' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1500);
        await page.locator("//h3[normalize-space()='Your skills & talents']/../div/div/div[2]/div[1]//*[name()='svg']").click();
        await page.getByPlaceholder('Add skills and talents').click();
        // await page.getByPlaceholder('Add skills and talents').fill('market');
        // await page.getByRole('option', { name: 'Marketing' }).click();

        await page.getByPlaceholder('Add skills and talents').fill('market');
        await page.getByRole('option', { name: 'Marketing', exact: true }).click();

        await page.getByRole('row', { name: 'Sinhala delete' }).getByRole('checkbox').first().check();
        await page.getByRole('row', { name: 'Tamil delete' }).getByRole('checkbox').first().check();
        await page.getByRole('row', { name: 'English' }).getByRole('checkbox').first().check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1500);
        await page.getByLabel('Sunday').check();
        await page.getByLabel('Saturday').check();
        await page.getByLabel('Friday').check();
        await page.getByRole('row', { name: 'Sunday' }).getByRole('checkbox').nth(2).check();
        await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(2).check();
        await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(2).check();
        await page.locator('.MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1500);
        await page.getByRole('button', { name: 'Open' }).click();
        await page.getByPlaceholder('Select your country').fill('Sri');
        await page.waitForTimeout(1000);
        await page.getByRole('option', { name: 'Sri Lanka' }).click();

        // await page.locator('.css-h14o9r-B').click();
        // await page.locator('#react-select-3-input').fill('dehiwala');
        // await page.getByText('Dehiwala-Mount Lavinia', { exact: true }).click();


        const dropDownXPath = "//label[normalize-space()='Country']/../..//div[2]//div//div//div//div[2]";
        const dropDownElement = await page.locator(dropDownXPath);
        await dropDownElement.click();

        const dropDownType = "//label[normalize-space()='Country']/../..//div[2]//div//div//div//div[2]//input";
        const dropDownElementType = await page.locator(dropDownType);
        await dropDownElementType.fill('Dehiwala-Mount Lavinia');
        await page.waitForTimeout(1000);

        //await page.locator('#react-select-3-input').fill('Colombo');
        await page.getByText('Dehiwala-Mount Lavinia', { exact: true }).click({ timeout: 3000 });


        await page.getByPlaceholder('Write few sentences about you').click();
        await page.getByPlaceholder('Write few sentences about you').fill('Hi my name is Monica Gellerzzzzzzzzzzz');
        //await page.getByPlaceholder('Your phone number').click();
        //await page.getByRole('button', { name: '+94' }).click();
        await page.getByRole('button', { name: '+94' }).click();
        await page.getByRole('option', { name: '+971' }).click();
        await page.getByPlaceholder('Your phone number').click();
        await page.getByPlaceholder('Your phone number').fill('774611558');
        await page.getByRole('button', { name: 'Complete' }).click();
        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        await page.locator('.css-1gcqr0l > .MuiButtonBase-root').click();
    await page.getByRole('img', { name: '/images/profilePictures/ambulance.png' }).click();
    await expect.soft(page.getByText('Profile picture uploaded successfully')).toHaveText("Profile picture uploaded successfully");
    await page.waitForTimeout(1500);

        /////////////////////////////      Verification        /////////////////////////////////////////////

        await expect.soft(page.getByText('Dehiwala-Mount Lavinia, Sri Lanka')).toHaveText("Dehiwala-Mount Lavinia, Sri Lanka");

        await expect.soft(page.getByText('Hi my name is Monica Gellerzzzzzzzzzzz')).toHaveText("Hi my name is Monica Gellerzzzzzzzzzzz    ");
        //await page.locator('h2').click();
        await expect.soft(page.locator('h2')).toHaveText("Monicaz Gellerz");
        // await page.locator('.MuiBox-root > div:nth-child(2) > div > div > .MuiBox-root').first().click();
        // await page.locator('.MuiBox-root > div > div:nth-child(2) > .MuiBox-root').click();
        // await page.locator('.MuiBox-root > div > div:nth-child(3) > .MuiBox-root').click();
        await page.getByRole('button', { name: 'No Poverty' }).click();
        await page.getByRole('button', { name: 'Zero Hunger' }).click();
        await page.getByRole('button', { name: 'Climate Action' }).click();
        await page.getByRole('button', { name: 'Life Below Water' }).click();

        await page.getByRole('button', { name: 'Edit profile' }).click();
        await page.waitForTimeout(500);
        await expect.soft(page.getByPlaceholder('Enter your first name')).toHaveValue("Monicaz");
        await expect.soft(page.getByPlaceholder('Enter your last name')).toHaveValue("Gellerz");
        //await expect.soft(page.getByPlaceholder('DD')).toHaveValue("5");    // bug
        await expect.soft(page.getByPlaceholder('MM')).toHaveValue("5");
        await expect.soft(page.getByPlaceholder('YYYY')).toHaveValue("1985");
        // await page.locator('label').filter({ hasText: 'boy/man' }).getByRole('checkbox', { name: 'controlled' }).uncheck();
        // await page.locator('label').filter({ hasText: 'boy/man' }).getByRole('checkbox', { name: 'controlled' }).check();

        expect.soft(await page.locator('label').filter({ hasText: 'boy/man' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeTruthy();
        expect.soft(await page.locator('label').filter({ hasText: 'girl/woman' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeFalsy();
        expect.soft(await page.getByPlaceholder('Let me type...')).toBeEmpty();

        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1500);

        // await page.getByLabel('People').uncheck();
        // await page.getByLabel('People').check();

        expect.soft(await page.getByLabel('Animal welfare').isChecked()).toBeTruthy();
        expect.soft(await page.getByLabel('Education').isChecked()).toBeTruthy();
        expect.soft(await page.getByLabel('People').isChecked()).toBeTruthy();
        expect.soft(await page.getByLabel('Disaster relief').isChecked()).toBeFalsy();
        expect.soft(await page.getByLabel('Environment').isChecked()).toBeFalsy();


        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4500);
        const zeroHunger = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='zero_hunger']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        const no_poverty = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='no_poverty']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        const life_water = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='life_water']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        const climate_action = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='climate_action']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        const quality_education = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='quality_education']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        const clean_water = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='clean_water']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        const clean_energy = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='clean_energy']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        const decent_work = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='decent_work']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;

        // const letter = a;
        // const xpathExpression = `//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='zero_hunger']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'${letter}')]`;
        // expect.soft(await page.locator(xpathExpression).isVisible()).toBeTruthy();


        expect.soft((await new utils(page).isCharacterCountMoreThan400(zeroHunger)).valueOf()).toBe(true);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(no_poverty)).valueOf()).toBe(true);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(life_water)).valueOf()).toBe(true);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(climate_action)).valueOf()).toBe(true);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(quality_education)).valueOf()).toBe(false);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(clean_water)).valueOf()).toBe(false);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(clean_energy)).valueOf()).toBe(false);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(decent_work)).valueOf()).toBe(false);



        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3500);

        expect.soft(await page.locator("//span[normalize-space()='Marketing']").isVisible()).toBeTruthy();
        expect.soft(await page.locator("//span[normalize-space()='Accounting']").isVisible()).toBeFalsy();
        //// Due to bug not going to validate Languages
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3500);

        expect.soft(await page.getByLabel('Monday').isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Tuesday').isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Wednesday').isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(3).isChecked()).toBeTruthy();

        expect.soft(await page.getByLabel('Thursday').isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Thursday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Thursday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Thursday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Friday').isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(2).isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Saturday').isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(2).isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Sunday').isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Sunday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Sunday' }).getByRole('checkbox').nth(2).isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Sunday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.locator('.MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').isChecked()).toBeFalsy();

        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1000);
        expect.soft(await page.locator("//input[@value='+971']")).toHaveValue('+971');
        await expect.soft(page.getByPlaceholder('Your phone number')).toHaveValue("774611558");
        // await expect.soft(page.getByPlaceholder('Select your country')).toHaveValue("+677");  // due to bug     
        await expect.soft(page.getByPlaceholder('Write few sentences about you')).toHaveValue("Hi my name is Monica Gellerzzzzzzzzzzz");

        // await page.getByRole('button', { name: 'Complete' }).click();


    })

    test('Edit organization ', async ({ page }) => {

        await page.goto('https://strong-druid-08a763.netlify.app/');
        // await page.pause();

        await page.getByPlaceholder('Enter your email address').click();
        console.log('email ID Login for third test case is = ' + email)
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();

        // await page.getByPlaceholder('Enter your email address').click();
        // await page.getByPlaceholder('Enter your email address').fill("45ba62a1-619a-4d80-88ff-a73c2067c0a4@email.webhook.site");
        // await page.getByPlaceholder('Enter your password').fill("Smash@123");
        // await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.waitForTimeout(1000);

        const randomNumber = getRandomNumber(1, 100588);
        console.log(randomNumber);

        await page.getByRole('button', { name: 'Organizations' }).click();
        await page.locator('.MuiGrid-root > button').first().click();
        await page.getByRole('button', { name: 'Edit Organization' }).click();

        //await page.locator('button').nth(3).click();
        //await page.getByRole('button', { name: 'Edit Organization' }).click();
        await page.getByPlaceholder('Enter organization name').click();
        await page.getByPlaceholder('Enter organization name').fill('Org1' + randomNumber);
        orgName = 'Org1' + randomNumber;
        await page.getByText('Association, club/society, or community group').click();
        await page.getByLabel('No', { exact: true }).check();
        await page.locator('div').filter({ hasText: /^BackNext$/ }).first().click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1500);

        // Step 02
        await page.getByPlaceholder('Who we are and the positive impact we wish to make in the community').click();
        await page.getByPlaceholder('Who we are and the positive impact we wish to make in the community').fill('This is created by automation update');
        await page.getByPlaceholder('Your phone number').click();
        await page.getByPlaceholder('Your phone number').fill('774444455');
        await page.getByRole('button', { name: 'Open' }).click();
        await page.getByPlaceholder('Select your country').fill('uni');
        await page.getByRole('option', { name: 'United States', exact: true }).click();
        // //await page.locator('.css-h14o9r-B').click();
        await page.locator('#react-select-3-input').fill('cas');
        await page.getByText('Castro Valley', { exact: true }).click();
        await page.getByRole('button', { name: 'Disaster relief' }).click();
        await page.getByRole('button', { name: 'Animal welfare' }).click();
        await page.getByRole('button', { name: 'No Poverty' }).click();
        await page.getByRole('button', { name: 'Zero Hunger' }).click();
        await page.getByRole('button', { name: 'Good Health and Well-being' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1500);


        // Step 03
        await page.getByLabel('I verify that I am an authorized representative of this organization and have the right to act on its behalf in the creation and management of this profile. The organization and I agree to gudppl\'s Terms & Conditions.').uncheck();
        await page.getByRole('button', { name: 'Update' }).click();
        // // Need to verify the error message
        await page.getByLabel('I verify that I am an authorized representative of this organization and have the right to act on its behalf in the creation and management of this profile. The organization and I agree to gudppl\'s Terms & Conditions.Please accept the terms and conditions').check();

        await page.getByLabel('1-50', { exact: true }).check();
        await page.locator('input[name="website"]').click();
        await page.locator('input[name="website"]').fill('https://www.rugbyworldcup.com/2024');
        await page.locator('input[name="profileInformation"]').click();
        await page.locator('input[name="profileInformation"]').fill('https://www.espncricinfo2024.com/');

        await page.getByRole('button', { name: 'Update' }).click();
        //await page.getByRole('button', { name: 'Update' }).click();
        await page.getByRole('button', { name: 'Edit Organization' }).click();

        /////////////////////////////      Verification        /////////////////////////////////////////////

        //await page.getByRole('button', { name: 'Organizations' }).click();
        //await page.locator('button').nth(3).click();
        //await page.getByRole('button', { name: 'Edit Organization' }).click();
        //await page.waitForTimeout(1500);

        //Step 01
        //await expect.soft(page.getByPlaceholder('Enter organization name')).toHaveText(orgName);
        await expect.soft(page.getByPlaceholder('Enter organization name')).toHaveValue(orgName);
        await page.waitForTimeout(1500);

        expect.soft(await page.getByLabel('Community group').isChecked()).toBeTruthy();
        expect.soft(await page.getByLabel('Business').isChecked()).toBeFalsy();
        expect.soft(await page.getByLabel('Educational institution').isChecked()).toBeFalsy();
        expect.soft(await page.getByLabel('Government').isChecked()).toBeFalsy();
        expect.soft(await page.getByLabel('Non-profit').isChecked()).toBeFalsy();
        expect.soft(await page.getByLabel('Other').isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Yes').isChecked()).toBeFalsy();
        //expect.soft(await page.getByLabel('No').isChecked()).toBeTruthy();
        expect.soft(await page.getByLabel('No', { exact: true }).isChecked()).toBeTruthy();
        

        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1500);

        // Step 02
        await expect.soft(page.getByPlaceholder('Who we are and the positive impact we wish to make in the community')).toHaveText('This is created by automation update');
        await expect.soft(page.getByPlaceholder('Your phone number')).toHaveValue('774444455');
        await expect.soft(page.getByPlaceholder('Select your country')).toHaveValue('United States');
        await expect.soft(page.locator("(//span[normalize-space()='Location *']/.././div//div)[10]")).toHaveText('Castro Valley');
        //await expect.soft(page.locator("//div[@class=' css-1dimb5e-singleValue']")).toHaveText('Castro Valleykkk');
        //await expect.soft(page.locator("//div[@class=' css-1dimb5e-singleValue']")).toHaveValue('Castro Valleykkk');
        //await page.locator('.css-h14o9r-B').getByText;
        //div[@class=' css-1dimb5e-singleValue']
        

        //await page.getByRole('button', { name: 'Disaster relief' }).click();
        //await page.getByRole('button', { name: 'Animal welfare' }).click();
        //await page.getByRole('button', { name: 'No Poverty' }).click();
        //await page.getByRole('button', { name: 'Zero Hunger' }).click();
        //await page.getByRole('button', { name: 'Good Health and Well-being' }).click();
        
        //expect.soft(await page.getByRole('button', { name: 'Animal welfare' }));

        //await page.getByRole('button', { name: 'Animal welfare' }).click();
        //await page.getByRole('button', { name: 'Animal welfare' }).click();
        //xpect.soft(page.getByRole('button', { name: 'Disaster relief', exact: true  })).toHaveClass('MuiButtonBase-root MuiButton-root MuiLoadingButton-root MuiButton-custom MuiButton-customPrimary MuiButton-sizeMedium MuiButton-customSizeMedium MuiButton-root MuiLoadingButton-root MuiButton-custom MuiButton-customPrimary MuiButton-sizeMedium MuiButton-customSizeMedium css-1yvcwvm-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root');
        //expect.soft(page.getByRole('button', { name: 'Animal welfare', exact: true  })).toHaveClass('MuiButtonBase-root MuiButton-root MuiLoadingButton-root MuiButton-custom MuiButton-customPrimary MuiButton-sizeMedium MuiButton-customSizeMedium MuiButton-root MuiLoadingButton-root MuiButton-custom MuiButton-customPrimary MuiButton-sizeMedium MuiButton-customSizeMedium css-djahob-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root');
        expect.soft(page.getByRole('button', { name: 'Education', exact: true  })).toHaveClass('MuiButtonBase-root MuiButton-root MuiLoadingButton-root MuiButton-custom MuiButton-customPrimary MuiButton-sizeMedium MuiButton-customSizeMedium MuiButton-root MuiLoadingButton-root MuiButton-custom MuiButton-customPrimary MuiButton-sizeMedium MuiButton-customSizeMedium css-djahob-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root');
        expect.soft(page.getByRole('button', { name: 'People', exact: true  })).toHaveClass('MuiButtonBase-root MuiButton-root MuiLoadingButton-root MuiButton-custom MuiButton-customPrimary MuiButton-sizeMedium MuiButton-customSizeMedium MuiButton-root MuiLoadingButton-root MuiButton-custom MuiButton-customPrimary MuiButton-sizeMedium MuiButton-customSizeMedium css-djahob-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root');

        
        //span[normalize-space()='United Nations Sustainable Development Goals']/..//../div)[2]//div//img[@alt='No Poverty']/../following-sibling::div/*[name()='svg']//*[name()='path' and contains(@d,'M')]
        //expect.soft(page.locator("(//span[normalize-space()='United Nations Sustainable Development Goals']/..//../div)[2]//div//img[@alt='No Poverty']/../following-sibling::div/*[name()='svg']//*[name()='path' and contains(@d,'M')]")).toHaveValue('No Poverty');

        const no_poverty = (await page.locator("(//span[normalize-space()='United Nations Sustainable Development Goals']/..//../div)[2]//div//img[@alt='No Poverty']/../following-sibling::div/*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        expect.soft((await new utils(page).isCharacterCountMoreThan400(no_poverty)).valueOf()).toBe(false);
        const Clean_Water_and_Sanitation = (await page.locator("(//span[normalize-space()='United Nations Sustainable Development Goals']/..//../div)[2]//div//img[@alt='No Poverty']/../following-sibling::div/*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        expect.soft((await new utils(page).isCharacterCountMoreThan400(Clean_Water_and_Sanitation)).valueOf()).toBe(false);
        const Peace_Justice_and_Strong_Institutions = (await page.locator("(//span[normalize-space()='United Nations Sustainable Development Goals']/..//../div)[2]//div//img[@alt='No Poverty']/../following-sibling::div/*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        expect.soft((await new utils(page).isCharacterCountMoreThan400(Peace_Justice_and_Strong_Institutions)).valueOf()).toBe(false);
        const Sustainable_Cities_and_Communities = (await page.locator("(//span[normalize-space()='United Nations Sustainable Development Goals']/..//../div)[2]//div//img[@alt='No Poverty']/../following-sibling::div/*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        expect.soft((await new utils(page).isCharacterCountMoreThan400(Sustainable_Cities_and_Communities)).valueOf()).toBe(false);
        const Good_Health_and_Well_being= (await page.locator("(//span[normalize-space()='United Nations Sustainable Development Goals']/..//../div)[2]//div//img[@alt='No Poverty']/../following-sibling::div/*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        expect.soft((await new utils(page).isCharacterCountMoreThan400(Good_Health_and_Well_being)).valueOf()).toBe(false);
        const Quality_Education= (await page.locator("(//span[normalize-space()='United Nations Sustainable Development Goals']/..//../div)[2]//div//img[@alt='No Poverty']/../following-sibling::div/*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        expect.soft((await new utils(page).isCharacterCountMoreThan400(Quality_Education)).valueOf()).toBe(false);
        const Gender_Equality= (await page.locator("(//span[normalize-space()='United Nations Sustainable Development Goals']/..//../div)[2]//div//img[@alt='No Poverty']/../following-sibling::div/*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        expect.soft((await new utils(page).isCharacterCountMoreThan400(Gender_Equality)).valueOf()).toBe(false);
        const Affordable_and_Clean_Energy= (await page.locator("(//span[normalize-space()='United Nations Sustainable Development Goals']/..//../div)[2]//div//img[@alt='No Poverty']/../following-sibling::div/*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        expect.soft((await new utils(page).isCharacterCountMoreThan400(Affordable_and_Clean_Energy)).valueOf()).toBe(false);
        const Decent_Work_and_Economic_Growth= (await page.locator("(//span[normalize-space()='United Nations Sustainable Development Goals']/..//../div)[2]//div//img[@alt='No Poverty']/../following-sibling::div/*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        expect.soft((await new utils(page).isCharacterCountMoreThan400(Decent_Work_and_Economic_Growth)).valueOf()).toBe(false);
        const Industry_Innovation_and_Infrastructure= (await page.locator("(//span[normalize-space()='United Nations Sustainable Development Goals']/..//../div)[2]//div//img[@alt='No Poverty']/../following-sibling::div/*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        expect.soft((await new utils(page).isCharacterCountMoreThan400(Industry_Innovation_and_Infrastructure)).valueOf()).toBe(false);
        const Reduced_Inequalities= (await page.locator("(//span[normalize-space()='United Nations Sustainable Development Goals']/..//../div)[2]//div//img[@alt='No Poverty']/../following-sibling::div/*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        expect.soft((await new utils(page).isCharacterCountMoreThan400(Reduced_Inequalities)).valueOf()).toBe(false);
        const Responsible_Consumption_and_Production= (await page.locator("(//span[normalize-space()='United Nations Sustainable Development Goals']/..//../div)[2]//div//img[@alt='No Poverty']/../following-sibling::div/*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        expect.soft((await new utils(page).isCharacterCountMoreThan400(Responsible_Consumption_and_Production)).valueOf()).toBe(false);
        const Climate_Action= (await page.locator("(//span[normalize-space()='United Nations Sustainable Development Goals']/..//../div)[2]//div//img[@alt='No Poverty']/../following-sibling::div/*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        expect.soft((await new utils(page).isCharacterCountMoreThan400(Climate_Action)).valueOf()).toBe(false);
        const Life_Below_Water= (await page.locator("(//span[normalize-space()='United Nations Sustainable Development Goals']/..//../div)[2]//div//img[@alt='No Poverty']/../following-sibling::div/*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        expect.soft((await new utils(page).isCharacterCountMoreThan400(Life_Below_Water)).valueOf()).toBe(false);
        const Life_on_Land= (await page.locator("(//span[normalize-space()='United Nations Sustainable Development Goals']/..//../div)[2]//div//img[@alt='No Poverty']/../following-sibling::div/*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        expect.soft((await new utils(page).isCharacterCountMoreThan400(Life_on_Land)).valueOf()).toBe(false);
        const Partnerships_for_the_Goals= (await page.locator("(//span[normalize-space()='United Nations Sustainable Development Goals']/..//../div)[2]//div//img[@alt='No Poverty']/../following-sibling::div/*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        expect.soft((await new utils(page).isCharacterCountMoreThan400(Partnerships_for_the_Goals)).valueOf()).toBe(false);
        
        //////////////
        //expect.soft(await page.getByLabel('No Poverty').getAttribute);
        //expect.soft(await page.getByLabel('Zero Hunger').isChecked()).toBeTruthy();
        //expect.soft(await page.getByLabel('Good Health and Well-beingation').isChecked()).toBeTruthy();
        //expect.soft(await page.getByLabel('Quality Education').isChecked()).toBeFalsy();
        //expect.soft(await page.getByLabel('Gender Equality').isChecked()).toBeFalsy();
        //expect.soft(await page.getByLabel('Clean Water and Sanitation').isChecked()).toBeFalsy();
        //expect.soft(await page.getByLabel('Affordable and Clean Energy').isChecked()).toBeFalsy();
        //expect.soft(await page.getByLabel('Decent Work and Economic Growth').isChecked()).toBeFalsy();
        //expect.soft(await page.getByLabel('Industry, Innovation and Infrastructure').isChecked()).toBeFalsy();
        //expect.soft(await page.getByLabel('Reduced Inequalities').isChecked()).toBeFalsy();
        //expect.soft(await page.getByLabel('Sustainable Cities and Communities').isChecked()).toBeTruthy();
        //expect.soft(await page.getByLabel('Responsible Consumption and Production').isChecked()).toBeFalsy();
        //expect.soft(await page.getByLabel('Climate Action').isChecked()).toBeFalsy();
        //expect.soft(await page.getByLabel('Life Below Water').isChecked()).toBeFalsy();
        //expect.soft(await page.getByLabel('Life on Land').isChecked()).toBeFalsy();
        //expect.soft(await page.getByLabel('Peace, Justice and Strong Institutions').isChecked()).toBeFalsy();
        //expect.soft(await page.getByLabel('Partnerships for the Goals').isChecked()).toBeFalsy();

        //----data cleaning on UNSDG-----
        await page.getByRole('button', { name: 'No Poverty' }).click();
        await page.getByRole('button', { name: 'Clean Water and Sanitation' }).click();
        await page.getByRole('button', { name: 'Sustainable Cities and Communities' }).click();
        await page.getByRole('button', { name: 'Peace, Justice and Strong Institutions' }).click();

        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4500);

        

        //Step 03
        //await page.getByLabel('I verify that I am an authorized representative of this organization and have the right to act on its behalf in the creation and management of this profile. The organization and I agree to gudppl\'s Terms & Conditions.Please accept the terms and conditions').check();
        //expect.soft(page.getByLabel('I verify that I am an authorized representative of this organization and have the right to act on its behalf in the creation and management of this profile. The organization and I agree to gudppl\'s Terms & Conditions.Please accept the terms and conditions').isChecked()).toBeTruthy();
        //await page.getByLabel('1-50', { exact: true }).check();
        //expect.soft(await page.getByLabel('No', { exact: true }).isChecked()).toBeTruthy();
        expect.soft(await page.getByLabel('1-50', { exact: true}).isChecked()).toBeTruthy();

        //await page.locator('input[name="website"]').click();
        //await page.locator('input[name="website"]').fill('https://www.rugbyworldcup.com/2024');
        //await page.locator('input[name="profileInformation"]').click();
        //await page.locator('input[name="profileInformation"]').fill('https://www.espncricinfo2024.com/');
        expect.soft(await page.locator('input[name="website"]')).toHaveValue('https://www.rugbyworldcup.com/2024');
        expect.soft(await page.locator('input[name="profileInformation"]')).toHaveValue('https://www.espncricinfo2024.com/');

        await page.getByRole('button', { name: 'Update' }).click();
        await page.waitForTimeout(500);
        
        //----data cleaning on UNSDG-----
        // await page.getByRole('button', { name: 'No Poverty' }).click();
        // await page.getByRole('button', { name: 'Clean Water and Sanitation' }).click();
        // await page.getByRole('button', { name: 'Sustainable Cities and Communities' }).click();
        // await page.getByRole('button', { name: 'Peace, Justice and Strong Institutions' }).click();
    })

    test('Impact Report ', async ({ page }) => {

        await page.goto('https://strong-druid-08a763.netlify.app/');
        await page.waitForTimeout(3000);

        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.waitForTimeout(3400);
        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        await page.getByRole('button', { name: 'Impact Report' }).click();
        await page.waitForTimeout(1500);
        await page.getByRole('button', { name: 'Copy link' }).click();
        await expect.soft(page.getByText('Link copied to clipboard')).toBeVisible();
        await page.waitForTimeout(1500);
    })

    test('Login with new verified user, and join and leave the created organization- TC 940 @reg', async ({ page }) => {
        // Read Organization Name
        //orgName = await fs.readFile('./pages/orgName.txt', 'utf8');

        // Login and Complete Profile Preferences
        await page.goto('https://strong-druid-08a763.netlify.app/');
        await page.getByPlaceholder('Enter your email address').fill(email2);
        await page.getByPlaceholder('Enter your password').fill(pwd2);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.waitForTimeout(1000);
        
        //await expect.soft(page.getByRole('heading', { name: 'Hello, Chandler. Welcome to gudppl!' })).toHaveText("Hello, Chandler. Welcome to gudppl!");

        // Join Organization
        await page.getByRole('button', { name: 'Organizations' }).click();
        await page.getByText(orgName).click();
        await page.getByRole('button', { name: 'Join group' }).click();
        await page.locator('input[name="isVolunteer"]').check();
        await page.locator('input[name="isDonor"]').check();
        await page.getByRole('button', { name: 'Join group' }).click();
        await page.getByRole('button', { name: 'View supporters' }).click();
        await page.waitForTimeout(1500);
        //await page.locator('div').filter({ hasText: /^Supporters/ }).getByRole('button').first().click();
        //await page.locator('.MuiGrid-root > .MuiButtonBase-root').first().click();
        expect.soft(page.locator('div').filter({ hasText: /^SupportersCBChandler BlingMGMonicaz Gellerz$/ }));
        await page.waitForTimeout(1500);
        await page.locator('.MuiGrid-root > .MuiButtonBase-root').first().click();
        await page.waitForTimeout(1500);
        // Expect the text '2 Supporters' to exist on the page
        expect.soft(page.getByText('2 Supporters')).not.toBeNull();
        await page.getByRole('button', { name: 'Organizations' }).click();
        await page.getByRole('tab', { name: 'Groups joined' }).click();
        await expect.soft(page.getByText(orgName)).toBeVisible();
        expect.soft(page.getByRole('cell', { name: 'groupIcon ${orgName} Business' }).getByText('Business')).not.toBeNull();
        // Expect the causes within the specified row and cell
        expect.soft(
            await page.getByRole('row', { name: `groupIcon ${orgName} Business Animal welfare Education People 0 hours 1` })
                  .getByRole('cell', { name: 'Animal welfare Education People' })
            ).not.toBeNull();
        // Expect the text '0 hours' within the specified row
        expect.soft(
            await page.getByRole('row', { name: `groupIcon ${orgName} Business Animal welfare Education People 0 hours 1` })
                    .getByText('0 hours')
            ).not.toBeNull();
        // Expect the exact text '1' within the specified row
        expect.soft(
            await page.getByRole('row', { name: `groupIcon ${orgName} Business Animal welfare Education People 0 hours 1` })
                    .getByText('1', { exact: true })
            ).not.toBeNull(); 
        await page.waitForTimeout(5000);
        await page.getByText(orgName).click();
        await page.getByRole('button', { name: 'Edit groups' }).click();
        await page.getByRole('button', { name: 'Leave group' }).click();
        await page.getByRole('button', { name: 'Yes' }).click();
        await page.waitForTimeout(5000);

    });

    test('Login with google account @smoke', async () => {
        const browser = await chromium.launch({
            headless: false
        });
        

        // Load the saved session state from auth.json
        //26/05/2025
        const context = await browser.newContext({ storageState: 'auth.json' });
        const page = await context.newPage();

        // Go to the authenticated page directly
        await page.goto('https://strong-druid-08a763.netlify.app/'); // Adjust URL if needed
        // Check if we are already logged in by verifying an element that appears only when logged in
        const isLoggedIn = await page.isVisible('text=Hello, Sadith. Welcome to gudppl!');
        if (!isLoggedIn) {
            // If not logged in, go through the login flow
            await page.getByRole('button', { name: 'Continue with Google' }).click();
            //await page.getByRole('textbox', { name: 'Email or phone' }).fill('automationsadith@gmail.com');
            //await page.getByRole('button', { name: 'Next', exact: true }).click();
            //await page.waitForTimeout(20000); // Adjust timeout as needed for the page load
            //await page.getByRole('textbox', { name: 'Enter your password' }).fill('Bachu@121989');
            //await page.getByRole('button', { name: 'Next', exact: true }).click();
            await page.waitForTimeout(10000);
            await expect.soft(page.getByRole('heading', { name: 'Hello, Sadith. Welcome to gudppl' })).toHaveText("Hello, Sadith. Welcome to gudppl!");
            //await browser.close();
        }

        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        // Check that the text exists
        const profileText = page.locator("text='Sadith Automation'"); // Check for a partial match
        await expect(profileText).toBeVisible();

      });

    
    
   
    

})