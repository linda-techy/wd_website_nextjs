import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contactus');
  });

  test('should render the contact form with all required fields', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible();
    await expect(page.getByPlaceholder(/name/i)).toBeVisible();
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/phone|mobile/i)).toBeVisible();
  });

  test('should show validation errors for empty submission', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /send|submit/i });
    await submitButton.click();

    // Browser-native validation or custom validation should prevent submission
    // Check that the form is still visible (not replaced by success)
    await expect(page.locator('form')).toBeVisible();
  });

  test('should submit contact form successfully', async ({ page }) => {
    // Mock the API response
    await page.route('**/api/leads/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, id: 1 }),
      });
    });

    // Fill in the form
    await page.getByPlaceholder(/name/i).fill('Test User');
    await page.getByPlaceholder(/email/i).fill('test@example.com');
    await page.getByPlaceholder(/phone|mobile/i).fill('9876543210');

    // Fill message if it exists
    const messageField = page.getByPlaceholder(/message|requirement/i);
    if (await messageField.isVisible()) {
      await messageField.fill('Test inquiry for residential construction project');
    }

    // Submit
    const submitButton = page.getByRole('button', { name: /send|submit/i });
    await submitButton.click();

    // Expect success feedback (toast, message, or redirect)
    await expect(
      page.getByText(/thank you|success|submitted|received/i)
    ).toBeVisible({ timeout: 10_000 });
  });
});
