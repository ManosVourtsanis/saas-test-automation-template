import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { WidgetsPage } from './pages/WidgetsPage';
import { ProgressBarPage } from './pages/ProgressBarPage';

test.describe('TC04 - Verify the progress bar', () => {

    test('progress bar completion', async ({ page }) => {
        const home = new HomePage(page);
        const widgets = new WidgetsPage(page);
        const progressBar = new ProgressBarPage(page);
        
        // Step 1: Navigate to the home page
        await home.open();

        // Step 2: Click on the "Widgets" card
        await home.goToWidgetsPage();

        // Step 3: Click on the "Progress Bar" option in the left sidebar
        await widgets.openProgressBar();

        // Step 4: Click on start the progress bar
        await progressBar.startButtonClick();

        // Step 5: Wait until the progress bar reaches 100%
        await progressBar.waitUntilComplete();

        // Step 6: Verify that the progress bar has completed (100%)
        await progressBar.assertProgressComplete();
    });
});
