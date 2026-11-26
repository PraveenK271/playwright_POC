import {Page,Locator,expect} from '@playwright/test';

export class ProductPage{

    private readonly page:Page;
    private readonly productName:Locator;
    private readonly productCategory:Locator;
    private readonly productBrand:Locator;
    public readonly currencySymbol:Locator;
    private readonly productPrice:Locator;
    private readonly decreaseQuantityButton:Locator;
    private readonly increaseQuantityButton:Locator;
    private readonly quanityInputField:Locator;
    private readonly addToCartButton:Locator;
    private readonly addToFavoritesButton:Locator;
    private readonly compareButton:Locator;
    private readonly specificationsTable:Locator;

    constructor(page:Page){
        this.page = page;
        this.productName = page.getByRole('heading',{name:'Thor Hammer'});
        this.productCategory = page.locator('//span[text()="Hammer"]');
        this.productBrand = page.locator('//span[text()="ForgeFlex Tools "]');
        this.currencySymbol = page.locator('//span[text()="$"]');
        this.productPrice = page.locator('//span[@aria-label="unit-price"]');
        this.decreaseQuantityButton = page.locator('//button[@aria-label="Decrease quantity"]');
        this.increaseQuantityButton = page.locator('//button[@aria-label="Increase quantity"]');
        this.quanityInputField = page.locator('//input[@id="quantity-input"]');
        this.specificationsTable = page.locator('//h3[text()="Specifications"]/following-sibling::table');
        this.addToCartButton = page.locator('//button[@id="btn-add-to-cart"]');
        this.addToFavoritesButton = page.locator('//button[@id="btn-add-to-favorites"]');
        this.compareButton = page.locator('//button[@id="btn-add-to-favorites"]/following-sibling::button');
    }

    async addProductToCart(quantity:number){
        for(let i=1;i<quantity;i++){
            await this.increaseQuantityButton.click();
        }
        await this.addToCartButton.click();
    }

    async verifyProductDetails(searchString:string,brand:string){
        expect(await this.productName).toContainText(searchString);
        expect(await this.productBrand).toContainText(brand);
        await expect(this.productCategory).toBeVisible();
    }
}