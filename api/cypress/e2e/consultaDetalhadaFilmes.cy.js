///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />
import { faker } from "@faker-js/faker";

var user;
var token;
var userComum;
var idMovie;

describe("Consulta detalhada de filmes", function () {
  before(function () {
    cy.fixture("requests/bodyNewMovie.json")
      .then((movieBody) => {
        cy.createUserAndMovie(movieBody);
      })
      .then((response) => {
        idMovie = response.movie.body.id;
        user = response.user;
      });
  });
  after(function () {
    cy.log(user);
    cy.promoteToAdminAndDeleteMovie(
      { email: user.email, password: user.password },
      idMovie
    );
  });

  describe("Usuario comum", function () {
    before(function () {
      cy.createUser().then(function (resposta) {
        userComum = resposta;
      });
    });
    after(function () {
      cy.deleteUser(userComum);
    });
    it("Deve ser possível um usuário do tipo comum realizar uma consulta detalhada de filmes com Id válido", function () {
      cy.login(user).then(function (response) {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
          auth: {
            bearer: response.body.accessToken,
          },
        }).then(function () {
          expect(response.status).to.equal(200);
        });
      });
    });
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
  }); // describe("Usuario crítico", function () {});

  // describe("Usuario administrador", function () {});

  // describe("Usuario não logado", function () {});
});
