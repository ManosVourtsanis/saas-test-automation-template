import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { WidgetsPage } from './pages/WidgetsPage';
import { ToolTipsPage } from './pages/ToolTipsPage';

test.describe('TC05 - Verify the tooltip', () => {

    test('tooltip visibility and text', async ({ page }) => {
        const home = new HomePage(page);
        const widgets = new WidgetsPage(page);
        const toolTips = new ToolTipsPage(page);
        
        // Step 1: Navigate to the home page
        await home.open();

        // Step 2: Click on the "Widgets" card
        await home.goToWidgetsPage();

        // Step 3: Click on the "Tool Tips" option in the left sidebar
        await widgets.openToolTips();

        // Step 4: Hover over the button "Hover me to see"
        await toolTips.hoverOverTooltipButton();

        // Step 5: Verify that the tooltip is visible
        await toolTips.assertTooltipVisible();

        // Step 6: Verify the tooltip text content
        await toolTips.assertTooltipText();
    });

});
