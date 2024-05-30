///  <reference types="cypress" /> 
///  <reference path="../support/index.d.ts" />

describe('template spec', () => {
  let user
  let token

  after(function () {
    cy.deleteUser(user)
  })

  it('passes', () => {
    // cy.visit('https://example.cypress.io')
    cy.createUser({ password: "ksjdfasd" }, true).then(function (resposta) {
      cy.log('resposta', resposta)
      user = resposta
    })
  })
  it('descricao_do_teste', function () {
    cy.login(user).then(function (resposta) {
      token = resposta.body.accessToken

      // cy.promoteCritic(token)
      cy.promoteAdmin(token)
      // cy.getUser(user.id - 10, token)
      // cy.listAllUsers(token)

      // cy.reviewMovie({ movieId: 1, score: 4, reviewText: "review" }, token)
      // cy.getUserReviews(token)

      // cy.createMovie({
      //   description: "desc",
      //   durationInMinutes: 120,
      //   genre: "ação",
      //   releaseYear: 2020,
      //   title: "Filme QALabs"
      // }, token)

      // cy.getAllMovies()

      // cy.getMovie(8)

      // cy.deleteMovie(13, token)

      // cy.promoteToAdminAndDeleteMovie(user, 14)


      // cy.updateUser(user.id, { name: "novoNome", password: "novaSenha" }, token)
      // user.password = "novaSenha"

      cy.updateMovie(15, {
        description: "descrição novaaa",
        durationInMinutes: 60,
        genre: "comédia",
        releaseYear: 1997,
        title: "Filme QALabs"
      }, token)

      cy.searchMovie("qaLabs")
    })

  })
})