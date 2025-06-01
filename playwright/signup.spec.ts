import { test, expect } from '@playwright/test';

test('inscription utilisateur', async ({ page }) => {
  await page.goto('http://localhost:8081');

  const timestamp = Date.now();
  const username = `test-user-${timestamp}`;
  const email = `test${timestamp}@e2e.com`;
  const password = 'test1234';

  // Remplir le formulaire d'inscription
  await page.getByPlaceholder("Nom d'utilisateur").fill(username);
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Mot de passe').fill(password);
  await page.getByText("S'inscrire").click();

  // Attendre l'apparition du message d'inscription réussie
  await expect(page.getByLabel('alert-message')).toHaveText(/inscription réussie/i, { timeout: 10000 });

  // 👇 C’est suffisant. Pas besoin de cliquer sur “OK”
});
