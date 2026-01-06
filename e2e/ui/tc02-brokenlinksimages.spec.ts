import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ElementsPage } from './pages/ElementsPage';
import { BrokenLinksImagesPage } from './pages/BrokenLinksImagesPage';

test.describe('TC02 - Verify broken image', () => {

    test('first broken image', async ({ page }) => {
        const home = new HomePage(page);
        const elements = new ElementsPage(page);
        const brokenLinksImages = new BrokenLinksImagesPage(page);
        
        //Step 1: Navigate to the home page
        await home.open();

        //Step 2: Click on the "Elements" card
        await home.goToElementsPage();

        //Step 3: Click on the "Broken Links - Images" option in the left sidebar
        await elements.openBrokenLinksImages();

        //Step 4: Verify that the first broken image is present on the page
        const firstBrokenImageIndex = await brokenLinksImages.getFirstBrokenImageIndex();
        test.expect(firstBrokenImageIndex).toBeGreaterThanOrEqual(0);
    });

});