import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';
import { BookData } from '../utils/BookData';

export class SearchAndBookPage extends BasePage {
    readonly searchAndBookContainer: Locator;

    constructor(page: Page) {
        super(page);
        this.searchAndBookContainer = page.locator("div.cb_search_summary")
    }

    public async readSearchData(bookData: BookData): Promise<void> {
        await this.searchAndBookContainer.waitFor({ state: 'visible', timeout: 20000 });
        const listItems = this.searchAndBookContainer.locator('ul > li');

        const count = await listItems.count();
        console.log(`Number of <li> items: ${count}`);

        for (let i = 0; i < count; i++) {
            const itemText = await listItems.nth(i).innerText();
            console.log(`LI #${i} text: ${itemText}`);
        }

        bookData.checkinDate = await this.getCheckInOutDate(listItems, 2);
        bookData.checkoutDate = await this.getCheckInOutDate(listItems, 3);
        bookData.numberOfNights = await this.getNights(listItems, 4);
        bookData.numberOfAdults = await this.getAdults(listItems, 6);

        console.log(`checkinDate: ${bookData.checkinDate}`);
        console.log(`checkoutDate: ${bookData.checkoutDate}`);
        console.log(`numberOfNights: ${bookData.numberOfNights}`);
        console.log(`numberOfAdults: ${bookData.numberOfAdults}`);

    }

    private async getCheckInOutDate(listItems: Locator, elementIndex: number): Promise<string> {
        let checkDateTemp: string = await listItems.nth(elementIndex).innerText()
        let checkDateArrayString: string[];
        checkDateArrayString = checkDateTemp.split(':');
        checkDateTemp = checkDateArrayString[1]
        checkDateTemp = checkDateTemp.trimStart()
        return checkDateTemp;
    }

    private async getNights(listItems: Locator, elementIndex: number): Promise<number> {
        let nightsTemp: string = await listItems.nth(elementIndex).innerText()
        let nightsArrayString = nightsTemp.split(':');
        nightsTemp = nightsArrayString[1]
        nightsTemp = nightsTemp.trimStart()
        return Number(nightsTemp)
    }

    private async getAdults(listItems: Locator, elementIndex: number): Promise<number> {
        let adultsTemp: string = await listItems.nth(elementIndex).innerText()
        let adultsArrayString = adultsTemp.split(':');
        adultsTemp = adultsArrayString[1]
        adultsArrayString = adultsTemp.split(' ');
        adultsTemp = adultsArrayString[1]
        return Number(adultsTemp);
    }
}