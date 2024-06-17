///  <reference types="cypress" />
import {
    Before,
    BeforeAll,
    After,
    AfterAll,
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/loginPage"
import MoviesPage from "../pages/moviesPage"
import { PerfilPage } from "../pages/perfilPage"

const loginPage = new LoginPage()
const perfilPage = new PerfilPage()
const moviesPage = new MoviesPage()
let adminUser
let user
let movies = []
const reviewTexts = ["Um filme de qualidade duvidosa", "Um filme muy bueno"]

BeforeAll(function () {
    cy.intercept('GET', '/api/users/review/all').as('getUserReviews')
    cy.createAdminUser().then(function (resposta) {
        adminUser = resposta
        cy.fixture("requests/bodyCreateMovies.json").then(function (fixture) {
            const tempMovies = [fixture[0], fixture[1]]
            cy.wrap(tempMovies).each((filme) => {
                cy.createMovie(filme, adminUser.accessToken).then(function (resposta) {
                    movies.push(resposta.body)
                    cy.reviewMovie(resposta.body.id, 1, "Avaliação do usuário administrador", adminUser.accessToken)
                })
            })
        })
    })
})

Before({ tags: "@usuarioAutenticado" }, function () {
    cy.createUser().then(function (resposta) {
        user = resposta
        cy.login(user).then(function (resposta) {
            user.accessToken = resposta.body.accessToken
        })
    })
})

AfterAll(function () {
    cy.wrap(movies).each(function (filme) {
        cy.deleteMovie(filme.id, adminUser.accessToken)
    }).then(function () {
        cy.deleteUser(adminUser)
    })
})

After({ tags: "@usuarioAutenticado" }, function () {
    cy.deleteUser(user)
})

Given('que o usuário não está autenticado', function () {
    cy.visit("/")
    cy.contains("Login")
})

Given('que o usuário está autenticado', function () {
    cy.intercept('GET', '/api/users/review/all').as('getUserReviews')
    cy.visit("/login")
    loginPage.login(user)
})

Given('já realizou avaliações de filmes', function () {
    cy.reviewMovie(movies[0].id, 3, reviewTexts[0], user.accessToken)
    cy.reviewMovie(movies[1].id, 5, reviewTexts[1], user.accessToken)
})

Given('realizou mais de uma avaliação para o mesmo filme', function () {
    cy.reviewMovie(movies[0].id, 4, reviewTexts[0], user.accessToken).then(function () {
        cy.reviewMovie(movies[0].id, 5, reviewTexts[1], user.accessToken)
    })
})

Given('não realizou avaliação de nenhum filme', function () {

})

When('acessar a seção de minhas avaliações', function () {
    cy.get(".navbar-content a").contains("Perfil").click()
    cy.wait('@getUserReviews')
})

When('tentar visualizar suas avaliações de filmes', function () {
    cy.visit("/profile")
})

Then('o usuário não deve conseguir acessar a seção de minhas avaliações', function () {
    cy.location("pathname").should("equal", "/login")
    cy.get(".navbar-content a").should("not.contain", "Perfil")
})

Then('verá apenas os registros de avaliações do próprio usuário', function () {
    cy.get(perfilPage.divsAvaliacoesUsuario).should("have.length", 2)
})

Then('todas as avaliações do próprio usuário devem ser listadas', function () {
    cy.get(perfilPage.divsAvaliacoesUsuario).should("have.length", 2)
    cy.get(perfilPage.allReviewMovieTitles).should("contain.text", movies[0].title)
    cy.get(perfilPage.allReviewMovieTitles).should("contain.text", movies[1].title)
})

Then('não verá avaliações duplicadas para o mesmo filme', function () {
    cy.get(perfilPage.divsAvaliacoesUsuario).should("have.length", 1)
    cy.get(perfilPage.allReviewMovieTitles).should("contain.text", movies[0].title)
    cy.get(perfilPage.containerOfMovieStars + " .filled").should("have.length", 5)
})

Then('verá o título, nota e texto avaliativo de cada filme avaliado', function () {
    cy.get(perfilPage.divsAvaliacoesUsuario).should("have.length", 2)
    cy.get(perfilPage.allReviewMovieTitles).should("contain.text", movies[0].title).and("contain.text", movies[1].title)
    cy.get(perfilPage.containerOfMovieStars).eq(0).find(".filled").should("have.length", 3)
    cy.get(perfilPage.containerOfMovieStars).eq(1).find(".filled").should("have.length", 5)
    cy.get(perfilPage.divsAvaliacoesUsuario).should("contain.text", reviewTexts[0]).and("contain.text", reviewTexts[1])
})

Then('poderá acessar os detalhes adicionais dos filmes avaliados', function () {
    cy.get(perfilPage.divsAvaliacoesUsuario).eq(0).click()
    cy.location("pathname").should("equal", `/movies/${movies[0].id}`)
    cy.contains(movies[0].title)
    cy.contains(movies[0].description)
    cy.contains(movies[0].releaseYear)
})

Then('poderá atualizar sua avaliação sobre o filme', function () {
    const novaReview = "Nova review com nota baixa"
    cy.get(moviesPage.inputTextReview).clear()
    cy.get(moviesPage.inputTextReview).type(novaReview)
    moviesPage.clickStartReview(2)
    moviesPage.clickButtonEnviarReview()
    cy.get(moviesPage.cardUserReview).should("contain.text", novaReview)
})

Then('verá o titulo {string} e não haverá avaliações', function (titulo) {
    cy.get(perfilPage.titleProfile).should("have.text", titulo)
    cy.get(moviesPage.divsAvaliacoesUsuario).should('not.exist')
})