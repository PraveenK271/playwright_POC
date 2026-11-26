import {test as setup,expect} from '@playwright/test';
import  baseEnvUrl from '../utils/environmentBaseUrl';


setup('Admin Login', async ({page})=>{
    await page.goto(`${baseEnvUrl.baseEnvUrl.home}login`);
    await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
    await page.getByRole('link',{name:'Sign in'}).click();
    await page.getByPlaceholder('Your email').fill(baseEnvUrl.admin.userName);
    await page.getByPlaceholder('Your password').fill(baseEnvUrl.admin.password);
    await page.locator('.btnSubmit').click();
    await expect(page).toHaveTitle('Dashboard - Practice Software Testing - Toolshop - v5.0');
    await page.context().storageState({path:'.auth/admin.json'});
});

setup('customer Login', async ({page})=>{
    await page.goto(`${baseEnvUrl.baseEnvUrl.home}login`);
    await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
    await page.getByRole('link',{name:'Sign in'}).click();
    await page.getByPlaceholder('Your email').fill(baseEnvUrl.customer.userName);
    await page.getByPlaceholder('Your password').fill(baseEnvUrl.customer.password);
    await page.locator('.btnSubmit').click();
    await expect(page).toHaveTitle('Overview - Practice Software Testing - Toolshop - v5.0');
    await page.context().storageState({path:'.auth/customer.json'});
});