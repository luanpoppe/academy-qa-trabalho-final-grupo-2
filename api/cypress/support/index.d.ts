/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Login description
        */
        createUser(newUser: {
            name: string
            email: string
            password: string
        }): Chainable<any>

        deleteUser(userInfo: {
            email: string
            password: string
            id: string
        }): Chainable<any>
    }
}