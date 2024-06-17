///  <reference types="cypress" />
///  <reference path="../../support/index.d.ts" />

describe("Consulta geral de Usuários", function () {
  var usuarioCriado;
  var usuarioConsulta;
  var token;

  before(function () {
    //Criação usuário para ser consultado
    cy.createUser().then((newUser) => {
      usuarioConsulta = newUser;
    });
    //Criação usuário
    cy.createUser().then((newUser) => {
      usuarioCriado = newUser;
    });
  });

  //Exclusão dos usuários da base de dados
  after(function () {
    cy.deleteUser(usuarioCriado);
    cy.deleteUser(usuarioConsulta);
  });

  it("Não deve ser possível acessar as informações de um usuário sem efetuar login", function () {
    cy.request({
      method: "GET",
      url: "/api/users/" + usuarioConsulta.id,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body).to.deep.include({
        message: "Access denied.",
        error: "Unauthorized",
      });
    });
  });

  it("Não deve ser possível acessar as informações de um usuário sendo um usuário Comum", function () {
    cy.login(usuarioCriado).then((login) => {
      token = login.body.accessToken;
      cy.request({
        method: "GET",
        url: "/api/users/" + usuarioConsulta.id,
        failOnStatusCode: false,
        auth: {
          bearer: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(403);
        expect(response.body.message).to.equal("Forbidden");
      });
    });
  });

  it("Não deve ser possível acessar as informações de um usuário, sendo um usuário Crítico ", function () {
    cy.login(usuarioCriado).then((login) => {
      token = login.body.accessToken;
      cy.promoteCritic(token).then(function () {
        cy.request({
          method: "GET",
          url: "/api/users/" + usuarioConsulta.id,
          failOnStatusCode: false,
          auth: {
            bearer: token,
          },
        }).then((response) => {
          expect(response.status).to.equal(403);
          expect(response.body.message).to.equal("Forbidden");
        });
      });
    });
  });

  it("Não deve ser possível acessar as informações de um usuário, inserindo um id de usuário não cadastrado", function () {
    cy.login(usuarioCriado).then((login) => {
      token = login.body.accessToken;
      cy.promoteAdmin(token).then(function () {
        cy.request({
          method: "GET",
          url: "/api/users/" + "12123129381923813",
          failOnStatusCode: false,
          auth: {
            bearer: token,
          },
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.deep.equal("");
        });
      });
    });
  });

  it("Não deve ser possível acessar as informações de um usuário, inserindo um id inválido", function () {
    cy.login(usuarioCriado).then((login) => {
      token = login.body.accessToken;
      cy.promoteAdmin(token).then(function () {
        cy.request({
          method: "GET",
          url: "/api/users/" + "string",
          failOnStatusCode: false,
          auth: {
            bearer: token,
          },
        }).then((response) => {
          expect(response.status).to.equal(400);
          expect(response.body.error).to.equal("Bad Request");
          expect(response.body.message).to.equal(
            "Validation failed (numeric string is expected)"
          );
        });
      });
    });
  });

  it("Deve ser possível acessar as informações de um usuário, sendo um usuário Admin", function () {
    cy.login(usuarioCriado).then((login) => {
      token = login.body.accessToken;
      cy.promoteAdmin(token).then(function () {
        cy.request({
          method: "GET",
          url: "/api/users/" + usuarioConsulta.id,
          failOnStatusCode: false,
          auth: {
            bearer: token,
          },
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.deep.include({
            id: usuarioConsulta.id,
            name: usuarioConsulta.name,
            email: usuarioConsulta.email,
            active: usuarioConsulta.active,
            type: usuarioConsulta.type,
          });
        });
      });
    });
  });
});
