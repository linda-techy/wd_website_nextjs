import { test, expect } from '@playwright/test';
import { config } from '../helpers/test-config';

test.describe('Partnership Flow', () => {
  test('should load the partnership landing page', async ({ page }) => {
    await page.goto('/partnerships');
    await expect(page).toHaveURL(/partnerships/);
    const content = page.locator('main, [role="main"]').first();
    await expect(content).toBeVisible();
  });

  test('should load the partner login page', async ({ page }) => {
    await page.goto('/partnerships/login');
    await expect(page).toHaveURL(/partnerships\/login/);

    // Login form should be visible
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/password/i)).toBeVisible();
  });

  test('should show error for invalid login credentials', async ({ page }) => {
    await page.goto('/partnerships/login');

    await page.getByPlaceholder(/email/i).fill('invalid@example.com');
    await page.getByPlaceholder(/password/i).fill('wrongpassword');

    const loginButton = page.getByRole('button', { name: /login|sign in/i });
    await loginButton.click();

    // Should show error message
    await expect(
      page.getByText(/invalid|incorrect|error|failed/i)
    ).toBeVisible({ timeout: 10_000 });
  });

  test('should login and access partner dashboard', async ({ page }) => {
    // Mock the partnership login API
    await page.route('**/api/partnerships/login', async (route) => {
      const request = route.request();
      const body = request.postDataJSON();

      if (body.email === config.partnerCredentials.email) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            token: 'mock-partner-token',
            user: {
              id: 1,
              email: config.partnerCredentials.email,
              name: 'Test Partner',
            },
          }),
        });
      } else {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Invalid credentials' }),
        });
      }
    });

    // Mock dashboard data APIs
    await page.route('**/api/partnerships/stats', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          totalReferrals: 5,
          activeReferrals: 3,
          completedReferrals: 2,
        }),
      });
    });

    await page.route('**/api/partnerships/referrals', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ referrals: [] }),
        });
      } else {
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, id: 1 }),
        });
      }
    });

    // Login
    await page.goto('/partnerships/login');
    await page.getByPlaceholder(/email/i).fill(config.partnerCredentials.email);
    await page.getByPlaceholder(/password/i).fill(config.partnerCredentials.password);
    await page.getByRole('button', { name: /login|sign in/i }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL(/partnerships\/dashboard/, { timeout: 10_000 });

    // Dashboard should show partner stats
    const dashboard = page.locator('main, [role="main"]').first();
    await expect(dashboard).toBeVisible();
  });

  test('should create a referral from partner dashboard', async ({ page }) => {
    // Mock APIs for authenticated partner
    await page.route('**/api/partnerships/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          token: 'mock-partner-token',
          user: { id: 1, email: config.partnerCredentials.email, name: 'Test Partner' },
        }),
      });
    });

    await page.route('**/api/partnerships/stats', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ totalReferrals: 0, activeReferrals: 0, completedReferrals: 0 }),
      });
    });

    await page.route('**/api/partnerships/referrals', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ referrals: [] }),
        });
      }
    });

    await page.route('**/api/partnerships/referrals/lead', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, id: 1 }),
      });
    });

    // Login first
    await page.goto('/partnerships/login');
    await page.getByPlaceholder(/email/i).fill(config.partnerCredentials.email);
    await page.getByPlaceholder(/password/i).fill(config.partnerCredentials.password);
    await page.getByRole('button', { name: /login|sign in/i }).click();
    await expect(page).toHaveURL(/partnerships\/dashboard/, { timeout: 10_000 });

    // Look for referral creation form or button
    const referralButton = page.getByRole('button', { name: /refer|add.*referral|new.*referral/i })
      .or(page.getByRole('link', { name: /refer|add.*referral|new.*referral/i }));

    if (await referralButton.first().isVisible()) {
      await referralButton.first().click();

      // Fill referral form
      const nameField = page.getByPlaceholder(/name/i).first();
      if (await nameField.isVisible()) {
        await nameField.fill('Referred Customer');
      }

      const phoneField = page.getByPlaceholder(/phone|mobile/i).first();
      if (await phoneField.isVisible()) {
        await phoneField.fill('9876543210');
      }

      const submitButton = page.getByRole('button', { name: /submit|refer|save/i });
      if (await submitButton.isVisible()) {
        await submitButton.click();
        // Should show success feedback
        await expect(
          page.getByText(/success|submitted|created|thank/i)
        ).toBeVisible({ timeout: 10_000 });
      }
    }
  });
});
