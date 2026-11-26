import {test} from '../fixtures';
import {expect} from '@playwright/test'

const firstName = 'Test';
const lastName = 'last';
const dob = '2000-03-24';
const country = 'India';
const postalCode = '300092';
const houseNumber = '34';
const street = 'Street 1';
const city = 'Chennai';
const state = 'TN';
const phone = '1234567890';
const email = `test${Date.now().toString()}@test.com`;
const password = 'Test@560345'; 

test('register user and signin', async({signInPage,homePage,registerAccount,page})=>{
    await page.goto('/');
    await homePage.navigaeToSignin();
    await signInPage.navigateToRegisterAccountPage();
    await registerAccount.fillRegistrationForm(firstName,lastName, dob,country,postalCode, houseNumber,street,city,state,phone,email,password);
    await registerAccount.registerUser();
    await expect(signInPage.loginHeader).toBeVisible();
    await signInPage.signin(email,password);
    await expect(page).toHaveTitle('Overview - Practice Software Testing - Toolshop - v5.0');
})