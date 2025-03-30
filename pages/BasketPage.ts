import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';
import { BookData } from '../utils/BookData';
import { Helper } from '../utils/helpers';

export class BasketPage extends BasePage {
    /* Class represents Basket page, the page where cart items are shown */

    readonly basketContainer: Locator;  // The container that contains all cart items

    constructor(page: Page) {
        super(page);
        this.basketContainer = page.locator('div.cb-cart__padding');
    }

    /**
     * Get data like title, check-in, check-out dates, etc from the basket cart items
     * @param cartItemId cart item id
     * @returns Promise<BookData>, BookData represents the cart item data
     */
    public async getElementFromBasket(cartItemId: number): Promise<BookData> {
        const outputBookData = new BookData("", "", "", 0, 0, 0);

        // Wait for the basket container and items to be visible.
        await this.waitForBasketContainer();
        const basketItems = this.getBasketItems();
        if (!(await this.waitForBasketItems(basketItems))) {
            console.error("Basket is empty");
            return outputBookData;
        }

        // Get the specific basket item.
        const singleItem = basketItems.nth(cartItemId);

        // Extract and store the hotel name.
        outputBookData.title = await this.getHotelName(singleItem);

        // Extract data from table cells within the basket item.
        const dataCells = singleItem.locator("table tbody tr td:nth-of-type(2)");
        const checkInOutDateText = await dataCells.nth(0).innerText();
        const numberOfAdultsText = await dataCells.nth(1).innerText();

        // Extract number of adults (assuming the first character represents the number).
        outputBookData.numberOfAdults = this.extractNumberOfAdults(numberOfAdultsText);

        // Parse the check-in/out/nights text into its parts.
        const dateInfo = this.parseCheckInOutDate(checkInOutDateText);
        if (dateInfo) {
            outputBookData.checkinDate = dateInfo.checkinDate;
            outputBookData.checkoutDate = dateInfo.checkoutDate;
            outputBookData.numberOfNights = dateInfo.numberOfNights;
        } else {
            console.log("The data text did not match the expected format:", checkInOutDateText);
        }

        return outputBookData;
    }

    /**
    * Waits for the basket container to become visible.
    */
    private async waitForBasketContainer(): Promise<void> {
        await this.basketContainer.waitFor({ state: "visible", timeout: 10000 });
    }

    /**
     * Returns the Locator for basket items inside the basket container.
     */
    private getBasketItems(): Locator {
        return this.basketContainer.locator("div.cb-cart__item");
    }

    /**
     * Waits for at least one basket item to become visible.
     * @param basketItems The Locator for basket items.
     * @returns true if items are visible, false otherwise.
     */
    private async waitForBasketItems(basketItems: Locator): Promise<boolean> {
        try {
            await basketItems.first().waitFor({ state: "visible", timeout: 5000 });
            const count = await basketItems.count();
            return count > 0;
        } catch (error) {
            console.log("No basket items appeared after waiting.");
            return false;
        }
    }

    /**
     * Extracts the hotel name from the basket item.
     * @param item The Locator for a single basket item.
     * @returns The hotel name.
     */
    private async getHotelName(item: Locator): Promise<string> {
        const hotelLink = item.locator("h2 > a");
        return await hotelLink.innerText();
    }

    /**
     * Extracts the number of adults from the provided text.
     * @param text The text containing the number (assumes first character is the number).
     * @returns The number of adults.
     */
    private extractNumberOfAdults(text: string): number {
        return Number(text[0]);
    }

    /**
     * Parses the check-in/out date text and returns its components.
     * Expected format: "Mon 31 Mar 2025 - Tue 1 Apr 2025, 1 night"
     * @param text The full date string.
     * @returns An object with checkinDate, checkoutDate, and numberOfNights or null if parsing fails.
     */
    private parseCheckInOutDate(text: string): { checkinDate: string; checkoutDate: string; numberOfNights: number } | null {
        const regex = /^(.+?)\s*-\s*(.+?),\s*(\d+)\s+night/;
        const match = text.match(regex);
        if (match) {
            return {
                checkinDate: Helper.padDay(match[1].trim()),
                checkoutDate: Helper.padDay(match[2].trim()),
                numberOfNights: Number(match[3])
            };
        }
        return null;
    }


}
