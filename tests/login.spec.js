import { test, expect } from '@playwright/test';
import { PaginaLogin } from '../pages/PaginaLogin.js';

test('Realizar login com sucesso', async ({ page }) => {
  const paginaLogin = new PaginaLogin(page);

  // Credenciais de teste
  const email = 'test@qabrains.com';
  const senha = 'Password123';

  // Acessar página de login
  await page.goto('https://practice.qabrains.com/ecommerce/login');

  // Realizar login
  await paginaLogin.realizarLogin(email, senha);

  // Validação pós-login
  await expect(
    page.locator('h3').filter({ hasText: 'Products' })
  ).toBeVisible();
});
