import { expect, Page } from '@playwright/test';

export type PersonalDataRecord = {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    salary: number;
    department: string;
};

export class WebTablesPage {

    constructor(private page: Page) {}

    async clickAddButton() {
        await this.page.locator('#addNewRecordButton').click();
        await expect(this.page.locator('#registration-form-modal')).toBeVisible();
    }

    async clickEditButtonByName(firstName: string) {
        const row = this.page.locator('.rt-tr-group', {
            has: this.page.locator('.rt-td', { hasText: firstName })}).first();

        await expect(row).toBeVisible();

        const editButton = row.locator('span[title="Edit"]').first();
        await editButton.click();

        await expect(this.page.locator('#registration-form-modal')).toBeVisible();
    }

    async clickSubmitButton() {
        await this.page.locator('#submit').click();
    }

    async fillPersonalData(data: PersonalDataRecord) {
        await this.page.locator('#firstName').fill(data.firstName);
        await this.page.locator('#lastName').fill(data.lastName);
        await this.page.locator('#userEmail').fill(data.email);
        await this.page.locator('#age').fill(data.age.toString());
        await this.page.locator('#salary').fill(data.salary.toString());
        await this.page.locator('#department').fill(data.department);
    }

    async updateField(fieldName: string, value: string) {
        await this.page.locator(`#${fieldName}`).fill(value);        
    }

    //email is unique for each record
    rowByEmail(email: string) {
        return this.page.locator('.rt-tr-group', {hasText: email}).first();
    }

    async assertRowMatches(data: PersonalDataRecord) {
        const row = this.rowByEmail(data.email);
        await expect(row).toBeVisible();

        const cells = row.locator('.rt-td');
        
        await expect(cells.nth(0)).toHaveText(data.firstName);

        await expect(cells.nth(1)).toHaveText(data.lastName);

        //handle null age case
        await expect(cells.nth(2)).toHaveText(String(data.age));

        await expect(cells.nth(3)).toHaveText(data.email);

        //handle null salary case
        await expect(cells.nth(4)).toHaveText(String(data.salary));

        await expect(cells.nth(5)).toHaveText(data.department);
    }
}