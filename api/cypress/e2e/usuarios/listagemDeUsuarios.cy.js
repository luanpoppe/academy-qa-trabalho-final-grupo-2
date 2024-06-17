///  <reference types="cypress" />
///  <reference path="../../support/index.d.ts" />

describe("Consulta geral de Usuários - Listagem", function () {
  var usuarioCriado;
  var token;

  beforeEach(function () {
    cy.createUser().then((newUser) => {
      usuarioCriado = newUser;
    });
  });

  it("Não deve ser possível realizar a consulta de todos os usuários cadastrados, sem efetuar login", function () {
    cy.request({
      method: "GET",
      url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.message).to.be.eq("Access denied.");
      expect(response.body.error).to.be.eq("Unauthorized");
    });
  });

  it("Não deve ser possível realizar a consulta de todos os usuários cadastrados sendo um usuário Comum", function () {
    cy.login(usuarioCriado)
      .then((login) => {
        token = login.body.accessToken;
      })
      .then(() => {
        cy.request({
          method: "GET",
          url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users",
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.equal(401);
          expect(response.body.message).to.be.eq("Access denied.");
          expect(response.body.error).to.be.eq("Unauthorized");
        });
      });
  });

  it("Não deve ser possível realizar a consulta de todos os usuários cadastrados sendo um usuário Crítico", function () {
    cy.login(usuarioCriado)
      .then((login) => {
        token = login.body.accessToken;
      })
      .then(() => {
        cy.promoteCritic(token).then(function () {
          cy.request({
            method: "GET",
            url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users",
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.be.eq("Access denied.");
            expect(response.body.error).to.be.eq("Unauthorized");
          });
        });
      });
  });

  it("Deve ser possível realizar a consulta de todos os usuários cadastrados sendo um usuário Administrador", function () {
    cy.login(usuarioCriado)
      .then((login) => {
        token = login.body.accessToken;
      })
      .then(() => {
        cy.promoteAdmin(token).then(() => {
          cy.listAllUsers(token).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an("array");

            response.body.forEach(function (usuario) {
              cy.log(usuario.id);
              if (usuario.id === usuarioCriado.id) {
                expect(usuario.email).to.equal(usuarioCriado.email);
              }
            });

            response.body.forEach(function (usuario) {
              cy.log(usuario.nome);
              if (usuario.id === usuarioCriado.id) {
                expect(usuario.name).to.equal(usuarioCriado.name);
              }
            });
          });
        });
      });
  });
});
