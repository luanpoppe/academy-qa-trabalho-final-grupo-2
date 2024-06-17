///  <reference types="cypress" />
///  <reference path="../index.d.ts" />
import {
  Given,
  When,
  Then,
  BeforeAll,
  AfterAll,
} from "@badeball/cypress-cucumber-preprocessor";
import ListagemDeFilmesPage from "../pages/ListagemDeFilmesPage";
import LoginPage from "../pages/loginPage";
import CadastroPage from "../pages/cadastroPage";

const cadastroPage = new CadastroPage();
const loginPage = new LoginPage();
const listFilmePage = new ListagemDeFilmesPage();
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

Given("que usuário acessou a página inicial de listagem de filme", () => {
  cy.intercept("GET", "/api/movies/*").as("getMovie");
  listFilmePage.visit();
  cy.wait("@getFilmes")
  listFilmePage.listaDeFilmes().should("exist");
});

Given('que usuário está na segunda página de listagem de filmes', function () {
  cy.intercept("GET", "/api/movies/*").as("getMovie");
  listFilmePage.visit();
  cy.wait("@getFilmes")
  listFilmePage.listaDeFilmes().should("exist");
  listFilmePage.botaoAvancarFilmesDestaque().click()
})

Given('que existem mais de 5 filmes na lista', function () {
  cy.intercept("GET", "/api/movies", {
    fixture: "responses/responseBodyGetMovies6.json",
  }).as("getFilmes");
})

Given('que não existem filmes cadastrados', function () {
  cy.intercept("GET", "/api/movies", {
    body: [],
  }).as("getFilmes0")
})

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

When("o usuário estiver na lista de filmes", () => { });

When("selecionar um filme da lista", () => {
  listFilmePage.selecionarPrimeiroFilme();
  cy.wait("@getMovie");
});

When("acessar lista de filmes mais bem avaliados", () => {
  cy.get("h3").contains("Mais bem avaliados");
});

Given("que há mais filmes do que podem ser exibidos em uma página", () => {
  cy.intercept("GET", "/api/movies", {
    fixture: "responses/responseBodyGetMovies6.json",
  }).as("getFilmes");
});

When('tentar retornar para a primeira parte', function () {
  listFilmePage.botaoRetornarFilmesDestaque().click()
})

When('usuário acessar a página de listagem de filmes', function () {
  listFilmePage.visit();
  cy.wait("@getFilmes0")
})

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
  listFilmePage.botaoAvancarFilmesDestaque().should("exist").and("be.enabled");
});

When("acessar a próxima página", () => {
  listFilmePage.navegarParaProximaPaginaCadastro();
});

When("selecionar o primeiro filme da lista", () => {
  listFilmePage.selecionarPrimeiroFilme();
  cy.wait("@getMovie");
});

Then("verá informações detalhadas sobre o filme", () => {
  cy.get(listFilmePage.gridFilme).within(() => {
    cy.get(listFilmePage.tituloFilme).should("exist");
    cy.get(listFilmePage.descricaoFilme).should("exist");
    cy.get(listFilmePage.iconeFilme).should("exist");
    cy.get(listFilmePage.iconeFilme).eq(0).should("exist");
    cy.get(listFilmePage.iconeFilme).eq(1).should("exist");
    cy.get(listFilmePage.iconeFilme).eq(2).should("exist");
  });
});

Given("que existem menos de 5 filmes na lista", () => {
  cy.intercept("GET", "/api/movies", {
    fixture: "responses/responseBodyGetMovies2.json",
  }).as("getFilmes");
});

When("visualizar a lista de filmes", () => {
  cy.wait("@getFilmes2");
});

When('usuário acessar a lista de filmes', function () {
  listFilmePage.visit();
  listFilmePage.listaDeFilmes().eq(0).should("exist");
  cy.wait("@getFilmes")
})

Then("não verá opções de paginação", () => {
  listFilmePage.botaoAvancarFilmesDestaque().should("exist").and("be.disabled");
});

When("visualizar uma opção de paginação", () => {
  cy.get(".featured-movies .movie-card").should("have.length", 5);
  listFilmePage.botaoAvancarFilmesDestaque().should("be.enabled");
});

When("acessar a proxima pagina", () => {
  listFilmePage.navegarParaProximaPaginaCadastro();
});

Then("verá a próxima página de filmes", () => {
  listFilmePage.listaDeFilmes().eq(0).should("exist");
  listFilmePage.botaoRetornarFilmesDestaque().should("be.enabled");
  cy.get(listFilmePage.cardsFilmesEmDestaque).should("have.length.at.least", 1);
});

Then(
  "será possível ver informações sobre os filmes na página de listagem",
  function () {
    cy.get(listFilmePage.cardsTodosFilmes).each((filme) => {
      cy.wrap(filme).within(() => {
        cy.get(listFilmePage.postersFilmes).should("exist");
        cy.get(listFilmePage.porcentagemFilme).should("exist");
        cy.get(listFilmePage.tituloFilmes).should("exist");
        cy.get("p").should("exist");
      });
    });
  });

Then('deve conseguir retornar com sucesso', function () {
  listFilmePage.botaoRetornarFilmesDestaque().should("be.disabled")
  listFilmePage.botaoAvancarFilmesDestaque().should("be.enabled")
})

Then('deverá ver mensagem informando que não há filmes cadastrados', function () {
  cy.get(".main").should("contain.text", "Ops! Parece que ainda não temos nenhum filme.")
})