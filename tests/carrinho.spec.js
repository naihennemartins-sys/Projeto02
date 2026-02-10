import { test, expect } from '@playwright/test';
import { PaginaLogin } from '../pages/PaginaLogin.js';
import { PaginaProdutos } from '../pages/PaginaProdutos.js';
import { PaginaCarrinho } from '../pages/PaginaCarrinho.js';

test.describe('Carrinho de compras', async () => {

  test.beforeEach(async ({ page }) => {
    const paginaLogin = new PaginaLogin(page);

    // Credenciais de teste
    const email = 'test@qabrains.com';
    const senha = 'Password123';

    await page.goto('https://practice.qabrains.com/ecommerce/login');
    await paginaLogin.realizarLogin(email, senha);
  });

  test('Adicionar dois produtos ao carrinho e validar nome e preço', async ({ page }) => {
    const paginaProdutos = new PaginaProdutos(page);
    const paginaCarrinho = new PaginaCarrinho(page);

    const produto1 = {
      nome: 'Sample Shoe Name',
      preco: '$89.00'
    };

    const produto2 = {
      nome: 'Sample Trouser Name',
      preco: '$72.00'
    };

    await paginaProdutos.adicionarProdutoAoCarrinho(produto1.nome);
    await paginaProdutos.adicionarProdutoAoCarrinho(produto2.nome);

    await paginaProdutos.irParaOCarrinho();

    // Preços
    expect(await paginaCarrinho.precoDoProdutoNoCarrinho(produto1.nome))
      .toContain(produto1.preco);

    expect(await paginaCarrinho.precoDoProdutoNoCarrinho(produto2.nome))
      .toContain(produto2.preco);
  });

});
