import {
  Before,
  After,
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import { fakerPT_BR } from "@faker-js/faker";
import CadastroPage from "../pages/cadastroPage";

const regisUser = new CadastroPage();
var senha = fakerPT_BR.internet.password(8);

Before(function () {
  cy.createUser()
})

Given("que o usuário acessou a página de cadastrar usuários", function () {
  cy.visit("register");
});

When("não preencher nenhum campo", function () {
  cy.get(regisUser.inputNome).invoke("val").should("be.empty");
  cy.get(regisUser.inputEmail).invoke("val").should("be.empty");
  cy.get(regisUser.inputSenha).invoke("val").should("be.empty");
  cy.get(regisUser.inputConfirmarSenha).invoke("val").should("be.empty");
});

When("acessar a funcionalidade salvar", function () {
  regisUser.clickCadastrar();
});

When("preenche todos os campos do formulário exceto o campo nome", function () {
  var email = fakerPT_BR.internet.email();

  cy.get(regisUser.inputNome).invoke("val").should("be.empty");
  regisUser.typeEmail(email);
  regisUser.typeSenha(senha);
  regisUser.typeConfSenha(senha);
});

When(
  "preenche todos os campos do formulário exceto o campo email",
  function () {
    var nome = fakerPT_BR.person.fullName();
    regisUser.typeNome(nome);
    regisUser.typeSenha(senha);
    regisUser.typeConfSenha(senha);
  }
);

When(
  "preenche todos os campos do formulário exceto o campo senha",
  function () {
    var email = fakerPT_BR.internet.email();
    var nome = fakerPT_BR.person.fullName();

    regisUser.typeNome(nome);
    regisUser.typeEmail(email);
  }
);

When("preencher um nome com mais de 100 caracteres", function () {
  var nomeCaractere = "";
  for (let i = 0; i < 100; i++) {
    nomeCaractere += "C";
  }
  regisUser.typeNome(nomeCaractere);
});

Then("deve alertar no formulário os campos obrigatórios", function () {
  cy.get(regisUser.erroFormulario).eq(0).contains("Informe o nome.");
  cy.get(regisUser.erroFormulario).eq(1).contains("Informe o e-mail.");
  cy.get(regisUser.erroFormulario).eq(2).contains("Informe a senha");
  cy.get(regisUser.erroFormulario).eq(3).contains("Informe a senha");
});

Then("o site exibe alerta de nome no formulário {string}", function (mensagem) {
  cy.get(regisUser.erroFormulario).contains(mensagem);
});

Then("o site exibe alerta de email no formulário", function () {
  cy.get(regisUser.erroFormulario).contains("Informe o e-mail.");
});

Then("o site exibe alerta de senha no formulário", function () {
  cy.get(regisUser.erroFormulario).eq(0).contains("Informe a senha");
  cy.get(regisUser.erroFormulario).eq(1).contains("Informe a senha");
});
