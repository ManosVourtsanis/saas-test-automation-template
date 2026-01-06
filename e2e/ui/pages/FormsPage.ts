import { Page } from '@playwright/test';

export class FormsPage {

    constructor(private page: Page) {}

    async openPracticeForm() {
        await this.page.locator('span:has-text("Practice Form")').click();
    }
}