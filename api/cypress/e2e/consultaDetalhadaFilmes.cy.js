///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />
import { faker } from "@faker-js/faker";

var user;
var token;
var userComum;
var idMovie;

describe("Consulta detalhada de filmes", function () {
  before(function () {
    cy.createUser({ password: "123456" }).then(function (resposta) {
      console.log("resposta", resposta);
      user = resposta;
      cy.login(user).then((response) => {
        token = response.body.accessToken;
        cy.promoteAdmin(token).then(() => {
          cy.fixture("requests/bodyNewMovie.json")
            .then((movieBody) => {
              cy.createMovie(movieBody, token);
            })
            .then((response) => {
              idMovie = response.body.id;
            });
        });
      });
    });
  });
  after(function () {
    cy.deleteMovie(idMovie, token);
    cy.deleteUser(user);
  });
  it("Deve ser possível um usuário do tipo comum realizar uma consulta detalhada de filmes com Id válido", function () {
    cy.createUser({ email: faker.internet.email(), password: "123456" }).then(
      function (resposta) {
        console.log("resposta", resposta);
        userComum = resposta;
        cy.getMovie(idMovie).then(function (response) {
          expect(response.status).to.equal(200);
        });
        cy.deleteUser(userComum);
      }
    );
  });

  it("Deve ser possível um usuário do tipo comum realizar uma consulta detalhada de filmes com Id inválido", function () {
    cy.createUser({ email: faker.internet.email(), password: "123456" }).then(
      function (resposta) {
        console.log("resposta", resposta);
        userComum = resposta;
        cy.getMovie(0).then(function (response) {
          expect(response.status).to.equal(200);
        });
        cy.deleteUser(userComum);
      }
    );
  });

  it("Deve ser possível um usuário não logado realizar uma consulta detalhada de filmes com Id válido", function () {
    cy.getMovie(idMovie).then(function (response) {
      expect(response.status).to.equal(200);
    });
  });
});
