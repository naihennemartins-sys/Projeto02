export class PaginaLogin {
  constructor(page) {
    this.page = page;
    this.campoEmail = page.locator('input[type="email"]');
    this.campoSenha = page.locator('input[type="password"]');
    this.botaoLogin = page.locator('button:has-text("Login")');
  }

  async realizarLogin(email, senha) {
    await this.campoEmail.fill(email);
    await this.campoSenha.fill(senha);
    await this.botaoLogin.click();
  }
}

