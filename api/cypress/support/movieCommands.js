Cypress.Commands.add("getUserReviews", function (token) {
    return cy.request({
        method: 'GET',
        url: '/api/users/review/all',
        auth: {
            bearer: token
        },
    })
})