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

  test('Login with verified user and User Profile @reg ', async ({ page }) => {
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
    await page.getByPlaceholder('DD').fill('26');
    await page.getByPlaceholder('MM').click();
    await page.getByPlaceholder('MM').fill('6');
    await page.getByPlaceholder('YYYY').click();
    await page.getByPlaceholder('YYYY').fill('1990');
    await page.locator('label').filter({ hasText: 'girl/woman' }).getByLabel('controlled').check();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(3400);

  });

  test('Verify clicking on the Next button after selecting options in the Causes you care about screen.. - GUD-TC-50 and GUD-TC-48  ', async ({ request, page, context }) => {
  
    await page.goto('https://next.gudppl.com');


        await page.getByPlaceholder('Enter your email address').click();
        console.log('email ID Login for third test case is = ' + email)
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();

        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'Complete your profile now' }).click();
    //Add causes

    //GUD-TC-48-Verify clicking on the Next button without selecting any option in the 'Causes you care about' screen
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(3400);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(3400);
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(3400);
    await page.getByRole('button', { name: 'Select all and proceed' }).click();
    await page.waitForTimeout(3400);
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(3400);
    await page.getByLabel('Animal welfare').uncheck();
    await page.getByLabel('Disaster relief').uncheck();
    await page.getByLabel('Environment').uncheck();
    await page.getByLabel('Education').uncheck();
    await page.getByLabel('People').uncheck();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(3400);
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(3400);

    //GUD-TC-50-Verify clicking on the Next button after selecting options in the 'Causes you care about' screen
    await page.getByLabel('Animal welfare').check();
    await page.getByLabel('Disaster relief').check();
    await page.getByLabel('Environment').check();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(3400);
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(3400);
    await page.getByRole('button', { name: 'Select all and proceed' }).click();
    await page.waitForTimeout(3400);
  
  });

  test('Verify user able to select up to 5 UN Sustainable Development Goals... - GUD-TC-31 and GUD-TC-32 ', async ({ request, page, context }) => {
    
    await page.goto('https://next.gudppl.com');


        await page.getByPlaceholder('Enter your email address').click();
        console.log('email ID Login for third test case is = ' + email)
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();

        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'Complete your profile now' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400);
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400);
    //Add UNSDGs
    //GUD-TC-31-Verify user able to select up to 5 UN Sustainable Development Goals.
    await page.getByRole('button', { name: 'zero_hunger' }).click();
    await page.getByRole('button', { name: 'good_health' }).click();
    await page.getByRole('button', { name: 'gender_equality' }).click();
    await page.getByRole('button', { name: 'iii' }).click();
    await page.getByRole('button', { name: 'climate_action' }).click();
    await page.waitForTimeout(3400);

    //GUD-TC-32-Verify user receives and warning message if user select more than 5 UN sustainable development goals.
    await page.getByRole('button', { name: 'life_water' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect.soft(page.getByText('Please select maximum of 5 options')).toHaveText("Please select maximum of 5 options");
    await page.waitForTimeout(5000);

    //remove all selected UN sustainable development goals.
    await page.getByRole('button', { name: 'zero_hunger' }).click();
    await page.getByRole('button', { name: 'good_health' }).click();
    await page.getByRole('button', { name: 'gender_equality' }).click();
    await page.getByRole('button', { name: 'iii' }).click();
    await page.getByRole('button', { name: 'climate_action' }).click();
    await page.getByRole('button', { name: 'life_water' }).click();
    await page.waitForTimeout(3400);

    //GUD-TC-33
    await page.getByRole('button', { name: 'no_poverty' }).click();
    await page.getByRole('button', { name: 'quality_education' }).click();
    await page.getByRole('button', { name: 'clean_water' }).click();
    await page.getByRole('button', { name: 'clean_energy' }).click();
    await page.getByRole('button', { name: 'decent_work' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(3400);
    await page.getByRole('button', { name: 'Back' }).click();
    // Check the status of each goal to see if it is selected
    const noPovertySelected = await page.getByRole('button', { name: 'no_poverty' }).getAttribute('aria-pressed');
    const qualityEducationSelected = await page.getByRole('button', { name: 'quality_education' }).getAttribute('aria-pressed');
    const cleanWaterSelected = await page.getByRole('button', { name: 'clean_water' }).getAttribute('aria-pressed');
    const cleanEnergySelected = await page.getByRole('button', { name: 'clean_energy' }).getAttribute('aria-pressed');
    const decentWorkSelected = await page.getByRole('button', { name: 'decent_work' }).getAttribute('aria-pressed');

    // Log the status of each goal to verify if it was previously selected
    console.log('no_poverty selected:', noPovertySelected === 'true');
    console.log('quality_education selected:', qualityEducationSelected === 'true');
    console.log('clean_water selected:', cleanWaterSelected === 'true');
    console.log('clean_energy selected:', cleanEnergySelected === 'true');
    console.log('decent_work selected:', decentWorkSelected === 'true');

    // Unselect the following goals
    await page.getByRole('button', { name: 'quality_education' }).click();
    await page.getByRole('button', { name: 'clean_water' }).click();
    await page.getByRole('button', { name: 'clean_energy' }).click();

    // Click on the "Next" button to proceed
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(3400);

    // Click the "Back" button from Your skills & talents page to go back to the Sustainable Development Goals page
    await page.getByRole('button', { name: 'Back' }).click();

    // Wait for the page to load completely
    await page.waitForTimeout(3400);

    // Check the status of the remaining selected goals to see if they are still selected
    const isNoPovertySelected = await page.getByRole('button', { name: 'no_poverty' }).getAttribute('aria-pressed');
    const isDecentWorkSelected = await page.getByRole('button', { name: 'decent_work' }).getAttribute('aria-pressed');

    // Log the status of the remaining selected goals to verify if they are still selected
    console.log('no_poverty selected:', isNoPovertySelected === 'true');
    console.log('decent_work selected:', isDecentWorkSelected === 'true');

    // Verify if the goals were unselected correctly
    const isQualityEducationSelected = await page.getByRole('button', { name: 'quality_education' }).getAttribute('aria-pressed');
    const isCleanWaterSelected = await page.getByRole('button', { name: 'clean_water' }).getAttribute('aria-pressed');
    const isCleanEnergySelected = await page.getByRole('button', { name: 'clean_energy' }).getAttribute('aria-pressed');

    console.log('quality_education selected:', isQualityEducationSelected === 'false');
    console.log('clean_water selected:', isCleanWaterSelected === 'false');
    console.log('clean_energy selected:', isCleanEnergySelected === 'false');

    // Select the following goals
    await page.getByRole('button', { name: 'quality_education' }).click();
    await page.getByRole('button', { name: 'reduced_inequalities' }).click();
    await page.getByRole('button', { name: 'good_health' }).click();
    await page.getByRole('button', { name: 'zero_hunger' }).click();
    await page.getByRole('button', { name: 'iii' }).click();

    // Unselect the following goals
    await page.getByRole('button', { name: 'no_poverty' }).click();
    await page.getByRole('button', { name: 'decent_work' }).click();

    // Click on the "Next" button
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(3400);

    // Click on the "Back" button to return to the Sustainable Development Goals page
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(3400);

    // Check the status of the remaining selected goals
  {
      const isQualityEducationSelected = await page.getByRole('button', { name: 'quality_education' }).getAttribute('aria-pressed');
      const isReducedInequalitiesSelected = await page.getByRole('button', { name: 'reduced_inequalities' }).getAttribute('aria-pressed');
      const isGoodHealthSelected = await page.getByRole('button', { name: 'good_health' }).getAttribute('aria-pressed');
      const isZeroHungerSelected = await page.getByRole('button', { name: 'zero_hunger' }).getAttribute('aria-pressed');
      const isIIISelected = await page.getByRole('button', { name: 'iii' }).getAttribute('aria-pressed');

      // Log the status of the remaining selected goals
      console.log('quality_education selected:', isQualityEducationSelected === 'true');
      console.log('reduced_inequalities selected:', isReducedInequalitiesSelected === 'true');
      console.log('good_health selected:', isGoodHealthSelected === 'true');
      console.log('zero_hunger selected:', isZeroHungerSelected === 'true');
      console.log('iii selected:', isIIISelected === 'true');
  }

  // Check the status of the unselected goals
  {
      const isNoPovertySelected = await page.getByRole('button', { name: 'no_poverty' }).getAttribute('aria-pressed');
      const isDecentWorkSelected = await page.getByRole('button', { name: 'decent_work' }).getAttribute('aria-pressed');

      // Log the status of the unselected goals
      console.log('no_poverty selected:', isNoPovertySelected === 'false');
      console.log('decent_work selected:', isDecentWorkSelected === 'false');
  }

    // Step 1: Capture the initial state of the goals before unselecting
    const initialQualityEducationState = await page.getByRole('button', { name: 'quality_education' }).getAttribute('aria-pressed');
    const initialReducedInequalitiesState = await page.getByRole('button', { name: 'reduced_inequalities' }).getAttribute('aria-pressed');
    const initialGoodHealthState = await page.getByRole('button', { name: 'good_health' }).getAttribute('aria-pressed');
    const initialZeroHungerState = await page.getByRole('button', { name: 'zero_hunger' }).getAttribute('aria-pressed');
    const initialIIIState = await page.getByRole('button', { name: 'iii' }).getAttribute('aria-pressed');

    // Step 2: Unselect the following goals
    await page.getByRole('button', { name: 'iii' }).click();
    await page.getByRole('button', { name: 'quality_education' }).click();
    await page.getByRole('button', { name: 'good_health' }).click();
    await page.getByRole('button', { name: 'zero_hunger' }).click();

    // Step 3: Click the "Back" button
    await page.getByRole('button', { name: 'Back' }).click();

    // Click the "Next" button to proceed
    await page.getByRole('button', { name: 'Next' }).click();

    // Step 4: Verify that the goals have reverted to their initial state
    {
        const currentQualityEducationState = await page.getByRole('button', { name: 'quality_education' }).getAttribute('aria-pressed');
        const currentReducedInequalitiesState = await page.getByRole('button', { name: 'reduced_inequalities' }).getAttribute('aria-pressed');
        const currentGoodHealthState = await page.getByRole('button', { name: 'good_health' }).getAttribute('aria-pressed');
        const currentZeroHungerState = await page.getByRole('button', { name: 'zero_hunger' }).getAttribute('aria-pressed');
        const currentIIIState = await page.getByRole('button', { name: 'iii' }).getAttribute('aria-pressed');

        // Log and compare the states to ensure they are the same as before
        console.log('quality_education same as before:', initialQualityEducationState === currentQualityEducationState);
        console.log('reduced_inequalities same as before:', initialReducedInequalitiesState === currentReducedInequalitiesState);
        console.log('good_health same as before:', initialGoodHealthState === currentGoodHealthState);
        console.log('zero_hunger same as before:', initialZeroHungerState === currentZeroHungerState);
        console.log('iii same as before:', initialIIIState === currentIIIState);

        // Optionally, you can use assertions to automatically check for equality
        expect(initialQualityEducationState).toBe(currentQualityEducationState);
        expect(initialReducedInequalitiesState).toBe(currentReducedInequalitiesState);
        expect(initialGoodHealthState).toBe(currentGoodHealthState);
        expect(initialZeroHungerState).toBe(currentZeroHungerState);
        expect(initialIIIState).toBe(currentIIIState);
    }
  
  });

  test('Verify Add skills and talents... ', async ({ request, page, context }) => {
    
    await page.goto('https://next.gudppl.com');


        await page.getByPlaceholder('Enter your email address').click();
        console.log('email ID Login for third test case is = ' + email)
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();

        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'Complete your profile now' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400);
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400);
    // Click the "Next" button to proceed add skills and talents page
    await page.getByRole('button', { name: 'Next' }).click();

    //Add skills and tallents
    //GUD-TC-106
    await page.getByPlaceholder('Add skills and talents').click();
    //Click on the 'Accounting' option
    await page.getByPlaceholder('Add skills and talents').fill('Account');
    //await page.getByRole('option', { name: 'Accounting' }).click();   
    await page.getByRole('option', { name: 'Accounting', exact: true }).click();
    await page.waitForTimeout(3400);
    //Close the 'Accounting' option by clicking the 'X' button
    await page.locator('.MuiChip-deleteIcon').nth(0).click();
    await page.waitForTimeout(3400);

    //GUD-TC-109
    //Select the skills
    await page.getByPlaceholder('Add skills and talents').fill('Baby');
    await page.getByRole('option', { name: 'Babysitting' }).click();
    await page.getByPlaceholder('Add skills and talents').fill('Art');
    await page.getByRole('option', { name: 'Art history' }).click();
    await page.getByPlaceholder('Add skills and talents').fill('Danc');
    await page.getByRole('option', { name: 'Dancing' }).click();
    await page.getByPlaceholder('Add skills and talents').fill('Knit');
    await page.getByRole('option', { name: 'Knitting', exact: true }).click();

    //Click the "x" icon to remove 'Babysitting' and 'Art history'
    await page.locator('.MuiChip-deleteIcon').nth(3).click();
    await page.locator('.MuiChip-deleteIcon').nth(2).click();
    
    expect.soft(await page.locator("//span[normalize-space()='Dancing']").isVisible()).toBeTruthy();
    expect.soft(await page.locator("//span[normalize-space()='Knitting']").isVisible()).toBeTruthy();
    await page.waitForTimeout(3400);

    //GUD-TC-112
    //Click on the delete icon for the Tamil language
    await page.getByRole('row', { name: 'Tamil delete' }).getByRole('button', { name: 'delete' }).click();
    await page.waitForTimeout(3400);
    //Ensure that 'Tamil' is no longer present in the list of selected languages
    await expect(page.getByRole('row', { name: 'Tamil delete' })).not.toBeVisible();
    await page.getByText('Add language').click();
    await page.getByPlaceholder('Enter language name').click();
    await page.getByPlaceholder('Enter language name').fill('Tamil');
    await page.getByRole('option', { name: 'Tamil' }).click();
    await page.getByRole('button', { name: 'Add' }).click();
    //GUD-TC-137 Verify the check box behaviour when user select the "All" check box.
    await page.getByRole('row', { name: 'English' }).getByRole('checkbox').first().check();
    //await page.getByRole('row', { name: 'Sinhala delete' }).getByRole('checkbox').first().check();
    //await page.getByRole('row', { name: 'Tamil delete' }).getByRole('checkbox').first().check();
    //GUD-TC-141
    await page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(1).uncheck();
    await page.getByRole('row', { name: 'Sinhala delete' }).getByRole('button', { name: 'delete' }).click();
    //await page.getByRole('row', { name: 'Tamil delete' }).getByRole('button', { name: 'delete' }).click();
    await page.getByRole('button', { name: 'delete' }).click();
    //await page.waitForTimeout(3400);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Back' }).click();
    //GUD-TC-146 Verify the add language pop up button functionalities
    await page.getByText('Add language').click();
    await page.getByRole('button', { name: 'close' }).click();
    await page.getByText('Add language').click();
    await page.getByPlaceholder('Enter language name').click();
    await page.getByPlaceholder('Enter language name').fill('Jap');
    await page.getByRole('option', { name: 'Japanese' }).click();
    await page.getByRole('button', { name: 'Add' }).click();
    await page.waitForTimeout(3400);
    //GUD-TC-147
    //await page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(1).check();
    //await page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(2).check();
    //await page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(3).check();
    //await page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(4).check();
    //GUD-TC-150
    await page.getByRole('button', { name: 'Skip this, I’ll do it later' }).click();
    await expect.soft(page.getByRole('heading', { name: 'Hello, Monica. Welcome to gudppl!' })).toHaveText("Hello, Monica. Welcome to gudppl!");

  });

  test('Verify Add Avalabilty...', async ({ request, page, context }) => {

    await page.goto('https://next.gudppl.com');


        await page.getByPlaceholder('Enter your email address').click();
        console.log('email ID Login for third test case is = ' + email)
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();

        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'Complete your profile now' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400);
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400);
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400);
        await page.getByRole('row', { name: 'Sinhala delete' }).getByRole('button', { name: 'delete' }).click();
        await page.getByRole('button', { name: 'delete' }).click();  
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400);

        //GUD-TC-62 Verify selecting a day in the 'Availability to volunteer' screen
        // Step 1: Select a day (Monday in this case)
        await page.getByLabel('Monday').check();

        // Step 2: Click on the "Next" button
        await page.getByRole('button', { name: 'Next' }).click();

        // Verify that the error message "You need to select a time of the day to proceed" is displayed
        await expect(page.getByText('You need to select a time of the day to proceed')).toBeVisible();
        
        // Step 3: Select the 'Morning' slot for 'Monday'
        await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).check();

        // Verify that the 'Morning' slot for 'Monday' is selected
        const isSlotSelected = await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).isChecked();
        expect(isSlotSelected).toBe(true);  // Assert that the checkbox is checked

        // Step 4: Select the 'Morning' and 'Afternoon' slots for 'Tuesday'
        await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(1).check(); // Morning
        await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).check(); // Afternoon

        // Verify that the 'Morning' and 'Afternoon' slots for 'Tuesday' are selected

        // Verify 'Morning' slot is checked
        const isMorningSlotSelected = await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(1).isChecked();
        expect(isMorningSlotSelected).toBe(true);

        // Verify 'Afternoon' slot is checked
        const isAfternoonSlotSelected = await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).isChecked();
        expect(isAfternoonSlotSelected).toBe(true);

        // Step 5: Click on the 'Next' button
        await page.getByRole('button', { name: 'Next' }).click();

        // Verify the success message "Availability updated successfully"
        await expect(page.getByText('Availability updated successfully')).toBeVisible();

        // Step 6: Click on the 'Back' button on the 'Complete your profile' screen
        await page.getByRole('button', { name: 'Back' }).click();

        // Verify that the user is navigated to the 'Availability to volunteer' screen
        // The 'Availability to volunteer' screen has a unique heading text to identify it
        await expect(page.getByRole('heading', { name: 'Availability to volunteer' })).toBeVisible();

        // Verify that the previously selected slots options are displayed

        // Verify 'Morning' slot for 'Tuesday' is still selected
        const isTuesdayMorningSelected = await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(1).isChecked();
        expect(isTuesdayMorningSelected).toBe(true);

        // Verify 'Afternoon' slot for 'Tuesday' is still selected
        const isTuesdayAfternoonSelected = await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).isChecked();
        expect(isTuesdayAfternoonSelected).toBe(true);

        //GUD-TC-68 Verify selecting multiple days in the 'Availability to volunteer' screen
        //clear all selected slots
        await page.getByLabel('Monday').uncheck();
        await page.getByLabel('Tuesday').uncheck();

        // Step 1: Select multiple days
        await page.getByLabel('Monday').check();     // Select 'Monday'
        await page.getByLabel('Tuesday').check();    // Select 'Tuesday'
        await page.getByLabel('Wednesday').check();  // Select 'Wednesday'

        // Verify that the slots for the selected days are checked successfully

        // Verify 'Monday' is selected
        const isMondaySelected = await page.getByLabel('Monday').isChecked();
        expect(isMondaySelected).toBe(true);

        // Verify 'Tuesday' is selected
        const isTuesdaySelected = await page.getByLabel('Tuesday').isChecked();
        expect(isTuesdaySelected).toBe(true);

        // Verify 'Wednesday' is selected
        const isWednesdaySelected = await page.getByLabel('Wednesday').isChecked();
        expect(isWednesdaySelected).toBe(true);

        // Step 2: Click on the "Next" button
        await page.getByRole('button', { name: 'Next' }).click();

        // Verify that the error message "You need to select a time of the day to proceed" is displayed
        await expect(page.getByText('You need to select a time of the day to proceed')).toBeVisible();

        // Step 3: Select a slot for each of the selected days

        // Select 'Morning' slot for 'Monday'
        await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).check();

        // Select 'Morning' slot for 'Tuesday'
        await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(1).check();

        // Select 'Morning' slot for 'Wednesday'
        await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(1).check();

        // Verify that the slots for the selected days are checked successfully

        // Verify 'Monday - Morning' slot is selected
        const isMondaySlotSelected = await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).isChecked();
        expect(isMondaySlotSelected).toBe(true);

        // Verify 'Tuesday - Morning' slot is selected
        const isTuesdaySlotSelected = await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(1).isChecked();
        expect(isTuesdaySlotSelected).toBe(true);

        // Verify 'Wednesday - Morning' slot is selected
        const isWednesdaySlotSelected = await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(1).isChecked();
        expect(isWednesdaySlotSelected).toBe(true);

        // Step 4: Select multiple slots for each day

        // Select 'Afternoon' and 'Evening' slots for 'Monday'
        await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(2).check();  // Afternoon
        await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(3).check();  // Evening

        // Select 'Afternoon' and 'Evening' slots for 'Tuesday'
        await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).check();  // Afternoon
        await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(3).check();  // Evening

        // Select 'Afternoon' and 'Evening' slots for 'Wednesday'
        await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(2).check();  // Afternoon
        await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(3).check();  // Evening

        // Verify that the slots for the selected days are checked successfully

        // Verify 'Monday - Afternoon' and 'Evening' slots are selected
        const isMondayAfternoonSelected = await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(2).isChecked();
        const isMondayEveningSelected = await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(3).isChecked();
        expect(isMondayAfternoonSelected).toBe(true);
        expect(isMondayEveningSelected).toBe(true);

        // Verify 'Tuesday - Afternoon' and 'Evening' slots are selected
        const isTuesdaySelectedAfternoon = await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).isChecked();
        const isTuesdayEveningSelected = await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(3).isChecked();
        expect(isTuesdaySelectedAfternoon).toBe(true);
        expect(isTuesdayEveningSelected).toBe(true);

        // Verify 'Wednesday - Afternoon' and 'Evening' slots are selected
        const isWednesdayAfternoonSelected = await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(2).isChecked();
        const isWednesdayEveningSelected = await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(3).isChecked();
        expect(isWednesdayAfternoonSelected).toBe(true);
        expect(isWednesdayEveningSelected).toBe(true);

        // Step 5: Click on the 'Next' button
        await page.getByRole('button', { name: 'Next' }).click();

        // Verify the success message "Availability updated successfully"
        await expect(page.getByText('Availability updated successfully')).toBeVisible();

        // Step 6: Click on the 'Back' button on the 'Complete your profile' screen
        await page.getByRole('button', { name: 'Back' }).click();

        // Verify that the user is navigated to the 'Availability to volunteer' screen
        await expect(page.getByRole('heading', { name: 'Availability to volunteer' })).toBeVisible(); // Ensure screen title is correct

        // Verify that the previously selected options are displayed

        // Block 1: Verify 'Monday - Afternoon' and 'Evening' slots
        {
            const isMondayAfternoonSelected = await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(2).isChecked();
            const isMondayEveningSelected = await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(3).isChecked();
            expect(isMondayAfternoonSelected).toBe(true);
            expect(isMondayEveningSelected).toBe(true);
        }

        // Block 2: Verify 'Tuesday - Afternoon' and 'Evening' slots
        {
            const isTuesdayAfternoonSelected = await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).isChecked();
            const isTuesdayEveningSelected = await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(3).isChecked();
            expect(isTuesdayAfternoonSelected).toBe(true);
            expect(isTuesdayEveningSelected).toBe(true);
        }

        // Block 3: Verify 'Wednesday - Afternoon' and 'Evening' slots
        {
            const isWednesdayAfternoonSelected = await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(2).isChecked();
            const isWednesdayEveningSelected = await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(3).isChecked();
            expect(isWednesdayAfternoonSelected).toBe(true);
            expect(isWednesdayEveningSelected).toBe(true);
        }

        //GUD-TC-74 Verify selecting a slot in the 'Availability to volunteer' screen

        //clear all selected slots
        await page.getByLabel('Monday').uncheck();
        await page.getByLabel('Tuesday').uncheck();
        await page.getByLabel('Wednesday').uncheck();

        // Step 1: Select a slot without selecting the day
        await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).check(); // Assuming nth(1) is the checkbox for 'Morning'

        // Verify that the slot is selected
        const isASlotSelected = await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).isChecked();
        expect(isASlotSelected).toBe(true);

        // Verify that the corresponding day ('Monday') is selected automatically
        const isDaySelected = await page.getByLabel('Monday').isChecked();
        expect(isDaySelected).toBe(true);

        // Step 2: Select multiple slots from different days without selecting the days
        await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(1).check();   // Assuming nth(1) is the checkbox for 'Tuesday - Morning'
        await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(1).check(); // Assuming nth(1) is the checkbox for 'Wednesday - Morning'

        // Verify that the slots are selected
        {
        const isTuesdaySlotSelected = await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(1).isChecked();
        expect(isTuesdaySlotSelected).toBe(true);

        const isWednesdaySlotSelected = await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(1).isChecked();
        expect(isWednesdaySlotSelected).toBe(true);
        }  
        // Verify that the corresponding days ('Tuesday' and 'Wednesday') are selected automatically
        {
        const isTuesdaySelected = await page.getByLabel('Tuesday').isChecked();
        expect(isTuesdaySelected).toBe(true);

        const isWednesdaySelected = await page.getByLabel('Wednesday').isChecked();
        expect(isWednesdaySelected).toBe(true);
        }

        // Step 3: Click on the 'Next' button
        await page.getByRole('button', { name: 'Next' }).click();

        // Verify the success message "Availability updated successfully"
        await expect(page.getByText('Availability updated successfully')).toBeVisible();

        // Step 4: Click on the 'Back' button on the 'Complete your profile' screen
        await page.getByRole('button', { name: 'Back' }).click();

        // Verify that the user is navigated to the 'Availability to volunteer' screen
        await expect(page.getByRole('heading', { name: 'Availability to volunteer' })).toBeVisible(); // Ensure screen title is correct

        // Verify that the previously selected options are displayed
        // Verify that the slots are selected
        {
          const isMondaySlotSelected = await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).isChecked();
          expect(isMondaySlotSelected).toBe(true);
          
          const isTuesdaySlotSelected = await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(1).isChecked();
          expect(isTuesdaySlotSelected).toBe(true);
  
          const isWednesdaySlotSelected = await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(1).isChecked();
          expect(isWednesdaySlotSelected).toBe(true);
          }  
          // Verify that the corresponding days ('Tuesday' and 'Wednesday') are selected automatically
          {
          const isMondaySelected = await page.getByLabel('Monday').isChecked();
          expect(isMondaySelected).toBe(true);  

          const isTuesdaySelected = await page.getByLabel('Tuesday').isChecked();
          expect(isTuesdaySelected).toBe(true);
  
          const isWednesdaySelected = await page.getByLabel('Wednesday').isChecked();
          expect(isWednesdaySelected).toBe(true);
          }

          //GUD-TC-85 Verify unselecting days in the 'Availability to volunteer' screen
          //Selecting some days and slots
          await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(2).check();
          await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(3).check();
          await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).check();
          await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(3).check();
          await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(2).check();
          await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(3).check();

          // Step 1: Unselect the day 'Monday'
          await page.getByLabel('Monday').uncheck(); // Uncheck the 'Monday' checkbox

          // Verify that all slot selections for 'Monday' are unselected

          // The slots for 'Monday' are in specific checkboxes, use their indices accordingly
          const isMondayMorningSlotSelected = await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).isChecked(); // Morning slot
          const isMondayAfternoonSlotSelected = await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(2).isChecked(); // Afternoon slot
          const isMondayEveningSlotSelected = await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(3).isChecked(); // Evening slot

          // Assert that all slots for 'Monday' are not selected
          expect(isMondayMorningSlotSelected).toBe(false);
          expect(isMondayAfternoonSlotSelected).toBe(false);
          expect(isMondayEveningSlotSelected).toBe(false);

          // Step 2: Unselect the days 'Tuesday' and 'Wednesday'
          await page.getByLabel('Tuesday').uncheck();    // Uncheck 'Tuesday'
          await page.getByLabel('Wednesday').uncheck();  // Uncheck 'Wednesday'

          // Verify that all slot selections for 'Tuesday' are unselected

          // The slots for 'Tuesday' are in specific checkboxes, use their indices accordingly
          const isTuesdayMorningSlotSelected = await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(1).isChecked(); // Morning slot
          const isTuesdayAfternoonSlotSelected = await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).isChecked(); // Afternoon slot
          const isTuesdayEveningSlotSelected = await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(3).isChecked(); // Evening slot

          // Assert that all slots for 'Tuesday' are not selected
          expect(isTuesdayMorningSlotSelected).toBe(false);
          expect(isTuesdayAfternoonSlotSelected).toBe(false);
          expect(isTuesdayEveningSlotSelected).toBe(false);

          // Verify that all slot selections for 'Wednesday' are unselected

          // The slots for 'Wednesday' are in specific checkboxes, use their indices accordingly
          const isWednesdayMorningSlotSelected = await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(1).isChecked(); // Morning slot
          const isWednesdayAfternoonSlotSelected = await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(2).isChecked(); // Afternoon slot
          const isWednesdayEveningSlotSelected = await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(3).isChecked(); // Evening slot

          // Assert that all slots for 'Wednesday' are not selected
          expect(isWednesdayMorningSlotSelected).toBe(false);
          expect(isWednesdayAfternoonSlotSelected).toBe(false);
          expect(isWednesdayEveningSlotSelected).toBe(false);

          // Step 3: Click on the 'Next' button
          await page.getByRole('button', { name: 'Next' }).click();

          // Verify the success message "Availability updated successfully"
          await expect(page.getByText('Availability updated successfully')).toBeVisible();

          // Step 4: Click on the 'Back' button on the 'Complete your profile' screen
          await page.getByRole('button', { name: 'Back' }).click();

          // Verify that the user is navigated to the 'Availability to volunteer' screen
          await expect(page.getByRole('heading', { name: 'Availability to volunteer' })).toBeVisible(); // Ensure screen title is correct

          // Verify that the corresponding days are unselected
          {
            const isMondaySelected = await page.getByLabel('Monday').isChecked();
            expect(isMondaySelected).toBe(false);  // Assert that 'Monday' is not selected

            const isTuesdaySelected = await page.getByLabel('Tuesday').isChecked();
            expect(isTuesdaySelected).toBe(false); // Assert that 'Tuesday' is not selected

            const isWednesdaySelected = await page.getByLabel('Wednesday').isChecked();
            expect(isWednesdaySelected).toBe(false); // Assert that 'Wednesday' is not selected
          }

          //GUD-TC-86 Verify unselecting slots in the 'Availability to volunteer' screen
          //Selecting some days and slots
          await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).check();
          await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(2).check();
          await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(3).check();
          await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(1).check();
          await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).check();
          await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(3).check();
          await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(1).check();
          await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(2).check();
          await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(3).check();

          // Step 1: Unselect all the selected slots for 'Monday'

          // The slots for 'Monday' are in specific checkboxes, use their indices accordingly
          await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).uncheck(); // Uncheck 'Monday - Morning' slot
          await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(2).uncheck(); // Uncheck 'Monday - Afternoon' slot
          await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(3).uncheck(); // Uncheck 'Monday - Evening' slot

          // Verify that the day 'Monday' is automatically unselected
          {
          const isMondaySelected = await page.getByLabel('Monday').isChecked();
          expect(isMondaySelected).toBe(false); // Assert that 'Monday' is unselected automatically
          }

          // Step 2: Unselect all the selected slots for multiple days

          // Unselect all the selected slots for 'Tuesday' and 'Wednesday'

          // Uncheck 'Tuesday' slots (Morning, Afternoon, Evening)
          await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(1).uncheck(); // Uncheck 'Tuesday - Morning' slot
          await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).uncheck(); // Uncheck 'Tuesday - Afternoon' slot
          await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(3).uncheck(); // Uncheck 'Tuesday - Evening' slot

          // Uncheck 'Wednesday' slots (Morning, Afternoon, Evening)
          await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(1).uncheck(); // Uncheck 'Tuesday - Morning' slot
          await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(2).uncheck(); // Uncheck 'Tuesday - Afternoon' slot
          await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(3).uncheck(); // Uncheck 'Tuesday - Evening' slot

          // Step 3: Verify that the days 'Monday','Tuesday'and 'Wednesday' are automatically unselected

          // Verify 'Monday' is unselected
          {
          const isMondaySelected = await page.getByLabel('Monday').isChecked();
          expect(isMondaySelected).toBe(false); // Assert that 'Monday' is unselected automatically
          }

          // Verify 'Tuesday' is unselected
          {
          const isTuesdaySelected = await page.getByLabel('Tuesday').isChecked();
          expect(isTuesdaySelected).toBe(false); // Assert that 'Tuesday' is unselected automatically
          }

          // Verify 'Wednesday' is unselected
          {
            const isWednesdaySelected = await page.getByLabel('Wednesday').isChecked();
            expect(isWednesdaySelected).toBe(false); // Assert that 'Tuesday' is unselected automatically
          }

          // Step 3: Click on the "Next" button to proceed
          await page.getByRole('button', { name: 'Next' }).click();

          // Verify the success message "Availability updated successfully"
          await expect(page.getByText('Availability updated successfully')).toBeVisible();

          // Step 4: Click on the 'Back' button on the 'Complete your profile' screen
          await page.getByRole('button', { name: 'Back' }).click();

          // Verify that the user is navigated to the 'Availability to volunteer' screen
          await expect(page.getByRole('heading', { name: 'Availability to volunteer' })).toBeVisible(); // Ensure screen title is correct

          // Verify that the corresponding days are unselected
          {
            const isMondaySelected = await page.getByLabel('Monday').isChecked();
            expect(isMondaySelected).toBe(false);  // Assert that 'Monday' is not selected

            const isTuesdaySelected = await page.getByLabel('Tuesday').isChecked();
            expect(isTuesdaySelected).toBe(false); // Assert that 'Tuesday' is not selected

            const isWednesdaySelected = await page.getByLabel('Wednesday').isChecked();
            expect(isWednesdaySelected).toBe(false); // Assert that 'Wednesday' is not selected
          }

          //GUD-TC-87 Verify the functionality of the remote volunteer toggle in the 'Availability to volunteer' screen

          // Step 1: Locate the 'Are you interested to volunteer remotely?' toggle
          const isRemoteVolunteerToggleOn = await page.locator('.MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').isChecked();

          // Verify that the toggle is switched on by default
          expect(isRemoteVolunteerToggleOn).toBe(true); // Assert that the toggle is ON (checked) by default

          // Step 2: Switch off the 'Are you interested to volunteer remotely?' toggle
          await page.locator('.MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();

          // Verify that the toggle is switched off
          {
          const isRemoteVolunteerToggleOn = await page.locator('.MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').isChecked();
          expect(isRemoteVolunteerToggleOn).toBe(false); // Assert that the toggle is OFF (unchecked)
          }

          // Step 3: Click on the "Next" button to proceed
          await page.getByRole('button', { name: 'Next' }).click();

          // Verify the success message "Availability updated successfully"
          await expect(page.getByText('Availability updated successfully')).toBeVisible();

          // Step 4: Click on the 'Back' button on the 'Complete your profile' screen
          await page.getByRole('button', { name: 'Back' }).click();

          // Verify that the user is navigated to the 'Availability to volunteer' screen
          await expect(page.getByRole('heading', { name: 'Availability to volunteer' })).toBeVisible(); // Ensure screen title is correct

          // Check the current state of the 'Are you interested to volunteer remotely?' toggle
          {
          const isRemoteVolunteerToggleOn = await page.locator('.MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').isChecked();
          

          // Verify that the toggle is switched off
          expect(isRemoteVolunteerToggleOn).toBe(false); // Assert that the toggle is OFF (unchecked)
          }

          //Step 5
          // Switch on the 'Are you interested to volunteer remotely?' toggle
          await page.locator('.MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').check(); // Switch on the toggle

          // Select the days 'Monday' and 'Tuesday'
          await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).check(); // Select 'Monday'
          await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(1).check(); // Select 'Tuesday'

          // Click the 'Next' button
          await page.getByRole('button', { name: 'Next' }).click();

          // Verify the success message "Availability updated successfully"
          await expect(page.getByText('Availability updated successfully')).toBeVisible();

          // Step 6: Click on the 'Back' button on the 'Complete your profile' screen
          await page.getByRole('button', { name: 'Back' }).click();

          // Verify that the toggle is switched on
          {
            const isRemoteVolunteerToggleOn = await page.locator('.MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').isChecked();
            expect(isRemoteVolunteerToggleOn).toBe(true); // Assert that the toggle is ON (checked)
          }

          // Verify that 'Monday' and 'Tuesday' checkboxes are enabled (checked)
          const isMondayChecked = await page.getByLabel('Monday').isChecked();
          const isTuesdayChecked = await page.getByLabel('Tuesday').isChecked();

          expect(isMondayChecked).toBe(true);  // Assert that 'Monday' is checked
          expect(isTuesdayChecked).toBe(true); // Assert that 'Tuesday' is checked
  
  });

  test('Complete Profile...', async ({ request, page, context }) => {
    
    await page.goto('https://next.gudppl.com');


        await page.getByPlaceholder('Enter your email address').click();
        console.log('email ID Login for third test case is = ' + email)
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();

        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'Complete your profile now' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400);
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400);
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400);
        await page.getByRole('row', { name: 'Sinhala delete' }).getByRole('button', { name: 'delete' }).click();
        await page.getByRole('button', { name: 'delete' }).click();  
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400);
    // Click the 'Next' button to Navigate Complete Profile Page
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(3400);

    //GUD-TC-9 Verify user able to upload an image.
    // Click the "Upload picture" button
    await page.getByRole('button', { name: 'Upload picture' }).click();

    // Upload the image
    await page.getByRole('img', { name: '/images/profilePictures/elephant.png' }).click();

    

    // Wait for upload completion (you might need to adjust the selector depending on UI feedback)
    await page.waitForSelector('img[src*="elephant.png"]', { timeout: 1000 });

    // Verify the image is uploaded and displayed
    const uploadedImage = await page.getByRole('img', { name: '/images/profilePictures/elephant.png' });
    await expect(uploadedImage).toBeVisible();

    // GUD-TC-13 Verify Complete button functionality on "Complete your profile" page.
    await page.getByRole('button', { name: 'Complete' }).click();
    await page.waitForTimeout(3500);

    // Close the browser after the test completes
    await page.waitForTimeout(1000);
  
  });

  test('Edit User Profile... ', async ({ request, page, context }) => {

    await page.goto('https://next.gudppl.com');


        await page.getByPlaceholder('Enter your email address').click();
        console.log('email ID Login for third test case is = ' + email)
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();

        // GUD-TC-1019 Verify updating the Profile successfully
        // Precondition- Create a profile
        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'Complete your profile now' }).click();
        await page.getByRole('button', { name: 'Next' }).click();

        await page.getByLabel('Animal welfare').check();
        await page.getByLabel('Disaster relief').check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4000);

        //await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'no_poverty' }).click();
        await page.getByRole('button', { name: 'good_health' }).click();
        await page.getByRole('button', { name: 'gender_equality' }).click();
        await page.getByRole('button', { name: 'clean_energy' }).click();
        await page.getByRole('button', { name: 'iii' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4000);

        await page.getByPlaceholder('Add skills and talents').click();
        await page.getByPlaceholder('Add skills and talents').fill('Technical ');
        await page.getByRole('option', { name: 'Technical support' }).click();
        await page.getByPlaceholder('Add skills and talents').click();
        await page.getByPlaceholder('Add skills and talents').fill('Ana');
        await page.getByRole('option', { name: 'Analytical thinking' }).click();

        await page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(3).check();
        await page.getByRole('row', { name: 'Sinhala delete' }).getByRole('checkbox').first().check();
        await page.getByRole('row', { name: 'Tamil delete' }).getByLabel('delete').click();
        await page.getByText('Add language').click();
        await page.getByPlaceholder('Enter language name').click();
        await page.getByPlaceholder('Enter language name').fill('Fren');
        await page.getByRole('option', { name: 'French' }).click();
        await page.getByRole('button', { name: 'Add' }).click();
        await page.getByRole('row', { name: 'French delete' }).getByRole('checkbox').nth(2).check();
        await page.getByText('Add language').click();
        await page.getByPlaceholder('Enter language name').click();
        await page.getByPlaceholder('Enter language name').fill('Germ');
        await page.getByRole('option', { name: 'German, Standard' }).click();
        await page.getByRole('button', { name: 'Add' }).click();
        await page.getByRole('row', { name: 'German, Standard delete' }).getByRole('checkbox').first().check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4000);

        await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).check();
        await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(3).check();
        await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(1).check();
        await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(1).check();
        await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(2).check();
        await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(3).check();
        await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(1).check();
        await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(2).check();
        await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(3).check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4000);

        await page.getByRole('button', { name: 'Upload picture' }).click();
        await page.getByRole('img', { name: '/images/profilePictures/elephant.png' }).click();
        await page.getByPlaceholder('Your phone number').click();
        await page.getByPlaceholder('Your phone number').fill('112211234');
        await page.getByPlaceholder('Select your country').click();
        await page.getByPlaceholder('Select your country').fill('Sri');
        await page.getByRole('option', { name: 'Sri Lanka' }).click();
        await page.locator('.css-h14o9r-B').click();
        await page.locator('#react-select-3-input').fill('col');
        await page.getByText('Colombo', { exact: true }).click();
        await page.getByPlaceholder('Write few sentences about you').click();
        await page.getByPlaceholder('Write few sentences about you').fill('I am from Colombo');
        await page.getByRole('button', { name: 'Complete' }).click();
        await page.waitForTimeout(4000);

        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        await page.waitForTimeout(1000);
        // Step 1-Click on the 'Edit profile' button and check the values on the 'Profile information' screen
        await page.getByRole('button', { name: 'Edit profile' }).click();
        await page.waitForTimeout(500);
        await expect.soft(page.getByPlaceholder('Enter your first name')).toHaveValue("Monica");
        await expect.soft(page.getByPlaceholder('Enter your last name')).toHaveValue("Geller");
        await expect.soft(page.getByPlaceholder('DD')).toHaveValue("26"); 
        await expect.soft(page.getByPlaceholder('MM')).toHaveValue("6");
        await expect.soft(page.getByPlaceholder('YYYY')).toHaveValue("1990");
        expect.soft(await page.locator('label').filter({ hasText: 'boy/man' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeFalsy();
        expect.soft(await page.locator('label').filter({ hasText: 'girl/woman' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeTruthy();

        // Step 2- Update the  'Profile Information' fields and click on the 'Next' button
        await page.getByPlaceholder('Enter your first name').click();
        await page.getByPlaceholder('Enter your first name').fill('Ross');
        await page.getByPlaceholder('Enter your last name').click();
        await page.getByPlaceholder('Enter your last name').fill('Green');
        await page.locator('form div').filter({ hasText: 'Date of birth *' }).nth(1).click();
        await page.getByPlaceholder('DD').click();
        await page.getByPlaceholder('DD').fill('27');
        await page.getByPlaceholder('MM').fill('7');
        await page.getByPlaceholder('YYYY').fill('1991');
        await page.locator('label').filter({ hasText: 'boy/man' }).getByRole('checkbox', { name: 'controlled' }).check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1500);

        // Step 3- Check the values on the 'Causes we care about' screen
        expect.soft(await page.getByLabel('Animal welfare').isChecked()).toBeTruthy();
        expect.soft(await page.getByLabel('Education').isChecked()).toBeFalsy();
        expect.soft(await page.getByLabel('People').isChecked()).toBeFalsy();
        expect.soft(await page.getByLabel('Disaster relief').isChecked()).toBeTruthy();
        expect.soft(await page.getByLabel('Environment').isChecked()).toBeFalsy();

        // Step 4- Update the fields and click on the 'Next' button
        await page.getByLabel('Animal welfare').uncheck();
        await page.getByLabel('Disaster relief').check();
        await page.getByLabel('Environment').check();
        await page.getByLabel('Education').check();
        await page.getByLabel('People').uncheck();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1500);

        // Step 5- Check the values on the 'United Nations Sustainable Development Goals' screen
        

        // Verify each UNSDG goals were selected previously
        const goalsToCheck = [
            { name: 'no_poverty' },
            { name: 'good_health' },
            { name: 'gender_equality' },
            { name: 'clean_energy' },
            { name: 'iii' }
        ];

        for (const goal of goalsToCheck) {
            // Check if each button has a selected attribute or class indicating selection
            const goalButton = await page.getByRole('button', { name: goal.name });
            
            // Check for selection status via class
            //await expect(goalButton).toHaveAttribute('aria-pressed', '');
            await expect(goalButton).toHaveClass("MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-bblgit-MuiButtonBase-root-MuiIconButton-root"); 
               
        }

        // Step 6- Update the fields and click on the 'Next' button
        await page.getByRole('button', { name: 'good_health' }).click();
        await page.getByRole('button', { name: 'quality_education' }).click();
        await page.getByRole('button', { name: 'gender_equality' }).click();
        await page.getByRole('button', { name: 'clean_water' }).click();
        await page.getByRole('button', { name: 'clean_energy' }).click();
        await page.getByRole('button', { name: 'consumption' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4000);

        // Step 7- Check the values on the 'Skills and Talents' screen
        await expect.soft(page.locator("//span[normalize-space()='Analytical Thinking']").isVisible()).toBeTruthy();
        await expect.soft(page.locator("//span[normalize-space()='Technical Support']").isVisible()).toBeTruthy();


        // Check that the 'English' checkbox is still checked
        const englishCheckbox = await page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(3);
        await expect(englishCheckbox).toBeChecked();

        // Check that the 'French' checkbox is still checked
        const frenchCheckbox = await page.getByRole('row', { name: 'French delete' }).getByRole('checkbox').nth(2);
        await expect(frenchCheckbox).toBeChecked();

        // Check that the 'German, Standard' checkbox is still checked
        const germanCheckbox = await page.getByRole('row', { name: 'German, Standard delete' }).getByRole('checkbox').nth(1);
        
        await expect(germanCheckbox).toBeChecked();
        


        // Step 8- Update the fields and click on the 'Next' button
        // Updating Skills
        // Delete the 'Technical Support' option by clicking the 'X' button
        await page.locator('.MuiChip-deleteIcon').nth(0).click();
        await page.waitForTimeout(3400);

        // Add - Job training programs
        await page.getByPlaceholder('Add skills and talents').fill('Trainin');
        await page.getByRole('option', { name: 'Job training programs' }).click();

        // French - Delete
        await page.getByRole('row', { name: 'French delete' }).getByLabel('delete').click();

        // German - All - Unselect, Speak - Unselect, Read - Select, Write - Select, Type - Unselect
        await page.getByRole('row', { name: 'German, Standard delete' }).getByRole('checkbox').nth(1).uncheck();
        await page.getByRole('row', { name: 'German, Standard delete' }).getByRole('checkbox').nth(4).uncheck();

        // Russian - All - Unselect, Speak - Unselect, Read - Select, Write - Select, Type - Unselect
        await page.getByText('Add language').click();
        await page.getByPlaceholder('Enter language name').click();
        await page.getByPlaceholder('Enter language name').fill('Ru');
        await page.getByRole('option', { name: 'Russian' }).click();
        await page.getByRole('button', { name: 'Add' }).click();
        await page.getByRole('row', { name: 'Russian delete' }).getByRole('checkbox').nth(2).check();
        await page.getByRole('row', { name: 'Russian delete' }).getByRole('checkbox').nth(3).check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4000);

        // Step 9 - Check the values on the 'Availability to volunteer' screen

        expect.soft(await page.getByLabel('Monday').isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Tuesday').isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(3).isChecked()).toBeTruthy();

        expect.soft(await page.getByLabel('Wednesday').isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(1).isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Thursday').isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Thursday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Thursday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Thursday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Friday').isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(1).isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(2).isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(3).isChecked()).toBeTruthy();

        expect.soft(await page.getByLabel('Saturday').isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(1).isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(2).isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(3).isChecked()).toBeTruthy();

        expect.soft(await page.getByLabel('Sunday').isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Sunday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Sunday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Sunday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        // Step 10 - Update the fields and click on the 'Next' button
        await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(2).check();
        await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(1).check();
        await page.getByLabel('Saturday').uncheck();
        await page.locator('.MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4000);

        // Step 11 - Check the values on the 'Complete your profile' screen

        // Confirm that the profile picture is initially visible
        const profileImage = page.getByRole('img', { name: 'profile image' });
        await expect(profileImage).toBeVisible();
        // Phone number
        expect.soft(await page.locator("//input[@value='+94']")).toHaveValue('+94');
        await expect.soft(page.getByPlaceholder('Your phone number')).toHaveValue("112211234");
        // Verify that the selected country and city are initially displayed
        await expect(page.getByPlaceholder('Select your country')).toHaveValue('Sri Lanka');
        //await expect(page.locator('#react-select-3-input')).toHaveValue('Colombo');
        // Verify that "Colombo" is displayed in the city field
        const cityField = page.locator('div').filter({ hasText: /^Colombo$/ }).nth(1);
        await expect(cityField).toBeVisible();
        // About me
        await expect.soft(page.getByPlaceholder('Write few sentences about you')).toHaveValue("I am from Colombo");

        // Step 12 - Update the fields and click on the 'Next' button

        await page.getByRole('button', { name: 'Upload picture' }).click();
        await page.getByRole('img', { name: '/images/profilePictures/ambulance.png' }).click();
        await page.getByPlaceholder('Your phone number').click();
        await page.getByPlaceholder('Your phone number').fill('112211256');
        //await page.locator('form path').nth(3).click();
        //await page.locator('.css-h14o9r-B').click();
        //await page.locator('#react-select-3-input').click(); // Click to activate dropdown
        //await page.locator('#react-select-3-input').fill('kan');
        //await page.locator('#react-select-3-input').fill('Kan');
        //await page.getByText('Kandy', { exact: true }).click();
        await page.getByPlaceholder('Select your country').fill('sri');
        await page.getByRole('option', { name: 'Sri Lanka', exact: true }).click();
        await page.locator('div').filter({ hasText: /^CityColombo$/ }).locator('svg').click();
        await page.locator('#react-select-5-input').fill('kan');
        await page.getByText('Kandy', { exact: true }).click();
        await page.getByPlaceholder('Write few sentences about you').click();
        await page.getByPlaceholder('Write few sentences about you').fill('I am from Kandy');
        await page.getByRole('button', { name: 'Complete' }).click();
        await page.waitForTimeout(4000);

        // Step 13 - Click on the 'Edit profile' button and check the values on the 'Profile information' screen

        await page.getByRole('button', { name: 'Edit profile' }).click();
        await page.waitForTimeout(500);
        await expect.soft(page.getByPlaceholder('Enter your first name')).toHaveValue("Ross");
        await expect.soft(page.getByPlaceholder('Enter your last name')).toHaveValue("Green");
        await expect.soft(page.getByPlaceholder('DD')).toHaveValue("27"); 
        await expect.soft(page.getByPlaceholder('MM')).toHaveValue("7");
        await expect.soft(page.getByPlaceholder('YYYY')).toHaveValue("1991");
        expect.soft(await page.locator('label').filter({ hasText: 'boy/man' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeTruthy();
        expect.soft(await page.locator('label').filter({ hasText: 'girl/woman' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeFalsy();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4000);

        // Step 14 - Check the values on the 'Causes we care about' screen

        expect.soft(await page.getByLabel('Animal welfare').isChecked()).toBeFalsy();
        expect.soft(await page.getByLabel('Education').isChecked()).toBeTruthy();
        expect.soft(await page.getByLabel('People').isChecked()).toBeFalsy();
        expect.soft(await page.getByLabel('Disaster relief').isChecked()).toBeTruthy();
        expect.soft(await page.getByLabel('Environment').isChecked()).toBeTruthy();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4000);

        // Step 15 - Check the values on the 'United Nations Sustainable Development Goals' screen

        const goalsUNSDGToCheck = [
          { name: 'no_poverty' },
          { name: 'quality_education' },
          { name: 'clean_water' },
          { name: 'consumption' },
          { name: 'iii' }
      ];

        for (const goal of goalsUNSDGToCheck) {
            // Check if each button has a selected attribute or class indicating selection
            const goalButton = await page.getByRole('button', { name: goal.name });
            
            // Check for selection status via class
            //await expect(goalButton).toHaveAttribute('aria-pressed', '');
            await expect(goalButton).toHaveClass("MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-bblgit-MuiButtonBase-root-MuiIconButton-root"); 
              
        }
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4000);

        // Step 16 - Check the values on the 'Skills and Talents' screen
        
        await expect.soft(page.locator("//span[normalize-space()='Analytical Thinking']").isVisible()).toBeTruthy();
        await expect.soft(page.locator("//span[normalize-space()='Job training programs']").isVisible()).toBeTruthy();


        

        // English
        await expect(page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(1)).not.toBeChecked();
        await expect(page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(2)).not.toBeChecked();
        await expect(page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(3)).toBeChecked();
        await expect(page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(4)).not.toBeChecked();

        // Sinhala - All Selected
        await expect(page.getByRole('row', { name: 'Sinhala' }).getByRole('checkbox').nth(1)).toBeChecked();
        await expect(page.getByRole('row', { name: 'Sinhala' }).getByRole('checkbox').nth(2)).toBeChecked();
        await expect(page.getByRole('row', { name: 'Sinhala' }).getByRole('checkbox').nth(3)).toBeChecked();
        await expect(page.getByRole('row', { name: 'Sinhala' }).getByRole('checkbox').nth(4)).toBeChecked();

        // German
        await expect(page.getByRole('row', { name: 'German' }).getByRole('checkbox').nth(1)).not.toBeChecked();
        await expect(page.getByRole('row', { name: 'German' }).getByRole('checkbox').nth(2)).toBeChecked();
        await expect(page.getByRole('row', { name: 'German' }).getByRole('checkbox').nth(3)).toBeChecked();
        await expect(page.getByRole('row', { name: 'German' }).getByRole('checkbox').nth(4)).not.toBeChecked();

        // Russian
        await expect(page.getByRole('row', { name: 'Russian' }).getByRole('checkbox').nth(1)).not.toBeChecked();
        await expect(page.getByRole('row', { name: 'Russian' }).getByRole('checkbox').nth(2)).toBeChecked();
        await expect(page.getByRole('row', { name: 'Russian' }).getByRole('checkbox').nth(3)).toBeChecked();
        await expect(page.getByRole('row', { name: 'Russian' }).getByRole('checkbox').nth(4)).not.toBeChecked();

        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4000);

        // Step 17 - Check the values on the 'Availability to volunteer' screen

        expect.soft(await page.getByLabel('Monday').isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(2).isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Tuesday').isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(1).isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(3).isChecked()).toBeTruthy();

        expect.soft(await page.getByLabel('Wednesday').isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(1).isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Thursday').isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Thursday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Thursday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Thursday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Friday').isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(1).isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(2).isChecked()).toBeTruthy();
        expect.soft(await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(3).isChecked()).toBeTruthy();

        expect.soft(await page.getByLabel('Saturday').isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Sunday').isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Sunday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Sunday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Sunday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.locator('.MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').isChecked()).toBeFalsy();

        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4000);

        // Step 18 - Check the values on the 'Complete your profile' screen

        // Confirm that the profile picture is initially visible
        const newProfileImage = page.getByRole('img', { name: 'profile image' });
        await expect(newProfileImage).toBeVisible();
        // Phone number
        expect.soft(await page.locator("//input[@value='+94']")).toHaveValue('+94');
        await expect.soft(page.getByPlaceholder('Your phone number')).toHaveValue("112211256");
        // Verify that the selected country and city are initially displayed
        await expect(page.getByPlaceholder('Select your country')).toHaveValue('Sri Lanka');
        //await expect(page.locator('#react-select-3-input')).toHaveValue('Colombo');
        // Verify that "Colombo" is displayed in the city field
        const newCityField = page.locator('div').filter({ hasText: /^Kandy$/ }).nth(1);
        await expect(newCityField).toBeVisible();
        // About me
        await expect.soft(page.getByPlaceholder('Write few sentences about you')).toHaveValue("I am from Kandy");

        

  });

  test('View Profile... @reg', async ({ request, page, context }) => {

    await page.goto('https://next.gudppl.com');
    // await page.pause();        

    await page.getByPlaceholder('Enter your email address').click();
    console.log('email from Login = ' + email)
    await page.getByPlaceholder('Enter your email address').fill(email);
    await page.getByPlaceholder('Enter your password').fill(pwd);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    //////////////////////////////////////////////////////////
    // GUD-TC-1018 Verify the accuracy of the data in the Profile View
    // Precondition
    await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'Complete your profile now' }).click();
        await page.getByRole('button', { name: 'Next' }).click();

        await page.getByLabel('Animal welfare').check();
        await page.getByLabel('Disaster relief').check();
        await page.getByLabel('People').check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4000);

        await page.getByRole('button', { name: 'no_poverty' }).click();
        await page.getByRole('button', { name: 'good_health' }).click();
        await page.getByRole('button', { name: 'gender_equality' }).click();
        await page.getByRole('button', { name: 'clean_energy' }).click();
        await page.getByRole('button', { name: 'iii' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4000);

        await page.getByPlaceholder('Add skills and talents').click();
        await page.getByPlaceholder('Add skills and talents').fill('Technical ');
        await page.getByRole('option', { name: 'Technical support' }).click();
        await page.getByPlaceholder('Add skills and talents').click();
        await page.getByPlaceholder('Add skills and talents').fill('Ana');
        await page.getByRole('option', { name: 'Analytical thinking' }).click();

        await page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(3).check();
        await page.getByRole('row', { name: 'Sinhala delete' }).getByRole('checkbox').first().check();
        await page.getByRole('row', { name: 'Tamil delete' }).getByLabel('delete').click();
        await page.getByText('Add language').click();
        await page.getByPlaceholder('Enter language name').click();
        await page.getByPlaceholder('Enter language name').fill('Fren');
        await page.getByRole('option', { name: 'French' }).click();
        await page.getByRole('button', { name: 'Add' }).click();
        await page.getByRole('row', { name: 'French delete' }).getByRole('checkbox').nth(2).check();
        await page.getByText('Add language').click();
        await page.getByPlaceholder('Enter language name').click();
        await page.getByPlaceholder('Enter language name').fill('Germ');
        await page.getByRole('option', { name: 'German, Standard' }).click();
        await page.getByRole('button', { name: 'Add' }).click();
        await page.getByRole('row', { name: 'German, Standard delete' }).getByRole('checkbox').first().check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4000);

        await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).check();
        await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(3).check();
        await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(1).check();
        await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(1).check();
        await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(2).check();
        await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(3).check();
        await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(1).check();
        await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(2).check();
        await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(3).check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4000);

        await page.getByRole('button', { name: 'Upload picture' }).click();
        await page.getByRole('img', { name: '/images/profilePictures/elephant.png' }).click();
        await page.getByPlaceholder('Your phone number').click();
        await page.getByPlaceholder('Your phone number').fill('112211234');
        await page.getByPlaceholder('Select your country').click();
        await page.getByPlaceholder('Select your country').fill('Sri');
        await page.getByRole('option', { name: 'Sri Lanka' }).click();
        await page.locator('.css-h14o9r-B').click();
        await page.locator('#react-select-3-input').fill('col');
        await page.getByText('Colombo', { exact: true }).click();
        await page.getByPlaceholder('Write few sentences about you').click();
        await page.getByPlaceholder('Write few sentences about you').fill('I am from Colombo');
        await page.getByRole('button', { name: 'Complete' }).click();
        await page.waitForTimeout(4000);

        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        await page.waitForTimeout(1000);

        // Check the profile summary
        expect.soft(await page.getByRole('img', { name: 'profile image' }).isVisible()).toBeTruthy();
        expect.soft(await page.locator('h2').isVisible()).toBeTruthy();
        expect.soft(await page.getByText('I am from Colombo').isVisible()).toBeTruthy();
        expect.soft(await page.getByText('Colombo, Sri Lanka').isVisible()).toBeTruthy();

        await page.getByRole('button', { name: 'Edit profile' }).click();
        await page.waitForTimeout(500);
        await expect.soft(page.getByPlaceholder('Enter your first name')).toHaveValue("Monica");
        await expect.soft(page.getByPlaceholder('Enter your last name')).toHaveValue("Geller");
        //await expect.soft(page.getByPlaceholder('DD')).toHaveValue("5");    // bug
        await expect.soft(page.getByPlaceholder('MM')).toHaveValue("6");
        await expect.soft(page.getByPlaceholder('YYYY')).toHaveValue("1990");
        // await page.locator('label').filter({ hasText: 'boy/man' }).getByRole('checkbox', { name: 'controlled' }).uncheck();
        // await page.locator('label').filter({ hasText: 'boy/man' }).getByRole('checkbox', { name: 'controlled' }).check();

        expect.soft(await page.locator('label').filter({ hasText: 'boy/man' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeFalsy();
        expect.soft(await page.locator('label').filter({ hasText: 'girl/woman' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeTruthy();
        expect.soft(await page.getByPlaceholder('Let me type...')).toBeEmpty();
        await page.getByRole('button', { name: 'Skip this, I’ll do it later' }).click();

        expect.soft(await page.getByLabel('Animal welfare').locator('path').isVisible()).toBeFalsy();
        expect.soft(await page.getByLabel('Disaster relief').getByRole('img').isVisible()).toBeFalsy();

        await page.getByRole('button', { name: 'Edit causes' }).click();
        await page.waitForTimeout(500);
        expect.soft(await page.getByLabel('Animal welfare').isChecked()).toBeTruthy();
        expect.soft(await page.getByLabel('Education').isChecked()).toBeFalsy();
        expect.soft(await page.getByLabel('People').isChecked()).toBeTruthy();
        expect.soft(await page.getByLabel('Disaster relief').isChecked()).toBeTruthy();
        expect.soft(await page.getByLabel('Environment').isChecked()).toBeFalsy();
        await page.getByRole('button', { name: 'Skip this, I’ll do it later' }).click();

        expect.soft(await page.getByLabel('No Poverty').isVisible()).toBeFalsy();
        expect.soft(await page.getByLabel('Good Health and Well-being').isVisible()).toBeFalsy();
        expect.soft(await page.getByLabel('Gender Equality').isVisible()).toBeFalsy();
        expect.soft(await page.getByLabel('Affordable and Clean Energy').isVisible()).toBeFalsy();
        expect.soft(await page.getByLabel('Industry, Innovation and').isVisible()).toBeFalsy();
        await page.getByRole('button', { name: 'Edit UNSDGs' }).click();
        await page.waitForTimeout(500);
        
        //const no_poverty = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='no_poverty']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        //expect.soft((await new utils(page).isCharacterCountMoreThan400(no_poverty)).valueOf()).toBe(true);
        const goalsToCheck = [
          { name: 'no_poverty' },
          { name: 'good_health' },
          { name: 'gender_equality' },
          { name: 'clean_energy' },
          { name: 'iii' }
      ];
  
      for (const goal of goalsToCheck) {
          // Check if each button has a selected attribute or class indicating selection
          const goalButton = await page.getByRole('button', { name: goal.name });
          
          // Check for selection status via aria-pressed attribute (if applicable)
          await expect(goalButton).toHaveClass("MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-bblgit-MuiButtonBase-root-MuiIconButton-root");
  
          // Alternatively, check if it has a specific "selected" class or style
          // Replace 'selected-class' with the actual class name used in your app if applicable
          // await expect(goalButton).toHaveClass(/selected-class/);
      }
       await page.getByRole('button', { name: 'Skip this, I’ll do it later' }).click();

       expect.soft(await page.getByText('Analytical thinking').isVisible()).toBeFalsy();
       expect.soft(await page.getByText('Technical support').isVisible()).toBeFalsy();

       await expect.soft(page.locator('text=EnglishWrite')).toBeVisible();
       await expect.soft(page.locator('text=FrenchRead')).toBeVisible();
       await expect.soft(page.locator('text=German, StandardSpeak, Read,')).toBeVisible();
       await expect.soft(page.locator('text=SinhalaSpeak, Read, Write,')).toBeVisible();

       await page.getByRole('button', { name: 'Edit skills and talents' }).click();
       // English
       await expect(page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(1)).not.toBeChecked();
       await expect(page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(2)).not.toBeChecked();
       await expect(page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(3)).toBeChecked();
       await expect(page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(4)).not.toBeChecked();

       // Sinhala - All Selected
       await expect(page.getByRole('row', { name: 'Sinhala' }).getByRole('checkbox').nth(1)).toBeChecked();
       await expect(page.getByRole('row', { name: 'Sinhala' }).getByRole('checkbox').nth(2)).toBeChecked();
       await expect(page.getByRole('row', { name: 'Sinhala' }).getByRole('checkbox').nth(3)).toBeChecked();
       await expect(page.getByRole('row', { name: 'Sinhala' }).getByRole('checkbox').nth(4)).toBeChecked();

       // French
       await expect(page.getByRole('row', { name: 'French' }).getByRole('checkbox').nth(1)).not.toBeChecked();
       await expect(page.getByRole('row', { name: 'French' }).getByRole('checkbox').nth(2)).toBeChecked();
       await expect(page.getByRole('row', { name: 'French' }).getByRole('checkbox').nth(3)).not.toBeChecked();
       await expect(page.getByRole('row', { name: 'French' }).getByRole('checkbox').nth(4)).not.toBeChecked();

       // German
       await expect(page.getByRole('row', { name: 'German' }).getByRole('checkbox').nth(1)).toBeChecked();
       await expect(page.getByRole('row', { name: 'German' }).getByRole('checkbox').nth(2)).toBeChecked();
       await expect(page.getByRole('row', { name: 'German' }).getByRole('checkbox').nth(3)).toBeChecked();
       await expect(page.getByRole('row', { name: 'German' }).getByRole('checkbox').nth(4)).toBeChecked();

       await page.getByRole('button', { name: 'Skip this, I’ll do it later' }).click();

       await expect.soft(page.getByText('TueAfternoon, Evening')).toBeVisible();
       await expect.soft(page.getByText('WedMorning')).toBeVisible();
       await expect.soft(page.getByText('FriAll day')).toBeVisible();
       await expect.soft(page.getByText('SatAll day')).toBeVisible();

       await page.getByRole('button', { name: 'Edit availability' }).click();
       await page.getByRole('button', { name: 'Skip this, I’ll do it later' }).click();


    

  });

})