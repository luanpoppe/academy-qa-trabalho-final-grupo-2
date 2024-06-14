///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />
import { faker } from "@faker-js/faker";

var user;
var userCriado;
var newName = faker.person.firstName() + " teste";
var newPassword = faker.internet.password(8);

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
    let tokenComum
    before(() => {
      cy.createUser().then((resposta) => {
        userCriado = resposta;
        cy.login(userCriado).then(function (response) {
          tokenComum = response.body.accessToken
        });
      });
    });
    after(() => {
      cy.deleteUser(userCriado);
    });
    it("Deve ser possível como usuário do tipo comum atualizar apenas as próprias informações de nome e senha", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + userCriado.id,
        body: { name: newName, password: newPassword },
        auth: {
          bearer: tokenComum,
        },
      }).then(function (response) {
        userCriado.password = newPassword;
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.eq({
          id: userCriado.id,
          name: newName,
          email: userCriado.email,
          type: 0,
          active: true,
        });
      });
    });
    it("Não deve ser possível como usuário do tipo comum atualizar as informações de outro usuário", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + user.id,
        body: { name: newName, password: newPassword },
        auth: {
          bearer: tokenComum
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(403);
        expect(response.body).to.deep.eq({
          message: "Forbidden",
          statusCode: 403,
        });
      });
    });
    it("Não deve ser possível como usuário do tipo comum atualizar sua senha para uma senha com < 6 dígitos", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + userCriado.id,
        body: { name: newName, password: "12345" },
        auth: {
          bearer: tokenComum
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.eq({
          message: ["password must be longer than or equal to 6 characters"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });
    it("Não deve ser possível como usuário do tipo comum atualizar sua senha para uma senha com > 12 dígitos", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + userCriado.id,
        body: { name: newName, password: "1234567891011" },
        auth: {
          bearer: tokenComum
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.eq({
          message: [
            "password must be shorter than or equal to 12 characters",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });
    it("Não deve ser possível como usuário do tipo comum atualizar seu nome para um nome com < 1 dígitos", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + userCriado.id,
        body: { name: "", password: newPassword },
        auth: {
          bearer: tokenComum
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.eq({
          message: ["name must be longer than or equal to 1 characters"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });
    it("Não deve ser possível como usuário do tipo comum atualizar seu nome para um nome com > 100 dígitos", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + userCriado.id,
        body: { name: "T".repeat(101), password: newPassword },
        auth: {
          bearer: tokenComum
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.eq({
          message: ["name must be shorter than or equal to 100 characters"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });
  });

  describe("Usuario crítico", () => {
    before(() => {
      cy.createCriticUser().then(function (resposta) {
        userCriado = resposta
      })
    });
    after(function () {
      cy.deleteUser(userCriado);
    });

    it("Deve ser possível como usuário do tipo crítico atualizar apenas as próprias informações de nome e senha", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + userCriado.id,
        body: { name: newName, password: newPassword },
        auth: {
          bearer: userCriado.accessToken,
        },
      }).then(function (response) {
        userCriado.password = newPassword;
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.eq({
          id: userCriado.id,
          name: newName,
          email: userCriado.email,
          type: 2,
          active: true,
        });
      });
    });
    it("Não deve ser possível como usuário do tipo crítico atualizar as informações de outro usuário", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + user.id,
        body: { name: newName, password: newPassword },
        auth: {
          bearer: userCriado.accessToken,
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(403);
        expect(response.body).to.deep.eq({
          message: "Forbidden",
          statusCode: 403,
        });
      });
    });
    it("Não deve ser possível como usuário do tipo crítico atualizar sua senha para uma senha com < 6 dígitos", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + userCriado.id,
        body: { name: newName, password: "12345" },
        auth: {
          bearer: userCriado.accessToken,
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.eq({
          message: ["password must be longer than or equal to 6 characters"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });
    it("Não deve ser possível como usuário do tipo crítico atualizar sua senha para uma senha com > 12 dígitos", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + userCriado.id,
        body: { name: newName, password: "1234567891011" },
        auth: {
          bearer: userCriado.accessToken,
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.eq({
          message: ["password must be shorter than or equal to 12 characters"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });
    it("Não deve ser possível como usuário do tipo crítico atualizar seu nome para um nome com < 1 dígitos", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + userCriado.id,
        body: { name: "", password: newPassword },
        auth: {
          bearer: userCriado.accessToken,
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.eq({
          message: ["name must be longer than or equal to 1 characters"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });
    it("Não deve ser possível como usuário do tipo crítico atualizar seu nome para um nome com > 100 dígitos", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + userCriado.id,
        body: { name: "T".repeat(101), password: newPassword },
        auth: {
          bearer: userCriado.accessToken,
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.eq({
          message: ["name must be shorter than or equal to 100 characters"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });
  });

  describe("Usuario administrador", () => {
    before(() => {
      cy.createAdminUser().then(function (resposta) {
        userCriado = resposta;
      })
    });
    after(function () {
      cy.deleteUser(userCriado);
    });

    it("Deve ser possível como usuário do tipo administrador atualizar as próprias informações de nome e senha", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + userCriado.id,
        body: { name: newName, password: newPassword },
        auth: {
          bearer: userCriado.accessToken,
        },
      }).then(function (response) {
        userCriado.password = newPassword;
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.eq({
          id: userCriado.id,
          name: newName,
          email: userCriado.email,
          type: 1,
          active: true,
        });
      });
    });
    it("Deve ser possível como usuário do tipo administrador atualizar as informações de outro usuário", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + user.id,
        body: { name: newName, password: newPassword },
        auth: {
          bearer: userCriado.accessToken,
        },
      }).then(function (response) {
        user.password = newPassword;
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.eq({
          id: user.id,
          name: newName,
          email: user.email,
          type: 1,
          active: true,
        });
      });
    });
    it("Não deve ser possível como usuário do tipo administrador atualizar sua senha para uma senha com < 6 dígitos", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + userCriado.id,
        body: { name: null, password: "12345" },
        auth: {
          bearer: userCriado.accessToken,
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.eq({
          message: ["password must be longer than or equal to 6 characters"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });
    it("Não deve ser possível como usuário do tipo administrador atualizar sua senha para uma senha com > 12 dígitos", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + userCriado.id,
        body: { name: newName, password: "1234567891011" },
        auth: {
          bearer: userCriado.accessToken,
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.eq({
          message: ["password must be shorter than or equal to 12 characters"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });
    it("Não deve ser possível como usuário do tipo administrador atualizar seu nome para um nome com < 1 dígitos", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + userCriado.id,
        body: { name: "", password: newPassword },
        auth: {
          bearer: userCriado.accessToken,
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.eq({
          message: ["name must be longer than or equal to 1 characters"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });
    it("Não deve ser possível como usuário do tipo administrador atualizar seu nome para um nome com > 100 dígitos", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + userCriado.id,
        body: { name: "T".repeat(101), password: newPassword },
        auth: {
          bearer: userCriado.accessToken,
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.eq({
          message: ["name must be shorter than or equal to 100 characters"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });
  });

  describe("Usuario não logado", function () {
    it("Não deve ser possível como usuário não logado atualizar os dados de um usuário cadastrado", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/" + user.id,
        body: { name: newName, password: newPassword },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(401);
        expect(response.body).to.deep.eq({
          message: "Access denied.",
          error: "Unauthorized",
          statusCode: 401,
        });
      });
    });
  });
});
