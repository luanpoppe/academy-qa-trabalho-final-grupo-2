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

let senha = fakerPT_BR.internet.password(6);

// after({ tags: ""}, function () {

// })

Given("que o usuário acessou a página de cadastrar usuários", function () {
  cy.visit("register");
});

When(
  "preenche todos os campos do formulário utilizando um nome qualquer {string}",
  function (nome) {
    let email = fakerPT_BR.internet.email();

    regisUser.typeNome(nome);
    regisUser.typeEmail(email);
    regisUser.typeSenha(senha);
    regisUser.typeConfSenha(senha);
  }
);

When("acessar a funcionalidade salvar", function () {
  cy.intercept(
    "POST",
    "https://raromdb-3c39614e42d4.herokuapp.com/api/users"
  ).as("post");
  regisUser.clickCadastrar();
});

When(
  "preenche todos os campos do formulário utilizando um nome qualquer",
  function () {
    let email = fakerPT_BR.internet.email();
    let nome = fakerPT_BR.person.fullName();

    regisUser.typeNome(nome);
    regisUser.typeEmail(email);
    regisUser.typeSenha(senha);
    regisUser.typeConfSenha(senha);
  }
);

Then("o usuario deve ser registrado com sucesso", function () {
  cy.wait("@post").then(function (intercept) {
    expect(intercept.response.statusCode).to.equal(201);
  });
});

Then("o site exibirá uma mensagem de cadastro com sucesso", function () {
  cy.get(regisUser.mensagemCadastro).contains("Cadastro realizado!");
});

Then("o usuario deve ser registrado com conta do tipo comum", function () {
  cy.wait("@post").then(function (intercept) {
    type = intercept.response.body.type;
    cy.wrap(type).should("eq", 0);
  });
});
