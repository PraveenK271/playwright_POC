import {Page, Locator} from '@playwright/test'

export class RegisterAccount {
    readonly page:Page;
    private readonly customerRegistrationHeading:Locator;
    private readonly firstNameInput:Locator;
    private readonly lastNameInput:Locator;
    private readonly dobInput:Locator;
    private readonly countryDropdown:Locator;
    private readonly postalCodeInput:Locator;
    private readonly houseNumberInput:Locator;
    private readonly streetInput:Locator;
    private readonly cityInput:Locator;
    private readonly stateInput:Locator;
    private readonly phoneInput:Locator;
    private readonly emailAddressInput:Locator;
    private readonly passwordInput:Locator;
    private readonly passwordStrengthBar:Locator;
    private readonly registerButton:Locator;

    constructor(page:Page){
        this.page = page;
        this.customerRegistrationHeading = page.getByRole('heading', {name:'Customer registration'});
        this.firstNameInput = page.getByPlaceholder('First name *');
        this.lastNameInput = page.getByPlaceholder('Your last name *');

    }
}