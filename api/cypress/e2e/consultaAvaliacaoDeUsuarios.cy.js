let userId;
let user0;
let user1;
let user2;
let token0;
let token1;
let token2;
let movie;
const scoreMovie = 3;
const reviewText = "isso";
const movieInfo = {
  title: "Tom e Jerry",
  genre: "Desenho",
  description: "comedia infantil",
  durationInMinutes: 150,
  releaseYear: 2004,
};

describe("Consulta de Avaliações de Usuários", () => {
  before(() => {
    cy.createAdminUser().then((responseUser) => {
      user1 = responseUser;
      userId = responseUser.id;
      token1 = user1.accessToken;

      cy.createMovie(movieInfo, token1).then((movieResponse) => {
        movie = movieResponse.body;

        //Duas avaliações iguais para teste de duplicidade
        cy.reviewMovie(movie.id, scoreMovie, reviewText, token1);
        cy.reviewMovie(movie.id, scoreMovie, reviewText, token1);

        cy.createUser().then((responseUser0) => {
          user0 = responseUser0;

          const userObject = {
            email: responseUser0.email,
            password: responseUser0.password,
          };

          cy.request({
            method: "POST",
            url: "/api/auth/login",
            body: userObject,
          }).then((response) => {
            token0 = response.body.accessToken;

            cy.createCriticUser().then((responseUser2) => {
              user2 = responseUser2;
              token2 = responseUser2.accessToken;
            });
          });
        });
      });
    });
  });

  after(() => {
    cy.deleteMovie(movie.id, token1);
  });

  it("Deve ser possível consultar avaliações como usuário comum", () => {
    cy.request({
      method: "GET",
      url: "/api/users/review/all",
      headers: {
        Authorization: `Bearer ${token0}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it("Deve ser possível consultar avaliações como usuário administrador", () => {
    cy.request({
      method: "GET",
      url: "/api/users/review/all",
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it("Deve ser possível consultar avaliações como usuário crítico", () => {
    cy.request({
      method: "GET",
      url: "/api/users/review/all",
      headers: {
        Authorization: `Bearer ${token2}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it("Não deve ser possivel usuário não autenticado acessar avaliações", () => {
    cy.request({
      method: "GET",
      url: "/api/users/review/all",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property("message", "Access denied.");
    });
  });

  it("Todas as avaliações atuais do usuário devem se listadas", () => {
    cy.request({
      method: "GET",
      url: "/api/users/review/all",
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      response.body.forEach((review) => {
        expect(review).to.have.property("movieId", movie.id);
        expect(review).to.have.property("movieTitle", movieInfo.title);
        expect(review).to.have.property("score", scoreMovie);
        expect(review).to.have.property("reviewText", reviewText);
      });
    });
  });

  it("Não devem existir avaliações em duplicidade", () => {
    cy.request({
      method: "GET",
      url: "/api/users/review/all",
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");

      const movieIds = [];
      response.body.forEach((review) => {
        expect(movieIds).not.to.include(review.movieId);
        movieIds.push(review.movieId);
      });
    });
  });

  it("Deve ser possível visualizar título, nota e texto avaliativo", () => {
    cy.request({
      method: "GET",
      url: "/api/users/review/all",
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      response.body.forEach((review) => {
        expect(review).to.have.property("movieId", movie.id);
        expect(review).to.have.property("movieTitle", movieInfo.title);
        expect(review).to.have.property("score", scoreMovie);
        expect(review).to.have.property("reviewText", reviewText);
      });
    });
  });

  it("O sistema não deve listar avaliações quando não há avaliações do usuário", () => {
    cy.request({
      method: "GET",
      url: "/api/users/review/all",
      headers: {
        Authorization: `Bearer ${token0}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      if (response.body.length === 0) {
        expect(response.body).to.have.lengthOf(0);
      } else {
        expect(response.body).to.have.lengthOf.at.least(1);
      }
    });
  });
});
