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
        this.dobInput = page.getByPlaceholder('YYYY-MM-DD');
        this.countryDropdown = page.locator('#country');
        this.postalCodeInput = page.getByPlaceholder('Your Postcode *');
        this.houseNumberInput = page.getByPlaceholder('e.g. 42 *');
        this.streetInput = page.getByPlaceholder('Your Street *');
        this.cityInput = page.getByPlaceholder('Your City *');
        this.stateInput = page.getByPlaceholder('Your State *');
        this.phoneInput = page.getByPlaceholder('Your phone *');
        this.emailAddressInput = page.getByPlaceholder('Your email *');
        this.passwordInput = page.getByPlaceholder('Your password');
        this.passwordStrengthBar = page.locator('.strength-bar');
        this.registerButton = page.getByRole('button',{name:'Register '});
    }

    async fillRegistrationForm(firstName:string, lastName:string, dob:string, country:string, postalCode:string, houseNumber:string, street:string, city:string, state:string, phone:string, emailAddress:string, password:string){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.dobInput.fill(dob);
        await this.countryDropdown.selectOption(country);
        await this.postalCodeInput.fill(postalCode);
        await this.houseNumberInput.fill(houseNumber);
        await this.streetInput.fill(street);
        await this.cityInput.fill(city);
        await this.stateInput.fill(state);
        await this.phoneInput.fill(phone);
        await this.emailAddressInput.fill(emailAddress);
        await this.passwordInput.fill(password);
    }

    async registerUser(){
        await this.registerButton.click();
    }

}