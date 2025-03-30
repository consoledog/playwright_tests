import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class SearchBookPage extends BasePage {
    /* Class SearchBookPage represents search and book form before clicling "Search" and contains all chosen filters like 
       check-in, check-out, nights, number of adults, ... that the user can fill
    */

    readonly checkIn: Locator;      //  Select check-in date
    readonly noOfAdults: Locator;   //  Select number of adults
    readonly searchButton: Locator; //  Search button used to apply all the filters like checkin, noOfAdults, etc.

    constructor(page: Page) {
        super(page);
        this.checkIn = page.getByTitle('Check-in', { exact: true });
        this.noOfAdults = page.locator('#cb_numadults1');
        this.searchButton = page.getByRole('link', { name: 'Search', exact: true });
    }

    /**
     * This function is used to set chheck-in date
     * @param day is a string in format "DD"
     * @returns Promise<void> promise that will be resloved when the method is finished (all promises resolved)
     */
    public async setCheckIn(day: string): Promise<void> {
        const dayNum: number = Number(day);

        await this.checkIn.click();
        if (0 < dayNum && dayNum < 10) await this.page.getByRole('link', { name: day, exact: true }).nth(1).click();
        else if (10 <= dayNum && dayNum <= 31) await this.page.getByRole('link', { name: day, exact: true }).click();
        else console.error("Dev error: day must be between 1 and 31")
    }

    /**
     * This function is used to set number of adults
     * @param numberOfAdults is a number that represents number of adults
     * @returns Promise<void> promise that will be resloved when the method is finished (all promises resolved)
     */
    public async setAdults(numberOfAdults: number): Promise<void> {
        await this.noOfAdults.selectOption({ label: `${numberOfAdults} adults` });
    }

    /**
     * Click on the search button to apply all the filters
     * @returns Promise<void> promise that will be resloved when the method is finished (all promises resolved)
     */
    public async searchResults(): Promise<void> {
        await this.searchButton.click();
    }
}