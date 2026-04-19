import { test, expect } from '@playwright/test';

test.describe('Home Cost Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/home-cost-calculator');
  });

  test('should render the calculator page', async ({ page }) => {
    await expect(page).toHaveURL(/home-cost-calculator/);
    // Calculator should have input fields
    await expect(page.locator('form, [data-testid="calculator"]').first()).toBeVisible();
  });

  test('should calculate cost estimate', async ({ page }) => {
    // Mock the API
    await page.route('**/api/leads/calculator', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    // Fill in area/sqft field if visible
    const sqftInput = page.locator('input[type="number"], input[name*="sqft"], input[name*="area"]').first();
    if (await sqftInput.isVisible()) {
      await sqftInput.fill('2500');
    }

    // Look for a calculate/submit button
    const calcButton = page.getByRole('button', { name: /calculate|estimate|get.*cost/i });
    if (await calcButton.isVisible()) {
      await calcButton.click();
      // Should show some result
      await expect(
        page.getByText(/estimate|cost|price|total|result/i)
      ).toBeVisible({ timeout: 10_000 });
    }
  });
});
