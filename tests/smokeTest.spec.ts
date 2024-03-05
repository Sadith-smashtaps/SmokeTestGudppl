import { test, expect } from '@playwright/test'
import { promises as fs } from 'fs';
import utils from '../Functions/utils';

test.describe.configure({ timeout: 600000 });
test.describe.serial('API Testing', () => {

    const baseURL = 'https://reqres.in/api'

    const data = { method: 'POST' };
    const url = 'https://postman-echo.com/post'; // Replace this with your API endpoint
    const urlOPT = 'https://webhook.site/token/';

    let getOPTURL = '8c7f4ba8-56fc-4af0-a25c-fbb51a7717e4';
    //let email = "waruni+158@smashtaps.com";
    let email = "a6f4e295-3fc4-4871-acb5-86acac41918d@email.webhook.site";    
    let pwd = "User@123";//Smash@123
    let orgName = "Org126963";


    async function appendToFile(filePath: string, content: string): Promise<void> {
        await fs.appendFile(filePath, content);
    }
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    test('Create new user with OTP and email verification GUD-TC-78,GUD-TC-81 ', async ({ request, page, context }) => {



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

    test('Login with verified user and complete profile preferences with all 7 steps GUD-TC-13 @smoke ' , async ({ page }) => {
        //await test.setTimeout(50000);
        await page.goto('https://next.gudppl.com');
        // await page.pause();        

        await page.getByPlaceholder('Enter your email address').click();
        console.log('email from Login = ' + email)
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();

        //////////////////////////////////////////////////////////
        // await page.getByRole('button', { name: 'Complete your profile now' }).click();
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

        await expect.soft(page.getByRole('heading', { name: 'Welcome to gudppl!' })).toHaveText("Welcome to gudppl!");

     



    })
    

    test('Create organization @reg', async ({ page }) => {

        await page.goto('https://next.gudppl.com');
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
        await page.getByRole('button', { name: 'Create an organization' }).click();
        await page.getByPlaceholder('Enter organization name').click();
        await page.getByPlaceholder('Enter organization name').fill('Org1' + randomNumber);
        orgName = 'Org1' + randomNumber;
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
        //await page.locator('.css-h14o9r-B').click();
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
        await page.locator('input[name="website"]').fill('https://www.rugbyworldcup.com/2023');
        await page.locator('input[name="profileInformation"]').click();
        await page.locator('input[name="profileInformation"]').fill('https://www.espncricinfo.com/');
        //await page.getByLabel('I verify that I am an authorized representative of this organization and have the right to act on its behalf in the creation and management of this profile. The organization and I agree to gudppl\'s term and conditions.').check();
        await page.getByLabel('I verify that I am an authorized representative of this organization and have the right to act on its behalf in the creation and management of this profile. The organization and I agree to gudppl\'s Terms & Conditions.').check();
        await page.getByRole('button', { name: 'Complete' }).click();
        await page.waitForTimeout(500);
        // https://gudppl.atlassian.net/browse/GUD-1062
        // await page.getByRole('button', { name: 'Got it' }).click();
       
        // await page.getByText('+94774444444').click();
        // await page.locator('.MuiBox-root > div:nth-child(2) > div > div > .MuiBox-root').first().click();
       
        // await page.getByRole('button', { name: 'No Poverty' }).click();
        // await page.getByRole('button', { name: 'Clean Water and Sanitation' }).click();
        // await page.getByRole('button', { name: 'Sustainable Cities and Communities' }).click();
        // await page.getByRole('button', { name: 'Peace, Justice and Strong Institutions' }).click();





    })

    test('add hours and approve ', async ({ page }) => {

        await page.goto('https://next.gudppl.com');
        

        await page.getByPlaceholder('Enter your email address').click();
        console.log('email ID Login for third test case is = ' + email)
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();

        await page.waitForTimeout(1000);

        await page.getByRole('button', { name: 'Add hours' }).click();
        await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div/div/div[1]/div[2]/div/input").fill('16/09/2023');
        await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div/div/div[2]/div[2]/div/input").fill('16/09/2023');
        await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div[2]/div/div[2]/div/div/input").fill('02');        
        await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div[2]/div/div[3]/div/div/input").fill('30');        
        await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div[3]/div/div[2]/div/div/textarea").first().fill('activity decription');
        await page.getByLabel('Remote').check();
        await page.getByPlaceholder('Add skills and talents').click();
        await page.getByPlaceholder('Add skills and talents').fill('art ');
        await page.getByRole('option', { name: 'Art exhibitions and curation' }).click();
        await page.getByRole('button', { name: 'Animal welfare' }).click();
        await page.getByRole('button', { name: 'Zero Hunger' }).click();
        await page.getByRole('button', { name: 'No Poverty' }).click();
        await page.getByPlaceholder('Organization name').click();
        await page.getByPlaceholder('Organization name').fill(orgName);
        await page.getByRole('heading', { name: orgName }).click();
        await page.getByPlaceholder('Enter name of volunteer coordinator/supervisor').click();
        await page.getByPlaceholder('Enter name of volunteer coordinator/supervisor').fill('rajapaksha');
        //await page.getByRole('button', { name: 'Invite to verify hours' }).click();
        await page.getByRole('button', { name: 'Submit' }).click();
        //await page.getByRole('button', { name: 'Got it!' }).click();
        await page.getByRole('button', { name: 'Got it' }).click();
      
        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        await page.getByText('Pending').nth(1).click();
        await page.getByText('activity decription').first().click();
        await page.getByRole('heading', { name: '2h 30m' }).first().click();
        await page.getByRole('tab', { name: 'Pending' }).click();
        await page.getByText('Pending').nth(1).click();
        await page.getByRole('heading', { name: '2h 30m' }).first().click();
        await page.getByText('activity decription').first().click();
        await page.getByRole('button', { name: 'Organizations' }).click();
        await page.getByRole('button', { name: 'Verify Hours' }).click();
        
        await page.getByText('pending').nth(1).click();
        await page.getByRole('table', { name: 'responsive table' }).getByRole('button').first().click();
      
        await page.getByRole('button', { name: 'Approve' }).click();
        //await page.getByRole('button', { name: 'Got it!' }).click();
        await page.getByRole('button', { name: 'Got it' }).click();
        await page.getByText('approved').first().click();
        await page.getByRole('button', { name: 'Profile' }).click();
        await page.getByText('Verified').first().click();
        await page.getByRole('tab', { name: 'Approved' }).click();
        await page.getByText('Verified').first().click();



    })

    test('add hours with decline ', async ({ page }) => {

        await page.goto('https://next.gudppl.com');        

        await page.getByPlaceholder('Enter your email address').click();
        console.log('email ID Login for third test case is = ' + email)
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();

        await page.waitForTimeout(1000);

        await page.getByRole('button', { name: 'Add hours' }).click();
        await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div/div/div[1]/div[2]/div/input").fill('16/09/2023');
        await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div/div/div[2]/div[2]/div/input").fill('16/09/2023');
        await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div[2]/div/div[2]/div/div/input").fill('02');        
        await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div[2]/div/div[3]/div/div/input").fill('30');        
        await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div[3]/div/div[2]/div/div/textarea").first().fill('activity decription');
        await page.getByLabel('Remote').check();
        await page.getByPlaceholder('Add skills and talents').click();
        await page.getByPlaceholder('Add skills and talents').fill('art ');
        await page.getByRole('option', { name: 'Art exhibitions and curation' }).click();
        await page.getByRole('button', { name: 'Animal welfare' }).click();
        await page.getByRole('button', { name: 'Zero Hunger' }).click();
        await page.getByRole('button', { name: 'No Poverty' }).click();
        await page.getByPlaceholder('Organization name').click();        
        await page.getByPlaceholder('Organization name').fill(orgName);
        await page.getByRole('heading', { name: orgName }).click();
        await page.getByPlaceholder('Enter name of volunteer coordinator/supervisor').click();
        await page.getByPlaceholder('Enter name of volunteer coordinator/supervisor').fill('rajapaksha');
        //await page.getByRole('button', { name: 'Invite to verify hours' }).click();
        await page.getByRole('button', { name: 'Submit' }).click();
        //await page.getByRole('button', { name: 'Got it!' }).click();
        await page.getByRole('button', { name: 'Got it' }).click();

        await page.getByRole('button', { name: 'View request' }).click();
        await page.getByText('pending', { exact: true }).click();
        await page.getByRole('cell', { name: 'pending' }).getByRole('button').click();
        await page.getByRole('button', { name: 'Deny' }).click();
        await page.getByRole('textbox').click();
        await page.getByRole('textbox').fill('This is wrong');
        await page.getByRole('button', { name: 'Decline' }).click();
        await page.getByText('declined', { exact: true }).click();
     //   await page.getByRole('row', { name: 'MG Monica Geller 2h 30m 16/09/2023 - 16/09/2023 declined' }).getByText('16/09/2023 - 16/09/2023').click();
        await page.getByRole('row', { name: 'MG Monica Geller 2h 30m 16/09/2023 - 16/09/2023 Remote declined' }).getByRole('cell', { name: '16/09/2023 - 16/09/2023' }).click();
        await page.getByRole('button', { name: 'Profile' }).click();
        await page.getByRole('paragraph').filter({ hasText: 'Declined' }).click();
        await page.getByText('16/09/2023 - 16/09/2023').first().click();
        await page.getByRole('tab', { name: 'Declined' }).click();
        await page.getByRole('paragraph').filter({ hasText: 'Declined' }).click();
        //await page.getByText('16/09/2023 - 16/09/2023').click();


    })

    test('add hours with Amendments ', async ({ page }) => {

        await page.goto('https://next.gudppl.com');        

        await page.getByPlaceholder('Enter your email address').click();
        console.log('email ID Login for third test case is = ' + email)
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();

        await page.waitForTimeout(1000);

        await page.getByRole('button', { name: 'Add hours' }).click();
        await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div/div/div[1]/div[2]/div/input").fill('16/09/2023');
        await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div/div/div[2]/div[2]/div/input").fill('16/09/2023');
        await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div[2]/div/div[2]/div/div/input").fill('08');        
        await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div[2]/div/div[3]/div/div/input").fill('30');        
        await page.locator("//h4[normalize-space()='Add Hours']/../../../../div[3]/div[2]/div/div/div/form/div/div[3]/div/div[2]/div/div/textarea").first().fill('activity decription');
        await page.getByLabel('Remote').check();
        await page.getByPlaceholder('Add skills and talents').click();
        await page.getByPlaceholder('Add skills and talents').fill('art ');
        await page.getByRole('option', { name: 'Art exhibitions and curation' }).click();
        await page.getByRole('button', { name: 'Animal welfare' }).click();
        await page.getByRole('button', { name: 'Zero Hunger' }).click();
        await page.getByRole('button', { name: 'No Poverty' }).click();
        await page.getByPlaceholder('Organization name').click();        
        await page.getByPlaceholder('Organization name').fill(orgName);
        await page.getByRole('heading', { name: orgName }).click();
        await page.getByPlaceholder('Enter name of volunteer coordinator/supervisor').click();
        await page.getByPlaceholder('Enter name of volunteer coordinator/supervisor').fill('rajapaksha');
        //await page.getByRole('button', { name: 'Invite to verify hours' }).click();
        await page.getByRole('button', { name: 'Submit' }).click();
        //await page.getByRole('button', { name: 'Got it!' }).click();
        await page.getByRole('button', { name: 'Got it' }).click();

        await page.getByRole('button', { name: 'View request' }).click();        
        await page.getByText('pending', { exact: true }).click();
        await page.getByRole('cell', { name: 'pending' }).getByRole('button').click();
        await page.getByRole('button', { name: 'Amend' }).click();
        // await page.locator('[id="\\:r4j\\:"]').click();
        // await page.locator('[id="\\:r4j\\:"]').fill('08');
        //await page.getByText('activity decription').fill('activity decription amendm');
        await page.getByText('activity decription').fill('activity decription amendment');
        await page.getByRole('button', { name: 'Disaster relief' }).click();
        await page.getByRole('button', { name: 'Good Health and Well-being' }).click();
        await page.locator('textarea').nth(2).click();
        await page.locator('textarea').nth(2).fill('I just amended');
        await page.getByRole('button', { name: 'Amend & Approve' }).click();
        //await page.getByText('8h 30m').click();     
       // await page.getByRole('row', { name: 'MG Monica Geller 8h 30m 16/09/2023 - 16/09/2023 Remote approved' }).getByText('approved').click();
       // await page.getByRole('row', { name: 'MG Monica Geller 8h 30m 16/09/2023 - 16/09/2023 Remote approved' }).getByRole('button').click();

        //await page.getByText('8h 30m').click();
        await page.getByText('Disaster relief').click();
        await page.getByText('activity decription amendment').click();
       


    })

    test('User Profile @reg ', async ({ page }) => {
        //GUD-1443 bug is open
        await page.goto('https://next.gudppl.com');
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

  

   

})

