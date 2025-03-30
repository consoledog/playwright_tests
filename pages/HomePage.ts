import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';
import { BookData } from '../utils/BookData';

export class HomePage extends BasePage {
    /* Class represents the home page that shows the list of searched items, for example list of hotels */

    readonly acceptCookies: Locator // Button "Accept cookies"
    readonly searchResults: Locator // List of search results, for example list of hotels

    constructor(page: Page) {
        super(page);
        this.acceptCookies = page.getByRole('button', { name: 'Godkänn alla' });
        this.searchResults = page.locator('#cb_js_search_result .Citybreak_AccInfoBasic.hproduct');
    }

    /**
      * Click button "Accept cookies"
      * @returns Promise to be resolved when click happens
      */
    public async clickAcceptCookies(): Promise<void> {
        await this.acceptCookies.click();
    }

    /**
     * This function is used to:
     * - book the hotel
     * - to choose booking alternative (for example what type of room like "Double room clasic", etc...)
     * @param accomodationId accomodation id in the list of accomodations
     * @param bookingAlternative booking alternative that can be chosen from the list of alternative accomodations
     * @returns Promise<void> promise that will be resloved when the method is finished (all promises resolved)
     */
    public async clickOnAccomodation(accomodationId: number, bookingAlternative: number): Promise<void> {
        // Create a locator only for hotels (exclude everything else)
        await this.searchResults.first().waitFor({ state: 'visible' });
        const singleResult = this.searchResults.nth(accomodationId);
        const bookButton = singleResult.locator(
            'a.Citybreak_Button.cb-btn.cb-btn-primary.cb_expandbutton.cb-test-book-now'
        );
        await bookButton.first().waitFor({ state: 'visible' });
        await bookButton.click();

        //Pick an booking option from the "Booking alternatives" list
        const targetTbody = singleResult.locator('tbody').nth(bookingAlternative)
        await targetTbody.waitFor({ state: 'visible' });
        const bookAlternativeButton = targetTbody.locator('input.cb_default_formbutton.cb_accommodation_choosebutton.Citybreak_Button.cb_smallbutton.cb-btn.cb-btn-primary.cb_js_alternative_book')
        await bookAlternativeButton.click();
    }

    /**
     * This function is used to read the accomodation title
     * @param accomodationId accomodation id in the list of accomodations
     * @param bookData bookData that will be filed with the title
     * @returns Promise<void> promise that will be resloved when the method is finished (all promises resolved)
     */
    public async readAccomodationTitle(accomodationId: number, bookData: BookData): Promise<void> {
        await this.searchResults.first().waitFor({ state: 'visible' });
        const singleResult = this.searchResults.nth(accomodationId);
        const titleElement = singleResult.locator("h2 > a")
        bookData.title = await titleElement.innerText();
    }


}