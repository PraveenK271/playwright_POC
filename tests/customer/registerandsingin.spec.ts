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
const email = `test${Date.now().toString}@test.com`;
const password = 'password' 

test('register user and signin', async({signInPage,homePage,registerAccount,page})=>{
    page.goto('/');
    homePage.navigaeToSignin();
    signInPage.navigateToRegisterAccountPage();
    registerAccount.fillRegistrationForm(firstName,lastName, dob,country,postalCode, houseNumber,street,city,state,phone,email,password);
    registerAccount.registerUser();
    await expect(signInPage.loginHeader).toBeVisible();
    signInPage.signin(email,password);
})