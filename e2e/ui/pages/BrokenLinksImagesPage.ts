import { Page } from '@playwright/test';

export class BrokenLinksImagesPage {
    constructor(private page: Page) {} 

    async getFirstBrokenImageIndex() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(3000);

        return await this.page.evaluate(() => {
            const images = Array.from(document.images);
            for (let i = 0; i < images.length; i++) {
                const img = images[i];
                if (img.complete && img.naturalWidth === 0) {
                    return i;
                }
            }
            return -1;
        });
    }
}