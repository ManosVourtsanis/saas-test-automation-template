import { Page } from '@playwright/test';


export class HomePage {

    constructor(private page: Page) {}

    async open() {
        await this.page.goto('/');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async goToElementsPage() {
        const card = this.page.locator('.card-body:has-text("Elements")');
        card.first().click();
    }

    async goToFormsPage() {
        const card = this.page.locator('.card-body:has-text("Forms")');
        card.first().click();
    }

    async goToWidgetsPage() {
        const card = this.page.locator('.card-body:has-text("Widgets")');
        card.first().click();
    }

    async goToInteractionsPage() {
        const card = this.page.locator('.card-body:has-text("Interactions")');
        card.first().click();
    }
}