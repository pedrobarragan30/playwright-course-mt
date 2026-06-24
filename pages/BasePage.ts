import { Page, Locator } from "@playwright/test"; //"Page" and "Locator" needs to be used for POM

export class BasePage {
    //PB TEST: The Class constructor always exist, it's implicit; however, sometimes it needs to be defined explicitly.
    constructor(protected readonly page: Page) {}

    protected tid(base: string): Locator {
      //PB TEST: The values inside of the parenthesis is called "Signature".
      const size = this.page.viewportSize();
      const suffix = size && size.width < 768 ? "-responsive" : "-desktop";
      return this.page.getByTestId(`${base}${suffix}`).or(this.page.getByTestId(base)).first();
      //PB TEST: the first() method indicates that need to return the "first" found object
    }

    protected async waitForUrl(pattern: RegExp, timeout = 15_000): Promise<void> {
      await this.page.waitForURL(pattern, { timeout });
    }

    //PB TEST: IF Protected or Private it's not defined then it's treated as Public
    async screenshot(name: string): Promise<void> {
      await this.page.screenshot({ path: `test-results/${name}.png` });
    }

    //Don't Repeat Yourself - DRY
    protected async typeInput(locator: string, text: string): Promise<void> {
      await this.tid(locator).clear();
      await this.tid(locator).fill(text);
    }
}

//96 `
//60 <
//62 >
//94 ^
