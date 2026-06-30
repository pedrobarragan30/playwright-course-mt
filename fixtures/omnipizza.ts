import { test as base, expect } from "@playwright/test";
import { LoginPage, CatalogPage, CheckoutPage, MenuPage } from "../pages";
import type { Market, User } from "../types";
import marketJson from "../data/markets.json" with {type: "json"};
import usersJson from "../data/users.json" with {type: "json"};

const markets = marketJson as Market[];
const users = usersJson as User[];
 
type PageFixtures = {
    loginPage: LoginPage;
    catalogPage: CatalogPage;
    checkoutPage: CheckoutPage;
    standardUser: User;
}

type WorkerFixtures = {
    defaulMarket: Market;
}

export const test = base.extends<PageFixtures,WorkerFixtures>({
    defaulMarket: [async ({}, use) =>{
        const mx = markets.find((m) => m.code === "MXN");
        if(!mx) throw new Error("MX market not found");
        await use(mx);
    }, {scope: "worker"}],
    loginPage: async({ page }, use) => {

    }
});

