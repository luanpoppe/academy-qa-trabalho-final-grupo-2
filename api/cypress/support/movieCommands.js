import { faker } from "@faker-js/faker";
const apiUrl = "https://raromdb-3c39614e42d4.herokuapp.com";

Cypress.Commands.add("getAllMovies", function () {
  return cy.request({
    method: "GET",
    url: apiUrl + "/api/movies",
  });
});

Cypress.Commands.add("createMovie", function (movieInfo, token) {
  return cy.request({
    method: "POST",
    url: apiUrl + "/api/movies",
    body: {
      title: movieInfo.title,
      genre: movieInfo.genre,
      description: movieInfo.description,
      durationInMinutes: movieInfo.durationInMinutes,
      releaseYear: movieInfo.releaseYear,
    },
    auth: {
      bearer: token,
    },
  });
});

Cypress.Commands.add("updateMovie", function (movieId, movieInfo, token) {
  return cy.request({
    method: "PUT",
    url: apiUrl + "/api/movies/" + movieId,
    body: {
      title: movieInfo.title,
      genre: movieInfo.genre,
      description: movieInfo.description,
      durationInMinutes: movieInfo.durationInMinutes,
      releaseYear: movieInfo.releaseYear,
    },
    auth: {
      bearer: token,
    },
  });
});

Cypress.Commands.add("getMovie", function (movieId) {
  return cy.request({
    method: "GET",
    url: apiUrl + "/api/movies/" + movieId,
  });
});

Cypress.Commands.add("searchMovie", function (movieSearch) {
  return cy.request({
    method: "GET",
    url: apiUrl + "/api/movies/search?title=" + movieSearch,
  });
});

Cypress.Commands.add("deleteMovie", function (movieId, token) {
  return cy.request({
    method: "DELETE",
    url: apiUrl + "/api/movies/" + movieId,
    auth: {
      bearer: token,
    },
  });
});

Cypress.Commands.add(
  "promoteToAdminAndDeleteMovie",
  function (userInfo, movieId) {
    return cy
      .login({ email: userInfo.email, password: userInfo.password })
      .then(function (resposta) {
        const token = resposta.body.accessToken;
        cy.promoteAdmin(token).then(function () {
          return cy.request({
            method: "DELETE",
            url: apiUrl + "/api/movies/" + movieId,
            auth: {
              bearer: token,
            },
          });
        });
      });
  }
);

Cypress.Commands.add("createUserAndMovie", function (movieInfo) {
  let token;
  let userCreated;
  return cy
    .createUser({ email: faker.internet.email() })
    .then(function (resposta) {
      userCreated = resposta;
      return cy.login(resposta).then(function (resposta) {
        token = resposta.body.accessToken;
        return cy.promoteAdmin(token).then(function () {
          return cy
            .request({
              method: "POST",
              url: apiUrl + "/api/movies",
              body: {
                title: movieInfo.title,
                genre: movieInfo.genre,
                description: movieInfo.description,
                durationInMinutes: movieInfo.durationInMinutes,
                releaseYear: movieInfo.releaseYear,
              },
              auth: {
                bearer: token,
              },
            })
            .then(function (response) {
              return {
                movie: response,
                user: userCreated,
              };
            });
        });
      });
    });
});
Cypress.Commands.add(
  "reviewMovie",
  function (movieId, scoreMovie, reviewText, token) {
    return cy.request({
      method: "POST",
      url: apiUrl + "/api/users/review",
      body: {
        movieId: movieId,
        score: scoreMovie,
        reviewText: reviewText,
      },
      auth: {
        bearer: token,
      },
    });
  }
);
