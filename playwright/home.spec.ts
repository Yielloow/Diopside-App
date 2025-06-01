import { test, expect } from '@playwright/test';

test('home screen displays correctly', async ({ page }) => {
  await page.goto('http://localhost:8081');
  await expect(page.locator('text=Bienvenue')).toBeVisible(); // ou .toHaveText(...)
});

