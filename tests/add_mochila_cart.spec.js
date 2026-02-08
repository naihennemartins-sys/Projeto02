// 1 - Referenia e bicliotecas
// Declara um objetico chamado test vindo da bibioteca Playwright
import { test, expect } from '@playwright/test'

// 2 - Classe ou Funções ou Métodos
// Um scrip pode executar de forma:
// - Sincrona: Simultânea. Ex.: ligação de voz
// - Assincrona: Separados. Ex.: mensagem de texto no whatsapp 
test('Realizar o fluxo de compra da mochila', async ({page}) => {

  await page.goto('/')
  await expect(page).toHaveURL('https://www.saucedemo.com')

  const botao_login = page.locator('#login-button')
  await expect(botao_login).toHaveText('Login')

  // Login
  await page.fill('[name="user-name"]', 'standard_user')
  await page.fill('[name="password"]', 'secret_sauce')
  await botao_login.click()

  // Inventário
  await expect(page).toHaveURL(/.*inventory/)
  const tituloSecao = 'span.title'
  await expect(page.locator(tituloSecao)).toHaveText('Products')

  // Adicionar mochila ao carrinho
  const btnAdicionar = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
  await expect(btnAdicionar).toBeVisible()
  await btnAdicionar.click()

  //Verificar se exibe o número 1 no carrinho
  const icoQuantCart = 'span.shopping_cart_badge'
  await expect(page.locator(icoQuantCart)).toHaveText('1')

  // Clicar no ícone do carrinho
  await page.locator(icoQuantCart).click()

  //Espera 1 segundo
  await page.waitForTimeout(1000)

  // Verificar se está na página do carrinho
  await expect(page).toHaveURL(/.*cart/)
  await expect(page.locator(tituloSecao)).toHaveText('Your Cart')

  // Verificar dados funcionais
  await expect(page.locator('.cart_quantity')).toHaveText('1')
  await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack')
  await expect(page.locator('.inventory_item_price')).toHaveText('$29.99')

  //Espera 1 segundo
  await page.waitForTimeout(1000)

})