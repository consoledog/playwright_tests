import { test } from '@playwright/test';
import assert from 'assert';

import { SearchAndBookPage } from '../pages/SearchAndBookPage';
import { SearchBookPage } from '../pages/SearchBookPage';
import { HomePage } from '../pages/HomePage';
import { ExtrasPage } from '../pages/ExtrasPage'
import { BasketPage } from '../pages/BasketPage'
import { Helper } from '../utils/helpers';
import { CONFIG } from '../config/config';
import { BookData } from '../utils/BookData';

test.describe('Home Page Tests', () => {
    let homePage: HomePage;
    let searchBookPage: SearchBookPage;
    let extrasPage: ExtrasPage;
    let basketPage: BasketPage;
    let searchAndBookPage: SearchAndBookPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        searchBookPage = new SearchBookPage(page)
        extrasPage = new ExtrasPage(page);
        basketPage = new BasketPage(page);
        searchAndBookPage = new SearchAndBookPage(page);

        await page.goto(CONFIG.baseUrl);
        await homePage.clickAcceptCookies();
    });

    /* Test: Idea of this test is to search for an appartments for "Tomorrow" and "2 adults", and 
             to book the first appartment that is depicted on  the list 
    */
    test('Book the first appartment for tomorrow, 2 adults', async ({ page }) => {
        const inputBookData = new BookData("", "", "", 0, 0, 0);
        let outputBookData = new BookData("", "", "", 0, 0, 0);

        /* 1) Choose the date that is 1 day ahead (tomorrow date) */
        const dayString = Helper.getTomorrowDayAsString();

        /* 2) Set the date into "Check in" field */
        await searchBookPage.setCheckIn(dayString)

        /* 3) Set "Guests" to 2 adults */
        await searchBookPage.setAdults(2);

        /* 4) Search for the results, and fill input bookData class with booking data */
        await searchBookPage.searchResults();
        await searchAndBookPage.readSearchData(inputBookData);
        await homePage.readAppartmentTitle(0, inputBookData)

        /* 5) Click on "Book" on first hotel to book, and select first booking alternative */
        await homePage.clickOnHotel(0, 0);

        /* 7) In Extras for your accomodation click "Continue"  */
        await extrasPage.clickContinue();

        /* 8) Assert next: In "You have selected" area, there should be booked hotel  */
        outputBookData = await basketPage.getElementFromBasket(0)

        console.log("Input BookData:", JSON.stringify(inputBookData, null, 2));
        console.log("Output BookData:", JSON.stringify(outputBookData, null, 2));

        assert.deepStrictEqual(inputBookData, outputBookData, 'Input and output BookData do not match');
    });
});
