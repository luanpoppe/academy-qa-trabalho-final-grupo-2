///  <reference types="cypress" />
///  <reference path="../index.d.ts" />
import {
  Given,
  When,
  Then,
  BeforeAll,
  AfterAll,
} from "@badeball/cypress-cucumber-preprocessor";
import listagemDeFilmesPage from "../pages/ListagemDeFilmesPage";
import LoginPage from "../pages/loginPage";
import CadastroPage from "../pages/cadastroPage";

const cadastroPage = new CadastroPage();
const loginPage = new LoginPage();
const listFilmePage = new listagemDeFilmesPage();
let user;
let filmes = [];
let usuarioCriado;

BeforeAll(() => {
  cy.createAdminUser().then((resposta) => {
    user = resposta;
    cy.fixture("requests/bodyCreateMovies.json").then((filmesFixture) => {
      cy.wrap(filmesFixture).each((filme) => {
        cy.createMovie(filme, user.accessToken).then(function (resposta) {
          filmes.push(resposta.body);
        });
      });
    });
  });
});

AfterAll(() => {
  cy.wrap(filmes)
    .each((filme) => {
      cy.deleteMovie(filme.id, user.accessToken);
    })
    .then(() => {
      cy.deleteUser(user);
    });
});

Given("que usuário acessou a página de listagem de filme", () => {
  cy.intercept("GET", "/api/movies/*").as("getMovie");
  listFilmePage.visit();
  listFilmePage.listaDeFilmes().should("exist");
});

When("o usuário não está autenticado", () => {
  cy.get(cadastroPage.buttonsHeader).contains("Registre-se");
});

When("o usuário comum está autenticado", () => {
  cy.createUser().then(function (userComum) {
    usuarioCriado = userComum;
    listFilmePage.clickLogin();
    loginPage.login(usuarioCriado);
  });
});

When("o usuário crítico está autenticado", () => {
  cy.createCriticUser().then(function (userCritic) {
    usuarioCriado = userCritic;
    listFilmePage.clickLogin();
    loginPage.login(usuarioCriado);
  });
});

When("o usuário administrador está autenticado", function () {
  cy.createAdminUser().then(function (userAdm) {
    usuarioCriado = userAdm;
    listFilmePage.clickLogin();
    loginPage.login(usuarioCriado);
  });
});

When("o usuário estiver na lista de filmes", () => {});

When("selecionar um filme da lista", () => {
  listFilmePage.selecionarPrimeiroFilme();
  cy.wait("@getMovie");
});

When("acessar lista de filmes mais bem avaliados", () => {
  cy.get("h3").contains("Mais bem avaliados");
});

When("houver mais filmes do que podem ser exibidos em uma página", () => {
  cy.get(".featured-movies .movie-card").should("have.length", 5);
});

Then("verá os filmes listados na ordem em que foram cadastrados", () => {
  let filmeAnterior = 0;
  cy.get(".featured-movies .movie-card").each((filme) => {
    let idAtual = filme.attr("href").split("/")[2];
    expect(parseInt(idAtual)).to.be.greaterThan(filmeAnterior);
    filmeAnterior = parseInt(idAtual);
  });
});

Then("deve conseguir visualizar a lista de filmes sem restrições", () => {
  listFilmePage.listaDeFilmes().should("exist");
});

Then(
  "verá o id, title, description, durationInMinutes, releaseYear e uma imagem de capa para cada filme",
  () => {
    cy.get(listFilmePage.gridFilme).within(() => {
      cy.get(listFilmePage.tituloFilme).should("exist");
      cy.get(listFilmePage.descricaoFilme).should("exist");
      cy.get(listFilmePage.iconeFilme).should("exist");
      cy.get(listFilmePage.iconeFilme).eq(0).should("exist");
      cy.get(listFilmePage.iconeFilme).eq(1).should("exist");
      cy.get(listFilmePage.iconeFilme).eq(2).should("exist");
    });
  }
);

Then("verá os filmes listados com os mais avaliados primeiro", () => {
  let notaAnterior = 101;
  cy.get(".top-rated-movies .movie-card-footer label").each((nota) => {
    let notaFilme =
      nota.text() == "--" ? 0 : parseFloat(nota.text().split("%")[0]);
    expect(notaFilme <= notaAnterior).to.equal(true);
    notaAnterior = notaFilme;
  });
});

Then("visualizar opções de paginação", () => {
  cy.get(".navigation").eq(1).should("exist").and("be.enabled");
});

When("acessar a próxima página", () => {
  listFilmePage.navegarParaProximaPaginaCadastro();
});

When("selecionar o primeiro filme da lista", () => {
  listFilmePage.selecionarPrimeiroFilme();
  cy.wait("@getMovie");
});

Then("verá informações detalhadas sobre o filme", () => {
  cy.get(".movie-grid").within(() => {
    cy.get(".movie-details-title").should("exist");
    cy.get(".movie-detail-description").should("exist");
    cy.get(".movie-details-info-with-icon").should("exist");
    cy.get(".movie-details-info-with-icon").eq(0).should("exist");
    cy.get(".movie-details-info-with-icon").eq(1).should("exist");
    cy.get(".movie-details-info-with-icon").eq(2).should("exist");
  });
});

When("existem menos de 5 filmes na lista", () => {
  cy.intercept("GET", "/api/movies", {
    fixture: "responses/responseBodyGetMovies2.json",
  }).as("getFilmes2");
  listFilmePage.visit();
  listFilmePage.listaDeFilmes().eq(0).should("exist");
});

When("visualizar a lista de filmes", () => {
  cy.wait("@getFilmes2");
});

Then("não verá opções de paginação", () => {
  cy.get("button.navigation").eq(1).should("exist").and("be.disabled");
});

When("existem mais de 5 filmes na lista", () => {
  cy.intercept("GET", "/api/movies", {
    fixture: "responses/responseBodyGetMovies6.json",
  }).as("getFilmes6");
  listFilmePage.visit();
  listFilmePage.listaDeFilmes().eq(0).should("exist");
});

When("visualizar uma opção de paginação", () => {
  cy.wait("@getFilmes6");
  cy.get("button.navigation").eq(1).should("be.enabled");
});

When("acessar a proxima pagina", () => {
  listFilmePage.navegarParaProximaPaginaCadastro();
});

Then("verá a próxima página de filmes", () => {
  cy.get(".carousel-data").eq(0).should("exist");
  cy.get(".navigation").eq(0).should("be.enabled");
  cy.get(".featured-movies .movie-card").should("have.length.at.least", 1);
});

Then(
  "será possível ver informações sobre os filmes na página de listagem",
  function () {
    cy.get(".movie-card").each((filme) => {
      cy.wrap(filme).within(() => {
        cy.get(".movie-poster").should("exist");
        cy.get(".movie-card-footer label").should("exist");
        cy.get(".movie-title").should("exist");
        cy.get("p").should("exist");
      });
    });
  }
);
