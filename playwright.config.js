// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
 // globalSetup:"./global-setup",    
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  retries:0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: 'https://3a4avkn27vc2fmtminnljjj2pm.appsync-api.us-west-2.amazonaws.com/',
    // extraHTTPHeaders:{
    //     "Authorization":"eyJraWQiOiJDbUdlMlBldFRsRk9tcWpJU0ZZZTdyVzA4NG1oenlkYkdIeVV2QzUrTEZFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYzhjOTgyNS04MTcxLTRkOWYtYTQ4ZS1jNzk0YTZlZjA5YzAiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiJdLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfdGhlV3Q5RGltIiwiY29nbml0bzp1c2VybmFtZSI6IjNjOGM5ODI1LTgxNzEtNGQ5Zi1hNDhlLWM3OTRhNmVmMDljMCIsImF1ZCI6IjQxbTRlb3U4Yzhqam9hNGlhOXR1MDdtYmJpIiwiZXZlbnRfaWQiOiIyZjVkMTUwOS1kZjcxLTQ4YzgtYTIwYi02Y2QwYmQ5YjRkNjciLCJ0b2tlbl91c2UiOiJpZCIsImhhbmRsZXJzIjoiMDRmZDljOTQtZDY5Yi00N2Q1LTg0Y2ItOWVlZmMwNGI4MGY4YWRtaW5PTl9TVUJTQ1JJUFRJT04iLCJhdXRoX3RpbWUiOjE2OTAyNzQzMjAsImV4cCI6MTY5MDI3NzkxOSwiaWF0IjoxNjkwMjc0MzIwLCJlbWFpbCI6InVkYXJpKzMxQHNtYXNodGFwcy5jb20ifQ.r780Pyw62aAfB1TjJClI5ojd2zMQHPyQ1Z1ZT4W34orbf9Oqi1bvbqxsrMP9EVcQ-NvdLgJ1F5Rxmjn7V_A55zdLIjUH65ZMCX0RzDsCCZNvkCaKilvxxS1X727VpZZpzSdnT1Yq0v8aXHB5MDDBi-YxEyDNN_nvm293uCHX0PmuRWzqFwLeq8Tkmcb4U5rWesyjRt2AMPgfGIwYh7krYhxp1_A2t5iWclRdmpAOiGi_HLB8ow299utU884wxV-T3JO79BW3AkgtPOp4lGQOtMEYhNPOLV5PogU7EQIs6KP_PC8DxKf9vaPakimqI1qrQWg7f7450-g5IOVFLBFBYw"
    // },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    storageState:"./LoginAuth.json",
    screenshot:"on",
    video:"retain-on-failure",
    //video:"on",
    actionTimeout: 110000,
    
    
    
    
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
      //viewport:{width:1020,height:580}
    
    },
      
      
      
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

