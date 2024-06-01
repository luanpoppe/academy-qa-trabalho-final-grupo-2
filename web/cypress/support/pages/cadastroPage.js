import { fakerPT_BR } from "@faker-js/faker";

export default class CadastroPage {
  inputNome = "[placeholder='Nome']";
  inputEmail = "[placeholder='E-mail']";
  inputSenha = "[placeholder='Senha']";
  inputConfirmarSenha = "[placeholder='Confirmar senha']";

  buttonCadastrar = ".account-save-button";
  buttonOk = ".modal-actions";
  erroFormulario = ".input-error";
  mensagemCadastro = ".error-message";
  campoForms = ".profile-input";

  clickPerfil = ".movies-page-link";

  typeNome(nome) {
    cy.get(this.inputNome).type(nome);
  }

  typeEmail(email) {
    cy.get(this.inputEmail).type(email);
  }

  typeSenha(senha) {
    cy.get(this.inputSenha).type(senha);
  }

  typeConfSenha(confSenha) {
    cy.get(this.inputConfirmarSenha).type(confSenha);
  }

  clickCadastrar() {
    cy.get(this.buttonCadastrar).click();
  }

  clickOK() {
    cy.get(this.buttonOk).click();
  }

  registrarUsuario() {
    let email = fakerPT_BR.internet.email();
    let nome = fakerPT_BR.person.fullName();
    let senha = fakerPT_BR.internet.password(6);

    cy.get(this.inputNome).type(nome);
    cy.get(this.inputEmail).type(email);
    cy.get(this.inputSenha).type(senha);
    cy.get(this.inputConfirmarSenha).type(senha);
    cy.get(this.buttonCadastrar).click();
    cy.intercept("POST", "/api/auth/login").as("auth");
    // cy.get(this.buttonOk).click();
  }
}
