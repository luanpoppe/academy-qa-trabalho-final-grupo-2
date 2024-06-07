///  <reference types="cypress" />
///  <reference path="../index.d.ts" />
import {
  BeforeAll,
  AfterAll,
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import { fakerPT_BR } from "@faker-js/faker";

import MoviesPage from "../pages/moviesPage";
const paginaMovies = new MoviesPage();

var user;
var idMovie;
var token;
var userCritic;
var userCritic2;
var userAdmin;

BeforeAll(() => {
  cy.fixture("responses/responseBodyNewMovie.json").as("responseBodyMovie");
  cy.fixture("requests/bodyNewMovie.json")
    .then((movieBody) => {
      cy.createUserAndMovie(movieBody);
    })
    .then((response) => {
      idMovie = response.movie.body.id;
      user = response.user;
    })
    .then(() => {
      cy.login(user).then(function (response) {
        token = response.body.accessToken;
        cy.reviewMovie(
          idMovie,
          5,
          "são realmente muito velozes e mega furiosos",
          token
        );
      });
    });
});

BeforeAll(() => {
  cy.createUser().then((response) => {
    userCritic = response;
    cy.login(userCritic).then(function (response) {
      token = response.body.accessToken;
      cy.promoteCritic(token);
      cy.reviewMovie(idMovie, 2, "são pouco velozes e nada furiosos", token);
    });
  });
});

BeforeAll(() => {
  cy.createUser().then((response) => {
    userCritic2 = response;
    cy.login(userCritic2).then(function (response) {
      token = response.body.accessToken;
      cy.promoteCritic(token);
      cy.reviewMovie(idMovie, 1, "não são velozes nem furiosos", token);
    });
  });
});

BeforeAll(() => {
  cy.createUser().then((response) => {
    userAdmin = response;
    cy.login(userAdmin).then(function (response) {
      token = response.body.accessToken;
      cy.promoteAdmin(token);
      cy.reviewMovie(idMovie, 3, "são muito velozes e pouco furiosos", token);
    });
  });
});

AfterAll(() => {
  cy.promoteToAdminAndDeleteMovie(
    { email: user.email, password: user.password },
    idMovie
  ).then(() => {
    cy.deleteUser(user);
    cy.deleteUser(userCritic);
    cy.deleteUser(userCritic2);
    cy.deleteUser(userAdmin);
  });
});

Given(
  "que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb",
  function () {
    cy.visit("");
  }
);

Given(
  "que o usuário do tipo comum acessou a tela de consulta de filmes no Frontend Raromdb",
  () => {}
);
Given(
  "deverá visualizar o totalizador da média das avaliações da audiência realizadas do filme selecionado",
  () => {}
);
Given(
  "deverá visualizar o totalizador da média das avaliações da crítica realizadas do filme selecionado",
  () => {}
);
Given("deverá visualizar um campo habilitado para avaliar o filme", () => {});

When("inserir um Id de filme válido na url", () => {
  cy.visit("/movies/" + idMovie);
});
When("inserir um Id inválido na url", () => {
  cy.visit("/movies/" + "aaaaaaaa-bbbb-1ccc-8ddd-eeeeeeeeeeee");
});

When("selecionar um filme na tela inicial", () => {
  paginaMovies.typeMovie("Velozes e Furiosos 10");
  paginaMovies.clickButtonBusca();
  paginaMovies.clickMovieTelaInicial();
});

Then(
  "deverá visualizar a quantidade de avaliações da audiência realizadas",
  function () {
    cy.get(paginaMovies.labelAudience).should("be.visible");
    cy.get(paginaMovies.labelAudience).should(
      "contain",
      "Avaliação da audiência"
    );
    cy.get(paginaMovies.labelQtdAudience).should("be.visible");
    cy.get(paginaMovies.labelQtdAudience).should("contain", "2 avaliações");
  }
);

Then(
  "deverá visualizar a quantidade de avaliações da crítica realizadas",
  () => {
    cy.get(paginaMovies.labelCritic).should("be.visible");
    cy.get(paginaMovies.labelCritic).should("contain", "Avaliação da crítica");
    cy.get(paginaMovies.labelQtdCritic).should("be.visible");
    cy.get(paginaMovies.labelQtdCritic).should("contain", "2 avaliações");
  }
);

Then("deverá visualizar todas as informações do filme selecionado", () => {
  cy.get(paginaMovies.labelTitle).should("be.visible");
  cy.get(paginaMovies.labelTitle).should("contain", "Velozes e Furiosos 10");
  cy.get(paginaMovies.labelGenre).should("be.visible");
  cy.get(paginaMovies.labelGenre).should("contain", "Ação");
  cy.get(paginaMovies.labelDescription).should("be.visible");
  cy.get(paginaMovies.labelDescription).should(
    "contain",
    "O fim da estrada esta chegando"
  );
  cy.get(paginaMovies.labelYear).should("be.visible");
  cy.get(paginaMovies.labelYear).should("contain", "2024");
  cy.get(paginaMovies.labelHour).should("be.visible");
  cy.get(paginaMovies.labelHour).should("contain", "2h 0m");
  cy.get(paginaMovies.labelGenre).should("be.visible");
  cy.get(paginaMovies.labelGenre).should("contain", "Ação");
});

Then("Então o sistema deverá exibir uma mensagem de erro", () => {
  cy.get(paginaMovies.erroIdinválido).should("be.visible");
  cy.get(paginaMovies.erroIdinválido).should(
    "contain",
    "Unexpected Application Error!"
  );
  cy.get(paginaMovies.statusIdInválido).should("be.visible");
  cy.get(paginaMovies.statusIdInválido).should(
    "contain",
    "Request failed with status code 400"
  );
});

Then("deverá visualizar o Id do filme selecionado na url", () => {
  cy.url().should(
    "eq",
    "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/" + idMovie
  );
});

Then("deverá visualizar a imagem de capa do filme selecionado", () => {
  cy.get(paginaMovies.labelImage).should("be.visible");
});
