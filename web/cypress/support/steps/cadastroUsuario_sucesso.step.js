///  <reference types="cypress" />
import {
  After,
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import { fakerPT_BR } from "@faker-js/faker";
import CadastroPage from "../pages/cadastroPage";

const regisUser = new CadastroPage();
let email;
let user;

After(() => {
  cy.deleteUser(user);
});

Given("que o usuário acessou a página de cadastrar usuários", function () {
  cy.visit("register");
});

When(
  "preenche todos os campos do formulário utilizando um nome qualquer {string}",
  function (nome) {
    regisUser.registrarUsuario({ name: nome }).then(function (resposta) {
      user = resposta;
    });
  }
);

When("acessar a funcionalidade salvar", function () {
  cy.intercept("POST", "/api/users").as("post");
  regisUser.clickCadastrar();
});

When(
  "preenche todos os campos do formulário utilizando email com 6 caracteres",
  function () {
    regisUser.registrarUsuario({ email: "c@t.br" }).then(function (resposta) {
      user = resposta;
    });
  }
);

When(
  "preenche todos os campos do formulário com valores válidos",
  function () {
    regisUser.registrarUsuario().then(function (resposta) {
      user = resposta;
    });
  }
);

When(
  "preenche todos os campos do formulário utilizando nome com 99 caracteres",
  function () {
    let nomeCaractere = "";
    for (let i = 0; i < 99; i++) {
      nomeCaractere += "C";
    }
    regisUser
      .registrarUsuario({ name: nomeCaractere })
      .then(function (resposta) {
        user = resposta;
      });
  }
);

When(
  "preenche todos os campos do formulário utilizando nome com 100 caracteres",
  function () {
    let nomeCaractere = "";
    for (let i = 0; i < 100; i++) {
      nomeCaractere += "C";
    }
    regisUser
      .registrarUsuario({ name: nomeCaractere })
      .then(function (resposta) {
        user = resposta;
      });
  }
);

When(
  "preenche todos os campos do formulário inserindo email com letras maiúsculas",
  function () {
    emailMaiusculo = fakerPT_BR.internet.email().toUpperCase();

    regisUser
      .registrarUsuario({ email: emailMaiusculo })
      .then(function (resposta) {
        user = resposta;
      });
  }
);

When(
  "preenche todos os campos do formulário utilizando email com 60 caracteres",
  function () {
    email = fakerPT_BR.internet.email();
    while (email.length < 60) {
      email += "m";
    }
    regisUser.registrarUsuario({ email: email }).then(function (resposta) {
      user = resposta;
    });
  }
);

When(
  "preenche todos os campos do formulário utilizando senha com 6 caracteres",
  function () {
    regisUser
      .registrarUsuario({ password: "123456" })
      .then(function (resposta) {
        user = resposta;
      });
  }
);

When(
  "preenche todos os campos do formulário utilizando senha com 12 caracteres",
  function () {
    regisUser
      .registrarUsuario({ password: "123456789123" })
      .then(function (resposta) {
        user = resposta;
      });
  }
);

Then("o usuario deve ser registrado com sucesso", function () {
  cy.wait("@post").then(function (intercept) {
    expect(intercept.response.statusCode).to.equal(201);
    user.id = intercept.response.body.id;
  });
});

Then("o site exibirá uma mensagem de cadastro com sucesso", function () {
  cy.get(regisUser.mensagemCadastro).contains("Cadastro realizado!");
});

Then("o usuario deve ser registrado com conta do tipo comum", function () {
  cy.wait("@post").then(function (intercept) {
    type = intercept.response.body.type;
    expect(type).to.equal(0)
    user.id = intercept.response.body.id;
  });
});

Then(
  "o usuário deve retornar para o formulário de cadastro clicando no botão OK",
  function () {
    regisUser.clickOK();

    cy.get(regisUser.divModal).should("not.exist")
    cy.get(regisUser.campoForms).eq(0).should("be.visible");
    cy.get(regisUser.campoForms).eq(1).should("be.visible");
    cy.get(regisUser.campoForms).eq(2).should("be.visible");
    cy.get(regisUser.campoForms).eq(3).should("be.visible");
  }
);

Then("o usuário deve está automaticamente logado no site", function () {
  regisUser.clickOK();

  cy.wait("@auth").then(function (intercept) {
    expect(intercept.response.statusCode).to.equal(200);
  });
  cy.get(regisUser.buttonsHeader).contains("Perfil");
});
