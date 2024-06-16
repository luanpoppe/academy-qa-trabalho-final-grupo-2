import { faker } from "@faker-js/faker";

describe("Pesquisa de Filmes", () => {
  let token;
  let user;
  let movieTitle;
  const movieInfo = {
    title: faker.person.jobTitle(),
    genre: "Ação",
    description: "Descrição do Filme de Teste",
    durationInMinutes: 120,
    releaseYear: 2023,
    audienceScore: 0,
    criticScore: 0,
  };

  before(() => {
    cy.createAdminUser().then((responseUser) => {
      user = responseUser;
      token = user.accessToken;
      cy.createMovie(movieInfo, token).then((response) => {
        const movieCreate = response.body;
        movieTitle = movieCreate.title;
      });
    });
  });

  beforeEach(() => {});

  it("Deve ser possível pesquisar um filme sem estar logado no site", () => {
    cy.searchMovie(movieTitle).then((response) => {
      const movie = response.body.find((m) => m.title === movieTitle);
      expect(movie).to.not.be.undefined;
      expect(response.status).to.eq(200);
      expect(movie.id).to.be.a("number");
      expect(movie).to.have.property("title", movieTitle);
      expect(movie).to.have.property("genre", movieInfo.genre);
      expect(movie).to.have.property("description", movieInfo.description);
      expect(movie).to.have.property(
        "durationInMinutes",
        movieInfo.durationInMinutes
      );
      expect(movie).to.have.property("releaseYear", movieInfo.releaseYear);
      expect(movie).to.have.property("totalRating");
    });
  });

  it("Deve ser possível pesquisar um filme estando logado no site como usuário comum", () => {
    cy.createUser().then((response) => {
      user = response;
      cy.login(user).then((loginResponse) => {
        const userToken = loginResponse.body.accessToken;

        cy.searchMovie(movieTitle, userToken).then((response) => {
          const movie = response.body.find((m) => m.title === movieTitle);
          expect(movie).to.not.be.undefined;
          expect(response.status).to.eq(200);
          expect(movie.id).to.be.a("number");
          expect(movie).to.have.property("title", movieTitle);
          expect(movie).to.have.property("genre", movieInfo.genre);
          expect(movie).to.have.property("description", movieInfo.description);
          expect(movie).to.have.property(
            "durationInMinutes",
            movieInfo.durationInMinutes
          );
          expect(movie).to.have.property("releaseYear", movieInfo.releaseYear);
          expect(movie).to.have.property("totalRating");
        });
      });
    });
  });

  it("Deve ser possível pesquisar um filme como usuário crítico", () => {
    cy.createCriticUser().then((response) => {
      user = response;
      cy.login(user).then((loginResponse) => {
        const userToken = loginResponse.body.accessToken;

        cy.searchMovie(movieTitle, userToken).then((response) => {
          const movie = response.body.find((m) => m.title === movieTitle);
          expect(movie).to.not.be.undefined;
          expect(response.status).to.eq(200);
          expect(movie.id).to.be.a("number");
          expect(movie).to.have.property("title", movieTitle);
          expect(movie).to.have.property("genre", movieInfo.genre);
          expect(movie).to.have.property("description", movieInfo.description);
          expect(movie).to.have.property(
            "durationInMinutes",
            movieInfo.durationInMinutes
          );
          expect(movie).to.have.property("releaseYear", movieInfo.releaseYear);
          expect(movie).to.have.property("totalRating");
        });
      });
    });
  });
  it("Deve ser possível pesquisar um filme como administrador", () => {
    cy.createAdminUser().then((response) => {
      user = response;
      cy.login(user).then((loginResponse) => {
        const userToken = loginResponse.body.accessToken;

        cy.searchMovie(movieTitle, userToken).then((response) => {
          const movie = response.body.find((m) => m.title === movieTitle);
          expect(movie).to.not.be.undefined;
          expect(response.status).to.eq(200);
          expect(movie.id).to.be.a("number");
          expect(movie).to.have.property("title", movieTitle);
          expect(movie).to.have.property("genre", movieInfo.genre);
          expect(movie).to.have.property("description", movieInfo.description);
          expect(movie).to.have.property(
            "durationInMinutes",
            movieInfo.durationInMinutes
          );
          expect(movie).to.have.property("releaseYear", movieInfo.releaseYear);
          expect(movie).to.have.property("totalRating");
        });
      });
    });
  });
  it("Deve ser possível efetuar uma pesquisa de um filme utilizando o nome completo", () => {
    cy.searchMovie(movieTitle).then((response) => {
      const movie = response.body.find((m) => m.title === movieTitle);
      expect(movie).to.not.be.undefined;
      expect(response.status).to.eq(200);
      expect(movie.id).to.be.a("number");
      expect(movie).to.have.property("title", movieTitle);
      expect(movie).to.have.property("genre", movieInfo.genre);
      expect(movie).to.have.property("description", movieInfo.description);
      expect(movie).to.have.property(
        "durationInMinutes",
        movieInfo.durationInMinutes
      );
      expect(movie).to.have.property("releaseYear", movieInfo.releaseYear);
      expect(movie).to.have.property("totalRating");
    });
  });

  it("Deve ser possível efetuar uma pesquisa de um filme escrevendo parte do título do filme", () => {
    const partialTitle = movieTitle.slice(0, Math.floor(movieTitle.length / 2));
    cy.searchMovie(partialTitle).then((response) => {
      const movie = response.body.find((m) => m.title.includes(partialTitle));
      expect(movie).to.not.be.undefined;
      expect(response.status).to.eq(200);
      expect(movie.id).to.be.a("number");
      expect(movie).to.have.property("title");
      expect(movie.title).to.include(partialTitle);
      expect(movie).to.have.property("genre", movieInfo.genre);
      expect(movie).to.have.property("description", movieInfo.description);
      expect(movie).to.have.property(
        "durationInMinutes",
        movieInfo.durationInMinutes
      );
      expect(movie).to.have.property("releaseYear", movieInfo.releaseYear);
      expect(movie).to.have.property("totalRating");
    });
  });

  it("Não deve ser possível efetuar pesquisa com resultado nulo", () => {
    const movieInvalidNull = "Filme inexistente";
    cy.searchMovie(movieInvalidNull).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body).to.be.an("array").that.is.empty;
    });
  });
});
