///  <reference types="cypress" />

import {
  Given,
  When,
  Then,
  Before,
  After,
} from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/loginPage";
import CadastroPage from "../pages/cadastroPage";
import ListagemDeFilmesPage from "../pages/ListagemDeFilmesPage";

const listFilmes = new ListagemDeFilmesPage();
const regisUser = new CadastroPage();
const loginUser = new LoginPage();
let usuarioCriado;

Before(() => {
  cy.createUser().then((newUser) => {
    usuarioCriado = newUser;
  });
});

After(() => {
  cy.deleteUser(usuarioCriado);
});

Given("que o usuário acessou a página de Login", function () {
  cy.visit("login");
});

When("o usuário informa as credenciais cadastradas", function () {
  loginUser.typeEmail(usuarioCriado.email);
  loginUser.typeSenha(usuarioCriado.password);
});

When("acessa a funcionalidade de logar", function () {
  cy.intercept("POST", "/api/auth/login").as("auth");
  loginUser.clickLogin();
});

When("o usuário informa as credenciais exceto campo email", function () {
  cy.get(loginUser.inputEmail).invoke("val").should("be.empty");
  loginUser.typeSenha(usuarioCriado.password);
});

When("o usuário informa as credenciais exceto campo senha", function () {
  loginUser.typeEmail(usuarioCriado.email);
  cy.get(loginUser.inputSenha).invoke("val").should("be.empty");
});

When("o usuário informa as credenciais com email não cadastrado", function () {
  loginUser.typeEmail("essesemailnaoexiste@g234.com");
  loginUser.typeSenha(usuarioCriado.password);
});

When(
  "o usuário informa as credenciais com email válido e senha incorreta",
  function () {
    loginUser.typeEmail(usuarioCriado.email);
    loginUser.typeSenha("123456");
  }
);

When(
  "realiza tentativa de atualizar dados após 60 minutos de sessão de Login",
  function () {
    cy.intercept("PUT", "/api/users/" + usuarioCriado.id, {
      statusCode: 401,
      body: {
        message: "Access denied.",
        error: "Unauthorized",
        statusCode: 401,
      },
    });
    loginUser.clickPerfil();
    loginUser.clickConta();
    loginUser.typeNome(" Carol");
    loginUser.clickSalvar();
  }
);
When(
  "o usuário informa as credenciais cadastradas inserindo o email em letras maiúsculas",
  function () {
    let emailMaiusculo = usuarioCriado.email.toUpperCase();
    loginUser.typeEmail(emailMaiusculo);
    loginUser.typeSenha(usuarioCriado.password);
  }
);

When("encerra a sessão acessando a funcionalidade Logout", function () {
  loginUser.clickPerfil();
  loginUser.clickLogout();
});

Then("o site deve redirecionar o usuário para página de login", function () {
  cy.get("h3").should("contains", "Login");
  cy.get("span").should("contains", "Entre com suas credenciais");
});

Then("usuário deve autenticar-se com sucesso", function () {
  cy.wait("@auth").then(function (intercept) {
    expect(intercept.response.statusCode).to.equal(200);
  });
  cy.get(loginUser.linkAuth).eq(1).contains("Perfil");
  cy.location("pathname").should("equal", "/");
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
  cy.get(loginUser.divModal).should("not.exist");
});

Then(
  "usuário deve ser deslogado sendo redirecionado para a página principal",
  function () {
    listFilmes.listaDeFilmes().should("exist")
    cy.get(regisUser.buttonsHeader).contains("Registre-se");
    cy.location("pathname").should("equal", "/")
  }
);
