import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
  test('should load the blog listing page', async ({ page }) => {
    await page.goto('/blogs');
    await expect(page).toHaveURL(/blogs/);
    // Should show blog posts or empty state
    const content = page.locator('main, [role="main"]').first();
    await expect(content).toBeVisible();
  });

  test('should navigate to blog post detail', async ({ page }) => {
    await page.goto('/blogs');

    const postLink = page.locator('a[href*="/blogs/"]').first();
    if (await postLink.isVisible()) {
      await postLink.click();
      await expect(page).toHaveURL(/blogs\/.+/);
      // Article content should be visible
      const article = page.locator('article, main, [role="main"]').first();
      await expect(article).toBeVisible();
    }
  });
});
