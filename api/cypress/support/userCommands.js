import { faker } from "@faker-js/faker";
const apiUrl = "https://raromdb-3c39614e42d4.herokuapp.com";

Cypress.Commands.add("createUser", function (newUser, acceptFail = false) {
  const userObject = {
    name: faker.person.firstName() + " teste",
    email: faker.internet.email(),
    password: faker.internet.password(8),
    ...newUser,
  };

  return cy
    .request({
      method: "POST",
      url: apiUrl + "/api/users",
      body: userObject,
      failOnStatusCode: !acceptFail,
    })
    .then((response) => {
      const userCreated = {
        ...userObject,
        ...response.body,
        response: response,
      };
      return userCreated;
    });
});

Cypress.Commands.add("updateUser", function (userId, newUserInfos, token) {
  return cy.request({
    method: "PUT",
    url: apiUrl + "/api/users/" + userId,
    body: {
      name: newUserInfos.name,
      password: newUserInfos.password,
    },
    auth: {
      bearer: token,
    },
  });
});

Cypress.Commands.add("login", function (userInfo) {
  const userObject = {
    email: userInfo.email,
    password: userInfo.password,
  };

  return cy.request({
    method: "POST",
    url: apiUrl + "/api/auth/login",
    body: userObject,
  });
});

Cypress.Commands.add("promoteAdmin", function (token) {
  return cy.request({
    method: "PATCH",
    url: apiUrl + "/api/users/admin",
    auth: {
      bearer: token,
    },
  });
});

Cypress.Commands.add("promoteCritic", function (token) {
  return cy.request({
    method: "PATCH",
    url: apiUrl + "/api/users/apply",
    auth: {
      bearer: token,
    },
  });
});

Cypress.Commands.add("deleteUser", function (userInfo) {
  let token;
  const userObject = {
    email: userInfo.email,
    password: userInfo.password,
    id: userInfo.id,
  };

  return cy.login(userObject).then((responseLogar) => {
    token = responseLogar.body.accessToken;
    return cy.promoteAdmin(token).then(function () {
      return cy.request({
        method: "DELETE",
        url: apiUrl + "/api/users/" + userObject.id,
        auth: {
          bearer: token,
        },
      });
    });
  });
});

Cypress.Commands.add("listAllUsers", function (token) {
  return cy.request({
    method: "GET",
    url: apiUrl + "/api/users",
    auth: {
      bearer: token,
    },
  });
});

Cypress.Commands.add("getUser", function (userId, token = null) {
  return cy.request({
    method: "GET",
    url: apiUrl + "/api/users/" + userId,
    auth: {
      bearer: token,
    },
  });
});

// Cypress.Commands.add("reviewMovie", function (movieInfo, token) {
//   return cy.request({
//     method: "POST",
//     url: apiUrl + "/api/users/review",
//     body: {
//       movieId: movieInfo.id || movieInfo.movieId,
//       score: movieInfo.score,
//       reviewText: movieInfo.review || movieInfo.reviewText,
//     },
//     auth: {
//       bearer: token,
//     },
//   });
// });

Cypress.Commands.add("getUserReviews", function (token) {
  return cy.request({
    method: "GET",
    url: apiUrl + "/api/users/review/all",
    auth: {
      bearer: token,
    },
  });
});

Cypress.Commands.add("InactivateUser", function (token) {
  return cy.request({
    method: "PATCH",
    url: apiUrl + "/api/users/inactivate",
    auth: {
      bearer: token,
    },
  });
});

Cypress.Commands.add("createAdminUser", function () {
  cy.createUser().then(function (resposta) {
    let user = resposta
    cy.login(user).then(function (resposta) {
      user = {
        ...user,
        ...resposta.body
      }
      cy.promoteAdmin(resposta.body.accessToken).then(function () {
        return cy.wrap(user)
      })
    })
  })
})