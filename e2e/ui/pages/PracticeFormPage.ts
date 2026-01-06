import { expect, Page } from '@playwright/test';

export type StudentRegistrationForm = {
    firstName: string;
    lastName: string;
    email: string;
    // one of them
    gender: 'Male' | 'Female' | 'Other';
    mobile: string;
    // dd mm yyyy format
    birthDate: { day: number; month: number; year: number };
    subjects: string[];
    // zero or more of them
    hobbies: ('Sports' | 'Reading' | 'Music')[];
    pictureFilePath: string;
    address: string;
    state: string;
    city: string;
};

export class PracticeFormPage {
    constructor(private page: Page) {}

    async clickSubmitButton() {
        await this.page.locator('#submit').click();
    }

    async fillStudentRegistrationForm(data: StudentRegistrationForm) {
        await this.page.locator('#firstName').fill(data.firstName);
        await this.page.locator('#lastName').fill(data.lastName);
        await this.page.locator('#userEmail').fill(data.email);
        // Gender
        const id = { Male: 1, Female: 2, Other: 3 }[data.gender];
        await this.page.locator(`#gender-radio-${id} + label`).click();
        await this.page.locator('#userNumber').fill(data.mobile);
        // Date of Birth
        await this.page.locator('#dateOfBirthInput').click(); 
        await this.page.locator('.react-datepicker__month-select').selectOption(String(data.birthDate.month-1));
        await this.page.locator('.react-datepicker__year-select').selectOption(String(data.birthDate.year));
        await this.page.locator(`.react-datepicker__day--0${data.birthDate.day}`).click();
        // Subjects
        for (const subject of data.subjects) {
            await this.page.locator('#subjectsInput').fill(subject);
            const firstSubject = await this.page.locator('subjects-auto-complete__value-container subjects-auto-complete__value-container--is-multi css-1hwfws3').first();
            if (await firstSubject.count() > 0) {
                await firstSubject.click();
            }
        }
        // Hobbies `''`
        for (const hobby of data.hobbies) {
            await this.page.locator(`#hobbies-checkbox-${{ Sports: 1, Reading: 2, Music: 3 }[hobby]} + label`).click();
        }
        await this.page.locator('#uploadPicture').setInputFiles(data.pictureFilePath); // Picture
        await this.page.locator('#currentAddress').fill(data.address);
        await this.page.locator('#state').click();
        await this.page.locator('#react-select-3-input').fill(data.state);
        await this.page.locator('[id^="react-select-3-option-"]').first().click();
        await this.page.locator('#state').click();
        await this.page.locator('#react-select-3-input').fill(data.state);
        await this.page.locator('[id^="react-select-3-option-"]').first().click();
        await this.page.locator('#city').click();
        await this.page.locator('#react-select-4-input').fill(data.city);
        await this.page.locator('[id^="react-select-4-option-"]').first().click();
    }

    async assertSubmissionMod(data: StudentRegistrationForm) {
        const modal = this.page.locator('.modal-content');
        await expect(modal).toBeVisible();

        const rows = await modal.locator('tbody tr').all();
        
        for (const row of rows) {
            const cells = row.locator('td');
            const label = (await cells.nth(0).innerText()).trim();
            const value = (await cells.nth(1).innerText()).trim();

            switch (label) {
                case 'Student Name':
                    expect(value).toBe(`${data.firstName} ${data.lastName}`);
                    break;

                case 'Student Email':
                    expect(value).toBe(data.email);
                    break;

                case 'Gender':
                    expect(value).toBe(data.gender);
                    break;

                case 'Mobile':
                    expect(value).toBe(data.mobile);
                    break;

                case 'Date of Birth':
                    const monthNames = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                    ];
                    const expectedDate = `${data.birthDate.day} ${monthNames[data.birthDate.month - 1]},${data.birthDate.year}`;
                    expect(value).toBe(expectedDate);
                    break;

                case 'Subjects':
                    expect(value).toBe(''); // 'Playwright Assignment' is not a valid subject
                    break;

                case 'Hobbies':
                    expect(value).toBe(data.hobbies.join(', '));
                    break;

                case 'Picture':
                    const pictureFileName = data.pictureFilePath.split(/[/\\]/).pop() || '';
                    expect(value).toBe(pictureFileName);
                    break;

                case 'Address':
                    expect(value).toBe(data.address);
                    break;

                case 'State and City':
                    expect(value).toBe(`${data.state} ${data.city}`);
                    break;

                default:
                    throw new Error(`No label with the name: ${label} found!`);
            }   
        }
    }
}
