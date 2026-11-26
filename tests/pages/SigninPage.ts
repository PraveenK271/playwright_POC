import {Page, Locator} from '@playwright/test'

export class SigninPage {
    readonly page:Page
    readonly loginHeader:Locator;
    private readonly signinWithGoogle:Locator;
    private readonly emailAddressInput:Locator;
    private readonly passwordInput:Locator;
    private readonly loginButton:Locator;
    private readonly registerAccount:Locator;

    constructor(page:Page){
        this.page = page;
        this.loginHeader = page.getByRole('heading', {name:'Login'});
        this.signinWithGoogle = page.getByRole('button', {name: ' Sign in with Google'});
        this.emailAddressInput = page.getByPlaceholder('Your email');
        this.passwordInput = page.getByPlaceholder('Your Password');
        this.loginButton = page.getByLabel('Login' , {exact:true});
        this.registerAccount = page.getByRole('link', {name: 'Register your account'});
    }

    async signin(username:string, password:string) {
        await this.emailAddressInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async navigateToRegisterAccountPage(){
        await this.registerAccount.click();
    }


}
