///  <reference types="cypress" />
///  <reference path="../index.d.ts" />
import {
  BeforeAll,
  AfterAll,
  Before,
  After,
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

import MoviesPage from "../pages/moviesPage";
import LoginPage from "../pages/loginPage";
const paginaMovies = new MoviesPage();
const paginaLogin = new LoginPage()

let userAdmin;
let idMovie;
let userCritic;
let userCritic2;
let userComum;
let userComum2;
let user

BeforeAll(() => {
  cy.fixture("requests/bodyNewMovie.json").then((movieBody) => {
    cy.createUserAndMovie(movieBody).then((response) => {
      idMovie = response.movie.body.id;
      userAdmin = response.user;
      cy.reviewMovie(idMovie, 5, "são realmente muito velozes e mega furiosos", userAdmin.accessToken);
      cy.createCriticUser().then((response) => {
        userCritic = response;
        cy.reviewMovie(idMovie, 2, "são pouco velozes e nada furiosos", userCritic.accessToken);
      })
      cy.createCriticUser().then((response) => {
        userCritic2 = response;
        cy.reviewMovie(idMovie, 1, "não são velozes nem furiosos", userCritic2.accessToken);
      })
      cy.createUser().then((response) => {
        userComum = response;
        cy.login(userComum).then(function (response) {
          userComum.accessToken = response.body.accessToken;
          cy.reviewMovie(idMovie, 3, "são muito velozes e pouco furiosos", userComum.accessToken);
        });
      })
      cy.createUser().then((response) => {
        userComum2 = response;
        cy.login(userComum2).then(function (response) {
          userComum2.accessToken = response.body.accessToken;
          cy.reviewMovie(idMovie, 4, "são muito velozes e nada furiosos", userComum2.accessToken);
        });
      });
    })
  })
});

Before(() => {
  cy.createUser().then((response) => {
    user = response
    cy.login(user).then(function (response) {
      user.accessToken = response.body.accessToken
    })
  })
})

After(function () {
  cy.deleteUser(user)
})

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

Given("que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb", function () {
  cy.visit("/");
}
);

Given("que o usuário do tipo comum esta logado no Frontend Raromdb", () => {
  cy.visit("/login");
  paginaLogin.login(userComum)
});

Given("que o usuário do tipo crítico acessou a tela de consulta de filmes no Frontend Raromdb", () => {
  cy.visit("/login");
  paginaLogin.login(userCritic)
}
);

Given("que o usuário do tipo administrador acessou a tela de consulta de filmes no Frontend Raromdb", () => {
  cy.visit("/login");
  paginaLogin.login(userAdmin)
  // paginaMovies.typeEmail(userAdmin.email);
  // paginaMovies.typeSenha(userAdmin.password);
  // paginaMovies.clickButtonLogin();
}
);

Given(
  "que o usuário não logado acessou a tela de consulta de filmes no Frontend Raromdb", () => {
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
  cy.get(`[href='/movies/${idMovie}']`).click()
});

Then(
  "deverá visualizar a quantidade de avaliações da audiência realizadas",
  () => {
    cy.get(paginaMovies.labelAudience).should("be.visible").and("contain", "Avaliação da audiência")
    cy.get(paginaMovies.labelQtdAudience).should("be.visible").and("contain", "2 avaliações")
  }
);

Then(
  "deverá visualizar a quantidade de avaliações da crítica realizadas",
  () => {
    cy.get(paginaMovies.labelCritic).should("be.visible").and("contain", "Avaliação da crítica")
    cy.get(paginaMovies.labelQtdCritic).should("be.visible").and("contain", "2 avaliações")
  }
);

Then("deverá visualizar todas as informações do filme selecionado", () => {
  cy.get(paginaMovies.labelTitle).should("be.visible").and("contain", "Velozes e Furiosos 10")
  cy.get(paginaMovies.labelGenre).should("be.visible").and("contain", "Ação")
  cy.get(paginaMovies.labelDescription).should("be.visible").and("contain", "O fim da estrada esta chegando")
  cy.get(paginaMovies.labelYear).should("be.visible").and("contain", "2024")
  cy.get(paginaMovies.labelHour).should("be.visible").and("contain", "2h 0m")
  cy.get(paginaMovies.labelGenre).should("be.visible").and("contain", "Ação")
});

Then("o sistema deverá exibir uma mensagem de erro", () => {
  cy.get(paginaMovies.erroIdinválido).should("be.visible");
  cy.get(paginaMovies.erroIdinválido).should("contain", "Unexpected Application Error!");
  cy.get(paginaMovies.statusIdInválido).should("be.visible");
  cy.get(paginaMovies.statusIdInválido).should("contain", "Request failed with status code 400");
});

Then("deverá visualizar o Id do filme selecionado na url", () => {
  cy.location("pathname").should("equal", "/movies/" + idMovie);
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
  paginaMovies.clickStartReview(5)
  paginaMovies.createUserReview("Gostei muito do filme")
  paginaMovies.getUserReview(4).should("contain", "Gostei muito do filme");
});

Then("o usuário crítico deverá avaliar o filme com sucesso", () => {
  paginaMovies.clickStartReview(5)
  paginaMovies.createUserReview("Gostei muito do filme")
  paginaMovies.getUserReview(2).should("contain", "Gostei muito do filme");
});

Then("o usuário administrador deverá avaliar o filme com sucesso", () => {
  paginaMovies.clickStartReview(4)
  paginaMovies.createUserReview("Gostei muito do filme")
  paginaMovies.getUserReview(1).should("contain", "Gostei muito do filme");
});

Then("uma mensagem informando {string}", (entre) => {
  cy.get(paginaMovies.labelEntre).should("contain", entre);
});

Then(
  "deverá visualizar todas as avaliações realizadas no filme selecionado",
  () => {
    paginaMovies.allUserReviews().should("have.length", 5)
    paginaMovies.allUserReviews().each((review) => {
      cy.wrap(review).should("be.visible")
    })
  }
);

Then("todas as informações das avaliações", () => {
  paginaMovies.allReviewDateHour().should("have.length", 5).each((date) => {
    cy.wrap(date).should('be.visible')
  })
  paginaMovies.allReviewAvatar().should("have.length", 5).each((avatar) => {
    cy.wrap(avatar).should('be.visible')
  })
  paginaMovies.allReviewNames().should("have.length", 5).each((name) => {
    cy.wrap(name).should('be.visible')
  })
  paginaMovies.allReviewTexts().should("have.length", 5).each((text) => {
    cy.wrap(text).should('be.visible')
  })
  paginaMovies.allReviewUserStars().should("have.length", 5).each((stars) => {
    cy.wrap(stars).should('be.visible')
  })
});

Then(
  "deverá visualizar o totalizador da média das avaliações da audiência realizadas no filme selecionado",
  () => {
    cy.get(paginaMovies.starAudience).should("be.visible");
    cy.get(paginaMovies.singleStarsAudience + " .filled ").should('have.length', 4)
    cy.get(paginaMovies.singleStarsCritic + " .filled ").should('have.length', 1)
    cy.get(paginaMovies.singleStarsCritic + " .filled-half ").should('have.length', 1)
  }
);
Then(
  "deverá visualizar o totalizador da média das avaliações da crítica realizadas no filme selecionado",
  () => {
    cy.get(paginaMovies.starCritic).should("be.visible");
    cy.get(paginaMovies.singleStarsAudience + " .filled ").should('have.length', 4)
    cy.get(paginaMovies.singleStarsCritic + " .filled ").should('have.length', 1)
    cy.get(paginaMovies.singleStarsCritic + " .filled-half ").should('have.length', 1)
  }
);
