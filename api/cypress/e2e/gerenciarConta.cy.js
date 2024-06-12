///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />
import { faker } from "@faker-js/faker";

var user;
var token;
var userCriado;

describe("Gerenciar conta", () => {
  before(() => {
    cy.createAdminUser().then((response) => {
      user = response;
    });
  });

  after(() => {
    cy.deleteUser(user);
  });

  describe("Usuario comum", () => {
    before(() => {
      cy.createUser().then((resposta) => {
        userCriado = resposta;
      });
    });
    after(() => {
      cy.deleteUser(userCriado);
    });
    it("Deve ser possível um usuário do tipo comum realizar uma consulta detalhada de filmes com Id válido", () => {});
  });

  describe("Usuario crítico", () => {
    before(() => {
      cy.createUser()
        .then(function (resposta) {
          userCriado = resposta;
        })
        .then(function () {
          cy.login(userCriado).then(function (response) {
            cy.promoteCritic(response.body.accessToken);
          });
        });
    });
    after(function () {
      cy.deleteUser(userCriado);
    });
    it("Deve ser possível um usuário do tipo comum realizar uma consulta detalhada de filmes com Id válido", () => {});
  });
  describe("Usuario administrador", () => {
    before(() => {
      cy.createUser()
        .then(function (resposta) {
          userCriado = resposta;
        })
        .then(function () {
          cy.login(userCriado).then(function (response) {
            cy.promoteAdmin(response.body.accessToken);
          });
        });
    });
    after(function () {
      cy.deleteUser(userCriado);
    });
    it("Deve ser possível um usuário do tipo comum realizar uma consulta detalhada de filmes com Id válido", () => {});
  });

  describe("Usuario não logado", function () {
    it("Deve ser possível um usuário não logado realizar uma consulta detalhada de filmes com Id válido", () => {});
  });
});
