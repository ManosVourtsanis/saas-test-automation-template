import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { FormsPage } from './pages/FormsPage';
import { PracticeFormPage, StudentRegistrationForm } from './pages/PracticeFormPage';

test.describe('TC03 - Verify user can submit the form', () => {

    test('student submission', async ({ page }) => {
        const home = new HomePage(page);
        const forms = new FormsPage(page);
        const practiceForm = new PracticeFormPage(page);
        
        // Step 1: Navigate to the home page
        await home.open();

        // Step 2: Click on the "Forms" card
        await home.goToFormsPage();

        // Step 3: Click on the "Practice Form" option in the left sidebar
        await forms.openPracticeForm();

        // Step 4: Fill in the form with valid data
        const data: StudentRegistrationForm = {
            firstName: 'Gerimedica',
            lastName: 'BV',
            email: 'test@test.com',
            gender: 'Male',
            mobile: '0123456789',
            birthDate: { day: 15, month: 1, year: 1990 },
            subjects: ['Playwright Assignment'],
            hobbies: ['Reading'],
            pictureFilePath: 'e2e/assets/sample.png',
            address: 'Netherlands',
            state: 'NCR',
            city: 'Delhi'
        };

        // Step 5: Submit the form
        await practiceForm.fillStudentRegistrationForm(data);
        await practiceForm.clickSubmitButton();

        // Step 6: Verify that the submission modal appears with correct data
        await practiceForm.assertSubmissionMod(data);

        
    });

});