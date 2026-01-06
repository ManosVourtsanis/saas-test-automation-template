import { expect, Page } from '@playwright/test';

export class DroppablePage {

    constructor(private page: Page) {}

    async dragAndDrop() {
        const dragElement = this.page.locator('#draggable').first();
        const dropElement = this.page.locator('#droppable').first();
        
        await dragElement.dragTo(dropElement);
    }

    async assertDropSuccessful() {
        await expect(this.page.locator('#droppable').first()).toContainText('Dropped!');
    }
}
