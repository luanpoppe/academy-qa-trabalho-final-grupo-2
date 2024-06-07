///  <reference types="cypress" />
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
let senha;
let email;
let id;

beforeEach(() => {
  email = fakerPT_BR.internet.email().toLowerCase();
  senha = fakerPT_BR.internet.password(6);
});

afterEach(() => {
  cy.deleteUser({
    email: email,
    id: id,
    password: senha,
  });
});

Given("que o usuário acessou a página de cadastrar usuários", function () {
  cy.visit("register");
});

When(
  "preenche todos os campos do formulário utilizando um nome qualquer {string}",
  function (nome) {
    regisUser.typeNome(nome);
    regisUser.typeEmail(email);
    regisUser.typeSenha(senha);
    regisUser.typeConfSenha(senha);
  }
);

When("acessar a funcionalidade salvar", function () {
  cy.intercept("POST", "/api/users").as("post");
  regisUser.clickCadastrar();
});

When(
  "preenche todos os campos do formulário utilizando um nome qualquer",
  function () {
    let nome = fakerPT_BR.person.fullName();

    regisUser.typeNome(nome);
    regisUser.typeEmail(email);
    regisUser.typeSenha(senha);
    regisUser.typeConfSenha(senha);
  }
);

When(
  "preenche todos os campos do formulário utilizando nome com 100 caracteres",
  function () {
    let nomeCaractere = "";
    for (let i = 0; i < 100; i++) {
      nomeCaractere += "C";
    }

    regisUser.typeNome(nomeCaractere);
    regisUser.typeEmail(email);
    regisUser.typeSenha(senha);
    regisUser.typeConfSenha(senha);
  }
);

Then("o usuario deve ser registrado com sucesso", function () {
  cy.wait("@post").then(function (intercept) {
    expect(intercept.response.statusCode).to.equal(201);
    id = intercept.response.body.id;
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

Then(
  "o usuário deve retornar para o formulário de cadastro clicando no botão OK",
  function () {
    regisUser.clickOK();

    cy.get(regisUser.campoForms).eq(0).should("be.visible");
    cy.get(regisUser.campoForms).eq(1).should("be.visible");
    cy.get(regisUser.campoForms).eq(2).should("be.visible");
    cy.get(regisUser.campoForms).eq(3).should("be.visible");
  }
);

Then("o usuário deve está automaticamente logado no site", function () {
  cy.intercept("POST", "/api/auth/login").as("auth");
  regisUser.clickOK();
  cy.wait("@auth").then(function (intercept) {
    expect(intercept.response.statusCode).to.equal(200);
  });
  cy.get(regisUser.clickPerfil).contains("Perfil");
});
