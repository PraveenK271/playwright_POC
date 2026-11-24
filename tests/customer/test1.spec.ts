import {test} from '../fixtures';
import { CheckoutPage } from '../pages/CheckoutPage';

test('verify search results count and product name in the search results',async({homePage,page})=>{
    await homePage.navigateToHome();
    await homePage.searchProduct('Hammer');
    await homePage.verifySearchResults('Hammer');
});

test('verify product added to cart',async({homePage,page})=>{
    await homePage.navigateToHome();
    await homePage.searchProduct('Hammer');
    await homePage.addProductToCart('Thor Hammer');
    await homePage.verifyCartCount('1');
});

test('verify product details selected from search', async({productPage,homePage,page})=>{
    await homePage.navigateToHome();
    await homePage.searchProduct('Hammer');
    await homePage.selectProductToView(' Thor Hammer ');
    await productPage.verifyProductDetails('Hammer','ForgeFlex Tools ');
});

test('complete checkout flow', async({homePage,productPage,checkoutPage,page})=>{
    await homePage.navigateToHome();
    await homePage.searchProduct('Hammer');
    await homePage.selectProductToView(' Thor Hammer ');
    await productPage.addProductToCart(1);
    await homePage.verifyCartCount('1');
    await homePage.navigateToCheckout();
    await checkoutPage.verifyCartSection();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.continueAsGuestSection();
    await checkoutPage.inputAddressDetails();
    await checkoutPage.selectPaymentMethod();
    await checkoutPage.verifyPaymentandConfirm();
    console.log(await checkoutPage.fetcInvoiceNumber());
})