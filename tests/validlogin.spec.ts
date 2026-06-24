import { test } from "@playwright/test";
import { LoginPage } from "../pages"
import type { Market, User} from "../types";
import marketJson from "../data/markets.json" with { type: "json" };
import usersJson from "../data/users.json" with { type: "json" };

const markets = marketJson as Market[];
const users = usersJson as User[];

const standardUser = users.find((u) => u.username === "standard_user");
//PB NOTE: The expression "u" can be replaced by "user" it doesn't affect abything, this is the name of the function.

//PB NOTE: A "Guard Clause" is a piece of conditional logic placed at the very beginning of a function to check for invalid conditions
//  or edge cases and immediately exit. If an invalid state or incorrect input parameter is detected, the function returns early or
//  throws an exception. This prevents the execution of the rest of the function and avoids wrapping the core logic inside heavily
//  nested if-else blocks

if (!standardUser) {
    throw new Error("data/users.json doesn't include a username called standard_user");
}

test.describe("POM - Login per market", () => {
    for (const market of markets) {
    //PB NOTE: "String Interpolation" is a programming technique that allows you to embed variables or expressions directly inside a
    // string literal. Instead of manually gluing text together, you use placeholders that the programming language automatically
    // replaces with their actual values at runtime
    //PB NOTE: When using a "tag", never forget to addd the "@" before the tags.
    test(`TC-${market.code} - login + catalog in market ${market.code}`, { tag: "@smoke" }, async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateTo();
        await loginPage.loginAs(standardUser, market.code)
        await loginPage.expectUrlContains(/\/catalog/);
    
    });
  }

});