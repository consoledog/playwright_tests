import { Page } from '@playwright/test';

export class BasePage {
    /* Class used as a parent for other classes. 
       Put there common staff */
    protected page: Page;   // Used for playwright methods

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigates the page to the specified path.
     *
     * @param {string} [path=''] - The URL path to navigate to. Defaults to an empty string.
     * @returns {Promise<void>} A promise that resolves when navigation is complete.
    */
    async naviage(path: string = ''): Promise<void> {
        await this.page.goto(path);
    }
}