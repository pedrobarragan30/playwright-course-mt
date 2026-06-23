import { test, expect } from '@playwright/test';

const USERNAME: string = process.env.TEST_USER_USERNAME ?? "standard_user";
const PASSWORD: string = process.env.TEST_USER_PASSWORD ?? "pizza123";

//PB NOTE: In JavaScript, using const and let is highly recommended because they fix the unpredictable scoping rules, accidental 
// accidental overwrites, and confusing hoisting behaviors caused by the legacy var keyword.
// let and const use block scope. They only exist inside the specific block {} where they are defined (like loops or if statements).
// var uses function scope. It ignores block brackets {} and leaks out to the nearest function or global environment.

//test.describe("Smoke Omnipizza platform test cases", test()=>)  //This is a named function
test.describe("Smoke Omnipizza platform test cases", () =>{        //This is an anonym function
  test("TC-001 - Successful Omnipizza login using valid user", {tag: "@smoke"}, async ({page}) =>{
    //{page} it's a signature
    await page.goto("/");
    //PB NOTE: The value listed in the "baseURL" at the playwrigth.config.ts it's retrieved and prefilled in the goto method, the "/"
    // it's concatenated to the baseURL and the final URL is formed

    await page.getByTestId("username-desktop").fill(USERNAME);
    await page.getByTestId("password-desktop").fill(PASSWORD);

    await page.getByTestId("market-MX").click();

    await page.getByTestId("login-button-desktop").click();
    //await page.getByRole("button", {name: "Login"}).click();

    //ASSERT
    //await expect(page).toHaveURL("/catalog");
    await expect(page).toHaveURL(/\/catalog/);
    //PB NOTE: The two lines above are the "same". the second it's just a regular expression.
  }) 
})


/*
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('heading', { name: 'Installing Playwright' })).toBeVisible();

});
*/