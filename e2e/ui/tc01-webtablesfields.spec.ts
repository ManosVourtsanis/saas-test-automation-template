import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ElementsPage } from './pages/ElementsPage';
import { WebTablesPage, PersonalDataRecord } from './pages/WebTablesPage';

test.describe('TC01- Scenario A - Verify user can enter new data into the table', () => {

    // TODO: Check if data is kept after refresh
    test('add row', async ({ page }) => {
        //Setup
        const home = new HomePage(page);
        const elements = new ElementsPage(page);
        const webTables = new WebTablesPage(page);

        //Step 1: Navigate to the home page
        await home.open();

        //Step 2: Click on the "Elements" card
        await home.goToElementsPage();

        //Step 3: Click on the "Web Tables" option in the left sidebar
        await elements.openWebTables();

        //Step 4: Click on the "Add" button
        await webTables.clickAddButton();

        //Step 5: Fill in the form with valid data
        const data: PersonalDataRecord = {
            firstName: 'Alden',
            lastName: 'Cantrell',
            email: 'test@test.com',
            age: 30,
            salary: 12345,
            department: 'QA'
        };
        await webTables.fillPersonalData(data);
        await webTables.clickSubmitButton();

        //Step 6: Verify that the new record appears in the table
        await webTables.assertRowMatches(data);
    
    });

});

test.describe('TC01- Scenario B - Verify user can edit the row in a table', () => {

    test('edit row', async ({ page }) => {
        //Setup
        const firstName = 'Alden';
        const home = new HomePage(page);
        const elements = new ElementsPage(page);
        const webTables = new WebTablesPage(page);

        //Step 1: Navigate to the home page
        await home.open();

        //Step 2: Click on the "Elements" card
        await home.goToElementsPage();

        //Step 3: Click on the "Web Tables" option in the left sidebar
        await elements.openWebTables();
        
        //Step 4: Click on the "Edit" button of an existing record
        await webTables.clickEditButtonByName(firstName);

        //Step 5: Modify the First Name and Last Name fields
        await webTables.updateField('firstName', 'Gerimedica');
        await webTables.updateField('lastName', 'BV');

        //Step 6: Click the "Submit" button
        await webTables.clickSubmitButton();

        //Step 7: Verify that the record has been updated in the table
        await webTables.assertRowMatches({
            firstName: 'Gerimedica',
            lastName: 'BV',
            email: 'alden@example.com',
            age: 45,
            salary: 12000,
            department: 'Compliance'
        });
    });
});