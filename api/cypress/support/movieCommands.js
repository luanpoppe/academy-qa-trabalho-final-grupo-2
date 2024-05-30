Cypress.Commands.add("getAllMovies", function () {
    return cy.request({
        method: 'GET',
        url: '/api/movies',
    })
})

Cypress.Commands.add("createMovie", function (movieInfo, token) {
    return cy.request({
        method: 'POST',
        url: '/api/movies',
        body: {
            title: movieInfo.title,
            genre: movieInfo.genre,
            description: movieInfo.description,
            durationInMinutes: movieInfo.durationInMinutes,
            releaseYear: movieInfo.releaseYear
        },
        auth: {
            bearer: token
        },
    })
})

Cypress.Commands.add("updateMovie", function (movieId, movieInfo, token) {
    return cy.request({
        method: 'PUT',
        url: '/api/movies/' + movieId,
        body: {
            title: movieInfo.title,
            genre: movieInfo.genre,
            description: movieInfo.description,
            durationInMinutes: movieInfo.durationInMinutes,
            releaseYear: movieInfo.releaseYear
        },
        auth: {
            bearer: token
        },
    })
})

Cypress.Commands.add("getMovie", function (movieId) {
    return cy.request({
        method: 'GET',
        url: '/api/movies/' + movieId,
    })
})

Cypress.Commands.add("searchMovie", function (movieSearch) {
    return cy.request({
        method: 'GET',
        url: '/api/movies/search?title=' + movieSearch,
    })
})

Cypress.Commands.add("deleteMovie", function (movieId, token) {
    return cy.request({
        method: 'DELETE',
        url: "/api/movies/" + movieId,
        auth: {
            bearer: token
        }
    })
})

Cypress.Commands.add("promoteToAdminAndDeleteMovie", function (userInfo, movieId) {
    return cy.login({ email: userInfo.email, password: userInfo.password })
        .then(function (resposta) {
            const token = resposta.body.accessToken
            return cy.request({
                method: 'DELETE',
                url: "/api/movies/" + movieId,
                auth: {
                    bearer: token
                }
            })
        })
})