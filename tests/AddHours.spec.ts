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
    let email = "c1d4ecf8-168e-4185-b7ba-c5a3240e6985@email.webhook.site";
    let pwd = "Smash@123";


    async function appendToFile(filePath: string, content: string): Promise<void> {
        await fs.appendFile(filePath, content);
    }
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

   
    

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
        await page.getByLabel('I verify that I am an authorized representative of this organization and have the right to act on its behalf in the creation and management of this profile. The organization and I agree to gudppl\'s term and conditions.').check();
        await page.getByRole('button', { name: 'Complete' }).click();
        await page.waitForTimeout(500);
        await page.getByRole('button', { name: 'Got it' }).click();
       // await page.locator('#textClippingContainer').getByText('This is created by automation').click();
        await page.getByText('+94774444444').click();
        await page.locator('.MuiBox-root > div:nth-child(2) > div > div > .MuiBox-root').first().click();
        //await page.locator('div:nth-child(2) > div > div:nth-child(2) > .MuiBox-root').first().click();
       // await page.locator('.MuiBox-root > div > div:nth-child(3) > .MuiBox-root').click();
        await page.getByRole('button', { name: 'No Poverty' }).click();
        await page.getByRole('button', { name: 'Clean Water and Sanitation' }).click();
        await page.getByRole('button', { name: 'Sustainable Cities and Communities' }).click();
        await page.getByRole('button', { name: 'Peace, Justice and Strong Institutions' }).click();





    })

   

    test('add hours with approve', async ({ page }) => {

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
        await page.getByPlaceholder('Organization name').fill('mal kade5');
        await page.getByRole('heading', { name: 'mal kade5' }).click();
        await page.getByPlaceholder('Enter name of volunteer coordinator/supervisor').click();
        await page.getByPlaceholder('Enter name of volunteer coordinator/supervisor').fill('rajapaksha');
        await page.getByRole('button', { name: 'Invite to verify hours' }).click();
        await page.getByRole('button', { name: 'Got it!' }).click();
      
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
        await page.getByRole('button', { name: 'Got it!' }).click();
        await page.getByText('approved').first().click();
        await page.getByRole('button', { name: 'Profile' }).click();
        await page.getByText('Verified').first().click();
        await page.getByRole('tab', { name: 'Approved' }).click();
        await page.getByText('Verified').first().click();



    })

    test('add hours with decline @smoke', async ({ page }) => {

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
        await page.getByPlaceholder('Organization name').fill('mal kade5');
        await page.getByRole('heading', { name: 'mal kade5' }).click();
        await page.getByPlaceholder('Enter name of volunteer coordinator/supervisor').click();
        await page.getByPlaceholder('Enter name of volunteer coordinator/supervisor').fill('rajapaksha');
        await page.getByRole('button', { name: 'Invite to verify hours' }).click();
        await page.getByRole('button', { name: 'Got it!' }).click();
      
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
        
        // await page.getByText('pending').nth(1).click();
        // await page.getByRole('table', { name: 'responsive table' }).getByRole('button').first().click();
      
        // await page.getByRole('button', { name: 'Approve' }).click();
        // await page.getByRole('button', { name: 'Got it!' }).click();
        // await page.getByText('approved').first().click();
        // await page.getByRole('button', { name: 'Profile' }).click();
        // await page.getByText('Verified').first().click();
        // await page.getByRole('tab', { name: 'Approved' }).click();
        // await page.getByText('Verified').first().click();


        // await page.getByRole('button', { name: 'Profile', exact: true }).click();
        // await page.getByText('Pending').nth(1).click();
        // await page.getByRole('button', { name: 'Organizations' }).click();
        // await page.getByRole('button', { name: 'Verify Hours' }).click();
        await page.locator('tr:nth-child(2) > td:nth-child(5) > p > .MuiBox-root > .MuiButtonBase-root').click();
        await page.getByRole('button', { name: 'Deny' }).click();
        await page.getByRole('textbox').click();
        await page.getByRole('textbox').fill('this is wrong');
        await page.getByRole('button', { name: 'Decline' }).click();
        await page.getByRole('row', { name: 'MG Monica Geller 2h 0m 11/10/2023 - 11/10/2023 declined' }).getByText('declined').click();
        await page.getByRole('button', { name: 'Profile' }).click();
        await page.getByRole('tab', { name: 'Declined' }).click();
      //await page.getByRole('paragraph').filter({ hasText: 'Declined' }).click();
        await page.locator('#root').getByText('lkkkkkkkkkkk').click();
        await page.getByRole('tab', { name: 'All' }).click();
        //await page.getByRole('paragraph').filter({ hasText: 'Declined' }).click();
        await page.locator('#root').getByText('lkkkkkkkkkkk').click();





    })
   
    test('add hours with amendment @smoke', async ({ page }) => {

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
        await page.getByPlaceholder('Organization name').fill('mal kade5');
        await page.getByRole('heading', { name: 'mal kade5' }).click();
        await page.getByPlaceholder('Enter name of volunteer coordinator/supervisor').click();
        await page.getByPlaceholder('Enter name of volunteer coordinator/supervisor').fill('rajapaksha');
        await page.getByRole('button', { name: 'Invite to verify hours' }).click();
        await page.getByRole('button', { name: 'Got it!' }).click();
      
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
        
        // await page.getByText('pending').nth(1).click();
        // await page.getByRole('table', { name: 'responsive table' }).getByRole('button').first().click();
      
        // await page.getByRole('button', { name: 'Approve' }).click();
        // await page.getByRole('button', { name: 'Got it!' }).click();
        // await page.getByText('approved').first().click();
        // await page.getByRole('button', { name: 'Profile' }).click();
        // await page.getByText('Verified').first().click();
        // await page.getByRole('tab', { name: 'Approved' }).click();
        // await page.getByText('Verified').first().click();


        // await page.getByRole('button', { name: 'Profile', exact: true }).click();
        // await page.getByText('Pending').nth(1).click();
        // await page.getByRole('button', { name: 'Organizations' }).click();
        // await page.getByRole('button', { name: 'Verify Hours' }).click();
        await page.locator('tr:nth-child(2) > td:nth-child(5) > p > .MuiBox-root > .MuiButtonBase-root').click();
        await page.getByRole('button', { name: 'Deny' }).click();
        await page.getByRole('textbox').click();
        await page.getByRole('textbox').fill('this is wrong');
        await page.getByRole('button', { name: 'Decline' }).click();
        await page.getByRole('row', { name: 'MG Monica Geller 2h 0m 11/10/2023 - 11/10/2023 declined' }).getByText('declined').click();
        await page.getByRole('button', { name: 'Profile' }).click();
        await page.getByRole('tab', { name: 'Declined' }).click();
      //await page.getByRole('paragraph').filter({ hasText: 'Declined' }).click();
        await page.locator('#root').getByText('lkkkkkkkkkkk').click();
        await page.getByRole('tab', { name: 'All' }).click();
        //await page.getByRole('paragraph').filter({ hasText: 'Declined' }).click();
        await page.locator('#root').getByText('lkkkkkkkkkkk').click();





    })

})

