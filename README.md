# Velovita - Automated Shopping Cart Test

This project contains an automated test script using [Playwright](https://playwright.dev/) that validates the **shopping cart functionality** on the `https://sandbox.velovita.com` website.

## Objective

Automate the complete purchase flow on Velovita's sandbox site to:

- Log in with valid credentials.
- Navigate to the store.
- Add 3 specific products to the cart.
- Open the sidebar cart.
- Verify that the products are successfully added.

## Technologies Used

- [Playwright](https://playwright.dev/) `@playwright/test`
- JavaScript / TypeScript (`.ts`)
- Node.js

## Installation & Setup

1. **Clone the repository**

git clone https://github.com/your-username/velovita-playwright-test.git
cd velovita-playwright-test

2. **Install npm**

npm install

3. **Install NodeJs**

It is easier than we can imagine, we can download NodeJs from its direct Official Download Page
https://nodejs.org/en/download

4. **Install Playwright**

-Install supported browsers-
npx playwright install

## To run the main test

npx playwright test

## To run just in an specific browser

- npx playwright test --project=firefox
- npx playwright test --project=chromium
- npx playwright test --project=webkit


## Test Flow Summary

1. Logs in with a predefined user account.

2. Closes any startup pop-ups.

3. Enters the store and adds 3 products:

- AM Essentials
- PM Essentials
- Reserve

4. Verifies the sidebar cart opens.

5. Scrolls to the bottom of the cart container.

6. Confirms each product is present with quantity 1.


## Suggested Structure

- velovita-playwright-test/
- tests/velovita-test.spec.ts      # Main Playwright test
- .gitignore
- package.json

## Important Notes

The scroll behavior works reliably in Firefox.
In Chromium and WebKit, additional wait time or scroll techniques might be needed due to animations or shadow DOM issues.

## Future Improvements

- Step-by-step screenshots
- HTML report generation (npx playwright show-report).
- Multi-user or region-based configuration support.

## Testability Improvements

- Add Stable, Semantic Selectors (Test IDs)
- Expose Component States via DOM
- Avoid Unpredictable Animations: Add a mechanism to disable animations in test environments.
- Make Language/Region Selection Test-Friendly
