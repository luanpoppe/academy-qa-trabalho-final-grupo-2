/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
        createUser(newUser?: {
            name: string
            email: string
            password: string
        }, acceptFail?: boolean): Chainable<any>

        updateUser(userId: number, newUserInfos: {
            name: string,
            password: string
        }, token: string): Chainable<any>

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

        reviewMovie(movieId: number, scoreMovie: number, reviewText: string, token: string): Chainable<any>

        getUserReviews(token: string): Chainable<any>

        listReviews(token: string): Chainable<any>

        getAllMovies(): Chainable<any>

        getMovie(movieId: number): Chainable<any>

        searchMovie(movieSearch: string): Chainable<any>

        createMovie(movieInfo: {
            title: string
            genre: string
            description: string
            durationInMinutes: number
            releaseYear: number
        }, token: string): Chainable<any>

        createUserAndMovie(movieInfo: {
            title: string
            genre: string
            description: string
            durationInMinutes: number
            releaseYear: number
        }): Chainable<any>

        updateMovie(movieId: number, movieInfo: {
            title: string
            genre: string
            description: string
            durationInMinutes: number
            releaseYear: number
        }, token: string): Chainable<any>

        deleteMovie(movieId: number, token: string): Chainable<any>

        promoteToAdminAndDeleteMovie(userInfo: { email: string, password: string }, movieId: number): Chainable<any>

        createAdminUser(): Chainable<any>

        createCriticUser(): Chainable<any>

        inactivateUser(userToken: string): Chainable<any>
    }
}