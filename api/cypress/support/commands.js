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

Cypress.Commands.add("deleteUser", function (userInfo) {
    let token
    const userObject = {
        email: userInfo.email,
        password: userInfo.password,
        id: userInfo.id
    }

    cy.request({
        method: "POST",
        url: "/api/auth/login",
        body: {
            email: userObject.email,
            password: userObject.password,
        },
    }).then((responseLogar) => {
        token = responseLogar.body.accessToken;
        cy.request({
            method: "PATCH",
            url: "/api/users/admin",
            auth: {
                bearer: token,
            },
        })
    }).then(() => {
        cy.request({
            method: "DELETE",
            url: "/api/users/" + userObject.id,
            auth: {
                bearer: token,
            },
        })
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