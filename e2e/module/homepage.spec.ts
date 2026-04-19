import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage with all major sections', async ({ page }) => {
    // Page loads successfully
    await expect(page).toHaveTitle(/Wall Dot Builders|WD Builders/i);

    // Hero section exists
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
  });

  test('should have navigation links', async ({ page }) => {
    const nav = page.locator('nav, header');
    await expect(nav).toBeVisible();

    // Check key navigation items exist
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /contact/i })).toBeVisible();
  });

  test('should have a footer with links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await expect(page).toHaveTitle(/Wall Dot Builders|WD Builders/i);
  });
});
