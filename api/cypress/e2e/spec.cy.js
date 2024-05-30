///  <reference types="cypress" /> 
///  <reference path="../support/index.d.ts" />

describe('template spec', () => {
  let user

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
      cy.log('resposta', resposta)
    })
  })
})