import { test, expect, type Page } from '@playwright/test'
import { promises as fs } from 'fs';
import utils from '../Functions/utils';
import LoginPage from "../Functions/login.page";

test.describe.configure({ timeout: 1200000 });
test.describe.parallel('API Testing', async () => {

    const urlOPT = 'https://webhook.site/token/';
    let getOPTURL = '8c7f4ba8-56fc-4af0-a25c-fbb51a7717e4';
    let email = "senuwan+1a5@smashtaps.com";
    let pwd = "Smash@123";
    let newUserEmailID = "Smash@123";

    let page: Page;

    test.beforeAll(async ({ request, browser }) => {
        test.setTimeout(120000);
        page = await browser.newPage();

        const utilsClass = new utils(page);
        newUserEmailID = await utilsClass.createUser(request);
        console.info(newUserEmailID + '======== return value of email');

        await page.goto('https://next.gudppl.com');
        await page.waitForTimeout(3000);

        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill(newUserEmailID);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.waitForTimeout(3400);


        ///////////////////////////////////////////////////////////        
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

        //await page.getByLabel('Animal welfare').check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(2500);
        //await page.getByRole('button', { name: 'climate_action' }).click();
        //await page.getByRole('button', { name: 'life_water' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400);

        //await page.getByPlaceholder('Add skills and talents').click();
        //await page.getByPlaceholder('Add skills and talents').fill('Account');
        //await page.getByRole('option', { name: 'Accounting' }).click();
        await page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(1).check();
        await page.getByRole('row', { name: 'Sinhala delete' }).getByRole('checkbox').nth(3).check();
        await page.getByRole('row', { name: 'Tamil delete' }).getByRole('checkbox').nth(4).check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3400);

        //await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).check();
        //await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).check();
        //await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(3).check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3000);

        await page.getByPlaceholder('Your phone number').click();
        await page.getByPlaceholder('Your phone number').fill('774455886');
        await page.getByLabel('Open').click();
        await page.getByPlaceholder('Select your country').fill('Sri');
        await page.getByRole('option', { name: 'Sri Lanka' }).click();

        const dropDownXPath = "//label[normalize-space()='Country']/../..//div[2]//div//div//div//div[2]";
        const dropDownElement = await page.locator(dropDownXPath);
        await dropDownElement.click();

        const dropDownType = "//label[normalize-space()='Country']/../..//div[2]//div//div//div//div[2]//input";
        const dropDownElementType = await page.locator(dropDownType);
        await dropDownElementType.fill('Colombo');

        //await page.locator('#react-select-3-input').fill('Colombo');
        await page.getByText('Colombo', { exact: true }).click({ timeout: 3000 });
        await page.getByPlaceholder('Write few sentences about you').click();
        await page.getByPlaceholder('Write few sentences about you').fill('With three titles, one runners-up finish and 49 wins to their name, New Zealand are the most successful team in Rugby World Cup history. The All Blacks conquered the world as hosts in 1987 and 2011 and then again in 2015, becoming the first nation to win back-to-back Rugby World Cups.');
        await page.getByRole('button', { name: 'Complete' }).click();
        await page.waitForTimeout(3500);

        // await page.getByRole('button', { name: 'Profile', exact: true }).click();

    });

    test.beforeEach(async ({ page }, testInfo) => {
        testInfo.setTimeout(testInfo.timeout + 30000);
        await page.goto('https://next.gudppl.com');
        await page.waitForTimeout(3000);

        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill(newUserEmailID);
        await page.getByPlaceholder('Enter your password').fill(pwd);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.waitForTimeout(3400);

        await page.getByRole('button', { name: 'Profile', exact: true }).click();
    });

    test.afterEach(async () => {
        await page.close();
    });

    test('Verify the accurate data is displayed GUD-TC-323 @reg ', async ({ request, page, context }) => {

        await expect.soft(page.locator('h2')).toHaveText("Monica Geller");
        await expect.soft(page.locator('#textClippingContainer').getByText('With three titles, one runners-up finish and 49 wins to their name, New Zealand ')).toHaveText("With three titles, one runners-up finish and 49 wins to their name, New Zealand are the most...    See more");
        await page.getByRole('button', { name: 'See more' }).click();
        await page.getByRole('button', { name: 'Show Less' }).click();
        await expect.soft(page.getByText('Colombo, Sri Lanka')).toContainText('Colombo, Sri Lanka');


    });

    test('Verify the joined date is accurate GUD-TC-324 @reg ', async ({ request, page, context }) => {


        // await page.goto('https://next.gudppl.com');
        // await page.waitForTimeout(3000);

        // await page.getByPlaceholder('Enter your email address').click();
        // await page.getByPlaceholder('Enter your email address').fill(newUserEmailID);
        // await page.getByPlaceholder('Enter your password').fill(pwd);
        // await page.getByRole('button', { name: 'Continue', exact: true }).click();
        // await page.waitForTimeout(3400);



        // await page.getByRole('button', { name: 'Profile', exact: true }).click();        

        // Define an array of month names
        const monthNames = [
            "Joined, Jan 2023", "Joined, Feb 2023", "Joined, Mar 2023", "Joined, Apr 2023", "Joined, May 2023", "Joined, Jun 2023",
            "Joined, Jul 2023", "Joined, Aug 2023", "Joined, Sep 2023", "Joined, Oct 2023", "Joined, Nov 2023", "Joined, Dec 2023"
        ];

        // Get the current date
        const currentDate = new Date();
        // Get the index of the current month (0-indexed)
        const currentMonthIndex = currentDate.getMonth();
        // Get the name of the current month
        const currentMonthName = monthNames[currentMonthIndex];
        console.log(`Current Month: ${currentMonthName}`);
        await expect.soft(page.getByText('Joined, Oct 2023')).toContainText(currentMonthName);


    });

    test('Verify the user has skipped the Availability to volunteer screen GUD-TC-330 @reg', async ({ request, page, context }) => {

        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        await page.getByRole('button', { name: 'Edit profile' }).click();
        await page.waitForTimeout(500);
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();

        await page.waitForTimeout(3500);

        expect.soft(await page.getByLabel('Monday').isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Tuesday').isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Wednesday').isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Thursday').isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Thursday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Thursday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Thursday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Friday').isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Saturday').isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Sunday').isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Sunday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Sunday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Sunday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.locator('.MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').isChecked()).toBeTruthy();



    });

    test('Verify the user has skipped the Availability to volunteer screen GUD-TC-331 @reg', async ({ request, page, context }) => {

        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        await page.getByRole('button', { name: 'Edit profile' }).click();
        await page.waitForTimeout(500);
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3500);

        await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).check();
        await page.getByRole('row', { name: 'Tuesday' }).getByRole('checkbox').nth(2).check();
        await page.getByRole('row', { name: 'Wednesday' }).getByRole('checkbox').nth(3).check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Complete' }).click();
        await page.waitForTimeout(3500);


        //verification
        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        await page.getByRole('button', { name: 'Edit profile' }).click();
        await page.waitForTimeout(500);
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
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

        expect.soft(await page.getByLabel('Friday').isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Friday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Saturday').isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Saturday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.getByLabel('Sunday').isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Sunday' }).getByRole('checkbox').nth(1).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Sunday' }).getByRole('checkbox').nth(2).isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Sunday' }).getByRole('checkbox').nth(3).isChecked()).toBeFalsy();

        expect.soft(await page.locator('.MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').isChecked()).toBeTruthy();



    });

    test('Verify the user has skipped the Skills and Talents screen GUD-TC-332 @reg ', async ({ request, page, context }) => {

        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        await page.getByRole('button', { name: 'Edit profile' }).click();
        await page.waitForTimeout(500);
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3500);

        expect.soft(await page.locator("//span[normalize-space()='Accounting']").isVisible()).toBeFalsy();


    });

    test('Verify the user has filled the Skills and Talents screen GUD-TC-333 @reg ', async ({ request, page, context }) => {

        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        await page.getByRole('button', { name: 'Edit profile' }).click();
        await page.waitForTimeout(500);
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(3500);

        await page.getByPlaceholder('Add skills and talents').click();
        await page.getByPlaceholder('Add skills and talents').fill('Account');
        await page.getByRole('option', { name: 'Accounting' }).click();

        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Complete' }).click();
        await page.waitForTimeout(3500);

        //verification
        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        await page.getByRole('button', { name: 'Edit profile' }).click();
        await page.waitForTimeout(500);
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(2500);

        expect.soft(await page.locator("//span[normalize-space()='Accounting']").isVisible()).toBeTruthy();

    });

    test('Verify the Causes I care about is accurate GUD-TC-334 @reg', async ({ request, page, context }) => {

        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        await page.getByRole('button', { name: 'Edit profile' }).click();
        await page.waitForTimeout(500);
        await page.getByRole('button', { name: 'Next' }).click();

        expect.soft(await page.getByLabel('Animal welfare').isChecked()).toBeFalsy();
        expect.soft(await page.getByLabel('Education').isChecked()).toBeFalsy();
        expect.soft(await page.getByLabel('People').isChecked()).toBeFalsy();
        expect.soft(await page.getByLabel('Disaster relief').isChecked()).toBeFalsy();
        expect.soft(await page.getByLabel('Environment').isChecked()).toBeFalsy();

        await page.getByLabel('Animal welfare').check();

        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();


        await page.getByRole('button', { name: 'Complete' }).click();
        await page.waitForTimeout(3500);


        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        await page.getByRole('button', { name: 'Edit profile' }).click();
        await page.waitForTimeout(500);
        await page.getByRole('button', { name: 'Next' }).click();

        expect.soft(await page.getByLabel('Animal welfare').isChecked()).toBeTruthy();
        expect.soft(await page.getByLabel('Education').isChecked()).toBeFalsy();
        expect.soft(await page.getByLabel('People').isChecked()).toBeFalsy();
        expect.soft(await page.getByLabel('Disaster relief').isChecked()).toBeFalsy();
        expect.soft(await page.getByLabel('Environment').isChecked()).toBeFalsy();



    });

    test('Verify the UNSDGs is accurate GUD-TC-335 @reg @smoke', async ({ request, page, context }) => {

        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        await page.getByRole('button', { name: 'Edit profile' }).click();
        await page.waitForTimeout(500);
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();

        await page.waitForTimeout(4500);
        let zeroHunger = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='zero_hunger']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        let no_poverty = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='no_poverty']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        let life_water = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='life_water']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        let climate_action = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='climate_action']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        let quality_education = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='quality_education']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        let clean_water = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='clean_water']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        let clean_energy = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='clean_energy']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        let decent_work = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='decent_work']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;


        expect.soft((await new utils(page).isCharacterCountMoreThan400(zeroHunger)).valueOf()).toBe(false);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(no_poverty)).valueOf()).toBe(false);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(life_water)).valueOf()).toBe(false);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(climate_action)).valueOf()).toBe(false);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(quality_education)).valueOf()).toBe(false);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(clean_water)).valueOf()).toBe(false);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(clean_energy)).valueOf()).toBe(false);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(decent_work)).valueOf()).toBe(false);

        await page.getByRole('button', { name: 'climate_action' }).click();
        await page.getByRole('button', { name: 'life_water' }).click();

        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();

        await page.getByRole('button', { name: 'Complete' }).click();
        await page.waitForTimeout(3500);
        await page.getByRole('button', { name: 'Profile', exact: true }).click();
        await page.getByRole('button', { name: 'Edit profile' }).click();
        await page.waitForTimeout(500);
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(4500);

        
        zeroHunger = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='zero_hunger']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        no_poverty = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='no_poverty']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        life_water = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='life_water']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        climate_action = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='climate_action']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        quality_education = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='quality_education']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        clean_water = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='clean_water']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        clean_energy = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='clean_energy']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;
        decent_work = (await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='decent_work']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M')]").getAttribute('d'))!;


        expect.soft((await new utils(page).isCharacterCountMoreThan400(zeroHunger)).valueOf()).toBe(false);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(no_poverty)).valueOf()).toBe(false);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(life_water)).valueOf()).toBe(true);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(climate_action)).valueOf()).toBe(true);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(quality_education)).valueOf()).toBe(false);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(clean_water)).valueOf()).toBe(false);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(clean_energy)).valueOf()).toBe(false);
        expect.soft((await new utils(page).isCharacterCountMoreThan400(decent_work)).valueOf()).toBe(false);



    });


})



let email = "157dec21-7da5-4751-9eea-cfea90c57d99@email.webhook.site";
let pwd = "Smash@123";
let newUserEmailID = "Smash@123";
test(' Filling all fields for NEW user - all POST apis will call here @reg', async ({ request, page, context }) => {

    //User Creation
    const utilsClass = new utils(page);
    newUserEmailID = await utilsClass.createUser(request);
    console.info(newUserEmailID + '======== return value of email');

    // New user adding data for first time
    await page.goto('https://next.gudppl.com');
    await page.waitForTimeout(3000);

    await page.getByPlaceholder('Enter your email address').click();
    await page.getByPlaceholder('Enter your email address').fill(newUserEmailID);
    await page.getByPlaceholder('Enter your password').fill(pwd);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.waitForTimeout(3400);


    ///////////////////////////////////////////////////////////        
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
    await page.waitForTimeout(2500);
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
    await page.waitForTimeout(3000);

    await page.getByPlaceholder('Your phone number').click();
    await page.getByPlaceholder('Your phone number').fill('774455886');
    await page.getByLabel('Open').click();
    await page.getByPlaceholder('Select your country').fill('Sri');
    await page.getByRole('option', { name: 'Sri Lanka' }).click();

    const dropDownXPath = "//label[normalize-space()='Country']/../..//div[2]//div//div//div//div[2]";
    const dropDownElement = await page.locator(dropDownXPath);
    await dropDownElement.click();

    const dropDownType = "//label[normalize-space()='Country']/../..//div[2]//div//div//div//div[2]//input";
    const dropDownElementType = await page.locator(dropDownType);
    await dropDownElementType.fill('Colombo');

    //await page.locator('#react-select-3-input').fill('Colombo');
    await page.getByText('Colombo', { exact: true }).click({ timeout: 3000 });
    await page.getByPlaceholder('Write few sentences about you').click();
    await page.getByPlaceholder('Write few sentences about you').fill('With three titles, one runners-up finish and 49 wins to their name, New Zealand are the most successful team in Rugby World Cup history. The All Blacks conquered the world as hosts in 1987 and 2011 and then again in 2015, becoming the first nation to win back-to-back Rugby World Cups.');
    await page.getByRole('button', { name: 'Complete' }).click();
    await page.waitForTimeout(3500);

    // New user adding data for the first time is finished.
    // Starting editng the added data

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
    await page.waitForTimeout(1500);
    await page.getByPlaceholder('Add skills and talents').click();
    await page.getByPlaceholder('Add skills and talents').fill('market');
    await page.getByRole('option', { name: 'Marketing' }).click();
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


    const dropDownXPath1 = "//label[normalize-space()='Country']/../..//div[2]//div//div//div//div[2]";
    const dropDownElement1 = await page.locator(dropDownXPath1);
    await dropDownElement1.click();

    const dropDownType1 = "//label[normalize-space()='Country']/../..//div[2]//div//div//div//div[2]//input";
    const dropDownElementType1 = await page.locator(dropDownType1);
    await dropDownElementType1.fill('Dehiwala-Mount Lavinia');
    await page.waitForTimeout(1000);

    //await page.locator('#react-select-3-input').fill('Colombo');
    await page.getByText('Dehiwala-Mount Lavinia', { exact: true }).click({ timeout: 3000 });


    await page.getByPlaceholder('Write few sentences about you').click();
    await page.getByPlaceholder('Write few sentences about you').fill('Hi my name is Monica Gellerzzzzzzzzzzz');
    //await page.getByPlaceholder('Your phone number').click();
    //await page.getByRole('button', { name: '+94' }).click();
    await page.getByRole('button', { name: '+94' }).click();
    await page.getByRole('option', { name: '+677' }).click();
    await page.getByPlaceholder('Your phone number').click();
    await page.getByPlaceholder('Your phone number').fill('888888555');
    await page.getByRole('button', { name: 'Complete' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Profile', exact: true }).click();

    //////// Editing existing data is finished
    /////////////////////////////      Verification  is starting      /////////////////////////////////////////////

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
    expect.soft(await page.locator("//input[@value='+677']")).toHaveValue('+677');
    await expect.soft(page.getByPlaceholder('Your phone number')).toHaveValue("888888555");
    // await expect.soft(page.getByPlaceholder('Select your country')).toHaveValue("+677");  // due to bug     
    await expect.soft(page.getByPlaceholder('Write few sentences about you')).toHaveValue("Hi my name is Monica Gellerzzzzzzzzzzz");

    // await page.getByRole('button', { name: 'Complete' }).click();




});

test(' Filling all fields for Existing user - all update apis will call here @reg ', async ({ request, page, context }) => {

    //User Creation
    // const utilsClass = new utils(page);
    // newUserEmailID = await utilsClass.createUser(request);
    // console.info(newUserEmailID + '======== return value of email');

    // Editing data for the existing user
    await page.goto('https://next.gudppl.com');
    await page.waitForTimeout(3000);

    await page.getByPlaceholder('Enter your email address').click();
    await page.getByPlaceholder('Enter your email address').fill(email);
    await page.getByPlaceholder('Enter your password').fill(pwd);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.waitForTimeout(3400);

    await page.getByRole('button', { name: 'Profile', exact: true }).click();
    await page.getByRole('button', { name: 'Edit profile' }).click();
    await page.waitForTimeout(500);


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
    await page.getByLabel('Education').uncheck();
    await page.getByLabel('People').uncheck();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Back' }).click();
    await page.getByLabel('Education').check();
    await page.getByLabel('People').check();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'no_poverty' }).click();
    await page.getByRole('button', { name: 'zero_hunger' }).click();
    await page.getByRole('button', { name: 'climate_action' }).click();
    await page.getByRole('button', { name: 'life_water' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Back' }).click();
    await page.getByRole('button', { name: 'no_poverty' }).click();
    await page.getByRole('button', { name: 'zero_hunger' }).click();
    await page.getByRole('button', { name: 'climate_action' }).click();
    await page.getByRole('button', { name: 'life_water' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(1500);
    await page.locator("//h3[normalize-space()='Your skills & talents']/../div/div/div[2]/div[1]//*[name()='svg']").click();
    await page.waitForTimeout(1500);
    await page.getByPlaceholder('Add skills and talents').click();
    await page.getByPlaceholder('Add skills and talents').fill('market');
    await page.getByRole('option', { name: 'Marketing' }).click();
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


    const dropDownXPath1 = "//label[normalize-space()='Country']/../..//div[2]//div//div//div//div[2]";
    const dropDownElement1 = await page.locator(dropDownXPath1);
    await dropDownElement1.click();

    const dropDownType1 = "//label[normalize-space()='Country']/../..//div[2]//div//div//div//div[2]//input";
    const dropDownElementType1 = await page.locator(dropDownType1);
    await dropDownElementType1.fill('Dehiwala-Mount Lavinia');
    await page.waitForTimeout(1000);
    await page.getByText('Dehiwala-Mount Lavinia', { exact: true }).click({ timeout: 3000 });

    await page.getByPlaceholder('Write few sentences about you').click();
    await page.getByPlaceholder('Write few sentences about you').fill('Hi my name is Monica Gellerzzzzzzzzzzz');
    //await page.getByRole('button', { name: '+94' }).click();
    //await page.getByRole('option', { name: '+677' }).click();
    await page.getByPlaceholder('Your phone number').click();
    await page.getByPlaceholder('Your phone number').fill('888888555');
    await page.getByRole('button', { name: 'Complete' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Profile', exact: true }).click();

    //////// Editing existing data is finished
    /////////////////////////////      Verification  is starting      /////////////////////////////////////////////

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

    expect.soft(await page.locator('label').filter({ hasText: 'boy/man' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeTruthy();
    expect.soft(await page.locator('label').filter({ hasText: 'girl/woman' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeFalsy();
    expect.soft(await page.getByPlaceholder('Let me type...')).toBeEmpty();

    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(1500);
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
    expect.soft(await page.locator("//input[@value='+677']")).toHaveValue('+677');
    await expect.soft(page.getByPlaceholder('Your phone number')).toHaveValue("888888555");
    await expect.soft(page.getByPlaceholder('Write few sentences about you')).toHaveValue("Hi my name is Monica Gellerzzzzzzzzzzz");



});