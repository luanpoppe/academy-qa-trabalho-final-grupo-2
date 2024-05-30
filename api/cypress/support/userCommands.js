import { faker } from "@faker-js/faker";
const user = {
    name: faker.person.firstName() + " teste",
    email: faker.internet.email(),
    password: faker.internet.password(8)
}

Cypress.Commands.add("createUser", function (newUser, acceptFail = false) {
    const userObject = {
        name: user.name,
        email: user.email,
        password: user.password,
        ...newUser
    }

    return cy.request({
        method: "POST",
        url: "/api/users",
        body: userObject,
        failOnStatusCode: !acceptFail
    }).then((response) => {
        if (response.status == 201) {
            const userCreated = {
                ...userObject,
                ...response.body,
                response: response
            }
            return userCreated
        } else {
            return response
        }
    });
});

Cypress.Commands.add("login", function (userInfo) {
    const userObject = {
        email: user.email,
        password: user.password,
        ...userInfo
    }

    return cy.request({
        method: 'POST',
        url: '/api/auth/login',
        body: userObject,
    })
})

Cypress.Commands.add("promoteAdmin", function (token) {
    return cy.request({
        method: 'PATCH',
        url: '/api/users/admin',
        auth: {
            bearer: token
        },
    })
})

Cypress.Commands.add("promoteCritic", function (token) {
    return cy.request({
        method: 'PATCH',
        url: '/api/users/apply',
        auth: {
            bearer: token
        },
    })
})

Cypress.Commands.add("deleteUser", function (userInfo) {
    let token
    const userObject = {
        email: userInfo.email,
        password: userInfo.password,
        id: userInfo.id
    }

    return cy.login(userObject).then((responseLogar) => {
        token = responseLogar.body.accessToken;
        cy.promoteAdmin(token).then(function (resposta) {
            cy.request({
                method: "DELETE",
                url: "/api/users/" + userObject.id,
                auth: {
                    bearer: token,
                },
            })
        })
    })
});

Cypress.Commands.add("listAllUsers", function (token) {
    return cy.request({
        method: 'GET',
        url: '/api/users',
        auth: {
            bearer: token
        },
    })
})

Cypress.Commands.add("getUser", function (userId, token = null) {
    return cy.request({
        method: 'GET',
        url: '/api/users/' + userId,
        auth: {
            bearer: token
        },
    })
})

Cypress.Commands.add("reviewMovie", function (movieInfo, token) {
    return cy.request({
        method: 'POST',
        url: '/api/users/review',
        body: {
            movieId: movieInfo.id || movieInfo.movieId,
            score: movieInfo.score,
            reviewText: movieInfo.review || movieInfo.reviewText
        },
        auth: {
            bearer: token
        },
    })
})

Cypress.Commands.add("getUserReviews", function (token) {
    return cy.request({
        method: 'GET',
        url: '/api/users/review/all',
        auth: {
            bearer: token
        },
    })
})