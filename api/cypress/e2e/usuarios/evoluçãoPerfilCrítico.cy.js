///  <reference types="cypress" />
///  <reference path="../../support/index.d.ts" />

describe("Evolução de usuário para perfil crítico", function () {
  let usuarioCriado;
  let adminUser;
  let filme;
  let filmeCriado;

  beforeEach(function () {
    cy.createUser().then((newUser) => {
      usuarioCriado = newUser;
      cy.login(usuarioCriado).then(function (resposta) {
        usuarioCriado.accessToken = resposta.body.accessToken;
      });
    });
  });

  before(function () {
    cy.fixture("requests/filmesEvolucaoPerfil.json").then(function (fixture) {
      cy.createAdminUser().then(function (resposta) {
        adminUser = resposta;
        cy.createMovie(fixture.reiLeao, adminUser.accessToken).then(
          (novoFilme) => {
            filme = novoFilme.body;
            cy.createMovie(fixture.reiLeao2, adminUser.accessToken).then(
              (novoFilme) => {
                filmeCriado = novoFilme.body;
              }
            );
          }
        );
      });
    });
  });

  after(function () {
    cy.deleteMovie(filme.id, adminUser.accessToken).then(function () {
      cy.deleteMovie(filmeCriado.id, adminUser.accessToken).then(function () {
        cy.deleteUser(adminUser);
      });
    });
  });

  afterEach(function () {
    cy.deleteUser(usuarioCriado);
  });

  it("Não deve ser possível evoluir usuário para perfil crítico sem realizar Login", function () {
    cy.request({
      method: "PATCH",
      url: "/api/users/apply",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body).to.include({
        message: "Access denied.",
        error: "Unauthorized",
      });
    });
  });

  it("Deve ser possível evoluir usuário Comum para perfil crítico com sucesso", function () {
    cy.request({
      method: "PATCH",
      url: "/api/users/apply",
      auth: {
        bearer: usuarioCriado.accessToken,
      },
    }).then((response) => {
      expect(response.status).to.equal(204);
    });
  });

  it("Deve ser possível evoluir usuário Administrador para perfil crítico com sucesso", function () {
    cy.promoteAdmin(usuarioCriado.accessToken).then(function () {
      cy.request({
        method: "PATCH",
        url: "/api/users/apply",
        auth: {
          bearer: usuarioCriado.accessToken,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);
      });
    });
  });

  it("Deve ser possível identificar quando uma review for feita por um usuário Crítico", function () {
    cy.promoteCritic(usuarioCriado.accessToken).then(() => {
      cy.reviewMovie(
        filme.id,
        5,
        "Melhor filme de animação",
        usuarioCriado.accessToken
      ).then(function () {
        cy.listReviews(usuarioCriado.accessToken).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an("array");
          expect(response.body[0].reviewType).to.equal(1);
        });
      });
    });
  });

  it("Deve ser possível verificar que as reviews criadas por um usuário crítico impactam nas métricas de avaliação da crítica ", function () {
    cy.promoteCritic(usuarioCriado.accessToken).then(function () {
      cy.reviewMovie(
        filme.id,
        5,
        "O filme é incrível! Fiquei emocionada",
        usuarioCriado.accessToken
      ).then(function () {
        cy.getMovie(filme.id).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.deep.include({
            id: filme.id,
            title: filme.title,
            criticScore: 5,
          });
        });
      });
    });
  });

  it("Deve ser possível diferenciar os tipos de reviews feitas por um usuário, tendo ele perfil Comum e depois Crítico", function () {
    cy.reviewMovie(
      filme.id,
      5,
      "Melhor animação da Disney!",
      usuarioCriado.accessToken
    ).then(function () {
      cy.promoteCritic(usuarioCriado.accessToken).then(function () {
        cy.reviewMovie(
          filmeCriado.id,
          3,
          "O primeiro filme é muito melhor!",
          usuarioCriado.accessToken
        ).then(function () {
          cy.listReviews(usuarioCriado.accessToken).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an("array");
            expect(response.body[0].reviewType).to.equal(0);
            expect(response.body[1].reviewType).to.equal(1);
          });
        });
      });
    });
  });

  it("Deve ser possível verificar que as reviews criadas quando um usuário possui perfil comum, não sofrem alteração no seu tipo quando o usuário se torna Crítico", function () {
    cy.reviewMovie(
      filme.id,
      5,
      "Melhor animação da Disney!",
      usuarioCriado.accessToken
    ).then(function () {
      cy.promoteCritic(usuarioCriado.accessToken).then(function () {
        cy.listReviews(usuarioCriado.accessToken).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an("array");
          expect(response.body[0].reviewType).to.equal(0);
        });
      });
    });
  });
});
