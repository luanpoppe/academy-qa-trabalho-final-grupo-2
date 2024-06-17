/// <reference types="cypress" />
/// <reference path="../../support/index.d.ts" />
import { faker } from "@faker-js/faker";

describe("Funcionalidade: Listagem de Filmes", () => {
  let token;
  let user;
  let movieId;

  const movieInfo = {
    title: faker.person.jobTitle(),
    genre: "Ação",
    description: "Descrição do Filme de Teste",
    durationInMinutes: 120,
    releaseYear: 2023,
  };

  before(() => {
    cy.createAdminUser().then(function (responseUser) {
      user = responseUser;
      token = user.accessToken;
      cy.createMovie(movieInfo, token).then((response) => {
        movieId = response.body.id;
        cy.wrap(movieId).as("movieCreateId");
      });
    });
  });

  after(function () {
    cy.deleteMovie(movieId, token).then(() => {
      cy.deleteUser(user);
    });
  });

  describe("Usuários autenticados", function () {
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

    it("Deve ser possível usuário comum consultar a lista de filmes sem restrições", () => {
      cy.request({
        method: "GET",
        url: "/api/movies",
        auth: {
          bearer: localToken,
        },
      }).then(function (response) {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
      });
    });

    it("Deve ser possível usuário crítico consultar a lista de filmes sem restrições", () => {
      cy.promoteCritic(localToken).then(function () {
        cy.request({
          method: "GET",
          url: "/api/movies",
          auth: {
            bearer: localToken,
          },
        }).then(function (response) {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an("array");
        });
      });
    });

    it("Deve ser possível usuário administrador consultar a lista de filmes sem restrições", () => {
      cy.promoteAdmin(localToken).then(function () {
        cy.request({
          method: "GET",
          url: "/api/movies",
          auth: {
            bearer: localToken,
          },
        }).then(function (response) {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an("array");
        });
      });
    });
  });

  it("Deve ser possível usuário não logado consultar a lista de filmes sem restrições", () => {
    cy.request({
      method: "GET",
      url: "/api/movies",
    }).then(function (response) {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it("Listagem dos filmes deve conter informações detalhadas sobre os filmes", () => {
    cy.request({ method: "GET", url: "/api/movies" }).then((response) => {
      expect(response.status).to.eq(200);
      const sampleMovies = [
        response.body[0],
        response.body[response.body.length - 1],
        response.body[Math.ceil(response.body.length / 2)],
      ];

      cy.wrap(sampleMovies).each((movie) => {
        expect(movie).to.have.property("totalRating");
        expect(movie.id).to.be.an("number");
        expect(movie.title).to.be.a("string");
        expect(movie.genre).to.be.a("string");
        expect(movie.description).to.be.a("string");
        expect(movie.durationInMinutes).to.be.a("number");
        expect(movie.releaseYear).to.be.a("number");
      });
    });
  });

  // Teste está com bug --> Nem sempre ele ordena corretamente pelas notas mais altas
  it("Deve ser possível listar os filmes ordenado pelas suas notas", function () {
    cy.request({ method: "GET", url: "/api/movies?sort=true" }).then(
      (resposta) => {
        const movies = resposta.body;
        let notaAtual = 101;
        movies.forEach((movie) => {
          if (movie.totalRating == null) {
            movie.totalRating = 0;
          }
          expect(movie.totalRating <= notaAtual).to.equal(true);
          notaAtual = movie.totalRating;
        });
      }
    );
  });
});
