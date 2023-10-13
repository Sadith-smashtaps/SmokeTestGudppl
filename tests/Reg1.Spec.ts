import { test, expect } from '@playwright/test'
import { promises as fs } from 'fs';
test.describe.configure({ timeout: 60000 });
test.describe.parallel('API Testing', () => {
  const baseURL = 'https://reqres.in/api'
  const data = { method: 'POST' };
  const url = 'https://postman-echo.com/post'; // Replace this with your API endpoint
  const urlOPT = 'https://webhook.site/token/';
  let getOPTURL = '8c7f4ba8-56fc-4af0-a25c-fbb51a7717e4';
  let email = "senuwan+1a2@smashtaps.com";
  let pwd = "Test123@";

  test.afterEach(async ({ page }) => {
    await page.getByRole('button', { name: 'Skip this, I’ll do it later' }).click();
    await page.getByRole('button', { name: 'SP Saman Perera senuwan+1a2@smashtaps.com' }).click();
    await page.getByRole('menuitem', { name: 'Log out' }).click();
  });

  test('Verify filling only the mandatory fields and clicking on the Next button - GUD-TC-27 @reg', async ({ request, page, context }) => {

    await page.goto('https://next.gudppl.com');
    // await page.pause();

    await page.getByPlaceholder('Enter your email address').click();
    console.log('email from Login = ' + email)
    await page.getByPlaceholder('Enter your email address').fill(email);
    await page.getByPlaceholder('Enter your password').fill(pwd);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Complete your profile now' }).click();
    //await page.pause();
    await page.getByPlaceholder('Enter your first name').click();
    await page.getByPlaceholder('Enter your first name').fill('Saman');
    await page.getByPlaceholder('Enter your last name').click();
    await page.getByPlaceholder('Enter your last name').fill('Perera');
    await page.getByPlaceholder('DD').click();
    await page.getByPlaceholder('DD').fill('22');
    await page.getByPlaceholder('MM').click();
    await page.getByPlaceholder('MM').fill('2');
    await page.getByPlaceholder('YYYY').click();
    await page.getByPlaceholder('YYYY').fill('1990');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1500);

    await expect.soft(page.getByPlaceholder('Enter your first name')).toHaveValue("Saman");
    await expect.soft(page.getByPlaceholder('Enter your last name')).toHaveValue("Perera");
    await expect.soft(page.getByPlaceholder('DD')).toHaveValue("22");
    await expect.soft(page.getByPlaceholder('MM')).toHaveValue("2");
    await expect.soft(page.getByPlaceholder('YYYY')).toHaveValue("1990");

    expect.soft(await page.locator('label').filter({ hasText: 'boy/man' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeFalsy();
    expect.soft(await page.locator('label').filter({ hasText: 'girl/woman' }).getByRole('checkbox', { name: 'controlled' }).isChecked()).toBeFalsy();
    expect.soft(await page.getByPlaceholder('Let me type...')).toBeEmpty();

    //  await page.pause();
    await expect.soft(page.getByText('Failed'), 'This test case is failed due to bug ID - GUD-638').toHaveText("Test case is failed");
  });

  test('Verify user able to enter valid email address on reset password field and continue.. - GUD-TC-264 @reg', async ({ request, page, context }) => {

    await page.goto('https://next.gudppl.com');
    await page.waitForTimeout(1500);

    await page.getByText('Forgot password?').click();

    await page.getByPlaceholder('Enter your email address').click();
    await page.getByPlaceholder('Enter your email address').fill('aa@.com');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect.soft(page.getByText('Please enter a valid email address')).toHaveText("Please enter a valid email address");


    await page.getByPlaceholder('Enter your email address').click();
    await page.getByPlaceholder('Enter your email address').fill('bbbb.com');
    await expect.soft(page.getByText('Please enter a valid email address')).toHaveText("Please enter a valid email address");

    await page.getByPlaceholder('Enter your email address').click();
    await page.getByPlaceholder('Enter your email address').fill('sfsdfsdfsdf@');
    await expect.soft(page.getByText('Please enter a valid email address')).toHaveText("Please enter a valid email address");


    await page.getByPlaceholder('Enter your email address').click();
    await page.getByPlaceholder('Enter your email address').fill('sdfsdfs.com');
    await expect.soft(page.getByText('Please enter a valid email address')).toHaveText("Please enter a valid email address");


    await page.getByPlaceholder('Enter your email address').click();
    await page.getByPlaceholder('Enter your email address').fill('123@gmail.');
    await expect.soft(page.getByText('Please enter a valid email address')).toHaveText("Please enter a valid email address");


    await page.getByPlaceholder('Enter your email address').click();
    await page.getByPlaceholder('Enter your email address').fill('abc123@gmailco');
    await expect.soft(page.getByText('Please enter a valid email address')).toHaveText("Please enter a valid email address");


    await page.getByPlaceholder('Enter your email address').click();
    await page.getByPlaceholder('Enter your email address').fill('123#$%%$%Û&(*&^%$#!');
    await expect.soft(page.getByText('Please enter a valid email address')).toHaveText("Please enter a valid email address");


    await page.getByPlaceholder('Enter your email address').click();
    await page.getByPlaceholder('Enter your email address').fill('senuwan+22@smashtaps.com');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect.soft(page.getByText('Successfull'), 'This test case is failed due to - GUD-356').toHaveText("Something went wrong. Please try again");




  });


  test('Verify clicking on the Next button after selecting options in the Causes you care about screen.. - GUD-TC-50 and GUD-TC-48 @reg @smoke', async ({ request, page, context }) => {


    await page.goto('https://next.gudppl.com');
    await page.waitForTimeout(1500);

    await page.getByPlaceholder('Enter your email address').click();
    await page.getByPlaceholder('Enter your email address').fill('senuwan+1a2@smashtaps.com');
    await page.getByPlaceholder('Enter your password').click();
    await page.getByPlaceholder('Enter your password').fill('Test123@');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.waitForTimeout(1500);

    await page.getByRole('button', { name: 'Complete your profile now' }).click();

    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(2500);

    await page.getByLabel('Animal welfare').check();
    await page.getByLabel('Education').check();
    await page.getByLabel('Environment').check();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(1500);

    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1500);
    //  expect.soft(await page.getByLabel('Animal welfare').isEnabled()).toBeTruthy();
    //  expect.soft(await page.getByLabel('Education').isEnabled()).toBeTruthy();
    //  expect.soft(await page.getByLabel('Environment').isEnabled()).toBeTruthy();

    expect.soft(await page.getByLabel('Animal welfare').isChecked()).toBeTruthy();
    expect.soft(await page.getByLabel('Education').isChecked()).toBeTruthy();
    expect.soft(await page.getByLabel('People').isChecked()).toBeFalsy();
    expect.soft(await page.getByLabel('Disaster relief').isChecked()).toBeFalsy();
    expect.soft(await page.getByLabel('Environment').isChecked()).toBeTruthy();

    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1500);

    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(1500);
    expect.soft(await page.getByLabel('Animal welfare').isChecked()).toBeTruthy();
    expect.soft(await page.getByLabel('Education').isChecked()).toBeTruthy();
    expect.soft(await page.getByLabel('People').isChecked()).toBeFalsy();
    expect.soft(await page.getByLabel('Disaster relief').isChecked()).toBeFalsy();
    expect.soft(await page.getByLabel('Environment').isChecked()).toBeTruthy();

    //verify select all functionality   
    await page.getByRole('button', { name: 'Select all and proceed' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Back' }).click();
    expect.soft(await page.getByLabel('Animal welfare').isChecked()).toBeTruthy();
    expect.soft(await page.getByLabel('Education').isChecked()).toBeTruthy();
    expect.soft(await page.getByLabel('People').isChecked()).toBeTruthy();
    expect.soft(await page.getByLabel('Disaster relief').isChecked()).toBeTruthy();
    expect.soft(await page.getByLabel('Environment').isChecked()).toBeTruthy();


    ///data remove
    await page.getByLabel('Animal welfare').uncheck();
    await page.getByLabel('Disaster relief').uncheck();
    await page.getByLabel('Environment').uncheck();
    await page.getByLabel('Education').uncheck();
    await page.getByLabel('People').uncheck();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1500);
    expect.soft(await page.getByLabel('Animal welfare').isChecked()).toBeFalsy();
    expect.soft(await page.getByLabel('Education').isChecked()).toBeFalsy();
    expect.soft(await page.getByLabel('People').isChecked()).toBeFalsy();
    expect.soft(await page.getByLabel('Disaster relief').isChecked()).toBeFalsy();
    expect.soft(await page.getByLabel('Environment').isChecked()).toBeFalsy();

  });

  test('Verify user able to select up to 5 UN Sustainable Development Goals... - GUD-TC-31 and GUD-TC-32 @reg', async ({ request, page, context }) => {

    await page.goto('https://next.gudppl.com');
    await page.waitForTimeout(1500);
    //await page.pause();
    await page.getByPlaceholder('Enter your email address').click();
    await page.getByPlaceholder('Enter your email address').fill('senuwan+1a3@smashtaps.com');
    await page.getByPlaceholder('Enter your email address').press('Tab');
    await page.getByPlaceholder('Enter your password').fill('Test123@');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.waitForTimeout(1500);

    await page.getByRole('button', { name: 'Complete your profile now' }).click();
    // await page.getByPlaceholder('Enter your first name').click();
    // await page.getByPlaceholder('Enter your first name').fill('Kasun');
    // await page.getByPlaceholder('Enter your last name').click();
    // await page.getByPlaceholder('Enter your last name').fill('Perera');
    // await page.getByPlaceholder('DD').click();
    // await page.getByPlaceholder('DD').fill('1');
    // await page.getByPlaceholder('MM').click();
    // await page.getByPlaceholder('MM').fill('2');
    // await page.getByPlaceholder('YYYY').click();
    // await page.getByPlaceholder('YYYY').fill('2004');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'no_poverty' }).click();
    await page.getByRole('button', { name: 'clean_water' }).click();
    await page.getByRole('button', { name: 'communities' }).click();
    await page.getByRole('button', { name: 'justice' }).click();
    await page.getByRole('button', { name: 'reduced_inequalities' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Back' }).click();

    expect.soft(await page.getByRole('button', { name: 'no_poverty' }).isEnabled()).toBeTruthy();
    expect.soft(await page.getByRole('button', { name: 'clean_water' }).isEnabled()).toBeTruthy();
    expect.soft(await page.getByRole('button', { name: 'communities' }).isEnabled()).toBeTruthy();
    expect.soft(await page.getByRole('button', { name: 'justice' }).isEnabled()).toBeTruthy();
    expect.soft(await page.getByRole('button', { name: 'reduced_inequalities' }).isEnabled()).toBeTruthy();

    // Checking maximum validation
    await page.getByRole('button', { name: 'life_water' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(1500);

    expect.soft(await page.getByText('Please select maximum of 5 options')).toHaveText("Please select maximum of 5 options");

    //Data removing.
    await page.getByRole('button', { name: 'no_poverty' }).click();
    await page.getByRole('button', { name: 'clean_water' }).click();
    await page.getByRole('button', { name: 'communities' }).click();
    await page.getByRole('button', { name: 'justice' }).click();
    await page.getByRole('button', { name: 'reduced_inequalities' }).click();
    await page.getByRole('button', { name: 'life_water' }).click();
    await page.getByRole('button', { name: 'Next' }).click();



  });



  test('Verify user able to view his selection when navigate back and come back to the screen..... - GUD-TC-33 @reg ', async ({ request, page, context }) => {

    await page.goto('https://next.gudppl.com');
    await page.waitForTimeout(1500);
    // await page.pause();

    await page.getByPlaceholder('Enter your email address').click();
    await page.getByPlaceholder('Enter your email address').fill('senuwan+1a5@smashtaps.com');
    await page.getByPlaceholder('Enter your password').click();
    await page.getByPlaceholder('Enter your password').fill('Test123@');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Complete your profile now' }).click();
    // await page.getByPlaceholder('Enter your first name').click();
    // await page.getByPlaceholder('Enter your first name').fill('Moon');
    // await page.getByPlaceholder('Enter your first name').press('Tab');
    // await page.getByPlaceholder('Enter your last name').fill('Paul');
    // await page.getByPlaceholder('DD').click();
    // await page.getByPlaceholder('DD').fill('1');
    // await page.getByPlaceholder('MM').click();
    // await page.getByPlaceholder('MM').fill('2');
    // await page.getByPlaceholder('YYYY').click();
    // await page.getByPlaceholder('YYYY').fill('2002');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'no_poverty' }).click();
    await page.getByRole('button', { name: 'quality_education' }).click();
    await page.getByRole('button', { name: 'clean_water' }).click();
    await page.getByRole('button', { name: 'clean_energy' }).click();
    await page.getByRole('button', { name: 'decent_work' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1500);
    //verification

    // expect.soft(await page.getByRole('button', { name: 'no_poverty' }).isEnabled()).toBeTruthy();
    // expect.soft(await page.getByRole('button', { name: 'quality_education' }).isEnabled()).toBeTruthy();
    // expect.soft(await page.getByRole('button', { name: 'clean_water' }).isEnabled()).toBeTruthy();
    // expect.soft(await page.getByRole('button', { name: 'clean_energy' }).isEnabled()).toBeTruthy();
    // expect.soft(await page.getByRole('button', { name: 'decent_work' }).isEnabled()).toBeTruthy();

    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='no_poverty']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeTruthy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='quality_education']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeTruthy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='clean_water']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeTruthy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='clean_energy']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeTruthy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='decent_work']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeTruthy();



    await page.getByRole('button', { name: 'quality_education' }).click();
    await page.getByRole('button', { name: 'clean_water' }).click();
    await page.getByRole('button', { name: 'clean_energy' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1500);
    //verification
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='no_poverty']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeTruthy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='quality_education']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeFalsy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='clean_water']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeFalsy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='clean_energy']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeFalsy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='decent_work']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeTruthy();


    await page.getByRole('button', { name: 'no_poverty' }).click();
    await page.getByRole('button', { name: 'decent_work' }).click();
    await page.getByRole('button', { name: 'quality_education' }).click();
    await page.getByRole('button', { name: 'reduced_inequalities' }).click();
    await page.getByRole('button', { name: 'good_health' }).click();
    await page.getByRole('button', { name: 'zero_hunger' }).click();
    await page.getByRole('button', { name: 'iii' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1500);
    //verification
    // expect.soft(await page.getByRole('button', { name: 'no_poverty' }).isEnabled()).toBeFalsy();
    // expect.soft(await page.getByRole('button', { name: 'decent_work' }).isEnabled()).toBeFalsy();
    // expect.soft(await page.getByRole('button', { name: 'quality_education' }).isEnabled()).toBeTruthy();
    // expect.soft(await page.getByRole('button', { name: 'reduced_inequalities' }).isEnabled()).toBeTruthy();
    // expect.soft(await page.getByRole('button', { name: 'good_health' }).isEnabled()).toBeTruthy();    
    // expect.soft(await page.getByRole('button', { name: 'zero_hunger' }).isEnabled()).toBeTruthy();
    // expect.soft(await page.getByRole('button', { name: 'iii' }).isEnabled()).toBeTruthy();

    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='no_poverty']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeFalsy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='decent_work']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeFalsy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='quality_education']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeTruthy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='reduced_inequalities']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeTruthy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='good_health']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeTruthy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='zero_hunger']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeTruthy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='iii']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeTruthy();

    await page.getByRole('button', { name: 'iii' }).click();
    await page.getByRole('button', { name: 'quality_education' }).click();
    await page.getByRole('button', { name: 'good_health' }).click();
    await page.getByRole('button', { name: 'zero_hunger' }).click();
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Next' }).click();
    //verification
    // expect.soft(await page.getByRole('button', { name: 'no_poverty' }).isEnabled()).toBeFalsy();
    // expect.soft(await page.getByRole('button', { name: 'decent_work' }).isEnabled()).toBeFalsy();
    // expect.soft(await page.getByRole('button', { name: 'quality_education' }).isEnabled()).toBeTruthy();
    // expect.soft(await page.getByRole('button', { name: 'reduced_inequalities' }).isEnabled()).toBeTruthy();
    // expect.soft(await page.getByRole('button', { name: 'good_health' }).isEnabled()).toBeTruthy();    
    // expect.soft(await page.getByRole('button', { name: 'zero_hunger' }).isEnabled()).toBeTruthy();
    // expect.soft(await page.getByRole('button', { name: 'iii' }).isEnabled()).toBeTruthy();


    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='no_poverty']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeFalsy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='decent_work']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeFalsy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='quality_education']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeTruthy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='reduced_inequalities']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeTruthy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='good_health']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeTruthy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='zero_hunger']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeTruthy();
    expect.soft(await page.locator("//h3[normalize-space()='United Nations Sustainable Development Goals']/../..//div[2]//div//div[1]//img[@alt='iii']/../..//div[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12.17 21a9 9 0 1 0 .001-18 9 9 0 0 0 0 18Zm4.77-11.36a1 1 0 1 0-1.537-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.007.006-.006-.005c-.168-.127-.383-.339-.766-.722l-1.451-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451.041.041c.327.327.64.641.933.862.327.248.756.48 1.305.456.55-.025.956-.296 1.26-.572.27-.247.555-.588.85-.943l.037-.044L16.94 9.64Z')]").isVisible()).toBeTruthy();

    // data remove
    await page.getByRole('button', { name: 'quality_education' }).click();
    await page.getByRole('button', { name: 'reduced_inequalities' }).click();
    await page.getByRole('button', { name: 'good_health' }).click();
    await page.getByRole('button', { name: 'zero_hunger' }).click();
    await page.getByRole('button', { name: 'iii' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(2000);



  });



  test('Verify user able to upload an image..... - GUD-TC-9, GUD-TC-276 , GUD-TC-197 @reg ', async ({ request, page, context }) => {

    await page.goto('https://next.gudppl.com');
    await page.waitForTimeout(1500);
    //await page.pause();

    await page.getByPlaceholder('Enter your email address').click();
    await page.getByPlaceholder('Enter your email address').fill('senuwan+1a5@smashtaps.com');
    await page.getByPlaceholder('Enter your password').click();
    await page.getByPlaceholder('Enter your password').fill('Test123@');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Complete your profile now' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('row', { name: 'Sinhala delete' }).getByRole('checkbox').first().check();
    await page.getByRole('row', { name: 'Tamil delete' }).getByRole('checkbox').first().check();
    await page.getByRole('row', { name: 'English' }).getByRole('checkbox').first().check();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Upload picture' }).click();
    await page.getByRole('img', { name: '/images/profilePictures/ambulance.png' }).click();
    await expect.soft(page.getByText('Profile picture uploaded successfully')).toHaveText("Profile picture uploaded successfully");
    await page.getByRole('button', { name: 'Upload picture' }).click();
    await page.getByRole('img', { name: '/images/profilePictures/people.png' }).click();
    await page.getByText('Profile picture uploaded successfully').click();
    await expect.soft(page.getByText('Profile picture uploaded successfully')).toHaveText("Profile picture uploaded successfully");
    await page.getByRole('button', { name: 'Upload picture' }).click();
    await page.getByRole('button', { name: 'Upload from gallery' }).click();
    await page.waitForTimeout(1000);
    await page.locator("//input[@id='fileInput']").setInputFiles('pages/docs/image1.png');




  });


});










