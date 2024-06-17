import { faker } from "@faker-js/faker";

describe("Pesquisa de Filmes", () => {
  let user;
  let movieTitle;
  let movieCreated

  before(() => {
    cy.createAdminUser().then((responseUser) => {
      user = responseUser;
      cy.fixture("requests/bodyNewMovie.json").then((fixture) => {
        cy.createMovie(fixture, user.accessToken).then((response) => {
          movieCreated = response.body;
          movieTitle = movieCreated.title;
        });
      })
    });
  });

  after(() => {
    cy.deleteMovie(movieCreated.id, user.accessToken).then(() => {
      cy.deleteUser(user)
    })
  })

  it("Deve ser possível pesquisar um filme sem estar logado no site", () => {
    cy.request({
      method: "GET",
      url: "/api/movies/search?title=" + movieTitle,
    }).then((response) => {
      const movie = response.body.find((m) => m.title === movieTitle);
      expect(movie).to.not.be.undefined;
      expect(response.status).to.eq(200);
      expect(movie.id).to.be.a("number");
      expect(movie).to.have.property("totalRating");
      expect(movie).to.deep.include({
        title: movieTitle,
        genre: movieCreated.genre,
        description: movieCreated.description,
        durationInMinutes: movieCreated.durationInMinutes,
        releaseYear: movieCreated.releaseYear
      });
    });
  });

  describe('Cenários com criação de usuários', function () {
    let localUser
    beforeEach(() => {
      cy.createUser().then((resposta) => {
        localUser = resposta
        cy.login(localUser).then((resposta) => {
          localUser.accessToken = resposta.body.accessToken
        })
      })
    });

    afterEach(() => {
      cy.deleteUser(localUser)
    })

    it("Deve ser possível pesquisar um filme sendo um usuário com perfil Comum", () => {
      cy.request({
        method: "GET",
        url: "/api/movies/search?title=" + movieTitle,
        auth: {
          bearer: localUser.accessToken
        }
      }).then((response) => {
        const movie = response.body.find((m) => m.title === movieTitle);
        expect(movie).to.not.be.undefined;
        expect(response.status).to.eq(200);
        expect(movie.id).to.be.a("number");
        expect(movie).to.have.property("totalRating");
        expect(movie).to.deep.include({
          title: movieTitle,
          genre: movieCreated.genre,
          description: movieCreated.description,
          durationInMinutes: movieCreated.durationInMinutes,
          releaseYear: movieCreated.releaseYear
        });
      });
    });

    it("Deve ser possível pesquisar um filme sendo um usuário com perfil Crítico", () => {
      cy.promoteCritic(localUser.accessToken).then(() => {
        cy.request({
          method: "GET",
          url: "/api/movies/search?title=" + movieTitle,
          auth: {
            bearer: localUser.accessToken
          }
        }).then((response) => {
          const movie = response.body.find((m) => m.title === movieTitle);
          expect(movie).to.not.be.undefined;
          expect(response.status).to.eq(200);
          expect(movie.id).to.be.a("number");
          expect(movie).to.have.property("totalRating");
          expect(movie).to.deep.include({
            title: movieTitle,
            genre: movieCreated.genre,
            description: movieCreated.description,
            durationInMinutes: movieCreated.durationInMinutes,
            releaseYear: movieCreated.releaseYear
          });
        });
      })
    });

    it("Deve ser possível pesquisar um filme sendo um usuário com perfil Administrador", () => {
      cy.promoteAdmin(localUser.accessToken).then(() => {
        cy.request({
          method: "GET",
          url: "/api/movies/search?title=" + movieTitle,
          auth: {
            bearer: localUser.accessToken
          }
        }).then((response) => {
          const movie = response.body.find((m) => m.title === movieTitle);
          expect(movie).to.not.be.undefined;
          expect(response.status).to.eq(200);
          expect(movie.id).to.be.a("number");
          expect(movie).to.have.property("totalRating");
          expect(movie).to.deep.include({
            title: movieTitle,
            genre: movieCreated.genre,
            description: movieCreated.description,
            durationInMinutes: movieCreated.durationInMinutes,
            releaseYear: movieCreated.releaseYear
          });
        });
      })
    });
  });

  it("Deve ser possível efetuar uma pesquisa utilizando o nome completo do filme", () => {
    cy.request({
      method: "GET",
      url: "/api/movies/search?title=" + movieTitle,
    }).then((response) => {
      const movie = response.body.find((m) => m.title === movieTitle);
      expect(movie).to.not.be.undefined;
      expect(response.status).to.eq(200);
      expect(movie.id).to.be.a("number");
      expect(movie).to.have.property("totalRating");
      expect(movie).to.deep.include({
        title: movieTitle,
        genre: movieCreated.genre,
        description: movieCreated.description,
        durationInMinutes: movieCreated.durationInMinutes,
        releaseYear: movieCreated.releaseYear
      });
    });
  });

  it("Deve ser possível efetuar uma pesquisa utilizando parte do título do filme", () => {
    const partialTitle = movieTitle.slice(0, Math.floor(movieTitle.length / 2));
    cy.searchMovie(partialTitle).then((response) => {
      const movie = response.body.find((m) => m.title.includes(partialTitle));
      expect(movie).to.not.be.undefined;
      expect(response.status).to.eq(200);
      expect(movie.id).to.be.a("number");
      expect(movie.title).to.include(partialTitle);
      expect(movie).to.have.property("totalRating");
      expect(movie).to.deep.include({
        genre: movieCreated.genre,
        description: movieCreated.description,
        durationInMinutes: movieCreated.durationInMinutes,
        releaseYear: movieCreated.releaseYear
      });
    });
  });

  it("Não deve ser possível efetuar pesquisa de um filme não cadastrado", () => {
    const movieInvalidNull = "Filme inexistente 123456789acbde";
    cy.searchMovie(movieInvalidNull).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array").that.is.empty;
    });
  });

  it("Não deve ser possível efetuar pesquisa de um filme pelo gênero", () => {
    cy.searchMovie(movieCreated.genre).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array")
      const filteredMovie = response.body.filter((filme) => {
        return filme.id == movieCreated.id
      })
      expect(filteredMovie).to.have.length(0)
    });
  });

  it("Não deve ser possível efetuar pesquisa de um filme pela descrição", () => {
    cy.searchMovie(movieCreated.description).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array")
      const filteredMovie = response.body.filter((filme) => {
        return filme.id == movieCreated.id
      })
      expect(filteredMovie).to.have.length(0)
    });
  });

  it("Não deve ser possível efetuar pesquisa de um filme pelo tempo de duração", () => {
    cy.searchMovie(movieCreated.durationInMinutes).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array")
      const filteredMovie = response.body.filter((filme) => {
        return filme.id == movieCreated.id
      })
      expect(filteredMovie).to.have.length(0)
    });
  });

  it("Não deve ser possível efetuar pesquisa de um filme pelo ano de lançamento", () => {
    cy.searchMovie(movieCreated.releaseYear).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array")
      const filteredMovie = response.body.filter((filme) => {
        return filme.id == movieCreated.id
      })
      expect(filteredMovie).to.have.length(0)
    });
  });

  it("Não deve ser possível efetuar pesquisa de um filme sem informar um título", () => {
    cy.request({
      method: "GET",
      url: "/api/movies/search",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(500);
      expect(response.body).to.deep.include({
        message: 'Internal server error',
      });
    });
  });
});
