import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';
import { BookData } from '../utils/BookData';

export class HomePage extends BasePage {
    readonly acceptCookies: Locator

    constructor(page: Page) {
        super(page);
        this.acceptCookies = page.getByRole('button', { name: 'Godkänn alla' });
    }

    public async clickAcceptCookies(): Promise<void> {
        await this.acceptCookies.click();
    }

    public async clickOnHotel(id: number, bookOption: number): Promise<void> {
        // Create a locator only for hotels (exclude everything else)
        const searchResults = this.page.locator('#cb_js_search_result .Citybreak_AccInfoBasic.hproduct');
        await searchResults.first().waitFor({ state: 'visible' });
        const singleResult = searchResults.nth(id);
        const bookButton = singleResult.locator(
            'a.Citybreak_Button.cb-btn.cb-btn-primary.cb_expandbutton.cb-test-book-now'
        );
        await bookButton.first().waitFor({ state: 'visible' });
        await bookButton.click();

        //Pick an booking option from the "Booking alternatives" list
        const targetTbody = singleResult.locator('tbody').nth(bookOption)
        await targetTbody.waitFor({ state: 'visible' });
        const bookAlternativeButton = targetTbody.locator('input.cb_default_formbutton.cb_accommodation_choosebutton.Citybreak_Button.cb_smallbutton.cb-btn.cb-btn-primary.cb_js_alternative_book')
        await bookAlternativeButton.click();
    }

    public async readAppartmentTitle(appartmentId: number, bookData: BookData): Promise<void> {
        const searchResults = this.page.locator('#cb_js_search_result .Citybreak_AccInfoBasic.hproduct');
        await searchResults.first().waitFor({ state: 'visible' });
        const singleResult = searchResults.nth(appartmentId);
        const titleElement = singleResult.locator("h2 > a").nth(appartmentId)
        bookData.title = await titleElement.innerText();
        console.log(bookData.title);
    }


}