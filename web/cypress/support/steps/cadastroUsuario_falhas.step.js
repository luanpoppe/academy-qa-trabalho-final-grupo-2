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
let email;
let nome;
let senha = fakerPT_BR.internet.password(6);

beforeEach(() => {
  email = fakerPT_BR.internet.email().toLowerCase();
  nome = fakerPT_BR.person.fullName();
});

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
  "preenche todos os campos do formulário utilizando espaços no nome",
  function () {
    regisUser.registrarUsuario({ name: "     " });
  }
);

When(
  "preenche todos os campos do formulário exceto o campo email",
  function () {
    regisUser.typeNome(nome);
    regisUser.typeSenha(senha);
    regisUser.typeConfSenha(senha);
  }
);

When(
  "preenche todos os campos do formulário utilizando espaços no email {string}",
  function (mensagem) {
    cy.intercept("POST", "/api/users", {
      statusCode: 400,
    }).as("post3");
    regisUser.registrarUsuario({ email: mensagem });
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

When(
  "preencher todos os campos restante do formulário com dados válidos",
  function () {
    regisUser.typeEmail(email);
    regisUser.typeSenha(senha);
    regisUser.typeConfSenha(senha);
  }
);

When(
  "preenche todos os campos do formulário e utiliza um email ja cadastrado",
  function () {
    cy.intercept("POST", "/api/users", {
      statusCode: 409,
      body: {
        message: "Email already in use",
        error: "Conflict",
      },
    }).as("post2");
    regisUser.registrarUsuario();
  }
);

When("preenche todos os campos dos formulários", function () {
  regisUser.typeNome(nome);
  regisUser.typeEmail(email);
  regisUser.typeSenha("123456");
});

When(
  "a senha principal é diferente da confirmação de senha {string}",
  function (senhaConf) {
    cy.get(regisUser.inputConfirmarSenha).type(senhaConf);
  }
);

When(
  "preenche todos os campos dos formulários e utiliza senha menor que 6 digitos {string} {string}",
  function (mensagem) {
    regisUser.registrarUsuario({ password: mensagem });
  }
);

When(
  "preenche todos os campos dos formulários e utiliza senha maior que 12 digitos {string} {string}",
  function (mensagem) {
    regisUser.registrarUsuario({ password: mensagem });
  }
);

When(
  "preenche todos os campos dos formulários e utiliza email inválido {string}",
  function (mensagem) {
    regisUser.registrarUsuario({ email: mensagem });
  }
);

When("realiza o cadastro de usuário com sucesso", function () {
  regisUser.registrarUsuario();
  regisUser.clickCadastrar();
  regisUser.clickOK();
});

When(
  "acessa funcionalidade salvar com os dados do usuario recém cadastrado preenchido no formulário",
  function () {
    cy.intercept("POST", "/api/users").as("post2");
    regisUser.clickCadastrar();
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

Then(
  "a operação de registro não poderá ser concluída exibindo o alerta {string}",
  function (alerta) {
    cy.wait("@post3").then(function (intercept) {
      expect(intercept.response.statusCode).to.equal(400);
    });
    cy.get(regisUser.mensagemCadastro).contains(alerta);
  }
);

Then(
  "a operação de registro não poderá ser concluída com alerta {string}",
  function (alerta) {
    cy.wait("@post2").then(function (intercept) {
      expect(intercept.response.statusCode).to.equal(409);
    });
    cy.get(regisUser.mensagemCadastro).contains(alerta);
  }
);

Then("o botão OK deve retornar para o formulário", function () {
  regisUser.clickOK();
  cy.get(regisUser.campoForms).eq(0).should("be.visible");
  cy.get(regisUser.campoForms).eq(1).should("be.visible");
  cy.get(regisUser.campoForms).eq(2).should("be.visible");
  cy.get(regisUser.campoForms).eq(3).should("be.visible");
});
