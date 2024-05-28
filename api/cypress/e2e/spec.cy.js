///  <reference types="cypress" /> 
///  <reference path="../support/index.d.ts" />

describe('template spec', () => {
  let user

  it('passes', () => {
    // cy.visit('https://example.cypress.io')
    cy.createUser({ password: "senhaa" }).then(function (resposta) {
      console.log('resposta', resposta)
      user = resposta
      cy.deleteUser(user)
    })

  })
})