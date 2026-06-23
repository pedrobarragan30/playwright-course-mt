import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
/*
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });*/
import "dotenv/config";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  //testDir: './tests', //PB NOTE: ORIGINAL LINE
  testDir: ".", 
    //PB NOTE: UPDATED: This line specifies the directory where Playwright should look for test files. By setting it to ".", you are
    // telling Playwright to look for test files in the current directory and its subdirectories. This allows you to organize your test
    // files in a way that suits your project structure, without being limited to a specific "tests" directory.
  testMatch: [/module-.*\/.*\.spec\.ts/, /tests\/.*\.spec\.ts/],
    //PB NOTE: UPDATED: This line specifies the pattern for test files that Playwright should look for. In this case, the pattern looks
    // for files that end with "spec.ts" and are located in either a "module-*" directory or a "tests" directory.
  /* Run tests in files in parallel */
  fullyParallel: true, 
    //PB NOTE: TRUE for all browsers, but you can set this to false to run them sequentially.
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */ 
  retries: process.env.CI ? 2 : 0,
    //PB NOTE: If it fails once, Playwright will retry as many as many times as specified, If CI is set 2 retries will be performed. If
    // not, no retries will be performed.
  /* Opt out of parallel tests on CI. */ 
  workers: process.env.CI ? 1 : undefined, //PB NOTE: How the work in parallel each browser is a worker.


  timeout: 60_000,
    //PB NOTE: ADDED: This will help to allow the server to coldstart and load the page before the test times out.  By configuring an 
    // appropriate timeout, you can improve the reliability of your tests and ensure that they have enough time to complete successfully
    // under various conditions.
  expect: {timeout: 10_000},
    //PB NOTE: ADDED: The expect is the same as an "assertion" in other testing frameworks. By setting a timeout for expect, you can
    // specify how long Playwright should wait for a particular condition to be satisfied before considering it a failure. This is
    // especially useful when dealing with asynchronous operations or dynamic content on web pages, where elements may take some time to
    // appear or change state.
    // PB NOTE: In the values above we can use 60000 instead of 60_000, the underscore is just a visual separator to make it easier to
    // read large numbers, but it does not affect the actual value. Both 60000 and 60_000 represent the same number of milliseconds (60
    // seconds) and can be used interchangeably in your code. The use of underscores is a common practice in programming to improve
    // readability, especially when dealing with large numbers, but it does not change the underlying value or behavior of the code.


  /* Re orter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html', //PB NOTE: There can be reports in html, Junit, xml
  reporter:[["html",{open: "always"}], ["list"]],
    //PB NOTE: Available values - "always", "never", "on-failure", "on-first-retry", "on-all-retries". This line configures the HTML
    // reporter to generate a report but not automatically open it after the tests are completed. The "open: 'never'" option ensures that
    // the report is generated and saved to disk, but it will not be opened in a browser automatically. This allows you to review the
    // report at your convenience without it being intrusive during the test execution process. You can manually open the generated HTML
    // report later to analyze the test results and any potential issues that may have occurred during the test run. */
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: false,
      //PB NOTE: ADDED: Set it to "false", if you want to see the browser while the tests are running. For CI environments "true"
      // Its recommended
    //headless: process.env.CI ? true : false
      //PB NOTE: ADDED: If env.CI is "true", headless will be set to "true".
    //headless: process.env.HEADLESS ? process.env.HEADLESS === 'true' : false,
      //PB NOTE: ADDED: The intention is the same as above.

    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
      //PB NOTE: ORIGINAL LINE
    baseURL: process.env.BASE_URL ?? "https://omnipizza-frontend.onrender.com", 
      //PB NOTE: ADDED: The "??" Indicates that If the BASE_URL environment variable is not set, it will default to the specified
      // URL.

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
      //PB NOTE: ADDED: Available values are "on", "off", "on-first-retry", "on-all-retries". This line configures Playwright to collect a trace of the test execution only when a test fails and is retried for the first time. 
    screenshot: "on",
      //PB NOTE: ADDED: Available values are "on", "off", "only-on-failure", "on-first-failure". This line configures Playwright to capture screenshots only when a test fails.
    video: "retain-on-failure",
      //PB NOTE: ADDED: Available values are "on", "off", "on-first-retry", "retain-on-failure", "retry-with-video". This line configures Playwright to record videos of test executions only when a test fails.
    navigationTimeout: 45_000,
      //PB NOTE: ADDED: This line sets the maximum time (in milliseconds) that Playwright will wait for a page navigation to complete before timing out. If a page takes longer than this specified time to load or navigate, Playwright will consider it a failure and throw a timeout error.
    actionTimeout: 15_000, 
      //PB NOTE: ADDED:  This line sets the maximum time (in milliseconds) that Playwright will wait for an action to complete before timing out. If an action, such as clicking a button or filling out a form, takes longer than this specified time to complete, Playwright will consider it a failure and throw a timeout error.      
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
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
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
