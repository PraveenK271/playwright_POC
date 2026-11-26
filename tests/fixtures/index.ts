import{test as base} from '@playwright/test';
import{HomePage} from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { SigninPage } from '../pages/SigninPage';
import { RegisterAccount } from '../pages/RegisterAccountpage';

type MyFixtures = {
    homePage:HomePage,
    productPage:ProductPage,
    checkoutPage:CheckoutPage,
    signInPage:SigninPage,
    registerAccount:RegisterAccount,
};

export const test = base.extend<MyFixtures>({
    homePage: async({page},use)=>{
        const homePage = new HomePage(page);
        //await homePage.navigateToHome();
        await use(homePage);
    },

    productPage: async({page},use)=>{
        const productPage = new ProductPage(page);
        await use(productPage);
    },

    checkoutPage: async ({page},use)=>{
        const checkoutPage =  new CheckoutPage(page);
        await use(checkoutPage);
    },

    signInPage: async({page},use)=>{
        const signInPage = new SigninPage(page);
        await use(signInPage);
    },

    registerAccount: async({page},use)=>{
        const registerAccount = new RegisterAccount(page);
        await use(registerAccount);
    },
});

export {expect} from '@playwright/test';