import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class ExtrasPage extends BasePage {
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.continueButton = page.getByText('Continue').nth(1)
    }

    public async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

}