///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />

describe("Login de cadastros de usuários", () => {
  let email;
  let nome;
  let password;
  let id;
  let token;
  let usuarioCriado;

  beforeEach(() => {
    cy.createUser().then((newUser) => {
      usuarioCriado = newUser;
    });
  });

  afterEach(() => {
    cy.deleteUser(usuarioCriado);
  });

  describe("Cenários de falhas de autenticação do usuário", function () {
    it("Não deve ser possível usuário autenticar-se sem informar email", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/login",
        body: {
          email: null,
          password: "123456",
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          message: ["email should not be empty", "email must be an email"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível usuário autenticar-se sem informar senha", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/login",
        body: {
          email: usuarioCriado.email,
          password: "",
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          message: "password should not be empty",
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível usuário autenticar-se com e-mail não cadastradado", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/login",
        body: {
          email: "emailnaoexistente1234@bol.com",
          password: usuarioCriado.password,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(401);
        expect(resposta.body).to.deep.equal({
          message: "Invalid username or password.",
          error: "Unauthorized",
          statusCode: 401,
        });
      });
    });

    it("Não deve ser possível usuário autenticar-se com senha incorreta", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/login",
        body: {
          email: usuarioCriado.email,
          password: "aaaaa",
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(401);
        expect(resposta.body).to.deep.equal({
          message: "Invalid username or password.",
          error: "Unauthorized",
          statusCode: 401,
        });
      });
    });
  });

  describe("Cenário de autenticação válida de usuários", function () {
    it("Deve ser possível usuário cadastrado autenticar-se com sucesso", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/login",
        body: {
          email: usuarioCriado.email,
          password: usuarioCriado.password,
        },
      }).then((resposta) => {
        expect(resposta.status).to.equal(200);
        expect(resposta.body.accessToken).to.be.a("string");
        token = resposta.body.accessToken;
      });
    });

    it.only("Sessão de login do usuário deve expirar em 60 min", function () {
      cy.login(usuarioCriado).as("login");

      cy.clock();
      cy.tick(62 * 60 * 1000); //60 min em milissegundos

      cy.get("@login").then((login) => {
        token = login.body.accessToken;
        cy.promoteCritic(token);
      });
    });
  });
});
