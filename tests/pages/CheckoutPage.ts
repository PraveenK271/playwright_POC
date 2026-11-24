import {Page,Locator,expect} from '@playwright/test';

export class CheckoutPage{
    page:Page;
    private readonly continueShoppingButton:Locator;
    private readonly proceedToCheckoutButton:Locator;
    private readonly cartItemsTable:Locator;
    private readonly signinEmailInputField:Locator;
    private readonly signinPasswordInputField:Locator;
    private readonly signinButton:Locator;
    private readonly continueAsGuestTab:Locator;
    private readonly userFirstNameInputField:Locator;
    private readonly userLastNameInputField:Locator;
    private readonly continueAsGuestButton:Locator;
    private readonly billingAddressCountryDropdown:Locator;
    private readonly billingAddressPostCodeInputField:Locator;
    private readonly billingAddressHouseNoInputField:Locator;
    private readonly billingAddressStreetInputField:Locator;
    private readonly billingAddressCityInputField:Locator;
    private readonly billingAddressStateInputField:Locator;
    private readonly choosePaymentMethodDropdown:Locator;
    private readonly paymentSucccessfulMessage:Locator;
    private readonly confirmButton:Locator;
    private readonly userLoggedIn:Locator;
    private readonly checkPaymentButton:Locator;
    private readonly orderConfirmationMessage:Locator;

    constructor(page:Page){
        this.page = page;
        this.continueShoppingButton = page.locator('//button[text()="Continue Shopping"]');
        this.proceedToCheckoutButton = page.locator('//button[text()="Proceed to checkout"]');
        this.cartItemsTable = page.locator('//table[@class="table table-hover"]');
        this.signinEmailInputField = page.getByPlaceholder('Your email');
        this.signinPasswordInputField = page.getByPlaceholder('Your password');
        this.signinButton = page.locator('//input[@value="Login"]');
        this.continueAsGuestTab = page.getByRole('link',{name:'Continue as Guest'});
        this.userFirstNameInputField = page.getByPlaceholder('Your first name');
        this.userLastNameInputField = page.getByPlaceholder('Your last name');
        this.continueAsGuestButton = page.locator('//input[@value="Continue as Guest"]');
        this.billingAddressCountryDropdown =  page.locator('//select[@id="country"]');
        this.billingAddressPostCodeInputField = page.getByPlaceholder('Your Postcode *');
        this.billingAddressHouseNoInputField = page.getByPlaceholder('e.g 42 *');
        this.billingAddressStreetInputField = page.getByPlaceholder ('Your Street *');
        this.billingAddressCityInputField = page.getByPlaceholder('Your City *');
        this.billingAddressStateInputField = page.getByPlaceholder('Your State *');
        this.choosePaymentMethodDropdown= page.locator('//select[@id="payment-method"]');
        this.paymentSucccessfulMessage = page.locator('//div[text()="Payment was successful"]');
        this.confirmButton = page.locator('//button[text()=" Confirm "]');
        this.userLoggedIn = page.locator('//p[text()="Hello Jane Doe, you are already logged in. You can proceed to checkout."]');
        this.checkPaymentButton = page.locator('//button[text()=" Check payment "]');
        this.orderConfirmationMessage = page.locator('//div[@id="order-confirmation"]');
    }

    async verifyCartSection(){
        expect(await this.cartItemsTable.locator('//tr/td/').nth(2).textContent()).toContainEqual('1');
    }

    async proceedToCheckout(){
        await this.proceedToCheckoutButton .click();
    }

    async continueAsGuestSection(){
        if(await this.userLoggedIn.isVisible()){
            await this.proceedToCheckoutButton.click();
        }else{
            await this.continueAsGuestTab.click();
            await this.signinEmailInputField.fill('data@tst.com');
            await this.userFirstNameInputField.fill('Test');
            await this.userLastNameInputField.fill('User');
            await this.continueAsGuestButton.click();
        }
    }

    async inputAddressDetails(){
        await this.billingAddressCountryDropdown.selectOption('India');
        await this.billingAddressPostCodeInputField.fill('500032');
        await this.billingAddressHouseNoInputField.fill('13-23');
        await this.billingAddressStreetInputField.fill('Lincoln Street');
        await this.billingAddressCityInputField.fill('NY');
        await this.billingAddressStateInputField.fill('USA');
        await this.proceedToCheckoutButton.click();
    }

    async selectPaymentMethod(){
        await this.choosePaymentMethodDropdown.selectOption('Cash on Delivery');
        await this.checkPaymentButton.click();

    }

    async verifyPaymentandConfirm(){
        await expect(this.paymentSucccessfulMessage).toBeVisible();
        await this.confirmButton.click();
    }

    async fetcInvoiceNumber(){
        await expect(this.orderConfirmationMessage).toBeVisible();
        const invoiceNumber = await this.orderConfirmationMessage.locator('//span').textContent();
        return invoiceNumber;
    }

}