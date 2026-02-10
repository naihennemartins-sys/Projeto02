/*export class PaginaCarrinho {
  constructor(page) {
    this.page = page;
    this.cartList = page.locator('.cart-list');
  }

  async produtoEstaNoCarrinho(nomeProduto) {
    const itensCarrinho = this.page.locator(
      'div.group'
    );

    return await itensCarrinho
      .filter({ hasText: nomeProduto })
      .count() > 0;
  }

  async listarProdutosDoCarrinho() {
    return await this.itensCarrinho.allTextContents();
  }

  async precoDoProdutoNoCarrinho(nomeProduto) {
    const cardProduto = this.page.locator(
      '#cart .cart-list > div',
      {
        has: this.page.locator(
          `h3.font-bold.font-oswald:text-is("${nomeProduto}")`
        ),
      }
    );

    await cardProduto.waitFor({ state: 'visible' });

    const preco = cardProduto.locator(
      'div:has(p:text-is("Total")) p.font-bold'
    );

    return (await preco.innerText()).trim();
  }
}*/
export class PaginaCarrinho {
  constructor(page) {
    this.page = page;
  }

  async irParaOCarrinho() {
    await this.page.goto(
      'https://practice.qabrains.com/ecommerce/cart'
    );
  }

  async precoDoProdutoNoCarrinho(nomeProduto) {
    const item = this.page.locator(
      '.cart-list > div',
      {
        has: this.page.locator(
          `h3:has-text("${nomeProduto}")`
        )
      }
    );

    await item.waitFor({ timeout: 10000 });

    return await item
      .locator('p.font-bold.font-oswald')
      .nth(0)
      .innerText();
  }
}
