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
