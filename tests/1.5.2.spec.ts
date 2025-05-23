import { test, expect } from '@playwright/test'
import { promises as fs } from 'fs';
import utils from '../Functions/utils';
import path from 'path';

test.describe.configure({ timeout: 600000 });
test.describe.serial('API Testing', () => {

  const baseURL = 'https://reqres.in/api'

  const data = { method: 'POST' };
  const url = 'https://postman-echo.com/post'; // Replace this with your API endpoint
  const urlOPT = 'https://webhook.site/token/';

  let getOPTURL = '8c7f4ba8-56fc-4af0-a25c-fbb51a7717e4';
  let email = "07d28f33-a909-410c-8759-6c84eb5490f7@email.webhook.site";
  let pwd = "Smash@123";

  async function appendToFile(filePath: string, content: string): Promise<void> {
    await fs.appendFile(filePath, content);
  }
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  test('Create new user with OTP and email verification GUD-TC-78,GUD-TC-81 @reg', async ({ request, page, context }) => {



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
    
    


  });

  test('Login with verified user and Signup Flow Changes GUD-2440, GUD-2444 @reg ', async ({ page }) => {
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
    // GUD-TC-1321 Verify that a user can upload a valid profile picture
    await page.getByRole('button', { name: 'Upload picture' }).click();
    await page.getByRole('img', { name: '/images/profilePictures/elephant.png' }).click();
    await page.getByPlaceholder('Enter your first name').click();
    await page.getByPlaceholder('Enter your first name').fill('Racheal');
    await page.getByPlaceholder('Enter your last name').click();
    await page.getByPlaceholder('Enter your last name').fill('Green');
    await page.getByPlaceholder('DD').click();
    await page.getByPlaceholder('DD').fill('21');
    await page.getByPlaceholder('MM').click();
    await page.getByPlaceholder('MM').fill('6');
    await page.getByPlaceholder('YYYY').click();
    await page.getByPlaceholder('YYYY').fill('1987');
    await page.locator('label').filter({ hasText: 'girl/woman' }).getByLabel('controlled').check();
    await page.getByRole('button', { name: 'Skip to Home' }).click();
    await page.waitForTimeout(3400);
    await page.getByRole('button', { name: 'Complete your profile now' }).click();
    expect(page.getByRole('heading', { name: 'Causes you care about' }));
    await page.getByRole('button', { name: 'Skip to home' }).click();
    await page.waitForTimeout(3400);
    await page.getByRole('button', { name: 'Profile', exact: true }).click();
    await page.waitForTimeout(500);
    expect(page.getByRole('img', { name: 'profile' }).nth(1));
    await page.getByRole('button', { name: 'Edit profile' }).click();
    await page.waitForTimeout(500);
    //await expect(page.getByRole('img', { name: 'profile image' })).toHaveAttribute('src', /elephant\.png/);

    await expect.soft(page.getByPlaceholder('Enter your first name')).toHaveValue("Racheal");
    await expect.soft(page.getByPlaceholder('Enter your last name')).toHaveValue("Green");
    //await expect.soft(page.getByPlaceholder('DD')).toHaveValue("5");    // bug
    await expect.soft(page.getByPlaceholder('MM')).toHaveValue("6");
    await expect.soft(page.getByPlaceholder('YYYY')).toHaveValue("1987");
    // await page.locator('label').filter({ hasText: 'boy/man' }).getByRole('checkbox', { name: 'controlled' }).uncheck();
    // await page.locator('label').filter({ hasText: 'boy/man' }).getByRole('checkbox', { name: 'controlled' }).check();
    expect.soft(await page.locator('label').filter({ hasText: 'boy/man' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeFalsy();
    expect.soft(await page.locator('label').filter({ hasText: 'girl/woman' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeTruthy();
    expect.soft(await page.getByPlaceholder('Let me type...')).toBeEmpty();
    await page.getByRole('button', { name: 'Skip to home' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Profile', exact: true }).click();
    await page.waitForTimeout(1500);
    page.locator('.css-1gcqr0l > .MuiButtonBase-root').click();
    await page.getByLabel('close').click();
    await page.locator('.css-1gcqr0l > .MuiButtonBase-root').click();
    await page.getByRole('img', { name: '/images/profilePictures/ambulance.png' }).click();
    await expect.soft(page.getByText('Profile picture uploaded successfully')).toHaveText("Profile picture uploaded successfully");
    await page.waitForTimeout(1500);


        
        
  });

})