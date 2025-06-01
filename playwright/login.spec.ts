// playwright/login.spec.ts
import { test, expect } from '@playwright/test';

test('connexion utilisateur', async ({ page }) => {
  await page.goto('http://localhost:8081'); // ← mets bien l'URL Expo web

  // Remplir les champs
  await page.getByTestId('username-input').fill('testuser'); // utile si requis
  await page.getByTestId('email-input').fill('test@email.com');
  await page.getByTestId('password-input').fill('test1234');

  // Cliquer sur le bouton
  await page.getByTestId('login-button').click();

  // Vérifie qu’on arrive sur la page d’accueil
  await expect(page.getByText('Bienvenue')).toBeVisible(); // ← adapte selon ton app
});
