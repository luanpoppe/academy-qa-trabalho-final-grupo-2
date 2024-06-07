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

  registrarUsuario(userParam) {
    let email = fakerPT_BR.internet.email();
    let nome = fakerPT_BR.person.fullName();
    let senha = fakerPT_BR.internet.password(6);

    const user = {
      email: email,
      name: nome,
      password: senha,
      ...userParam
    }

    cy.get(this.inputNome).type(user.name);
    cy.get(this.inputEmail).type(user.email);
    cy.get(this.inputSenha).type(user.password);
    cy.get(this.inputConfirmarSenha).type(user.password);
    cy.get(this.buttonCadastrar).click();
    cy.intercept("POST", "/api/auth/login").as("auth");
    return user
    // cy.get(this.buttonOk).click();
  }
}
