///  <reference types="cypress" />
///  <reference path="../index.d.ts" />
import {
    Before,
    After,
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";
import CadastroPage from "../pages/cadastroPage"
import MoviesPage from "../pages/moviesPage";
import LoginPage from "../pages/loginPage";

let user
const paginaMovies = new MoviesPage();
const cadastroPage = new CadastroPage
const loginPage = new LoginPage()

Before(function () {
    cy.viewport("macbook-13")
    cy.visit("/login")
    cy.intercept('POST', '/api/users').as('cadastroUsuario')
    cy.createAdminUser().then(function (resposta) {
        user = resposta
    })
})

After(function () {
    cy.deleteUser(user)
})

Given('que acessei o site', function () {
    loginPage.login(user)
    // cy.wait('@cadastroUsuario').then(function (resposta) {
    //     user = {
    //         ...user,
    //         ...resposta.response.body
    //     }
    // })

    // cy.wait("@auth").then(function (resposta) {
    //     cy.login(user).then(function (resposta) {
    //         cy.promoteAdmin(resposta.body.accessToken)
    //     })
    // })
})