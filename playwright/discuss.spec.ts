import { test, expect } from '@playwright/test';

test('connexion puis envoi d’un message dans la discussion', async ({ page }) => {
  await page.goto('http://localhost:8081'); // ou ton URL Expo web/local

  // Connexion
  await page.fill('input[placeholder="Email"]', 'aurelannoye@yahoo.fr');
  await page.fill('input[placeholder="Mot de passe"]', 'Jodoigne2001');
  await page.click('text=Se connecter'); // ou 'text=Connexion' selon ton bouton

  // Va sur l'écran de discussion
  await page.getByTestId('discuss-button').click();

  // Envoie un message
  const messageTexte = 'Message Playwright ' + Date.now();
  await page.getByPlaceholder('Écrivez un message...').fill(messageTexte);
  await page.getByTestId('send-button').click();

  // Attend que le message apparaisse
  await expect(page.locator(`text=${messageTexte}`)).toBeVisible({ timeout: 10000 });
});

