import { expect, Page } from '@playwright/test';

export class ProgressBarPage {

    constructor(private page: Page) {}

    async startButtonClick() {
        await this.page.locator('#startStopButton').click();
    }

    async waitUntilComplete() {
        // Wait for the progress bar to reach 100%
        await expect(this.page.locator('#progressBar')).toContainText('100%', { timeout: 15000 });
    }

    async assertProgressComplete() {
        // Check that the progress bar shows 100%
        const progressText = await this.page.locator('#progressBar').textContent();
        expect(progressText).toContain('100%');
    }
}
