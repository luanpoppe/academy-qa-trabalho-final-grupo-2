///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />
import { faker } from "@faker-js/faker";

var user;
var token;
var userCriado;
var idMovie;

describe("Consulta detalhada de filmes", function () {
  before(function () {
    cy.fixture("responses/responseBodyNewMovie.json").as("responseBodyMovie");
    cy.fixture("requests/bodyNewMovie.json")
      .then((movieBody) => {
        cy.createUserAndMovie(movieBody);
      })
      .then((response) => {
        idMovie = response.movie.body.id;
        this.responseBodyMovie.id = idMovie;
        user = response.user;
      });
  });
  after(function () {
    cy.promoteToAdminAndDeleteMovie(
      { email: user.email, password: user.password },
      idMovie
    );
  });

  describe("Usuario comum", function () {
    before(function () {
      cy.createUser().then(function (resposta) {
        userCriado = resposta;
      });
    });
    after(function () {
      cy.deleteUser(userCriado);
    });
    it("Deve ser possível um usuário do tipo comum realizar uma consulta detalhada de filmes com Id válido", function () {
      cy.login(userCriado).then(function (response) {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
          auth: {
            bearer: response.body.accessToken,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body).to.deep.equal(this.responseBodyMovie);
        });
      });
    });
    it("Não deve retornar dados do filme quando um usuário do tipo comum realizar uma consulta detalhada de filmes com Id inválido", function () {
      cy.login(userCriado).then(function (response) {
        cy.request({
          method: "GET",
          url: "/api/movies/" + 0,
          auth: {
            bearer: response.body.accessToken,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.empty;
        });
      });
    });
    it("Deve ser possível um usuário do tipo comum retornar os dados da avaliação realizada no filme ao consultá-lo detalhadamente", function () {
      cy.login(userCriado)
        .then(function (response) {
          token = response.body.accessToken;
          cy.reviewMovie(
            idMovie,
            5,
            "são realmente muito velozes e mega furiosos",
            token
          );
        })
        .then(function () {
          cy.request({
            method: "GET",
            url: "/api/movies/" + idMovie,
            auth: {
              bearer: token,
            },
          }).then(function (response) {
            expect(response.status).to.equal(200);
            expect(response.body.reviews[0].id).to.be.an("number");
            expect(response.body.reviews[0].reviewText).to.equal(
              "são realmente muito velozes e mega furiosos"
            );
            expect(response.body.reviews[0].reviewType).to.equal(0);
            expect(response.body.reviews[0].score).to.equal(5);
            expect(response.body.reviews[0].updatedAt).to.be.an("string");
          });
        });
    });
    it("Deve ser possível um usuário do tipo comum retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme ao consultá-lo detalhadamente", function () {
      cy.login(userCriado)
        .then(function (response) {
          token = response.body.accessToken;
          cy.reviewMovie(
            idMovie,
            5,
            "são realmente muito velozes e mega furiosos",
            token
          );
        })
        .then(function () {
          cy.request({
            method: "GET",
            url: "/api/movies/" + idMovie,
            auth: {
              bearer: token,
            },
          }).then(function (response) {
            expect(response.status).to.equal(200);
            expect(response.body.reviews[0].user.id).to.equal(userCriado.id);
            expect(response.body.reviews[0].user.name).to.equal(
              userCriado.name
            );
            expect(response.body.reviews[0].user.type).to.equal(0);
          });
        });
    });
  });
  describe("Usuario crítico", function () {
    before(function () {
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
    it("Deve ser possível um usuário do tipo crítico realizar uma consulta detalhada de filmes com Id válido", function () {
      cy.login(userCriado).then(function (response) {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
          auth: {
            bearer: response.body.accessToken,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body).to.deep.equal(this.responseBodyMovie);
        });
      });
    });
    it("Não deve retornar dados do filme quando um usuário do tipo crítico realizar uma consulta detalhada de filmes com Id inválido", function () {
      cy.login(userCriado).then(function (response) {
        cy.request({
          method: "GET",
          url: "/api/movies/" + 0,
          auth: {
            bearer: response.body.accessToken,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.empty;
        });
      });
    });
    it("Deve ser possível um usuário do tipo crítico retornar os dados da avaliação realizada no filme ao consultá-lo detalhadamente", function () {
      cy.login(userCriado)
        .then(function (response) {
          token = response.body.accessToken;
          cy.reviewMovie(idMovie, 1, "não são velozes nem furiosos", token);
        })
        .then(function () {
          cy.request({
            method: "GET",
            url: "/api/movies/" + idMovie,
            auth: {
              bearer: token,
            },
          }).then(function (response) {
            expect(response.status).to.equal(200);
            expect(response.body.reviews[0].id).to.be.an("number");
            expect(response.body.reviews[0].reviewText).to.equal(
              "não são velozes nem furiosos"
            );
            expect(response.body.reviews[0].reviewType).to.equal(1);
            expect(response.body.reviews[0].score).to.equal(1);
            expect(response.body.reviews[0].updatedAt).to.be.an("string");
          });
        });
    });
    it("Deve ser possível um usuário do tipo crítico retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme ao consultá-lo detalhadamente", function () {
      cy.login(userCriado)
        .then(function (response) {
          token = response.body.accessToken;
          cy.reviewMovie(idMovie, 1, "não são velozes nem furiosos", token);
        })
        .then(function () {
          cy.request({
            method: "GET",
            url: "/api/movies/" + idMovie,
            auth: {
              bearer: token,
            },
          }).then(function (response) {
            expect(response.status).to.equal(200);
            expect(response.body.reviews[0].user.id).to.equal(userCriado.id);
            expect(response.body.reviews[0].user.name).to.equal(
              userCriado.name
            );
            expect(response.body.reviews[0].user.type).to.equal(2);
          });
        });
    });
  });

  describe("Usuario administrador", function () {
    before(function () {
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
    it("Deve ser possível um usuário do tipo administrador realizar uma consulta detalhada de filmes com Id válido", function () {
      cy.login(userCriado).then(function (response) {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
          auth: {
            bearer: response.body.accessToken,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body).to.deep.equal(this.responseBodyMovie);
        });
      });
    });
    it("Não deve retornar dados do filme quando um usuário do tipo administrador realizar uma consulta detalhada de filmes com Id inválido", function () {
      cy.login(userCriado).then(function (response) {
        cy.request({
          method: "GET",
          url: "/api/movies/" + 0,
          auth: {
            bearer: response.body.accessToken,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.empty;
        });
      });
    });
    it("Deve ser possível um usuário do tipo administrador retornar os dados da avaliação realizada no filme ao consultá-lo detalhadamente", function () {
      cy.login(userCriado)
        .then(function (response) {
          token = response.body.accessToken;
          cy.reviewMovie(
            idMovie,
            4,
            "são realmente muito velozes, mas pouco furiosos",
            token
          );
        })
        .then(function () {
          cy.request({
            method: "GET",
            url: "/api/movies/" + idMovie,
            auth: {
              bearer: token,
            },
          }).then(function (response) {
            expect(response.status).to.equal(200);
            expect(response.body.reviews[0].id).to.be.an("number");
            expect(response.body.reviews[0].reviewText).to.equal(
              "são realmente muito velozes, mas pouco furiosos"
            );
            expect(response.body.reviews[0].reviewType).to.equal(0);
            expect(response.body.reviews[0].score).to.equal(4);
            expect(response.body.reviews[0].updatedAt).to.be.an("string");
          });
        });
    });
    it("Deve ser possível um usuário do tipo administrador retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme ao consultá-lo detalhadamente", function () {
      cy.login(userCriado)
        .then(function (response) {
          token = response.body.accessToken;
          cy.reviewMovie(
            idMovie,
            4,
            "são realmente muito velozes, mas pouco furiosos",
            token
          );
        })
        .then(function () {
          cy.request({
            method: "GET",
            url: "/api/movies/" + idMovie,
            auth: {
              bearer: token,
            },
          }).then(function (response) {
            expect(response.status).to.equal(200);
            expect(response.body.reviews[0].user.id).to.equal(userCriado.id);
            expect(response.body.reviews[0].user.name).to.equal(
              userCriado.name
            );
            expect(response.body.reviews[0].user.type).to.equal(1);
          });
        });
    });
  });

  describe("Usuario não logado", function () {
    it("Deve ser possível um usuário não logado realizar uma consulta detalhada de filmes com Id válido", function () {
      cy.request({
        method: "GET",
        url: "/api/movies/" + idMovie,
      }).then(function (response) {
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(this.responseBodyMovie);
      });
    });
    it("Não deve retornar dados do filme quando um usuário não logado realizar uma consulta detalhada de filmes com Id inválido", function () {
      cy.request({
        method: "GET",
        url: "/api/movies/" + 0,
      }).then(function (response) {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.empty;
      });
    });
    it("Deve ser possível um usuário do tipo não logado retornar os dados de avaliações realizada no filme ao consultá-lo detalhadamente", function () {
      cy.login(user)
        .then(function (response) {
          token = response.body.accessToken;
          cy.reviewMovie(
            idMovie,
            2,
            "são pouco velozes e pouco furiosos",
            token
          );
        })
        .then(function () {
          cy.request({
            method: "GET",
            url: "/api/movies/" + idMovie,
          }).then(function (response) {
            expect(response.status).to.equal(200);
            expect(response.body.reviews[0].id).to.be.an("number");
            expect(response.body.reviews[0].reviewText).to.equal(
              "são pouco velozes e pouco furiosos"
            );
            expect(response.body.reviews[0].reviewType).to.equal(0);
            expect(response.body.reviews[0].score).to.equal(2);
            expect(response.body.reviews[0].updatedAt).to.be.an("string");
          });
        });
    });

    it("Deve ser possível um usuário do tipo não logado retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme ao consultá-lo detalhadamente", function () {
      cy.login(user)
        .then(function (response) {
          token = response.body.accessToken;
          cy.reviewMovie(
            idMovie,
            2,
            "são pouco velozes e pouco furiosos",
            token
          );
        })
        .then(function () {
          cy.request({
            method: "GET",
            url: "/api/movies/" + idMovie,
          }).then(function (response) {
            expect(response.status).to.equal(200);
            expect(response.body.reviews[0].user.id).to.equal(user.id);
            expect(response.body.reviews[0].user.name).to.equal(user.name);
            expect(response.body.reviews[0].user.type).to.equal(1);
          });
        });
    });
  });
});
