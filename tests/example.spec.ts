import { test, expect } from '@playwright/test';


//Pattern AAA - ARRANGE (Navigate to page)- ACT (Do something)- ASSERT (Validate the result)
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  // ARRANGE
  await page.goto('https://playwright.dev/');

  // ACT
  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // ASSERT: RULE TWO OR MORE ASSERST IS NOT WELCOME ONCE THIS IS NOT A MODULAR TEST
  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

/** INTERVIEW QUESTIONS
* Fixture Types in Playwright Tests:
* browser For Browser level interactions like creating new contexts, pages, etc.
* context For Context Level interactions like creating new pages, etc.
* page    For Page Level interactions like clicking, filling forms, etc.
* request For UI interactins and Navigations
* browserName
* playwright
*/