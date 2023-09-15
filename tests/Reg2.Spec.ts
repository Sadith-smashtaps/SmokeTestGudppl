import { test, expect } from '@playwright/test'
import { promises as fs } from 'fs';
test.describe.configure({ timeout: 60000 });
test.describe.parallel('API Testing', () => {
    const baseURL = 'https://reqres.in/api'
    const data = { method: 'POST' };
    const url = 'https://postman-echo.com/post'; // Replace this with your API endpoint
    const urlOPT = 'https://webhook.site/token/';
    let getOPTURL = '8c7f4ba8-56fc-4af0-a25c-fbb51a7717e4';
    let email = "90057d02-fb2d-4e1a-a695-f1fb5a856ba3@email.webhook.site";
    let pwd = "Smash@123";


    test('Verify the login functionality with different user name password combinations - GUD-TC-230 @reg', async ({ request, page, context }) => {


        await page.goto('https://next.gudppl.com');
        //await page.pause()

        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill('waruni+3.com');
        await page.getByPlaceholder('Enter your password').click();
        await page.getByPlaceholder('Enter your password').fill('Udgfuj');
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        //await page.getByText('Invalid email address').click();
        //await page.getByText('Password must contain minimum six characters, at least one letter, one number an').click();
        expect.soft(await page.getByText('Invalid email address')).toHaveText("Invalid email address");
        expect.soft(await page.getByText('Password must contain minimum six characters, at least one letter, one number an')).toHaveText("Password must contain minimum six characters, at least one letter, one number and one special character");
        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill('waruni+3@smashtaps.com');
        await page.getByPlaceholder('Enter your password').click();
        await page.getByPlaceholder('Enter your password').fill('User@12345');
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        //await page.getByText('Wrong Username / Password').click();
        await expect.soft(await page.getByText('Wrong Username / Password')).toHaveText("Wrong Username / Password");


        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill('waruni+com');
        await page.getByPlaceholder('Enter your password').click();
        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill('');
        await page.getByPlaceholder('Enter your password').click();
        await page.getByPlaceholder('Enter your password').fill('');
        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill('waruni+3@smashtaps.com');
        await page.getByPlaceholder('Enter your password').click();
        await page.getByPlaceholder('Enter your password').fill('User@12345');
        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill('waruni+3.com');
        //await page.getByText('Invalid email address').click();
        expect.soft(await page.getByText('Invalid email address')).toHaveText("Invalid email address");

        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill('waruni+3@smashtaps.com');
        await page.getByPlaceholder('Enter your password').click();
        await page.getByPlaceholder('Enter your password').fill('User@123');
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        //await page.getByText('Welcome', { exact: true }).click();
        expect.soft(await page.getByText('Welcome', { exact: true })).toHaveText("Welcome ");




        await page.waitForTimeout(1500);



    })

    test('Verify the behaviour when user deselect the one of the options while user select all option - GUD-TC-141 @reg @smoke', async ({ request, page, context }) => {


        await page.goto('https://next.gudppl.com');
        //await page.pause()

        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill('senuwan+1a5@smashtaps.com');
        await page.getByPlaceholder('Enter your password').click();
        await page.getByPlaceholder('Enter your password').fill('Test123@');
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.waitForTimeout(1500);

        await page.getByRole('button', { name: 'Complete your profile now' }).click();
        // await page.getByPlaceholder('Enter your first name').click();
        // await page.getByPlaceholder('Enter your first name').fill('Monica');
        // await page.getByPlaceholder('Enter your last name').click();
        // await page.getByPlaceholder('Enter your last name').fill('Maxwell');
        // await page.getByPlaceholder('DD').click();
        // await page.getByPlaceholder('DD').fill('6');
        // await page.getByPlaceholder('MM').click();
        // await page.getByPlaceholder('MM').fill('7');
        // await page.getByPlaceholder('YYYY').click();
        // await page.getByPlaceholder('YYYY').fill('1999');
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1500);

        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1500);

        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1500);

        await page.getByRole('row', { name: 'English' }).getByRole('checkbox').first().check();
        await page.getByRole('row', { name: 'Tamil delete' }).getByRole('checkbox').first().check();
        await page.getByRole('row', { name: 'Sinhala delete' }).getByRole('checkbox').first().check();
        await page.getByRole('row', { name: 'Sinhala delete' }).getByRole('checkbox').nth(2).uncheck();
        await page.getByRole('row', { name: 'Tamil delete' }).getByRole('checkbox').nth(2).uncheck();
        await page.getByRole('row', { name: 'English' }).getByRole('checkbox').nth(2).uncheck();

        expect.soft(await page.getByRole('row', { name: 'English' }).getByRole('checkbox').first().isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Tamil delete' }).getByRole('checkbox').first().isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Sinhala delete' }).getByRole('checkbox').first().isChecked()).toBeFalsy();
        
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('button', { name: 'Back' }).click();

        expect.soft(await page.getByRole('row', { name: 'English' }).getByRole('checkbox').first().isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Tamil delete' }).getByRole('checkbox').first().isChecked()).toBeFalsy();
        expect.soft(await page.getByRole('row', { name: 'Sinhala delete' }).getByRole('checkbox').first().isChecked()).toBeFalsy();
        

    })

    test('Verify selecting a day in the Availability to volunteer screen- GUD-TC-62 @reg', async ({ request, page, context }) => {
        
        await expect.soft(page.getByText('Failed'), 'This test case is failed due to bug ID - GUD-637').toHaveText("Test case is failed");
        /*
       
        await page.goto('https://next.gudppl.com');
        //await page.pause()       

        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill('senuwan+1a5@smashtaps.com');
        await page.getByPlaceholder('Enter your password').click();
        await page.getByPlaceholder('Enter your password').fill('Test123@');
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.waitForTimeout(1500);

        await page.getByRole('button', { name: 'Complete your profile now' }).click();
        await page.waitForTimeout(1500);

        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1500);

        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1500);

        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1000);

        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1500);
        await page.getByLabel('Monday').check();
        await page.getByRole('button', { name: 'Next' }).click();        
        expect.soft(await page.getByText('You need to select a time of the day to proceed')).toHaveText("You need to select a time of the day to proceed");
        await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(1).check();
        await page.getByRole('row', { name: 'Monday' }).getByRole('checkbox').nth(2).check();
        await page.getByRole('button', { name: 'Next' }).click();        
        expect.soft(await page.getByText('Availability updated successfully')).toHaveText("Availability updated successfully");
        await page.waitForTimeout(1500);

        await page.getByRole('button', { name: 'Back' }).click();
        await page.waitForTimeout(1500);
        expect.soft(await page.getByLabel('Monday').isChecked()).toBeTruthy();

        ///Data remove
        await page.getByLabel('Monday').uncheck()
        await expect.soft(page.getByText('Failed'), 'This test case is failed due to bug ID - GUD-637').toHaveText("Test case is failed");
        */

    })

    test('Verify the warning message for email id which has not registered with the system. - GUD-TC-98 @reg', async ({ request, page, context }) => {

        await expect.soft(page.getByText('Failed'), 'This test case is failed due to bug ID - GUD-356').toHaveText("Test case is failed");
        /*
        await page.goto('https://next.gudppl.com');        

        await page.getByText('Forgot password?').click();
        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill('warunip@smashtaps.com');
        await page.getByRole('button', { name: 'Continue' }).click();
        //await page.getByText('Something went wrong. Please try again').click();
        expect.soft(await page.getByText('Something went wrong. Please try again')).toHaveText("User does not exsists went wrong.");
        await expect.soft(page.getByText('Failed'), 'This test case is failed due to bug ID - GUD-356').toHaveText("Test case is failed");


        await page.waitForTimeout(1500);
        */

    })

})