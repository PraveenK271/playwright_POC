import{test as base} from '@playwright/test';
import{HomePage} from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';

type MyFixtures = {
    homePage:HomePage,
    productPage:ProductPage,
    checkoutPage:CheckoutPage,
};

export const test = base.extend<MyFixtures>({
    homePage: async({page},use)=>{
        const homePage = new HomePage(page);
        await use(homePage);
    },

    productPage: async({page},use)=>{
        const productPage = new ProductPage(page);
        await use(productPage);
    },

    checkoutPage: async ({page},use)=>{
        const checkoutPage =  new CheckoutPage(page);
        await use(checkoutPage);
    }
});

export {expect} from '@playwright/test';