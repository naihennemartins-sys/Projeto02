/*export class PaginaProdutos {
  constructor(page) {
    this.page = page;

    // Ícone do carrinho no header
    this.botaoCarrinho = page.locator(
      'a[href="/ecommerce/cart"], a:has-text("Cart")'
    );
  }

  cardProduto(nomeProduto) {
    return this.page.locator(
      'div.flex.flex-col.gap-3.relative.group',
      {
        has: this.page.locator('a', {
          hasText: nomeProduto,
        }),
      }
    );
  }

  botaoAdicionarAoCarrinho(nomeProduto) {
    return this.cardProduto(nomeProduto).locator(
      'button:has-text("Add")'
    );
  }

  async adicionarProdutoAoCarrinho(nomeProduto) {
    const botao = this.botaoAdicionarAoCarrinho(nomeProduto);
    await botao.waitFor({ state: 'visible' });
    await botao.click();
  }

  async irParaOCarrinho() {
    await this.botaoCarrinho.first().click();
  }
}*/
export class PaginaProdutos {
  constructor(page) {
    this.page = page;

    // Ícone do carrinho no topo
    this.botaoCarrinho = page.locator(
      '#ecommerce-header span'
    );
  }

  cardProduto(nomeProduto) {
    return this.page.locator(
      'div.flex.flex-col.gap-3.relative.group',
      {
        has: this.page.locator('a', {
          hasText: nomeProduto,
        }),
      }
    );
  }

  botaoAdicionarAoCarrinho(nomeProduto) {
    return this.cardProduto(nomeProduto)
      .locator('button', { hasText: 'Add' });
  }

  async adicionarProdutoAoCarrinho(nomeProduto) {
    await this.botaoAdicionarAoCarrinho(nomeProduto).click();
  }

  async irParaOCarrinho() {
    await this.botaoCarrinho.first().click();
  }
}


