///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />

import { fakerPT_BR } from "@faker-js/faker";

describe("Login de cadastros de usuários", () => {
  let email;
  let nome;
  let password;
  let id;
  let token;
  let usuarioCriado;

  beforeEach(() => {
    cy.createUser().then((newUser) => {
      usuarioCriado = newUser;
    });
  });

  afterEach(() => {
    cy.deleteUser(usuarioCriado);
  });

  describe("Cenários de falhas de autenticação do usuário", function () {
    it("Não deve ser possível usuário autenticar-se sem informar email", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/login",
        body: {
          email: null,
          password: "123456",
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          message: ["email should not be empty", "email must be an email"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível usuário autenticar-se sem informar senha", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/login",
        body: {
          email: usuarioCriado.email,
          password: null,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.include({
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível usuário autenticar-se com e-mail não cadastradado", () => {});
  });

  describe("Cenário de autenticação válida de usuários", function () {
    it("Deve ser possível usuário cadastrado autenticar-se com sucesso", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/login",
        body: {
          email: usuarioCriado.email,
          password: usuarioCriado.password,
        },
      }).then((resposta) => {
        expect(resposta.status).to.equal(200);
        expect(resposta.body.accessToken).to.be.a("string");
        token = resposta.body.accessToken;
      });
    });
  });
});
