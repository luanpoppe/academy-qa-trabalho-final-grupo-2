export default class LoginPage {
  inputEmail = "[placeholder='E-mail']";
  inputSenha = "[placeholder='Password']";
  inputName = "[placeholder='Nome']";

  buttonLogin = ".login-button";
  buttonOk = ".modal-actions";
  buttonSalvar = ".account-save-button";
  linkAuth = ".movies-page-link";
  erroFormulario = ".input-error";
  msgErro = ".modal-body .error-message";
  divModal = ".modal-content";

  perfil = "[href='/profile']";
  conta = "[href='/account']";
  logout = "[href='/logout']";

  campoForm = ".input-container";

  typeEmail(email) {
    cy.get(this.inputEmail).type(email);
  }

  typeSenha(senha) {
    cy.get(this.inputSenha).type(senha);
  }

  typeNome(nome) {
    cy.get(this.inputName).type(nome);
  }

  clickLogin() {
    cy.get(this.buttonLogin).click();
  }

  clickOK() {
    cy.get(this.buttonOk).click();
  }

  clickSalvar() {
    cy.get(this.buttonSalvar).click();
  }

  clickPerfil() {
    cy.get(this.perfil).click();
  }

  clickConta() {
    cy.get(this.conta).click();
  }

  clickLogout() {
    cy.get(this.logout).click();
  }

  login(userInfo) {
    cy.intercept("POST", "/api/auth/login").as("login");
    this.typeEmail(userInfo.email);
    this.typeSenha(userInfo.password);
    this.clickLogin();
    // this.clickOK()
  }
}
