///  <reference types="cypress" />
///  <reference path="../index.d.ts" />
import {
  Given,
  When,
  Then,
  Before,
  After,
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import GerenciarPage from "../pages/gerenciarPage";
const paginaGerenciar = new GerenciarPage();
var token;
var user;

Before(() => {
  cy.visit("/login");
  cy.createUser().then((response) => {
    user = response;
  });
});

After(() => {
  cy.deleteUser(user);
});

Given("que possuo um usuário comum cadastrado e logado no sistema", () => {
  paginaGerenciar.typeEmail(user.email);
  paginaGerenciar.typeSenha(user.password);
  paginaGerenciar.clickButtonLogin();
});

Given("que possuo um usuário crítico cadastrado e logado no sistema", () => {
  cy.login(user).then(function (response) {
    token = response.body.accessToken;
    cy.promoteCritic(token);
    paginaGerenciar.typeEmail(user.email);
    paginaGerenciar.typeSenha(user.password);
    paginaGerenciar.clickButtonLogin();
  });
});

Given(
  "que possuo um usuário administrador cadastrado e logado no sistema",
  () => {
    cy.login(user).then(function (response) {
      token = response.body.accessToken;
      cy.promoteAdmin(token);
      paginaGerenciar.typeEmail(user.email);
      paginaGerenciar.typeSenha(user.password);
      paginaGerenciar.clickButtonLogin();
    });
  }
);

Given("que acessei a funcionalidade de gerencimaneto de conta", () => {
  paginaGerenciar.clickLinkPerfil();
  paginaGerenciar.clickLinkGerenciar();
});

When("vizualizar o texto {string}", function (mensagem) {
  cy.get(paginaGerenciar.labelAtualize).should("contain", mensagem);
});

When(
  "alterar as próprias informações de nome, senha e confirmar senha do usuário comum",
  () => {
    user.password = "123456";
    paginaGerenciar.typeNome(faker.person.firstName() + " teste");
    paginaGerenciar.clickButtonAlterarSenha();
    paginaGerenciar.typeSenha(user.password);
    paginaGerenciar.typeConfirmaSenha(user.password);
  }
);

When("acessar a função salvar", () => {
  paginaGerenciar.clickButtonSalvar();
});

When("alterar o campo nome", () => {
  paginaGerenciar.typeNome(faker.person.firstName() + " teste");
});

When("atualizar o campo senha", () => {
  paginaGerenciar.clickButtonAlterarSenha();
  paginaGerenciar.typeSenha("123456");
});

When("informar um nome com < 1 dígitos", () => {
  cy.get(paginaGerenciar.inputNome).clear();
});

When("atualizar o campo nome para {string}", (name) => {
  cy.get(paginaGerenciar.inputNome).clear();
  paginaGerenciar.typeNome(name);
});

When(
  "atualizar o campo confirmar senha com o mesmo valor inserido no campo senha",
  () => {
    user.password = "123456";
    paginaGerenciar.typeConfirmaSenha(user.password);
  }
);

When(
  "atualizar o campo confirmar senha com um valor diferente do inserido no campo senha",
  () => {
    paginaGerenciar.typeConfirmaSenha("005500");
  }
);

When(
  "atualizar os campos de senha e confirmar senha para {string}",
  (senha) => {
    paginaGerenciar.clickButtonAlterarSenha();
    paginaGerenciar.typeSenha(senha);
    paginaGerenciar.typeConfirmaSenha(senha);
  }
);

When("habilitar a função alterar senha", () => {
  paginaGerenciar.clickButtonAlterarSenha();
});

Then("o usuário poderá atualizar suas informações", () => {
  cy.get(paginaGerenciar.inputNome).should("be.enabled");
  cy.get(paginaGerenciar.inputEmail).should("be.disabled");
  cy.get(paginaGerenciar.labelTipoUser).should("be.disabled");
  paginaGerenciar.clickButtonAlterarSenha();
  cy.get(paginaGerenciar.inputSenha).should("be.enabled");
  cy.get(paginaGerenciar.inputConfirmaSenha).should("be.enabled");
  cy.get(paginaGerenciar.labelSalvar).should("be.enabled");
});

Then("será possível atualizar as informações do usuário com sucesso", () => {
  cy.get(paginaGerenciar.labelAlerta).should("contain", "Sucesso");
  cy.get(paginaGerenciar.mensagemAlerta).should(
    "contain",
    "Informações atualizadas!"
  );
  paginaGerenciar.clickButtonOk();
});

Then("será possível atualizar apenas o nome do usuário com sucesso", () => {
  cy.get(paginaGerenciar.labelAlerta).should("contain", "Sucesso");
  cy.get(paginaGerenciar.mensagemAlerta).should(
    "contain",
    "Informações atualizadas!"
  );
  paginaGerenciar.clickButtonOk();
});

Then("será possível atualizar apenas a senha do usuário com sucesso", () => {
  cy.get(paginaGerenciar.labelAlerta).should("contain", "Sucesso");
  cy.get(paginaGerenciar.mensagemAlerta).should(
    "contain",
    "Informações atualizadas!"
  );
  paginaGerenciar.clickButtonOk();
});

Then(
  "o alerta de erro informando que não é possível realizar a operação será exibido na tela",
  () => {
    cy.get(paginaGerenciar.labelAlerta).should("contain", "Ocorreu um erro");
    cy.get(paginaGerenciar.mensagemAlerta).should(
      "contain",
      "Não foi possível atualizar os dados."
    );
    paginaGerenciar.clickButtonOk();
  }
);

Then("o sistema exibirá a mensagem de erro {string}", (mensagem) => {
  cy.get(paginaGerenciar.labelCampoConfirmaSenha).should("contain", mensagem);
});

Then("o usuário terá acesso aos dados de nome e e-mail da sua conta", () => {
  cy.get(paginaGerenciar.inputNome).should("be.visible");
  cy.get(paginaGerenciar.inputEmail).should("be.visible");
});

Then("o campo senha exibirá a mensagem de erro {string}", (mensagem) => {
  cy.get(paginaGerenciar.labelCampoSenha).should("contain", mensagem);
});

Then(
  "o campo confirmar senha exibirá a mensagem de erro {string}",
  (mensagem) => {
    cy.get(paginaGerenciar.labelCampoConfirmaSenha).should("contain", mensagem);
  }
);

Then("o campo nome exibirá a mensagem de erro {string}", (mensagem) => {
  cy.get(paginaGerenciar.labelNome).should("contain", mensagem);
});