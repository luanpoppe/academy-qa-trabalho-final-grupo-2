import {
    Given,
    When,
    Then,
    BeforeAll,
    AfterAll
} from "@badeball/cypress-cucumber-preprocessor";
import MoviesPage from "../pages/moviesPage";
import LoginPage from "../pages/loginPage";


const paginaMovies = new MoviesPage();
const paginaLogin = new LoginPage();

var filmeCriado;
var usuarioCriado;

BeforeAll(function () {
    cy.fixture("./requests/bodyNewMovie3").then(function (filme) {
        cy.createUserAndMovie(filme).then((response) => {
            filmeCriado = response.movie.body;
            usuarioCriado = response.user;
        });
    })

});

AfterAll(function () {
    cy.deleteMovie(filmeCriado.id, usuarioCriado.accessToken).then(function (resposta) {
        cy.deleteUser(usuarioCriado)
    })
})

Given('que o usuário acessou a página inicial do catálogo de filmes', function () {
    cy.visit('/');
})

Given('não realizou login', function () {

})

Given('realizou login', function () {
    cy.visit("/login")
    paginaLogin.login(usuarioCriado)
    cy.wait("@login")
    cy.contains("Perfil")
})

When('preencher o campo de pesquisa de filmes com um filme cadastrado', function () {
    paginaMovies.typeMovie(filmeCriado.title);
})

When('preencher o campo de pesquisa de filmes com o título completo do filme cadastrado', function () {
    paginaMovies.typeMovie(filmeCriado.title);
})

When('preencher o campo de pesquisa de filmes com parte do título de um filme cadastrado', function () {
    const tituloFilme = filmeCriado.title
    if (tituloFilme.length > 4) {
        paginaMovies.typeMovie(tituloFilme.slice(0, 4));
    } else {
        paginaMovies.typeMovie(tituloFilme.slice(0, 2));
    }

})

When('acessar a função de pesquisa', function () {
    paginaMovies.clickButtonBusca();
})

When('preencher o campo de pesquisa de pesquisa com um filme não cadastrado na base de dados', function () {
    cy.intercept('GET', '/api/movies/search?title=*', {
        body: []
    }).as('getMovies')
    paginaMovies.typeMovie("Take back your life");
})

When('clicar no card do filme', function () {
    cy.get(`[href='/movies/${filmeCriado.id}']`).click()
})

Then('o usuário deve ver o resultado da pesquisa para o filme informado', function () {
    cy.get(paginaMovies.labelMovie).should('be.visible')
    cy.get(paginaMovies.labelMovie).contains(filmeCriado.title);
    cy.get(`[href='/movies/${filmeCriado.id}']`).should("exist")
})

Then('o usuário deve ver os detalhes do filme selecionado', function () {
    cy.get(paginaMovies.labelMovie).should('be.visible').and("contain", filmeCriado.title)
    cy.get(paginaMovies.labelImage).should('be.visible');
    cy.get(paginaMovies.starAudience).should('be.visible');
    cy.get(paginaMovies.starCritic).should('be.visible');
    cy.get(paginaMovies.labelHour).should("be.visible")
    cy.contains(filmeCriado.description);
    cy.contains(filmeCriado.releaseYear);
    cy.contains(filmeCriado.genre);
})

Then('o usuário deve ver uma mensagem indicando que nenhum filme foi encontrado', function () {
    cy.contains('p', 'Nenhum filme encontrado').should('be.visible');
})