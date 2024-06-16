///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />

var user;
var token;
var userCriado;
var idMovie;

describe("Consulta detalhada de filmes", function () {
  before(function () {
    cy.fixture("responses/responseBodyNewMovie.json")
      .as("responseBodyMovie")
      .then(function () {
        cy.fixture("requests/bodyNewMovie.json").then((movieBody) => {
          cy.createUserAndMovie(movieBody).then((response) => {
            idMovie = response.movie.body.id;
            this.responseBodyMovie.id = idMovie;
            user = response.user;
          });
        });
      });
  });

  after(function () {
    cy.promoteToAdminAndDeleteMovie(user, idMovie);
    cy.deleteUser(user);
  });

  describe("Usuário comum", function () {
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

    describe("Criação de reviews", function () {
      beforeEach(function () {
        cy.login(userCriado).then(function (response) {
          token = response.body.accessToken;
          cy.reviewMovie(
            idMovie,
            5,
            "são realmente muito velozes e mega furiosos",
            token
          );
        });
      });

      it("Deve ser possível um usuário do tipo comum retornar os dados da avaliação realizada no filme ao consultá-lo detalhadamente", function () {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
          auth: {
            bearer: token,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body.reviews[0].id).to.be.an("number");
          expect(response.body.reviews[0].updatedAt).match(
            /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?([Zz]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?/
          );
          expect(response.body.reviews[0]).to.deep.include({
            reviewText: "são realmente muito velozes e mega furiosos",
            reviewType: 0,
            score: 5,
          });
        });
      });
      it("Deve ser possível um usuário do tipo comum retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme ao consultá-lo detalhadamente", function () {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
          auth: {
            bearer: token,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body.reviews[0].user).to.deep.include({
            id: userCriado.id,
            name: userCriado.name,
            type: 0,
          });
        });
      });
      it("Deve ser possível um usuário do tipo comum retornar um totalizador com a média das avaliações de audiência realizadas no filme ao consultá-lo detalhadamente", function () {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
          auth: {
            bearer: token,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body.audienceScore).to.equal(5);
        });
      });
      it("Deve ser possível um usuário do tipo comum retornar um totalizador da média das avaliações da crítica realizadas no filme ao consultá-lo detalhadamente", function () {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
          auth: {
            bearer: token,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body.criticScore).to.equal(0);
        });
      });
    });
  });

  describe("Usuário crítico", function () {
    before(function () {
      cy.createCriticUser().then(function (resposta) {
        userCriado = resposta;
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

    describe("Criação de reviews", function () {
      beforeEach(function () {
        cy.login(userCriado).then(function (response) {
          token = response.body.accessToken;
          cy.reviewMovie(idMovie, 1, "não são velozes nem furiosos", token);
        });
      });

      it("Deve ser possível um usuário do tipo crítico retornar os dados da avaliação realizada no filme ao consultá-lo detalhadamente", function () {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
          auth: {
            bearer: token,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body.reviews[0].id).to.be.an("number");
          expect(response.body.reviews[0].updatedAt).match(
            /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?([Zz]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?/
          );
          expect(response.body.reviews[0]).to.deep.include({
            reviewText: "não são velozes nem furiosos",
            reviewType: 1,
            score: 1,
          });
        });
      });
      it("Deve ser possível um usuário do tipo crítico retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme ao consultá-lo detalhadamente", function () {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
          auth: {
            bearer: token,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body.reviews[0].user).to.deep.include({
            id: userCriado.id,
            name: userCriado.name,
            type: 2,
          });
        });
      });
      it("Deve ser possível um usuário do tipo crítico retornar um totalizador com a média das avaliações de audiência realizadas no filme ao consultá-lo detalhadamente", function () {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
          auth: {
            bearer: token,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body.audienceScore).to.equal(0);
        });
      });
      it("Deve ser possível um usuário do tipo crítico retornar um totalizador da média das avaliações da crítica realizadas no filme ao consultá-lo detalhadamente", function () {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
          auth: {
            bearer: token,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body.criticScore).to.equal(1);
        });
      });
    });
  });

  describe("Usuário administrador", function () {
    before(function () {
      cy.createAdminUser().then(function (resposta) {
        userCriado = resposta;
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

    describe("Criação de reviews", function () {
      beforeEach(function () {
        cy.login(userCriado).then(function (response) {
          token = response.body.accessToken;
          cy.reviewMovie(
            idMovie,
            4,
            "são realmente muito velozes, mas pouco furiosos",
            token
          );
        });
      });

      it("Deve ser possível um usuário do tipo administrador retornar os dados da avaliação realizada no filme ao consultá-lo detalhadamente", function () {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
          auth: {
            bearer: token,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body.reviews[0].id).to.be.an("number");
          expect(response.body.reviews[0].updatedAt).match(
            /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?([Zz]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?/
          );
          expect(response.body.reviews[0]).to.deep.include({
            reviewText: "são realmente muito velozes, mas pouco furiosos",
            reviewType: 0,
            score: 4,
          });
        });
      });
      it("Deve ser possível um usuário do tipo administrador retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme ao consultá-lo detalhadamente", function () {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
          auth: {
            bearer: token,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body.reviews[0].user).to.deep.equal({
            id: userCriado.id,
            name: userCriado.name,
            type: 1,
          });
        });
      });
      it("Deve ser possível um usuário do tipo administrador retornar um totalizador com a média das avaliações de audiência realizadas no filme ao consultá-lo detalhadamente", function () {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
          auth: {
            bearer: token,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body.audienceScore).to.equal(0);
        });
      });
      it("Deve ser possível um usuário do tipo administrador retornar um totalizador da média das avaliações da crítica realizadas no filme ao consultá-lo detalhadamente", function () {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
          auth: {
            bearer: token,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body.criticScore).to.equal(0);
        });
      });
    });
  });

  describe("Usuário não logado", function () {
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

    describe("Criação de reviews", function () {
      beforeEach(function () {
        cy.login(user).then(function (response) {
          token = response.body.accessToken;
          cy.reviewMovie(
            idMovie,
            2,
            "são pouco velozes e pouco furiosos",
            token
          );
        });
      });

      it("Deve ser possível um usuário do tipo não logado retornar os dados de avaliações realizada no filme ao consultá-lo detalhadamente", function () {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body.reviews[0].id).to.be.an("number");
          expect(response.body.reviews[0].updatedAt).match(
            /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?([Zz]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?/
          );
          expect(response.body.reviews[0]).to.deep.include({
            reviewText: "são pouco velozes e pouco furiosos",
            reviewType: 0,
            score: 2,
          });
        });
      });

      it("Deve ser possível um usuário do tipo não logado retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme ao consultá-lo detalhadamente", function () {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body.reviews[0].user).to.deep.include({
            id: user.id,
            name: user.name,
            type: 1,
          });
        });
      });
      it("Deve ser possível um usuário do tipo não logado retornar um totalizador com a média das avaliações de audiência realizadas no filme ao consultá-lo detalhadamente", function () {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body.audienceScore).to.equal(0);
        });
      });
      it("Deve ser possível um usuário do tipo não logado retornar um totalizador da média das avaliações da crítica realizadas no filme ao consultá-lo detalhadamente", function () {
        cy.request({
          method: "GET",
          url: "/api/movies/" + idMovie,
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body.criticScore).to.equal(0);
        });
      });
    });
  });
});
