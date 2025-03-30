import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class SearchBookPage extends BasePage {
    readonly checkIn: Locator;
    readonly noOfAdults: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        super(page);
        this.checkIn = page.getByTitle('Check-in', { exact: true });
        this.noOfAdults = page.locator('#cb_numadults1');
        this.searchButton = page.getByRole('link', { name: 'Search', exact: true });
    }

    public async setCheckIn(day: string): Promise<void> {
        await this.checkIn.click();
        await this.page.getByRole('link', { name: day, exact: true }).click();
    }

    public async setAdults(numberOfAdults: number): Promise<void> {
        await this.noOfAdults.selectOption({ label: `${numberOfAdults} adults` });
    }

    public async searchResults(): Promise<void> {
        await this.searchButton.click();
    }
}