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

var userAdmin;
var idMovie;
var token;
var userCritic;
var userCritic2;
var userComum;
var userComum2;

BeforeAll(() => {
  cy.fixture("responses/responseBodyNewMovie.json").as("responseBodyMovie");
  cy.fixture("requests/bodyNewMovie.json")
    .then((movieBody) => {
      cy.createUserAndMovie(movieBody);
    })
    .then((response) => {
      idMovie = response.movie.body.id;
      userAdmin = response.user;
    })
    .then(() => {
      cy.login(userAdmin).then(function (response) {
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
    userComum = response;
    cy.login(userComum).then(function (response) {
      token = response.body.accessToken;
      cy.reviewMovie(idMovie, 3, "são muito velozes e pouco furiosos", token);
    });
  });
});

BeforeAll(() => {
  cy.createUser().then((response) => {
    userComum2 = response;
    cy.login(userComum2).then(function (response) {
      token = response.body.accessToken;
      cy.reviewMovie(idMovie, 4, "são muito velozes e nada furiosos", token);
    });
  });
});

AfterAll(() => {
  cy.promoteToAdminAndDeleteMovie(
    { email: userAdmin.email, password: userAdmin.password },
    idMovie
  ).then(() => {
    cy.deleteUser(userCritic);
    cy.deleteUser(userCritic2);
    cy.deleteUser(userComum);
    cy.deleteUser(userComum2);
    cy.deleteUser(userAdmin);
  });
});

Given(
  "que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb",
  function () {
    cy.visit("");
  }
);

Given("que o usuário do tipo comum esta logado no Frontend Raromdb", () => {
  cy.visit("/login");
  paginaMovies.typeEmail(userComum.email);
  paginaMovies.typeSenha(userComum.password);
  paginaMovies.clickButtonLogin();
});

Given(
  "que o usuário do tipo crítico acessou a tela de consulta de filmes no Frontend Raromdb",
  () => {
    cy.visit("/login");
    paginaMovies.typeEmail(userCritic.email);
    paginaMovies.typeSenha(userCritic.password);
    paginaMovies.clickButtonLogin();
  }
);

Given(
  "que o usuário do tipo administrador acessou a tela de consulta de filmes no Frontend Raromdb",
  () => {
    cy.visit("/login");
    paginaMovies.typeEmail(userAdmin.email);
    paginaMovies.typeSenha(userAdmin.password);
    paginaMovies.clickButtonLogin();
  }
);

Given(
  "que o usuário não logado acessou a tela de consulta de filmes no Frontend Raromdb",
  () => {
    cy.visit("");
  }
);

When("inserir um Id de filme válido na url", () => {
  cy.visit("/movies/" + idMovie);
});

When("inserir um Id inválido na url", () => {
  cy.visit("/movies/" + "aaaaaaaa-bbbb-1ccc-8ddd-eeeeeeeeeeee");
});

When("selecionar um filme na tela inicial", () => {
  paginaMovies.typeMovie("Velozes e Furiosos 10");
  paginaMovies.clickButtonBusca();
  paginaMovies.clickLabelMovie();
  cy.get([(href = "/movies/" + idMovie)]);
});

Then(
  "deverá visualizar a quantidade de avaliações da audiência realizadas",
  () => {
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

Then("deverá visualizar um campo habilitado para avaliar o filme", () => {
  cy.get(paginaMovies.inputTextReview).should("be.visible");
});

Then("deverá visualizar um campo desabilitado para avaliar o filme", () => {
  cy.get(paginaMovies.inputTextReview).should("be.visible");
});

Then("o usuário comum deverá avaliar o filme com sucesso", () => {
  paginaMovies.clickStar5();
  cy.get(paginaMovies.inputTextReview).clear();
  paginaMovies.typeReview("Gostei muito do filme");
  paginaMovies.clickButtonEnviarReview();
  cy.get(paginaMovies.review4).should("contain", "Gostei muito do filme");
});

Then("o usuário crítico deverá avaliar o filme com sucesso", () => {
  paginaMovies.clickStar5();
  cy.get(paginaMovies.inputTextReview).clear();
  paginaMovies.typeReview("Gostei muito do filme");
  paginaMovies.clickButtonEnviarReview();
  cy.get(paginaMovies.review2).should("contain", "Gostei muito do filme");
});

Then("o usuário administrador deverá avaliar o filme com sucesso", () => {
  cy.get(paginaMovies.star4).click();
  cy.get(paginaMovies.inputTextReview).clear();
  paginaMovies.typeReview("Gostei muito do filme");
  paginaMovies.clickButtonEnviarReview();
  cy.get(paginaMovies.review1).should("contain", "Gostei muito do filme");
});

Then("uma mensagem informando {string}", (entre) => {
  cy.get(paginaMovies.labelEntre).should("contain", entre);
});

Then(
  "deverá visualizar todas as avaliações realizadas no filme selecionado",
  () => {
    cy.get(paginaMovies.review1).should("be.visible");
    cy.get(paginaMovies.review2).should("be.visible");
    cy.get(paginaMovies.review3).should("be.visible");
    cy.get(paginaMovies.review4).should("be.visible");
    cy.get(paginaMovies.review5).should("be.visible");
  }
);

Then("todas as informações das avaliações", () => {
  cy.get(paginaMovies.reviewDateHour1).should("be.visible");
  cy.get(paginaMovies.reviewAvatar1).should("be.visible");
  cy.get(paginaMovies.reviewName1).should("be.visible");
  cy.get(paginaMovies.reviewText1).should("be.visible");
  cy.get(paginaMovies.reviewStars1).should("be.visible");
  cy.get(paginaMovies.reviewDateHour2).should("be.visible");
  cy.get(paginaMovies.reviewAvatar2).should("be.visible");
  cy.get(paginaMovies.reviewName2).should("be.visible");
  cy.get(paginaMovies.reviewText2).should("be.visible");
  cy.get(paginaMovies.reviewStars2).should("be.visible");
  cy.get(paginaMovies.reviewDateHour3).should("be.visible");
  cy.get(paginaMovies.reviewAvatar3).should("be.visible");
  cy.get(paginaMovies.reviewName3).should("be.visible");
  cy.get(paginaMovies.reviewText3).should("be.visible");
  cy.get(paginaMovies.reviewStars3).should("be.visible");
  cy.get(paginaMovies.reviewDateHour4).should("be.visible");
  cy.get(paginaMovies.reviewAvatar4).should("be.visible");
  cy.get(paginaMovies.reviewName4).should("be.visible");
  cy.get(paginaMovies.reviewText4).should("be.visible");
  cy.get(paginaMovies.reviewStars4).should("be.visible");
  cy.get(paginaMovies.reviewDateHour5).should("be.visible");
  cy.get(paginaMovies.reviewAvatar5).should("be.visible");
  cy.get(paginaMovies.reviewName5).should("be.visible");
  cy.get(paginaMovies.reviewText5).should("be.visible");
  cy.get(paginaMovies.reviewStars5).should("be.visible");
});

Then(
  "deverá visualizar o totalizador da média das avaliações da audiência realizadas no filme selecionado",
  () => {
    cy.get(paginaMovies.starAudience).should("be.visible");
  }
);
Then(
  "deverá visualizar o totalizador da média das avaliações da crítica realizadas no filme selecionado",
  () => {
    cy.get(paginaMovies.starCritic).should("be.visible");
  }
);
