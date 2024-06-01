export default class CadastroPage {
  inputNome = "[placeholder='Nome']";
  inputEmail = "[placeholder='E-mail']";
  inputSenha = "[placeholder='Senha']";
  inputConfirmarSenha = "[placeholder='Confirmar senha']";

  buttonCadastrar = ".account-save-button";
  buttonOk = "";
  erroFormulario = ".input-error";
  mensagemCadastro = ".error-message";

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
}
