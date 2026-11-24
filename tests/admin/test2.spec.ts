import {test} from '../fixtures';

test('verify search results count and product name in the search results',async({homePage,page})=>{
    await page.goto('/');
    await homePage.navigateToHome();
    await homePage.searchProduct('Hammer');
    await homePage.verifySearchResults('Hammer');
});