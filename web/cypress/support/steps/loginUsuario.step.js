///  <reference types="cypress" />

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { fakerPT_BR } from "@faker-js/faker";
import LoginPage from "../pages/loginPage";

const loginUser = new LoginPage();
let usuarioCriado;

beforeEach(() => {
  cy.createUser().then((newUser) => {
    usuarioCriado = newUser;
  });
});

afterEach(() => {
  cy.deleteUser({
    email: usuarioCriado.email,
    id: usuarioCriado.id,
    password: usuarioCriado.password,
  });
});

Given("que o usuário acessou a página de Login", function () {
  cy.visit("login");
});

When("informo as credenciais cadastradas", function () {
  loginUser.typeEmail(usuarioCriado.email);
  loginUser.typeSenha(usuarioCriado.password);
});

When("acesso a funcionalidade salvar", function () {
  cy.intercept("POST", "/api/auth/login").as("auth");
  loginUser.clickLogin();
});

When("informo as credenciais exceto campo email", function () {
  cy.get(loginUser.inputEmail).invoke("val").should("be.empty");
  loginUser.typeSenha(usuarioCriado.password);
});

When("informo as credenciais exceto campo senha", function () {
  loginUser.typeEmail(usuarioCriado.email);
  cy.get(loginUser.inputSenha).invoke("val").should("be.empty");
});

When("informo as credenciais com email não cadastrado", function () {
  loginUser.typeEmail("essesemailnaoexiste@g234.com");
  loginUser.typeSenha(usuarioCriado.password);
});

When("informo as credenciais com email válido e senha incorreta", function () {
  loginUser.typeEmail(usuarioCriado.email);
  loginUser.typeSenha("12345");
});

When("a sessão passa de 60 minutos", function () {
  loginUser.clickLogin();

  const time = new Date().getTime(); //pegando o momento exato do login e amarezenando nessa constante time
  cy.window().then((timeLogin) => {
    //no then recebo esse objeto (?) com a informações do navegador pra conseguir pegar o local Storage do navegador que armazena os dados
    timeLogin.localStorage.setItem("time", time - (60 * 60 * 1000 + 1)); //atualizo o momento do login pra maior que 60 min utilizando esse metdódo setItem
  });
});

Then("usuário deve autenticar-se com sucesso", function () {
  cy.wait("@auth").then(function (intercept) {
    expect(intercept.response.statusCode).to.equal(200);
  });
  cy.get(loginUser.linkAuth).eq(1).contains("Perfil");
});

Then(
  "o site exibe alerta de email no formulário {string}",
  function (mensagem) {
    cy.get(loginUser.erroFormulario).contains(mensagem);
  }
);

Then("o site exibe mensagem {string}", function (mensagem) {
  cy.wait("@auth").then(function (intercept) {
    expect(intercept.response.statusCode).to.equal(401);
  });
  cy.get(loginUser.msgErro).contains(mensagem);
});

Then("ao clicar no botão OK deve retornar para o formulário", function () {
  loginUser.clickOK();
  cy.get(loginUser.campoForm).eq(0).should("be.visible");
  cy.get(loginUser.campoForm).eq(1).should("be.visible");
});

Then(
  "usuário deverá ser deslogado do site retornando para a tela de login",
  function () {
    cy.visit("/profile");
    cy.get(loginUser.campoForm).eq(0).should("be.visible");
    cy.get(loginUser.campoForm).eq(1).should("be.visible");
  }
);
