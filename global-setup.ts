import { Browser, chromium, expect, Page } from "@playwright/test";

async function globalSetup(){

    const browser: Browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto("https://next.d15wzopw9io6a0.amplifyapp.com/signin/");    
    await page.getByRole('button', { name: 'loading Log In' }).click();
    await page.getByLabel('Email').fill('udari+31@smashtaps.com');    
    await page.getByLabel('Password').fill('Smash@123');
    await page.getByRole('button', { name: 'loading Log In' }).click();
    await page.waitForTimeout(5000);

    //save the authentication
    await page.context().storageState({path: "./LoginAuth.json"});
    await browser.close();

}

export default globalSetup;