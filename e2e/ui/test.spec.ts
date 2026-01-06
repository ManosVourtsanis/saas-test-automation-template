import { test } from '@playwright/test';

test('sample test', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
});
