import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { InteractionsPage } from './pages/InteractionsPage';
import { DroppablePage } from './pages/DroppablePage';

test.describe('TC06 - Verify user can drag and drop', () => {

    test('drag and drop functionality', async ({ page }) => {
        const home = new HomePage(page);
        const interactions = new InteractionsPage(page);
        const droppable = new DroppablePage(page);
        
        // Step 1: Navigate to the home page
        await home.open();

        // Step 2: Click on the "Interactions" card
        await home.goToInteractionsPage();

        // Step 3: Click on the "Droppable" option in the left sidebar
        await interactions.openDroppable();

        // Step 4: Drag the "Drag me" box to "Drop Here" area
        await droppable.dragAndDrop();

        // Step 5: Verify that the drop was successful
        await droppable.assertDropSuccessful();
    });

});
