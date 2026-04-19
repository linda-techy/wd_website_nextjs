import { test, expect } from '@playwright/test';

test.describe('Brochure', () => {
  test('should load the brochure download page', async ({ page }) => {
    await page.goto('/brochure');
    await expect(page).toHaveURL(/brochure/);
    const content = page.locator('main, [role="main"]').first();
    await expect(content).toBeVisible();
  });

  test('should have a download button or link', async ({ page }) => {
    await page.goto('/brochure');

    const downloadLink = page.getByRole('link', { name: /download|brochure/i })
      .or(page.getByRole('button', { name: /download|brochure/i }));

    await expect(downloadLink.first()).toBeVisible();
  });
});
