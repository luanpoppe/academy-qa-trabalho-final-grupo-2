export default class GerenciarPage {
  inputNome = '[name="name"]';
  inputEmail = '[name="email"]';
  inputSenha = '[name="password"]';
  inputConfirmaSenha = ":nth-child(6) > .profile-input";

  labelNome = ".input-error";
  labelCampoSenha = ":nth-child(5) > .input-error";
  labelCampoConfirmaSenha = ":nth-child(6) > .input-error";
  labelAlerta = ".modal-body > h3";
  mensagemAlerta = ".error-message";
  labelContaUsuario = ".account-container";
  labelSalvar = ".account-save-button";
  labelTipoUser = ":nth-child(3) > .profile-input";

  labelAtualize = ".register-account-header>span";

  buttonAlterarSenha = ".account-password-button";
  buttonLogin = ".login-button";
  buttonOk = ".modal-actions > button";

  linkPerfil = '[href="/profile"]';
  linkGerenciarConta = '[href="/account"]';

  typeNome(name) {
    cy.get(this.inputNome).type(name);
  }

  typeEmail(email) {
    cy.get(this.inputEmail).type(email);
  }

  typeSenha(password) {
    cy.get(this.inputSenha).type(password);
  }

  typeConfirmaSenha(password) {
    cy.get(this.inputConfirmaSenha).type(password);
  }

  clickButtonLogin() {
    cy.get(this.buttonLogin).click();
  }

  clickButtonAlterarSenha() {
    cy.get(this.buttonAlterarSenha).click();
  }

  clickButtonSalvar() {
    cy.get(this.labelSalvar).click();
  }

  clickLinkPerfil() {
    cy.get(this.linkPerfil).click();
  }

  clickLinkGerenciar() {
    cy.get(this.linkGerenciarConta).click();
  }

  clickButtonOk() {
    cy.get(this.buttonOk).click();
  }
}
