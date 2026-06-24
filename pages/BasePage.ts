import { Page, Locator } from "@playwright/test"; //"Page" and "Locator" needs to be used for POM

export class BasePage {
  protected chain: Promise<unknown> = Promise.resolve();

  //PB TEST: The Class constructor always exist, it's implicit; however, sometimes it needs to be defined explicitly.
  constructor(protected readonly page: Page, seedChain?:Promise<unknown>){};

  protected tid(base: string): Locator {
    //PB TEST: The values inside of the parenthesis is called "Signature".
    const size = this.page.viewportSize();
    const suffix = size && size.width < 768 ? "-responsive" : "-desktop";
    return this.page.getByTestId(`${base}${suffix}`).or(this.page.getByTestId(base)).first();
    //PB TEST: the first() method indicates that need to return the "first" found object
  }

  protected waitForUrl(pattern: RegExp, timeout = 15_000): this {
    return this.step(async () => {
      await this.page.waitForURL(pattern, { timeout });
    })    
  }

  //PB TEST: IF Protected or Private it's not defined then it's treated as Public
  screenshot(name: string): this {
    return this.step(() => this.page.screenshot({ path: `test-results/${name}.png` }))
  }

  //Don't Repeat Yourself - DRY
  protected typeInput(locator: string, text: string): this {
    return this.step(async () => {
    await this.tid(locator).clear();
    await this.tid(locator).fill(text);
    })
  }
  
  //PB NOTE: <unknown> indicate that this is an "unknown" promise where we do not know waht will be returned
  protected step(action: ()=> Promise <unknown>): this{
    this.chain = this.chain.then(() => action());
    return this;
  }
  
  //PB NOTE: The next one is a "generic", thsoe are methods that have no idea what will come in and neither what will come out
  //TResult returns nothigng. while TResult2 probably would be never called
  then<TResult1 = void, TResult2 = never>(
    onfulfilled?: ((value:void) => TResult1 | PromiseLike<TResult1>) | null, 
    onrejected?: ((reason:unknown) => TResult2 |PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2>{
    return this.chain.then<void>(() => undefined).then(onfulfilled, onrejected);
  }
  

}

//96 `
//60 <
//62 >
//94 ^
