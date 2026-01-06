import { expect, Page } from '@playwright/test';

export class ToolTipsPage {

    constructor(private page: Page) {}

    async hoverOverTooltipButton() {
        await this.page.locator('#toolTipButton').hover();
    }

    async assertTooltipVisible() {
        await expect(this.page.locator('.tooltip-inner')).toBeVisible();
    }

    async assertTooltipText() {
        const tooltipText = await this.page.locator('.tooltip-inner').textContent();
        expect(tooltipText).toBe('You hovered over the Button');
    }
}
