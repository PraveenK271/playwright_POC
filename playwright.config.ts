import process from 'node:process';
import { defineConfig, devices } from '@playwright/test';
import baseEnvUrl from './utils/environmentBaseUrl';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI?2:1, 
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI?4:undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html',{open:'never'}]],
  // reporter: 'dot',
  // reporter: [['json',{outputFile:'test-results.json'}]],
  // reporter: 'list',


  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL ?? baseEnvUrl.baseEnvUrl.home,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: !!process.env.CI,
    // ignoreHTTPSErrors: true,
    video:'retain-on-failure',
  },
  timeout:30000,
  expect:{
    timeout: 5000,
  },
  // outputDir:'test-results/',
  // globalSetup:'./utils/globalSetup.ts',
  // globalTeardown:'./utils/globalTeardown.ts',


  /* Configure projects for major browsers */
  projects: [
    {name:'setup',testMatch:'/.*\.setup\.ts'},
    {
      name: 'customer',
      testDir: './tests/customer',
      use: { 
        ...devices['Desktop Chrome'],
        storageState:'.auth/customer.json',
        viewport:{width:1920,height:1080}, },
      dependencies:['setup'],
    },
    {
      name: 'admin',
      testDir:'./tests/admin',
      use:{
        ...devices['Desktop Chrome'],
        storageState:'.auth/admin.json',
        viewport:{width:1920,height:1080},},
      dependencies:['setup'],
    },
    {
      name: 'register',
      testDir:'./tests/registerUser',
      use:{
        ...devices['Desktop Chrome'],
        viewport:{width:1080,height:1080}},
      }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

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
    // {
    //   name:'test',
    //   use:{
    //     baseURL: baseEnvUrl.local.home,
    //     ...devices['Desktop Chrome'],
    //   }
    // },
  ],



  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
