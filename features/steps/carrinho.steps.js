import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, expect } from '@playwright/test';

import { PaginaLogin } from '../../pages/PaginaLogin.js';
import { PaginaProdutos } from '../../pages/PaginaProdutos.js';
import { PaginaCarrinho } from '../../pages/PaginaCarrinho.js';

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.produtos = [];
});

After(async function () {
  await this.browser.close();
});

Given('que estou logado na loja', async function () {
  const paginaLogin = new PaginaLogin(this.page);

  await this.page.goto(
    'https://practice.qabrains.com/ecommerce/login'
  );

  await paginaLogin.realizarLogin(
    'test@qabrains.com',
    'Password123'
  );
});

When(
  'adiciono os seguintes produtos ao carrinho:',
  async function (dataTable) {
    const paginaProdutos = new PaginaProdutos(this.page);

    for (const produto of dataTable.hashes()) {
      await paginaProdutos.adicionarProdutoAoCarrinho(produto.nome);
      this.produtos.push(produto);
    }
  }
);

Then(
  'devo ver os produtos no carrinho com os preços corretos',
  async function () {
    const paginaCarrinho = new PaginaCarrinho(this.page);

    await paginaCarrinho.irParaOCarrinho();

    for (const produto of this.produtos) {
      const preco =
        await paginaCarrinho.precoDoProdutoNoCarrinho(produto.nome);

      expect(preco).toBe(produto.preco);
    }
  }
);

