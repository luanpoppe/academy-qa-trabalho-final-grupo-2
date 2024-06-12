///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />

describe("Login de cadastros de usuários", () => {
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

    it("Não deve ser possível usuário autenticar-se informando email diferente de string", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/login",
        body: {
          email: 123456,
          password: "123456",
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          message: ["email must be an email"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível usuário autenticar-se informando email com string vazia", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/login",
        body: {
          email: "",
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

    it("Não deve ser possível usuário autenticar-se sem informar senha", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/login",
        body: {
          email: usuarioCriado.email,
          password: null,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          message: [
            "password must be a string",
            "password should not be empty",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível usuário autenticar-se informando senha diferente de string", () => {
      cy.request({
        method: "POST",
        url: "/api/auth/login",
        body: {
          email: usuarioCriado.email,
          password: 123456,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          message: ["password must be a string"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível usuário autenticar-se informando senha com string vazia", () => {
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
          message: ["password should not be empty"],
          error: "Bad Request",
          statusCode: 400,
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

    //utilizando token  que não está mais válido para tentar realizar a promoção a perfil crítico, ação que só pode ser realizada se o token ainda estiver válido
    it("Sessão de login do usuário deve expirar em 60 min", function () {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAyNiwiZW1haWwiOiJjYXJvbEBnZ2cuY29tIiwiaWF0IjoxNzE4MTEwNTQ2LCJleHAiOjE3MTgxMTQxNDZ9.O6Q6ZAS16gdyNJgwsnr7tbgp0faRXttlqUii3b4v-00";

      cy.request({
        method: "PATCH",
        url: "/api/users/apply",
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(401);
        expect(resposta.body).to.deep.equal({
          error: "Unauthorized",
          message: "Access denied.",
          statusCode: 401,
        });
      });
    });
  });
});
