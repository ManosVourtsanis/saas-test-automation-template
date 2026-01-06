import { Page } from '@playwright/test';

export class InteractionsPage {

    constructor(private page: Page) {}

    async openDroppable() {
        await this.page.locator('span:has-text("Droppable")').click();
    }
}
