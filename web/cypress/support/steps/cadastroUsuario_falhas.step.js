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
let email = fakerPT_BR.internet.email();
let nome = fakerPT_BR.person.fullName();
let senha = fakerPT_BR.internet.password(6);

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
  cy.get(regisUser.inputNome).invoke("val").should("be.empty");
  regisUser.typeEmail(email);
  regisUser.typeSenha(senha);
  regisUser.typeConfSenha(senha);
});

When(
  "preenche todos os campos do formulário exceto o campo email",
  function () {
    regisUser.typeNome(nome);
    regisUser.typeSenha(senha);
    regisUser.typeConfSenha(senha);
  }
);

When(
  "preenche todos os campos do formulário exceto o campo senha",
  function () {
    regisUser.typeNome(nome);
    regisUser.typeEmail(email);
  }
);

When(
  "preenche todos os campos dos formulário exceto o campo de confirmação de senha",
  function () {
    regisUser.typeNome(nome);
    regisUser.typeEmail(email);
    regisUser.typeSenha(senha);
  }
);

When("preenche nome com mais de 100 caracteres", function () {
  let nomeCaractere = "";
  for (let i = 0; i < 101; i++) {
    nomeCaractere += "C";
  }
  regisUser.typeNome(nomeCaractere);
});

When("preencher todos os campos restante do formulário", function () {
  regisUser.typeEmail(email);
  regisUser.typeSenha(senha);
  regisUser.typeConfSenha(senha);
});

//usar comands pra pegar um usuario ja cadastrado
When(
  "preenche todos os campos do formulário utilizando um email ja cadastrado",
  function () {}
);

When("preenche todos os campos dos formulários", function () {
  regisUser.typeNome(nome);
  regisUser.typeEmail(email);
  regisUser.typeSenha(senha);
});

When(
  "a senha principal é diferente da confirmação de senha {string}",
  function (senhaConf) {
    cy.get(regisUser.inputConfirmarSenha).type(senhaConf);
  }
);

Then("deve alertar no formulário os campos obrigatórios", function () {
  cy.get(regisUser.erroFormulario).eq(0).contains("Informe o nome.");
  cy.get(regisUser.erroFormulario).eq(1).contains("Informe o e-mail.");
  cy.get(regisUser.erroFormulario).eq(2).contains("Informe a senha");
  cy.get(regisUser.erroFormulario).eq(3).contains("Informe a senha");
});

Then("o site exibe alerta de nome no formulário {string}", function (mensagem) {
  cy.get(regisUser.erroFormulario).contains(mensagem);
});

Then(
  "o site exibe alerta de email no formulário {string}",
  function (mensagem) {
    cy.get(regisUser.erroFormulario).contains(mensagem);
  }
);

Then(
  "o site exibe alerta de senha no formulário {string}",
  function (mensagem) {
    cy.get(regisUser.erroFormulario).eq(0).contains(mensagem);
    cy.get(regisUser.erroFormulario).eq(1).contains(mensagem);
  }
);

Then(
  "o site exibe alerta no campo de confirmação de senha no formulário {string}",
  function (mensagem) {
    cy.get(regisUser.erroFormulario).contains(mensagem);
  }
);

//interceptar pra verificar se o status retornado é 409
Then(
  "a operação de registro não poderá ser concluída alertando que o e-mail ja está cadastrado",
  function () {
    cy.get(regisUser.erroCadastro).contains(
      "E-mail já cadastrado. Utilize outro e-mail"
    );
  }
);

Then(
  "a operação de registro não poderá ser concluida com alerta no formulario {string}",
  function (alerta) {
    cy.get(regisUser.erroFormulario).contains(alerta);
  }
);

Then(
  "o site exibe alerta no campo de Confirmação de senha no formulário {string}",
  function (alerta) {
    cy.get(regisUser.erroFormulario).contains(alerta);
  }
);
