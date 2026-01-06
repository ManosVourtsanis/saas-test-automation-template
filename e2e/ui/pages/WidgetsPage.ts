import { Page } from '@playwright/test';

export class WidgetsPage {

    constructor(private page: Page) {}

    async openProgressBar() {
        await this.page.locator('span:has-text("Progress Bar")').click();
    }

    async openToolTips() {
        await this.page.locator('span:has-text("Tool Tips")').click();
    }
}
