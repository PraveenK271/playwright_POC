import {Page,Locator, expect} from '@playwright/test';

export class HomePage{
    private readonly homeButton:Locator;
    private readonly searchField:Locator;
    private readonly searchButton:Locator;
    private readonly searchResultsCountMessage:Locator;
    private readonly searchResults:Locator;
    private readonly addToCartButton:Locator;
    private readonly cartCount:Locator;
    private readonly checkoutButton:Locator;
    private readonly signin:Locator;


    constructor(private readonly page:Page){
        this.homeButton = page.locator('a[href="/"]');
        this.searchField = page.getByPlaceholder('Search');
        this.searchButton = page.locator('button[type="submit"]');
        this.searchResultsCountMessage = page.getByTestId('search-result-count');
        this.searchResults = page.locator('.card');
        this.addToCartButton = page.locator('//button[text()="Add to cart "]');
        this.cartCount = page.locator('//span[@id="lblCartCount"]');
        this.checkoutButton = page.locator('//a[@href="/checkout"]');
        this.signin = page.getByRole('link', {name:'Sign in'});
        }

    async navigateToHome(){
        await this.homeButton.click();
    }

    async searchProduct(productName:string){
        await this.searchField.fill(productName);
        await this.searchButton.click();
    }

    async verifySearchResults(productName:string){
        await expect(this.searchResults.nth(1)).toBeVisible();
        const searchResultsCount = await this.searchResults.count();
        const searchResultsCountMessageText = await this.searchResultsCountMessage.textContent();
        const searchResultsCountNumber = 
        parseInt((searchResultsCountMessageText?searchResultsCountMessageText.trim():'').substring(0,1));
        expect(searchResultsCount).toBe(searchResultsCountNumber);
        for(let i=0;i<searchResultsCount;i++){
            await expect(this.searchResults.nth(i)).toContainText(productName);
        }
    }
    async selectProductToView(product:string){
        await this.searchResults.getByRole('heading',{name:product}).click();
    }

    async addProductToCart(productName:string){
        await this.searchResults.locator(`img[alt="${productName}"]`).click();
        await expect(this.page).toHaveTitle(`${productName} - Practice Software Testing - Toolshop - v5.0`);
        await this.addToCartButton.click();         
    }

    async verifyCartCount(expectedCount:string){
        await expect(this.cartCount).toHaveText(expectedCount)
    }

    async navigateToCheckout(){
        await this.checkoutButton.click();
    }

    async navigaeToSignin(){
        await this.signin.click();
    }
}