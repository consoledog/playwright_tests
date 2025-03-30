import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class ExtrasPage extends BasePage {
    /* Class represents Extras page, there you can add an extras for your accomodations */

    readonly continueButton: Locator;   // Continue button
    readonly extrasTitle: Locator;     // Title of the page. Called something like "Extras for your accommodation"
    constructor(page: Page) {
        super(page);
        this.continueButton = page.getByText('Continue').nth(1)
        this.extrasTitle = page.getByRole('heading', { name: 'Extras for your accommodation' })
    }

    /**
      * Click continue if extras page is shown
      * @returns Promise to be resolved when click happens
      */
    public async clickContinue(): Promise<void> {
        try {
            await this.extrasTitle.waitFor({ state: 'visible', timeout: 5000 });
            await this.continueButton.click();
        } catch (error) {
            console.log("Extras page did not appear within timeout, continuing without clicking.");
        }
    }

}