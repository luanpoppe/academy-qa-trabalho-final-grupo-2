///  <reference types="cypress" />
///  <reference path="../index.d.ts" />
import {
  Before,
  After,
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import MoviesPage from "../pages/moviesPage";
import LoginPage from "../pages/loginPage";

let user
let movieInfo
const defaultReview = "Review do filme"
const paginaMovies = new MoviesPage();
const loginPage = new LoginPage()

// Hooks:
Before(function () {
  cy.viewport("macbook-13")
  cy.visit("/login")
  cy.intercept('POST', '/api/users').as('cadastroUsuario')
  cy.intercept('GET', '/api/movies/*').as('getMovie')
  cy.intercept('GET', '/api/users/*').as('getUser')
  cy.intercept('POST', '/api/users/review').as('sendReview')
  cy.createAdminUser().then(function (resposta) {
    user = resposta
    cy.fixture("requests/bodyNewMovie.json").then(function (movie) {
      cy.createMovie(movie, user.accessToken).then(function (resposta) {
        movieInfo = {
          ...movie,
          ...resposta.body
        }
      })
    })
  })
})

After(function () {
  cy.deleteMovie(movieInfo.id, user.accessToken)
  cy.deleteUser(user)
})

Before({ tags: "@commonUser" }, () => {
  cy.createUser().then(function (resposta) {
    cy.wrap(resposta).as("commonUser")
  })
})

Before({ tags: "@criticUser" }, () => {
  cy.createCriticUser().then(function (resposta) {
    cy.wrap(resposta).as("criticUser")
  })
})

Before({ tags: "@adminUser" }, () => {
  cy.createAdminUser().then(function (resposta) {
    cy.wrap(resposta).as("adminUser")
  })
})

After({ tags: "@commonUser" }, () => {
  cy.get("@commonUser").then(function (commonUser) {
    cy.deleteUser(commonUser)
  })
})

After({ tags: "@criticUser" }, () => {
  cy.get("@criticUser").then(function (criticUser) {
    cy.deleteUser(criticUser)
  })
})

After({ tags: "@adminUser" }, () => {
  cy.get("@adminUser").then(function (adminUser) {
    cy.deleteUser(adminUser)
  })
})

// Given
Given('que um usuário não está autenticado', function () {

})

Given('que um usuário comum está autenticado', function () {
  loginPage.login(this.commonUser)
  cy.wait("@login")
})

Given('que um usuário crítico está autenticado', function () {
  loginPage.login(this.criticUser)
  cy.wait("@login")
})

Given('que um usuário administrador está autenticado', function () {
  loginPage.login(this.adminUser)
  cy.wait("@login")
})

Given('que um usuário está autenticado', function () {
  loginPage.login(this.commonUser)
  cy.wait("@login")
})

Given('que já realizou uma review em um filme', function () {
  paginaMovies.visitMoviePage(movieInfo.id)
  paginaMovies.allReviewStars().eq(2).click()
  cy.get(paginaMovies.inputTextReview).type(defaultReview)
  paginaMovies.clickButtonEnviarReview()
})

Given('que tentou adicionar uma review em um filme sem definir uma nota', function () {
  paginaMovies.visitMoviePage(movieInfo.id)
  cy.get(paginaMovies.inputTextReview).type(defaultReview)
  paginaMovies.clickButtonEnviarReview()
})

// When
When('tentar adicionar uma review em um filme', function () {
  cy.visit("/movies/" + movieInfo.id)
  cy.wait('@getMovie')
})

When('acessar a seção de review de um filme', function () {
  cy.visit("/movies/" + movieInfo.id)
  cy.wait('@getMovie')
})

When('adicionar uma review em um filme', function () {
  paginaMovies.visitMoviePage(movieInfo.id)
  paginaMovies.allReviewStars().eq(2).click()
  cy.get(paginaMovies.inputTextReview).type(defaultReview)
  paginaMovies.clickButtonEnviarReview()
})

When('tentar adicionar uma review em um filme sem definir uma nota', function () {
  paginaMovies.visitMoviePage(movieInfo.id)
  cy.get(paginaMovies.inputTextReview).type(defaultReview)
  paginaMovies.clickButtonEnviarReview()
})

When('tentar tentar fechar a mensagem de erro {string}', function (comoFechar) {
  if (comoFechar == "buttonModal") {
    cy.get(paginaMovies.modalError.buttonModal).click()
  } else if (comoFechar == "outsideOfModal") {
    cy.get(paginaMovies.modalError.divModal).click(-50, 50, { force: true })
  }
})

When('tentar adicionar uma review em um filme apenas dando uma nota', function () {
  paginaMovies.visitMoviePage(movieInfo.id)
  paginaMovies.allReviewStars().eq(2).click()
  paginaMovies.clickButtonEnviarReview()
})

When('tentar realizar uma nova review no mesmo filme', function () {
  cy.wait('@getMovie')
  paginaMovies.allReviewStars().eq(4).click()
  cy.get(paginaMovies.inputTextReview).clear().type("Review do filme atualizada")
  paginaMovies.clickButtonEnviarReview()
})

When('tentar realizar uma nova review com um texto contendo mais de 500 caracteres', function () {
  cy.on('uncaught:exception', (err, runnable, promise) => {
    if (promise) {
      return false
    }
  })

  let largeReview = ""
  while (largeReview.length < 501) {
    largeReview += "a"
  }

  paginaMovies.visitMoviePage(movieInfo.id)
  paginaMovies.allReviewStars().eq(2).click()
  cy.get(paginaMovies.inputTextReview).type(largeReview)
  paginaMovies.clickButtonEnviarReview()
})


// Then
Then('só poderá dar nota de 1 a 5 ao filme', function () {
  cy.get(paginaMovies.labelStarReview + " span").should('have.length', 5)
})

Then('não deve conseguir cadastrar a review', function () {
  cy.get(paginaMovies.inputTextReview).should("be.disabled")
  paginaMovies.allReviewStars().each((star) => {
    expect(star).to.have.class("star-disabled")
  })
  cy.get(paginaMovies.buttonEntre).should('be.visible')
})

Then('deve poder ser redirecionado para a página de login', function () {
  cy.get(paginaMovies.buttonEntre).click()
  cy.location("pathname").should('equal', "/login")
})

Then('a review deve ser adicionada com sucesso {string}', function (typeUser) {
  cy.get('@sendReview').should('exist')
  cy.get(paginaMovies.cardUserReview).should('have.length', 1)
  cy.get(paginaMovies.nameUserReview).should('have.text', this[typeUser].name)
  cy.get(paginaMovies.textUserReview).should('have.text', defaultReview)
  cy.get(".star-container-reviewcard .filled").should('have.length', 3)
  cy.get(paginaMovies.avatarUserReview).should('exist')
})

Then('a review não deve ser adicionada', function () {
  cy.get(paginaMovies.modalError.divModal).should('exist')
  cy.get(paginaMovies.modalError.titleModal).should('have.text', "Ocorreu um erro")
  cy.get(paginaMovies.modalError.textModal).should('have.text', "Selecione uma estrela para avaliar o filme")
  cy.get(paginaMovies.modalError.buttonModal).should('have.text', "Ok")

  cy.get(paginaMovies.modalError.buttonModal).click()
  cy.get(paginaMovies.cardUserReview).should('not.exist')
})

Then('a mensagem de erro deve ser fechada', function () {
  cy.get(paginaMovies.modalError.divModal).should('not.exist')
})

Then('o filme deverá continuar com apenas uma review do usuário', function () {
  cy.get('@sendReview').should('exist')
  cy.get(paginaMovies.cardUserReview).should('have.length', 1)
})

Then('a review do usuário deve ser atualizada', function () {
  cy.get(paginaMovies.nameUserReview).should('have.text', this.commonUser.name)
  cy.get(paginaMovies.textUserReview).should('have.text', "Review do filme atualizada")
  cy.get(".star-container-reviewcard .filled").should('have.length', 5)
  cy.get(paginaMovies.avatarUserReview).should('exist')
})

Then('não deverá conseguir digitar mais de 500 caracteres', function () {
  cy.get(paginaMovies.inputTextReview).invoke("val").should('have.length', 500)
})