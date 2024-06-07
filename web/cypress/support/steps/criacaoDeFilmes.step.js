///  <reference types="cypress" />
///  <reference path="../index.d.ts" />
import {
    Before,
    AfterAll,
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";
import CadastroPage from "../pages/cadastroPage"
import MoviesPage from "../pages/moviesPage";

let user
const paginaMovies = new MoviesPage();
const cadastroPage = new CadastroPage

Before(function () {
    cy.intercept('POST', '/api/users').as('cadastroUsuario')
    cy.createAdminUser()
    cy.createUser().then(function (resposta) {
        user = resposta
    })
})

Given('que acessei o site', function () {
    cy.visit("/register")
    cadastroPage.registrarUsuario(user)
    cy.wait('@cadastroUsuario').then(function (resposta) {
        user = {
            ...user,
            ...resposta.response.body
        }
    })

    cy.wait("@auth").then(function (resposta) {
        cy.login(user).then(function (resposta) {
            cy.promoteAdmin(resposta.body.accessToken)
        })
    })
})