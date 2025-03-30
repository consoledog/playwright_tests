import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';
import { BookData } from '../utils/BookData';
import { Helper } from '../utils/helpers';

export class BasketPage extends BasePage {
    /* Class represents Basket page, the page where cart items
       are shown */

    readonly basketContainer: Locator;  // The container that contains all cart items

    constructor(page: Page) {
        super(page);
        this.basketContainer = page.locator('div.cb-cart__padding');
    }

    public async getElementFromBasket(elementId: number): Promise<BookData> {
        const outputBookData = new BookData("", "", "", 0, 0, 0);

        // 1) Wait for the basket container to be visible
        await this.basketContainer.waitFor({ state: 'visible', timeout: 10000 });

        // 2) Now look for the basket items within the container
        const basketItems = this.basketContainer.locator('div.cb-cart__item');

        // 3) Wait for the first basket item to appear
        try {
            await basketItems.first().waitFor({ state: 'visible', timeout: 5000 });
        } catch (error) {
            console.log('No basket items appeared after waiting.');
        }
        const count = await basketItems.count();
        if (count === 0) {
            console.error('Basket is empty');
            return outputBookData;
        }

        // 4) Everyting is okay, get the nth basket item (for example, the 0th element)
        const singleItem = basketItems.nth(elementId);
        const hotelLink = singleItem.locator('h2 > a');

        // 5) Extract hotel name
        const hotelName = await hotelLink.innerText();
        outputBookData.title = hotelName;

        const cartItem = this.page.locator('.cb-cart__item');
        const dataCells = cartItem.locator('table tbody tr td:nth-of-type(2)');

        const checkInOutDateText = await dataCells.nth(0).innerText();
        const numberOfAdultsText = await dataCells.nth(1).innerText();
        outputBookData.numberOfAdults = Number(numberOfAdultsText[0])

        // Use a regular expression to capture the check-in date, check-out date, and number of nights.
        const regex = /^(.+?)\s*-\s*(.+?),\s*(\d+)\s+night/;
        const match = checkInOutDateText.match(regex);

        if (match) {
            outputBookData.checkinDate = Helper.padDay(match[1].trim());
            outputBookData.checkoutDate = Helper.padDay(match[2].trim());
            outputBookData.numberOfNights = Number(match[3]);
        } else {
            console.log("The data text did not match the expected format:", checkInOutDateText);
        }

        return outputBookData;
    }

}
