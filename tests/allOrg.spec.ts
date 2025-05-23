import { test, expect } from '@playwright/test'
import { promises as fs } from 'fs';
import utils from '../Functions/utils';

test.describe.configure({ timeout: 600000 });
test.describe.serial('API Testing', () => {
    const baseURL = 'https://reqres.in/api';
    const data = { method: 'POST' };
    const url = 'https://postman-echo.com/post'; // Replace this with your API endpoint
    const urlOPT = 'https://webhook.site/token/';
    let getOPTURL = '8c7f4ba8-56fc-4af0-a25c-fbb51a7717e4';
    let email = "4cc42826-a818-4734-89a3-05b70b00f96c@email.webhook.site";
    let email2 = "4cc42826-a818-4734-89a3-05b70b00f96d@email.webhook.site";
    let pwd = "User@123";
    let orgName = "";

    async function appendToFile(filePath: string, content: string): Promise<void> {
        await fs.appendFile(filePath, content);
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    test('Create new user with OTP and email verification', async ({ request, page }) => {
        // Create User
        const response = await request.post(urlOPT);
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(201);
        getOPTURL = responseBody.uuid;
        const response1 = await request.get('https://webhook.site/token/' + getOPTURL + '/requests?page=1&password=&query=&sorting=oldest');
        expect(response1.status()).toBe(200);
        await page.goto('https://next.gudppl.com/signup');
        await page.getByPlaceholder('Enter your email address').fill(responseBody.uuid + '@email.webhook.site');
        email = responseBody.uuid + '@email.webhook.site';
        await page.getByPlaceholder('Enter a new password').fill(pwd);
        await page.getByRole('checkbox').check();
        await page.getByRole('button', { name: 'Create account' }).click();
        await page.waitForTimeout(47000);

        // Get Verification Code
        const response2 = await request.get('https://webhook.site/token/' + getOPTURL + '/requests?page=1&password=&query=&sorting=oldest');
        expect(response2.status()).toBe(200);
        const responseBody2 = JSON.parse(await response2.text());
        const dataArray = responseBody2.data;
        let text_content = "";
        for (const obj of dataArray) {
            text_content = obj.text_content;
        }
        const codeMatch = text_content.match(/\d{6}/);
        let verificationCode = "";
        if (codeMatch) {
            verificationCode = codeMatch[0];
        }

        const charArray = verificationCode.split("");
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
        await appendToFile('./pages/emailsIDs.txt', '\n' + email);
    });

    test('Login with verified user and complete profile preferences with all 7 steps', async ({ page }) => {
        await page.goto('https://next.gudppl.com');
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.getByPlaceholder('Enter your first name').fill('Monica');
        await page.getByPlaceholder('Enter your last name').fill('Geller');
        await page.getByPlaceholder('DD').fill('10');
        await page.getByPlaceholder('MM').fill('10');
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
        await page.getByPlaceholder('Add skills and talents').fill('Account');
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
        await page.getByPlaceholder('Your phone number').fill('774455886');
        await page.getByPlaceholder('Select your country').fill('Sri');
        await page.getByRole('option', { name: 'Sri Lanka' }).click();
        await page.waitForTimeout(500);
        await page.locator("//label[normalize-space()='Country']/../..//div[2]//div//div//div//div[2]").click();
        await page.locator("//label[normalize-space()='Country']/../..//div[2]//div//div//div//div[2]//input").fill('Colombo');
        await page.getByText('Colombo', { exact: true }).click();
        await page.getByPlaceholder('Write few sentences about you').fill('Hi my name is Monica Geller');
        await page.getByRole('button', { name: 'Complete' }).click();
        await page.waitForTimeout(3500);
        await expect.soft(page.getByRole('heading', { name: 'Hello, Monica. Welcome to gudppl!' })).toHaveText("Hello, Monica. Welcome to gudppl!");
    });

    test('Create organization', async ({ page }) => {
        await page.goto('https://next.gudppl.com');
        await page.getByPlaceholder('Enter your email address').fill(email);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.waitForTimeout(1000);
        const randomNumber = getRandomNumber(1, 100588);
        await page.getByRole('button', { name: 'Organizations' }).click();
        await page.getByRole('button', { name: 'Create an organization' }).click();
        orgName = 'Org1' + randomNumber;
        await page.getByPlaceholder('Enter organization name').fill(orgName);
        await page.getByLabel('BusinessSmall/medium business, company, or multi-national company').check();
        await page.getByLabel('Yes').check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(500);
        await page.getByPlaceholder('Who we are and the positive impact we wish to make in the community').fill('This is created by automation');
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
        await page.locator('input[name="website"]').fill('https://www.rugbyworldcup.com/2024');
        await page.locator('input[name="profileInformation"]').fill('https://www.espncricinfo.com/');
        await page.getByLabel('I verify that I am an authorized representative of this organization and have the right to act on its behalf in the creation and management of this profile. The organization and I agree to gudppl\'s Terms & Conditions.').check();
        await page.getByRole('button', { name: 'Complete' }).click();
        await page.waitForTimeout(500);
        await fs.writeFile('./pages/orgName.txt', orgName);
    });

    test('Verify organization', async ({ page }) => {
      // Read Organization Name
      const orgName = await fs.readFile('./pages/orgName.txt', 'utf8');
      
      await page.goto('https://next.gudppl.com');
      await page.getByPlaceholder('Enter your email address').fill(email);
      await page.getByPlaceholder('Enter your password').fill(pwd);
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
      await page.waitForTimeout(1000);
      //const randomNumber = getRandomNumber(1, 100588);
      await page.getByRole('button', { name: 'Organizations' }).click();
      
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

  });

    
});