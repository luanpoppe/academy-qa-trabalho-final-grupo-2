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
        }, acceptFail: boolean): Chainable<any>

        login(userInfo: {
            email: string
            password: string
        }): Chainable<any>

        promoteAdmin(token: string): Chainable<any>

        promoteCritic(token: string): Chainable<any>

        deleteUser(userInfo: {
            email: string
            password: string
            id: string
        }): Chainable<any>

        listAllUsers(token: string): Chainable<any>

        getUser(userId: number, token?: string): Chainable<any>

        reviewMovie(movieInfo: { movieId: number, score: number, reviewText: string }, token: string): Chainable<any>

        getUserReviews(token: string): Chainable<any>
    }
}