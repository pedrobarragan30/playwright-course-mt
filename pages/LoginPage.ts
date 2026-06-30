import { expect, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import type { CountryCode, User } from "../types";

export class LoginPage extends BasePage {
    readonly path = "/";
    
    //-----------------------------------------------ARRANGE
    //String locator
    //PB NOTE: The way where the locator is a string can be used
    private txtUsername: string = "username";
    private txtpassword: string = "password";
    private btnMarket: string = "market-";
    private btnSignIn: string = "login-button";

    //PB NOTE: Also the way that requires getters and setters can be used.
    private get usernameInput(): Locator {
        return this.tid(this.txtUsername);
    }

    private get passwordInput(): Locator {
      return this.tid(this.txtpassword);
    }

    private marketButton(code: CountryCode): Locator {
      //PB TEST: A 'get' accessor cannot have parameters.
      return this.page.getByTestId(`${this.btnMarket}${code}`);
    }

    private get signInButton(): Locator {
      return this.tid(this.btnSignIn);
    }

    //-----------------------------------------------ACTIONS
    //async navigateTo(): Promise<void> {
    //  await this.page.goto(this.path);
    //}
    navigateTo(): this {
      return this.step(() => this.page.goto(this.path));
    }

    //async selectMarket(code: CountryCode): Promise<void> {}
    //  await this.marketButton(code).click();
    //}
    selectMarket(code: CountryCode): this{
      return this.step(() => this.marketButton(code).click());
    }

    //PB NOTE: For the next methods the 2 combinations will be used to ensure they do work as expected
    async loginAs(user: User, code: CountryCode): Promise<void> {
      await this.typeInput(this.txtUsername, user.username);
      await this.typeInput(this.txtpassword, user.password);

      await this.selectMarket(code);
      //await this.tid(this.btnSignIn).click();
      await this.signInButton.click();

      await this.waitForUrl(/\/catalog/);
    }

    async loginAsUser(user: User, code: CountryCode): Promise<void> {
      await this.usernameInput.clear();
      await this.usernameInput.fill(user.username);

      await this.passwordInput.clear();
      await this.passwordInput.fill(user.password);

      await this.selectMarket(code);
      await this.signInButton.click();
    }

    //-----------------------------------------------FLUENT INTERFACE
    loginIn(username: string): this{
      return this.typeInput(this.txtUsername, username);
    }
    
    withPassword(password: string): this{
      return this.typeInput(this.txtpassword, password);
    }

    andMarket(code: CountryCode): this{
      return this.selectMarket(code);
    }

    login(): this{
      return this.step(() => this.tid(this.btnSignIn).click());
    }

    //-----------------------------------------------ASSERTIONS
    async expectedLoaded(): Promise<void> {
      await expect(this.signInButton).toBeVisible();
    }
  
    async expectUrlContains(urlPattern: RegExp): Promise<void> {
      await expect(this.page).toHaveURL(urlPattern);
    }
}

//96 `
//60 <
//62 >
//94 ^
