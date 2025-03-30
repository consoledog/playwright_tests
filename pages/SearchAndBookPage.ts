import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';
import { BookData } from '../utils/BookData';

export class SearchAndBookPage extends BasePage {
    /* Class SearchAndBookPage represents search and book form after clicling "Search" and contains all chosen filters like 
       check-in, check-out, nights, number of adults, .... 
    */
    readonly searchAndBookContainer: Locator;   // Contains all of the information like check-in, check-out, ...
    readonly CHECKIN_DATE_INDEX = 2;            // Index in list that will give text regarding check-in date
    readonly CHECKOUT_DATE_INDEX = 3;           // Index in list that will give text regarding check-out date
    readonly NUMBER_OF_NIGHTS_INDEX = 4;        // Index in list that will give text regarding number of nights
    readonly NUMBER_OF_ADULTS_INDEX = 6;        // Index in list that will give text regarding number of adults

    constructor(page: Page) {
        super(page);
        this.searchAndBookContainer = page.locator("div.cb_search_summary")
    }

    /**
     * This function is used to read data from the selected accomodation
     * @param bookData object that will be filed with data like check-in date, check-out date, number of nights, number of adults
     * @returns Promise<void> promise that will be resloved when the method is finished (all promises resolved)
     */
    public async readSearchData(bookData: BookData): Promise<void> {
        await this.searchAndBookContainer.waitFor({ state: 'visible', timeout: 20000 });
        const listItems = this.searchAndBookContainer.locator('ul > li');

        bookData.checkinDate = await this.getCheckInOutDate(listItems, this.CHECKIN_DATE_INDEX);
        bookData.checkoutDate = await this.getCheckInOutDate(listItems, this.CHECKOUT_DATE_INDEX);
        bookData.numberOfNights = await this.getNights(listItems, this.NUMBER_OF_NIGHTS_INDEX);
        bookData.numberOfAdults = await this.getAdults(listItems, this.NUMBER_OF_ADULTS_INDEX);
    }

    /**
     * This function is used to get check-in/check-out date
     * @param listItems List of items that will be accessed to get check-in/check-out date
     * @param elementIndex index of element from listItems. Each element represents one data
     * @returns Promise<string> when promise is resovled, it will return check-in/check-out date as string
     */
    private async getCheckInOutDate(listItems: Locator, elementIndex: number): Promise<string> {
        let checkDateTemp: string = await listItems.nth(elementIndex).innerText()
        let checkDateArrayString: string[];
        checkDateArrayString = checkDateTemp.split(':');
        checkDateTemp = checkDateArrayString[1]
        checkDateTemp = checkDateTemp.trimStart()
        return checkDateTemp;
    }

    /**
     * This function is used to get number of nights
     * @param listItems List of items that will be accessed to get number of nights
     * @param elementIndex index of element from listItems. Each element represents one data
     * @returns Promise<number> when promise is resovled, it will return number of nights as number
     */
    private async getNights(listItems: Locator, elementIndex: number): Promise<number> {
        let nightsTemp: string = await listItems.nth(elementIndex).innerText()
        let nightsArrayString = nightsTemp.split(':');
        nightsTemp = nightsArrayString[1]
        nightsTemp = nightsTemp.trimStart()
        return Number(nightsTemp)
    }

    /**
     * This function is used to get number of adults
     * @param listItems List of items that will be accessed to get number of adults
     * @param elementIndex index of element from listItems. Each element represents one data
     * @returns Promise<number> when promise is resovled, it will return number of adults as number
     */
    private async getAdults(listItems: Locator, elementIndex: number): Promise<number> {
        let adultsTemp: string = await listItems.nth(elementIndex).innerText()
        let adultsArrayString = adultsTemp.split(':');
        adultsTemp = adultsArrayString[1]
        adultsArrayString = adultsTemp.split(' ');
        adultsTemp = adultsArrayString[1]
        return Number(adultsTemp);
    }
}