import { test, expect } from '@playwright/test';

test.describe('Properties', () => {
  test('should load the properties listing page', async ({ page }) => {
    await page.goto('/properties');
    await expect(page).toHaveURL(/properties/);

    // Should show property cards or listings
    const content = page.locator('main, [role="main"], section').first();
    await expect(content).toBeVisible();
  });

  test('should navigate to property detail page', async ({ page }) => {
    await page.goto('/properties');

    // Click on the first property link/card
    const propertyLink = page.locator('a[href*="/properties/"]').first();
    if (await propertyLink.isVisible()) {
      await propertyLink.click();
      await expect(page).toHaveURL(/properties\/.+/);
      // Detail page should have content
      const content = page.locator('main, [role="main"]').first();
      await expect(content).toBeVisible();
    }
  });
});
