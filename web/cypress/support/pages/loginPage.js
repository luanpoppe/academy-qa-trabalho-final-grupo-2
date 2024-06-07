import { fakerPT_BR } from "@faker-js/faker";

export default class LoginPage {
  inputEmail = "[placeholder='E-mail']";
  inputSenha = "[placeholder='Password']";

  buttonLogin = ".login-button";
  buttonOk = ".modal-actions";
  linkAuth = ".movies-page-link";
  erroFormulario = ".input-error";
  msgErro = ".error-message";

  campoForm = ".input-container";

  typeEmail(email) {
    cy.get(this.inputEmail).type(email);
  }

  typeSenha(senha) {
    cy.get(this.inputSenha).type(senha);
  }

  clickLogin() {
    cy.get(this.buttonLogin).click();
  }

  clickOK() {
    cy.get(this.buttonOk).click();
  }
}
