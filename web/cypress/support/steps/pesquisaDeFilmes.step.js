import {
    Before,
    After,
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";
import MoviesPage from "../pages/moviesPage";
import LoginPage from "../pages/loginPage";


const paginaMovies = new MoviesPage();

var filmeCriado;
var usuarioCriado;
var token;

before(function () {
    cy.createUserAndMovie({
        title: "Os 101 Dálmatas",
        genre: "Animação",
        description: "A estilista Anita e Roger, um escritor de jogos de computadores, se encontram, se apaixonam e se casam, juntamente com seus dálmatas Pongo e Perdita. Esta versão é explorada do ponto de vista de Timão (Nathan Lane) e Pumba (Ernie Sabella) e mostra como os dois se tornaram amigos.",
        durationInMinutes: 103,
        releaseYear: 1996
    }).then((response) => {
        filmeCriado = response.movie.body;
        usuarioCriado = response.user;
    });
});

after(function () {
    cy.login(usuarioCriado).then((login) => {
        token = login.body.accessToken
    }).then(function () {
        cy.deleteMovie(filmeCriado.id, token)
    })
})

Given('que o usuário acessou a página inicial do catálogo de filmes', function () {
    cy.visit('https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/');
})

Given('não realizou login', function () {

})

Given('realizou login', function () {
    cy.login(usuarioCriado).then((login) => {
        token = login.body.accessToken
    })
})

When('preencher o campo de pesquisa de filmes com um filme cadastrado', function () {
    paginaMovies.typeMovie(filmeCriado.title);
})

When('preencher o campo de pesquisa de filmes com o título completo do filme cadastrado', function () {
    paginaMovies.typeMovie(filmeCriado.title);
})

When('preencher o campo de pesquisa de filmes com parte do título de um filme cadastrado', function () {

    paginaMovies.typeMovie("101");
})

When('acessar a função de pesquisa', function () {
    paginaMovies.clickButtonBusca();
})

When('preencher o campo de pesquisa de pesquisa com um filme não cadastrado na base de dados', function () {
    paginaMovies.typeMovie("Take back your life");
})

When('clicar no card do filme', function () {
    paginaMovies.clickLabelMovie();
})

Then('o usuário deve ver o resultado da pesquisa para o filme informado', function () {
    cy.get(paginaMovies.labelMovie).should('be.visible')
    cy.get(paginaMovies.labelMovie).contains(filmeCriado.title);
})

Then('o usuário deve ver os detalhes do filme selecionado', function () {
    cy.get(paginaMovies.labelMovie).should('be.visible');
    cy.get(paginaMovies.labelMovie).contains(filmeCriado.title);
    cy.get(paginaMovies.labelImage).should('be.visible');
    cy.get(paginaMovies.starAudience).should('be.visible');
    cy.get(paginaMovies.starCritic).should('be.visible');
    cy.contains(filmeCriado.description);
    cy.contains(filmeCriado.releaseYear);
    cy.contains(filmeCriado.genre);
})

Then('o usuário deve ver uma mensagem indicando que nenhum filme foi encontrado', function () {
    cy.contains('p', 'Nenhum filme encontrado').should('be.visible');
})