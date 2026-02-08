import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {

  await page.goto('/')

  // Login
  await page.fill('#user-name', 'standard_user')
  await page.fill('#password', 'secret_sauce')
  await page.click('#login-button')

  // Adicionar mochila ao carrinho
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]')

  // Ir para o carrinho
  await page.click('.shopping_cart_link')

  // Garantir que está no carrinho
  await expect(page).toHaveURL(/.*cart/)
})


  // Pré condição produto já add no carrinho
test('Continuar fluxo de compra após adicionar mochila ao carrinho', async ({ page }) => {

  // Iniciar checkout
  const botaoCheckout = page.locator('#checkout')
  await expect(botaoCheckout).toBeVisible()
  await botaoCheckout.click()

  // Checkout - Preencher formulário
  await expect(page).toHaveURL(/.*checkout-step-one/)
  await expect(page.locator('span.title'))
    .toHaveText('Checkout: Your Information')

  await page.fill('#first-name', 'Naihenne')
  await page.fill('#last-name', 'Martins')
  await page.fill('#postal-code', '12345')

  const botaoContinue = page.locator('#continue')
  await expect(botaoContinue).toBeVisible()
  await botaoContinue.click()

  // Checkout - Conferir dados do pedido
  await expect(page).toHaveURL(/.*checkout-step-two/)
  await expect(page.locator('span.title'))
    .toHaveText('Checkout: Overview')

  await expect(page.locator('.summary_subtotal_label'))
    .toContainText('$29.99')

  // Finalizar compra
  const botaoFinish = page.locator('#finish')
  await expect(botaoFinish).toBeVisible()
  await botaoFinish.click()

  // Confirmação do pedido
  await expect(page).toHaveURL(/.*checkout-complete/)
  await expect(page.locator('.complete-header'))
    .toHaveText('Thank you for your order!')
})