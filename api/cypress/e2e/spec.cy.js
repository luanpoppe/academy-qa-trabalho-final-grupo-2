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
      cy.getUser(user.id - 10, token)
      cy.listAllUsers(token)

      // cy.reviewMovie({ movieId: 1, score: 4, reviewText: "review" }, token)
      cy.getUserReviews(token)

    })

  })
})