import * as me from "../../support/utils/movieErrors";

describe("Criação de Filmes", function () {
  let movie;
  before(function () {
    cy.fixture("./requests/bodyNewMovie.json").then(function (resposta) {
      movie = resposta;
    });
  });

  describe("Usuário administrador", function () {
    let movieInfo;
    let adminUser;
    let token;

    before(function () {
      cy.createUser().then(function (userInfo) {
        adminUser = userInfo;
        cy.login(adminUser).then(function (resposta) {
          token = resposta.body.accessToken;
          cy.promoteAdmin(token);
        });
      });
    });
    after(function () {
      cy.deleteUser(adminUser);
    });

    describe("Casos de criação com sucesso", function () {
      afterEach(function () {
        if (movieInfo) cy.promoteToAdminAndDeleteMovie(adminUser, movieInfo.id);
      });

      it("Usuário administrador deve poder criar um filme", function () {
        cy.request({
          method: "POST",
          url: "/api/movies",
          body: movie,
          auth: {
            bearer: token,
          },
        }).then(function (resposta) {
          movieInfo = resposta.body;
          expect(resposta.status).to.equal(201);
          expect(resposta.body).to.deep.include(movie);
          expect(resposta.body.id).to.be.a("number");
          cy.getMovie(movieInfo.id).then(function (resposta) {
            expect(resposta.body).to.deep.include(movie);
          });
        });
      });

      it("Deve ser possível criar um filme com o título contendo 1 caractere", function () {
        const temporaryMovie = {
          ...movie,
          title: "a",
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
        }).then(function (resposta) {
          movieInfo = resposta.body;
          expect(resposta.status).to.equal(201);
        });
      });

      it("Deve ser possível criar um filme com o título contendo 100 caracteres", function () {
        const temporaryMovie = {
          ...movie,
          title: "a",
        };
        while (temporaryMovie.title.length < 100) {
          temporaryMovie.title += "a";
        }

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
        }).then(function (resposta) {
          movieInfo = resposta.body;
          expect(resposta.status).to.equal(201);
        });
      });

      it("Deve ser possível criar um filme com o gênero contendo 1 caractere", function () {
        const temporaryMovie = {
          ...movie,
          genre: "a",
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
        }).then(function (resposta) {
          movieInfo = resposta.body;
          expect(resposta.status).to.equal(201);
          expect(resposta.body).to.deep.include(temporaryMovie);
          expect(resposta.body.id).to.be.a("number");
        });
      });

      it("Deve ser possível criar um filme com o gênero contendo 100 caracteres", function () {
        const temporaryMovie = {
          ...movie,
          genre: "a",
        };
        while (temporaryMovie.genre.length < 100) {
          temporaryMovie.genre += "a";
        }

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
        }).then(function (resposta) {
          movieInfo = resposta.body;
          expect(resposta.status).to.equal(201);
          expect(resposta.body).to.deep.include(temporaryMovie);
          expect(resposta.body.id).to.be.a("number");
        });
      });

      it("Deve ser possível criar um filme com a descrição contendo 1 caractere", function () {
        const temporaryMovie = {
          ...movie,
          description: "a",
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
        }).then(function (resposta) {
          movieInfo = resposta.body;
          expect(resposta.status).to.equal(201);
          expect(resposta.body).to.deep.include(temporaryMovie);
          expect(resposta.body.id).to.be.a("number");
        });
      });

      it("Deve ser possível criar um filme com a descrição contendo 500 caracteres", function () {
        const temporaryMovie = {
          ...movie,
          description: "a",
        };
        while (temporaryMovie.description.length < 500) {
          temporaryMovie.description += "a";
        }

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
        }).then(function (resposta) {
          movieInfo = resposta.body;
          expect(resposta.status).to.equal(201);
          expect(resposta.body).to.deep.include(temporaryMovie);
          expect(resposta.body.id).to.be.a("number");
        });
      });

      it("Deve ser possível criar um filme com o ano de lançamento de 1895", function () {
        const temporaryMovie = {
          ...movie,
          releaseYear: 1895,
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
        }).then(function (resposta) {
          movieInfo = resposta.body;
          expect(resposta.status).to.equal(201);
          expect(resposta.body).to.deep.include(temporaryMovie);
          expect(resposta.body.id).to.be.a("number");
        });
      });

      it("Deve ser possível criar um filme com o ano de lançamento sendo o ano atual", function () {
        const temporaryMovie = {
          ...movie,
          releaseYear: new Date().getFullYear(),
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
        }).then(function (resposta) {
          movieInfo = resposta.body;
          expect(resposta.status).to.equal(201);
          expect(resposta.body).to.deep.include(temporaryMovie);
          expect(resposta.body.id).to.be.a("number");
        });
      });

      it("Deve ser possível criar um filme com a duração de 1 minuto", function () {
        const temporaryMovie = {
          ...movie,
          durationInMinutes: 1,
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
        }).then(function (resposta) {
          movieInfo = resposta.body;
          expect(resposta.status).to.equal(201);
          expect(resposta.body).to.deep.include(temporaryMovie);
          expect(resposta.body.id).to.be.a("number");
        });
      });

      it("Deve ser possível criar um filme com a duração de 720 horas", function () {
        const temporaryMovie = {
          ...movie,
          durationInMinutes: 720 * 60,
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
        }).then(function (resposta) {
          movieInfo = resposta.body;
          expect(resposta.status).to.equal(201);
          expect(resposta.body).to.deep.include(temporaryMovie);
          expect(resposta.body.id).to.be.a("number");
        });
      });

      describe("Cenário com criação de mais de um filme", function () {
        let movieInfo2;
        beforeEach(function () {
          cy.createMovie(movie, token).then(function (resposta) {
            movieInfo2 = resposta.body;
          });
        });

        afterEach(function () {
          cy.deleteMovie(movieInfo2.id, token);
        });

        it("Deve ser possível adicionar dois filmes com as exatas mesmas informações", function () {
          cy.request({
            method: "POST",
            url: "/api/movies",
            body: movie,
            auth: {
              bearer: token,
            },
          }).then(function (resposta) {
            movieInfo = resposta.body;
            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.deep.include(movie);
            expect(resposta.body.id).to.be.a("number");
          });
        });
      });
    });

    it("Não deve ser possível cadastrar um filme sem passar nenhuma informação", function () {
      cy.request({
        method: "POST",
        url: "/api/movies",
        body: null,
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.have.length(19);
        cy.wrap(me.allNonExistentErrors).each(function (error) {
          expect(resposta.body.message).to.deep.include(error);
        });
      });
    });

    describe("Casos de falha do título do filme", function () {
      it("Não deve ser possível criar um filme sem um título", function () {
        const temporaryMovie = {
          ...movie,
          title: null,
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(3);
          cy.wrap(me.allTitleErrors).each(function (error) {
            expect(resposta.body.message).to.deep.include(error);
          });
        });
      });

      it("Não deve ser possível criar um filme com um título vazio", function () {
        const temporaryMovie = {
          ...movie,
          title: "",
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(2);
          expect(resposta.body.message).to.deep.include(
            me.titleErrors.titleMustBeLonger
          );
          expect(resposta.body.message).to.deep.include(
            me.titleErrors.titleMustNotBeEmpty
          );
        });
      });

      // Teste com bug --> Está sendo permitido criar o filme
      it("Não deve ser possível criar um filme com um título tendo apenas espaços em branco", function () {
        const temporaryMovie = {
          ...movie,
          title: " ",
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
        });
      });

      it("Não deve ser possível criar um filme com um título sem ser uma string", function () {
        const temporaryMovie = {
          ...movie,
          title: 1234,
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(2);
          expect(resposta.body.message).to.deep.include(
            me.titleErrors.titleMustBeShortherAndLonger
          );
          expect(resposta.body.message).to.deep.include(
            me.titleErrors.titleMustBeString
          );
        });
      });

      it("Não deve ser possível criar um filme com um título contendo 101 caracteres", function () {
        const temporaryMovie = {
          ...movie,
          title: "a",
        };

        while (temporaryMovie.title.length < 101) {
          temporaryMovie.title += "a";
        }

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(1);
          expect(resposta.body.message).to.deep.include(
            me.titleErrors.titleMustBeShorter
          );
        });
      });
    });

    describe("Casos de falha do gênero do filme", function () {
      it("Não deve ser possível criar um filme sem passar um gênero", function () {
        const temporaryMovie = {
          ...movie,
          genre: null,
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(3);
          cy.wrap(me.allGenreErrors).each(function (error) {
            expect(resposta.body.message).to.deep.include(error);
          });
        });
      });

      it("Não deve ser possível criar um filme com gênero vazio", function () {
        const temporaryMovie = {
          ...movie,
          genre: "",
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(2);
          expect(resposta.body.message).to.deep.include(
            me.genreErrors.genreMustBeLonger
          );
          expect(resposta.body.message).to.deep.include(
            me.genreErrors.genreMustNotBeEmpty
          );
        });
      });

      // Teste com bug --> Está sendo permitido criar o filme
      it("Não deve ser possível criar um filme com gênero contendo apenas espaços em branco", function () {
        const temporaryMovie = {
          ...movie,
          genre: " ",
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
        });
      });

      it("Não deve ser possível criar um filme com gênero sem ser uma string", function () {
        const temporaryMovie = {
          ...movie,
          genre: 1234,
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(2);
          expect(resposta.body.message).to.deep.include(
            me.genreErrors.genreMustBeShortherAndLonger
          );
          expect(resposta.body.message).to.deep.include(
            me.genreErrors.genreMustBeString
          );
        });
      });

      it("Não deve ser possível criar um filme com um gênero contendo 101 caracteres", function () {
        const temporaryMovie = {
          ...movie,
          genre: "a",
        };

        while (temporaryMovie.genre.length < 101) {
          temporaryMovie.genre += "a";
        }

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(1);
          expect(resposta.body.message).to.deep.include(
            me.genreErrors.genreMustBeShorter
          );
        });
      });
    });

    describe("Casos de falha da descrição do filme", function () {
      it("Não deve ser possível criar um filme sem uma descrição", function () {
        const temporaryMovie = {
          ...movie,
          description: null,
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(3);
          cy.wrap(me.allDescriptionErrors).each(function (error) {
            expect(resposta.body.message).to.deep.include(error);
          });
        });
      });

      it("Não deve ser possível criar um filme com uma descrição vazia", function () {
        const temporaryMovie = {
          ...movie,
          description: "",
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(2);
          expect(resposta.body.message).to.deep.include(
            me.descriptionErrors.descriptionMustBeLonger
          );
          expect(resposta.body.message).to.deep.include(
            me.descriptionErrors.descriptionMustNotBeEmpty
          );
        });
      });

      // Teste com bug --> Está sendo permitido criar o filme
      it("Não deve ser possível criar um filme com uma descrição contendo apenas espaços em branco", function () {
        const temporaryMovie = {
          ...movie,
          description: " ",
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(2);
          expect(resposta.body.message).to.deep.include(
            me.descriptionErrors.descriptionMustBeLonger
          );
          expect(resposta.body.message).to.deep.include(
            me.descriptionErrors.descriptionMustNotBeEmpty
          );
        });
      });

      it("Não deve ser possível criar um filme com a descrição sem ser uma string", function () {
        const temporaryMovie = {
          ...movie,
          description: 1234,
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(2);
          expect(resposta.body.message).to.deep.include(
            me.descriptionErrors.descriptionMustBeShortherAndLonger
          );
          expect(resposta.body.message).to.deep.include(
            me.descriptionErrors.descriptionMustBeString
          );
        });
      });

      it("Não deve ser possível criar um filme com uma descrição contendo 501 caracteres", function () {
        const temporaryMovie = {
          ...movie,
          description: "a",
        };

        while (temporaryMovie.description.length < 501) {
          temporaryMovie.description += "a";
        }

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(1);
          expect(resposta.body.message).to.deep.include(
            me.descriptionErrors.descriptionMustBeShorter
          );
        });
      });
    });

    describe("Casos de falha da duração do filme", function () {
      it("Não deve ser possível criar um filme sem uma duração", function () {
        const temporaryMovie = {
          ...movie,
          durationInMinutes: null,
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(5);
          cy.wrap(me.allDurationErrors).each(function (error) {
            expect(resposta.body.message).to.deep.include(error);
          });
        });
      });

      it("Não deve ser possível criar um filme com uma duração sem ser um número", function () {
        const temporaryMovie = {
          ...movie,
          durationInMinutes: "abcd",
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(4);
          expect(resposta.body.message).to.deep.include(
            me.durationErrors.durationMaxNumber
          );
          expect(resposta.body.message).to.deep.include(
            me.durationErrors.durationMinNumber
          );
          expect(resposta.body.message).to.deep.include(
            me.durationErrors.durationMustBeNumber
          );
          expect(resposta.body.message).to.deep.include(
            me.durationErrors.durationMustBeInteger
          );
        });
      });

      it("Não deve ser possível criar um filme com uma duração que seja um número decimal", function () {
        const temporaryMovie = {
          ...movie,
          durationInMinutes: 120.5,
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(1);
          expect(resposta.body.message).to.deep.include(
            me.durationErrors.durationMustBeInteger
          );
        });
      });

      it("Não deve ser possível criar um filme com uma duração que seja 0", function () {
        const temporaryMovie = {
          ...movie,
          durationInMinutes: 0,
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(1);
          expect(resposta.body.message).to.deep.include(
            me.durationErrors.durationMinNumber
          );
        });
      });

      it("Não deve ser possível criar um filme com uma duração que seja negativa", function () {
        const temporaryMovie = {
          ...movie,
          durationInMinutes: -1,
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(1);
          expect(resposta.body.message).to.deep.include(
            me.durationErrors.durationMinNumber
          );
        });
      });

      it("Não deve ser possível criar um filme com uma duração que seja maior do que 720 horas", function () {
        const temporaryMovie = {
          ...movie,
          durationInMinutes: 720 * 60 + 1,
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(1);
          expect(resposta.body.message).to.deep.include(
            me.durationErrors.durationMaxNumber
          );
        });
      });
    });

    describe("Casos de falha do ano de lançamento do filme", function () {
      it("Não deve ser possível criar um filme sem um ano de lançamento", function () {
        const temporaryMovie = {
          ...movie,
          releaseYear: null,
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(5);
          cy.wrap(me.allReleaseYearErrors).each(function (error) {
            expect(resposta.body.message).to.deep.include(error);
          });
        });
      });

      it("Não deve ser possível criar um filme com um ano de lançamento sem ser um número", function () {
        const temporaryMovie = {
          ...movie,
          releaseYear: "abcd",
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(4);
          expect(resposta.body.message).to.deep.include(
            me.releaseYearErrors.releaseYearMaxNumber
          );
          expect(resposta.body.message).to.deep.include(
            me.releaseYearErrors.releaseYearMinNumber
          );
          expect(resposta.body.message).to.deep.include(
            me.releaseYearErrors.releaseYearMustBeNumber
          );
          expect(resposta.body.message).to.deep.include(
            me.releaseYearErrors.releaseYearMustBeInteger
          );
        });
      });

      it("Não deve ser possível criar um filme com um ano de lançamento que seja um número decimal", function () {
        const temporaryMovie = {
          ...movie,
          releaseYear: 2000.5,
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(1);
          expect(resposta.body.message).to.deep.include(
            me.releaseYearErrors.releaseYearMustBeInteger
          );
        });
      });

      it("Não deve ser possível criar um filme com um ano de lançamento que seja menor que 1895", function () {
        const temporaryMovie = {
          ...movie,
          releaseYear: 1894,
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(1);
          expect(resposta.body.message).to.deep.include(
            me.releaseYearErrors.releaseYearMinNumber
          );
        });
      });

      it("Não deve ser possível criar um filme com um ano de lançamento que seja maior do que o ano atual", function () {
        const temporaryMovie = {
          ...movie,
          releaseYear: new Date().getFullYear() + 1,
        };

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(400);
          expect(resposta.body.message).to.have.length(1);
          expect(resposta.body.message).to.deep.include(
            me.releaseYearErrors.releaseYearMaxNumber
          );
        });
      });
    });
  });

  describe("Casos de falhar por conta da autorização", function () {
    let user;
    let localToken;

    beforeEach(function () {
      cy.createUser().then(function (resposta) {
        user = resposta;
        cy.login(user).then(function (resposta) {
          localToken = resposta.body.accessToken;
        });
      });
    });

    afterEach(function () {
      cy.deleteUser(user);
    });

    it("Usuário não logado não deve conseguir criar um filme", function () {
      cy.request({
        method: "POST",
        url: "/api/movies",
        body: movie,
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(401);
        expect(resposta.body.message).to.equal("Access denied.");
        expect(resposta.body.error).to.equal("Unauthorized");
      });
    });

    it("Usuário comum não deve conseguir criar um filme", function () {
      cy.request({
        method: "POST",
        url: "/api/movies",
        body: movie,
        auth: {
          bearer: localToken,
        },
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(403);
        expect(resposta.body.message).to.equal("Forbidden");
      });
    });

    it("Usuário crítico não deve conseguir criar um filme", function () {
      cy.promoteCritic(localToken).then(function (resposta) {
        cy.request({
          method: "POST",
          url: "/api/movies",
          body: movie,
          auth: {
            bearer: localToken,
          },
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(403);
          expect(resposta.body.message).to.equal("Forbidden");
        });
      });
    });
  });
});
