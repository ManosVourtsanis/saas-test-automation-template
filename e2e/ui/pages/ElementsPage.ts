import { Page } from '@playwright/test';

export class ElementsPage {

    constructor(private page: Page) {}

    async openWebTables() {
        await this.page.locator('span:has-text("Web Tables")').click();
    }

    async openBrokenLinksImages() {
        await this.page.locator('span:has-text("Broken Links - Images")').click();
    }
}