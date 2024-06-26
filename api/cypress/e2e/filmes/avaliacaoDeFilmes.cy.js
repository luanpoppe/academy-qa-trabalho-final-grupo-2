import * as re from "../../support/utils/reviewErrors";
import { createDefaultReviewBody } from "../../support/utils/utilitaryMethods";

describe("Avaliação de filmes", function () {
  let user;
  let movie;
  let token;
  let defaultReviewBody;

  before(function () {
    cy.fixture("./requests/bodyNewMovie.json").then(function (resposta) {
      movie = resposta;
    });

    cy.createUser().then(function (resposta) {
      user = resposta;
      cy.login(user).then(function (resposta) {
        token = resposta.body.accessToken;
        cy.promoteAdmin(token);
      });
    });
  });

  beforeEach(function () {
    cy.createMovie(movie, token).then(function (resposta) {
      movie = {
        ...movie,
        id: resposta.body.id,
      };
      defaultReviewBody = createDefaultReviewBody(movie.id);
    });
  });

  after(function () {
    cy.deleteUser(user);
  });

  afterEach(function () {
    cy.deleteMovie(movie.id, token);
  });

  describe("Testes de autenticação", function () {
    let localUser;
    let localToken;

    beforeEach(function () {
      cy.createUser().then(function (resposta) {
        localUser = resposta;
        cy.login(localUser).then(function (resposta) {
          localToken = resposta.body.accessToken;
        });
      });
    });

    afterEach(function () {
      cy.deleteUser(localUser);
    });

    it("Usuário não autenticado não deve poder avaliar um filme", function () {
      cy.request({
        method: "POST",
        url: "/api/users/review",
        body: defaultReviewBody,
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(401);
        expect(resposta.body.message).to.equal("Access denied.");
        expect(resposta.body.error).to.equal("Unauthorized");
      });
    });

    it("Usuário comum deve poder avaliar um filme", function () {
      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: localToken,
        },
        body: defaultReviewBody,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(201);
        cy.getMovie(movie.id).then(function (resposta) {
          const reviewCreated = resposta.body.reviews.filter((review) => {
            return review.user.id == localUser.id;
          })[0];

          expect(reviewCreated.score).to.deep.equal(defaultReviewBody.score);
          expect(reviewCreated.reviewText).to.deep.equal(
            defaultReviewBody.reviewText
          );
        });
      });
    });

    it("Usuário crítico deve poder avaliar um filme", function () {
      cy.promoteCritic(localToken);

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: localToken,
        },
        body: defaultReviewBody,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(201);
        cy.getMovie(movie.id).then(function (resposta) {
          const reviewCreated = resposta.body.reviews.filter((review) => {
            return review.user.id == localUser.id;
          })[0];

          expect(reviewCreated.score).to.deep.equal(defaultReviewBody.score);
          expect(reviewCreated.reviewText).to.deep.equal(
            defaultReviewBody.reviewText
          );
        });
      });
    });

    it("Usuário administrador deve poder avaliar um filme", function () {
      cy.promoteAdmin(localToken);

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: localToken,
        },
        body: defaultReviewBody,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(201);
        cy.getMovie(movie.id).then(function (resposta) {
          const reviewCreated = resposta.body.reviews.filter((review) => {
            return review.user.id == localUser.id;
          })[0];

          expect(reviewCreated.score).to.deep.equal(defaultReviewBody.score);
          expect(reviewCreated.reviewText).to.deep.equal(
            defaultReviewBody.reviewText
          );
        });
      });
    });

    describe("Testando tipo das reviews criadas", function () {
      it("A review feita por um usuário comum deve ser do tipo comum", function () {
        cy.request({
          method: "POST",
          url: "/api/users/review",
          auth: {
            bearer: localToken,
          },
          body: defaultReviewBody,
        }).then(function (resposta) {
          cy.getMovie(movie.id).then(function (resposta) {
            const reviewCreated = resposta.body.reviews.filter((review) => {
              return review.user.id == localUser.id;
            })[0];

            expect(reviewCreated.score).to.deep.equal(defaultReviewBody.score);
            expect(reviewCreated.reviewText).to.deep.equal(
              defaultReviewBody.reviewText
            );
            expect(reviewCreated.reviewType).to.deep.equal(0);
          });
        });
      });

      it("A review feita por um usuário crítico deve ser do tipo crítico", function () {
        cy.promoteCritic(localToken);

        cy.request({
          method: "POST",
          url: "/api/users/review",
          auth: {
            bearer: localToken,
          },
          body: defaultReviewBody,
        }).then(function (resposta) {
          cy.getMovie(movie.id).then(function (resposta) {
            const reviewCreated = resposta.body.reviews.filter((review) => {
              return review.user.id == localUser.id;
            })[0];

            expect(reviewCreated.score).to.deep.equal(defaultReviewBody.score);
            expect(reviewCreated.reviewText).to.deep.equal(
              defaultReviewBody.reviewText
            );
            expect(reviewCreated.reviewType).to.deep.equal(1);
          });
        });
      });

      // Teste com bug --> Está criando uma review como se fosse do tipo comum, sendo que deveria ser do tipo administrador
      it("A review feita por um usuário administrador deve ser do tipo administrador", function () {
        cy.promoteAdmin(localToken);

        cy.request({
          method: "POST",
          url: "/api/users/review",
          auth: {
            bearer: localToken,
          },
          body: defaultReviewBody,
        }).then(function (resposta) {
          cy.getMovie(movie.id).then(function (resposta) {
            const reviewCreated = resposta.body.reviews.filter((review) => {
              return review.user.id == localUser.id;
            })[0];

            expect(reviewCreated.score).to.deep.equal(defaultReviewBody.score);
            expect(reviewCreated.reviewText).to.deep.equal(
              defaultReviewBody.reviewText
            );
            expect(reviewCreated.reviewType).not.to.equal(0);
          });
        });
      });
    });
  });

  describe("Casos de sucesso", function () {
    it("Deve ser possível criar uma review com uma nota de valor 1", function () {
      const localReviewBody = {
        ...defaultReviewBody,
        score: 1,
      };

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: localReviewBody,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(201);
      });
    });

    it("Deve ser possível criar uma review com uma nota de valor 5", function () {
      const localReviewBody = {
        ...defaultReviewBody,
        score: 5,
      };

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: localReviewBody,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(201);
      });
    });

    // Teste com bug --> Não está sendo possível criar um filme com uma reviewText sendo uma string vazia
    it("A review administrador deve ser diferente do tipo audiência geral e crítico", function () {
      const localReviewBody = {
        ...defaultReviewBody,
        reviewText: "",
      };

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: localReviewBody,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(201);
      });
    });

    it("Deve ser possível criar uma review com uma avaliação do filme contendo 500 caracteres", function () {
      const localReviewBody = {
        ...defaultReviewBody,
        reviewText: "",
      };

      while (localReviewBody.reviewText.length < 500) {
        localReviewBody.reviewText += "a";
      }

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: localReviewBody,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(201);
      });
    });

    it("Em um filme que já possui uma review do usuário, novas reviews deste usuário devem atualizar a review prévia ao invés de criar uma nova", function () {
      const segundaReview = {
        movieId: movie.id,
        score: 5,
        reviewText: "Segunda review do usuário",
      };

      cy.reviewMovie(
        movie.id,
        defaultReviewBody.score,
        defaultReviewBody.reviewText,
        token
      ).then(function () {
        cy.request({
          method: "POST",
          url: "/api/users/review",
          auth: {
            bearer: token,
          },
          body: segundaReview,
        }).then(function () {
          cy.getMovie(movie.id).then(function (resposta) {
            const reviewsDoUsuario = resposta.body.reviews.filter((review) => {
              return review.user.id == user.id;
            });
            expect(reviewsDoUsuario).to.have.length(1);
            expect(reviewsDoUsuario[0].user.id).to.equal(user.id);
            expect(reviewsDoUsuario[0].score).to.equal(segundaReview.score);
            expect(reviewsDoUsuario[0].reviewText).to.equal(
              segundaReview.reviewText
            );
          });
        });
      });
    });
  });

  describe("Casos de falha", function () {
    it("Não deve ser possível criar uma review sem passar nenhuma informação", function () {
      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: null,
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.have.length(6);
        expect(resposta.body.message).to.deep.include(re.score.mustBeNumber);
        expect(resposta.body.message).to.deep.include(re.score.mustNotBeEmpty);
        expect(resposta.body.message).to.deep.include(re.text.mustBeLonger);
        expect(resposta.body.message).to.deep.include(re.text.mustBeString);
        expect(resposta.body.message).to.deep.include(re.id.mustBeInteger);
        expect(resposta.body.message).to.deep.include(re.id.mustNotBeEmpty);
      });
    });

    it("Não deve ser possível criar uma review sem passar uma nota", function () {
      const localReviewBody = {
        ...defaultReviewBody,
        score: null,
      };

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: localReviewBody,
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.have.length(2);
        expect(resposta.body.message).to.deep.include(re.score.mustBeNumber);
        expect(resposta.body.message).to.deep.include(re.score.mustNotBeEmpty);
      });
    });

    it("Não deve ser possível criar uma review passando a nota como 0", function () {
      const localReviewBody = {
        ...defaultReviewBody,
        score: 0,
      };

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: localReviewBody,
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.deep.equal(
          re.score.mustBeNotShortAndNotLong
        );
      });
    });

    it("Não deve ser possível criar uma review passando a nota como um número negativo", function () {
      const localReviewBody = {
        ...defaultReviewBody,
        score: -1,
      };

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: localReviewBody,
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.deep.equal(
          re.score.mustBeNotShortAndNotLong
        );
      });
    });

    // Teste com bug --> Está sendo possível criar uma avaliação de um filme passando uma nota com número decimal
    it("Não deve ser possível criar uma review passando a nota como um número decimal", function () {
      const localReviewBody = {
        ...defaultReviewBody,
        score: 3.5,
      };

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: localReviewBody,
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.deep.equal(
          re.score.mustBeNotShortAndNotLong
        );
      });
    });

    it("Não deve ser possível criar uma review passando a nota sem ser um número", function () {
      const localReviewBody = {
        ...defaultReviewBody,
        score: "nota",
      };

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: localReviewBody,
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.have.length(1);
        expect(resposta.body.message).to.deep.include(re.score.mustBeNumber);
      });
    });

    it("Não deve ser possível criar uma review passando uma nota maior que 5", function () {
      const localReviewBody = {
        ...defaultReviewBody,
        score: 6,
      };

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: localReviewBody,
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.equal(
          re.score.mustBeNotShortAndNotLong
        );
      });
    });

    it("Não deve ser possível criar uma review sem passar uma a avaliação do filme", function () {
      const localReviewBody = {
        ...defaultReviewBody,
        reviewText: null,
      };

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: localReviewBody,
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.have.length(2);
        expect(resposta.body.message).to.deep.include(re.text.mustBeLonger);
        expect(resposta.body.message).to.deep.include(re.text.mustBeString);
      });
    });

    it("Não deve ser possível criar uma review passando uma a avaliação do filme sem ser um texto", function () {
      const localReviewBody = {
        ...defaultReviewBody,
        reviewText: 12345,
      };

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: localReviewBody,
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.have.length(2);
        expect(resposta.body.message).to.deep.include(
          re.text.mustBeShorterAndLonger
        );
        expect(resposta.body.message).to.deep.include(re.text.mustBeString);
      });
    });

    it("Não deve ser possível criar uma review passando uma avaliação contendo mais de 500 caracteres", function () {
      const localReviewBody = {
        ...defaultReviewBody,
        reviewText: "",
      };

      while (localReviewBody.reviewText.length < 501) {
        localReviewBody.reviewText += "a";
      }

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: localReviewBody,
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.have.length(1);
        expect(resposta.body.message).to.deep.include(re.text.mustBeShorter);
      });
    });

    it("Não deve ser possível criar uma review sem passar o id de um filme", function () {
      const localReviewBody = {
        ...defaultReviewBody,
        movieId: null,
      };

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: localReviewBody,
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.have.length(2);
        expect(resposta.body.message).to.deep.include(re.id.mustBeInteger);
        expect(resposta.body.message).to.deep.include(re.id.mustNotBeEmpty);
      });
    });

    it("Não deve ser possível criar uma review passando o id de um filme não existente", function () {
      cy.getAllMovies().then(function (resposta) {
        const lastMovie = resposta.body[resposta.body.length - 1];

        const localReviewBody = {
          ...defaultReviewBody,
          movieId: lastMovie.id + 100,
        };

        cy.request({
          method: "POST",
          url: "/api/users/review",
          auth: {
            bearer: token,
          },
          body: localReviewBody,
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(404);
          expect(resposta.body.message).to.deep.equal("Movie not found");
          expect(resposta.body.error).to.deep.equal("Not Found");
        });
      });
    });

    it("Não deve ser possível criar uma review passando um id do filme sem ser um number", function () {
      const localReviewBody = {
        ...defaultReviewBody,
        movieId: "idDoFilme",
      };

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: localReviewBody,
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.have.length(1);
        expect(resposta.body.message).to.deep.include(re.id.mustBeInteger);
      });
    });

    it("Não deve ser possível criar uma review passando um id do filme como número decimal", function () {
      const localReviewBody = {
        ...defaultReviewBody,
        movieId: movie.id + 0.5,
      };

      cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
          bearer: token,
        },
        body: localReviewBody,
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.have.length(1);
        expect(resposta.body.message).to.deep.include(re.id.mustBeInteger);
      });
    });
  });
});
