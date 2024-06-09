import { fakerPT_BR } from "@faker-js/faker";

describe("Cenários de testes de criação de usuário", function () {
  let email;
  let name = fakerPT_BR.person.fullName();
  let password = fakerPT_BR.internet.password(6);
  let id;

  describe("Cenários de testes de criação de usuário com falhas", function () {
    email = fakerPT_BR.internet.email();

    it("Não deve ser possível cadastrar usuário sem passar nenhuma informações no Request Body", () => {
      cy.request({
        method: "POST",
        url: "/api/users/",
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          message: [
            "name must be longer than or equal to 1 characters",
            "name must be a string",
            "name should not be empty",
            "email must be longer than or equal to 5 characters",
            "email must be an email",
            "email should not be empty",
            "password must be longer than or equal to 6 characters",
            "password must be a string",
            "password should not be empty",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível cadastrar usuário sem informar campo nome", function () {
      cy.request({
        method: "POST",
        url: "/api/users",
        body: {
          name: null,
          email: email,
          password: password,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          error: "Bad Request",
          message: [
            "name must be longer than or equal to 1 characters",
            "name must be a string",
            "name should not be empty",
          ],
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível cadastrar usuário preenchendo campo nome com string vazia", function () {
      cy.request({
        method: "POST",
        url: "/api/users",
        body: {
          name: "",
          email: email,
          password: password,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          error: "Bad Request",
          message: [
            "name must be longer than or equal to 1 characters",
            "name should not be empty",
          ],
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível cadastrar usuário preenchendo campo nome diferente de string", () => {
      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: 123456,
          email: email,
          password: password,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          message: [
            "name must be longer than or equal to 1 and shorter than or equal to 100 characters",
            "name must be a string",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível cadastrar usuário com nome com mais de 100 caracteres", () => {
      let nomeCaractere = "";
      for (let i = 0; i < 101; i++) {
        nomeCaractere += "C";
      }
      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: nomeCaractere,
          email: email,
          password: password,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          message: ["name must be shorter than or equal to 100 characters"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível cadastrar usuário com nome preenchido com espaços", () => {
      let nomeEspaco = "     ";

      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: nomeEspaco,
          email: email,
          password: password,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.include({
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível cadastrar usuário sem informar campo email", function () {
      cy.request({
        method: "POST",
        url: "/api/users",
        body: {
          name: name,
          email: null,
          password: password,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          message: [
            "email must be longer than or equal to 5 characters",
            "email must be an email",
            "email should not be empty",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível cadastrar usuário preenchendo campo email com string vazia", function () {
      cy.request({
        method: "POST",
        url: "/api/users",
        body: {
          name: name,
          email: "",
          password: password,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          message: [
            "email must be longer than or equal to 5 characters",
            "email must be an email",
            "email should not be empty",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível cadastrar usuário preenchendo campo email diferente de string", function () {
      cy.request({
        method: "POST",
        url: "/api/users",
        body: {
          name: name,
          email: 123456,
          password: password,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          message: [
            "email must be longer than or equal to 5 and shorter than or equal to 60 characters",
            "email must be an email",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível cadastrar usuário com email inválido", function () {
      const listEmails = [
        "carolinemaia",
        "carolineMaia@",
        "carole@gmail",
        "@gmail.com",
        "carolhotmail.com",
        "carol@br",
        "carolll.com",
        "     @gmail.com",
      ];
      listEmails.forEach(function (email) {
        cy.request({
          method: "POST",
          url: "/api/users/",
          body: {
            name: name,
            email: email,
            password: password,
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
    });

    it("Não deve ser possível cadastrar usuário com email com mais de 60 caracteres", function () {
      let emailCaractere = "";
      for (let i = 0; i < 52; i++) {
        emailCaractere += "c";
      }
      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: name,
          email: emailCaractere + "@raro.com",
          password: password,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          message: ["email must be shorter than or equal to 60 characters"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possivel cadastrar usuário com email já cadastrado", function () {
      let localUser;
      cy.createUser()
        .then(function (resposta) {
          localUser = resposta;
        })
        .then(function () {
          cy.request({
            method: "POST",
            url: "/api/users",
            body: {
              name: localUser.name,
              email: localUser.email,
              password: localUser.password,
            },
            failOnStatusCode: false,
          }).then((resposta) => {
            expect(resposta.status).to.equal(409);
            expect(resposta.body).to.deep.equal({
              message: "Email already in use",
              error: "Conflict",
              statusCode: 409,
            });
          });
        });
    });

    it.only("Não deve ser possivel cadastrar usuário com email em letra minuscula utilizando email já cadastrado com letra maiuscula", function () {
      let emailMaiusc = fakerPT_BR.internet.email().toUpperCase();
      let localUser;
      cy.createUser({ email: emailMaiusc })
        .then(function (resposta) {
          localUser = resposta;
        })
        .then(function () {
          cy.request({
            method: "POST",
            url: "/api/users",
            body: {
              name: localUser.name,
              email: emailMaiusc.toLowerCase(),
              password: localUser.password,
            },
            failOnStatusCode: false,
          }).then((resposta) => {
            expect(resposta.status).to.equal(409);
            expect(resposta.body).to.deep.equal({
              message: "Email already in use",
              error: "Conflict",
              statusCode: 409,
            });
          });
        });
    });

    it.only("Não deve ser possivel cadastrar usuário com email em letra maiuscula utilizando email já cadastrado com letra minuscula", function () {
      let emailMinusc = fakerPT_BR.internet.email().toLowerCase();
      let localUser;
      cy.createUser({ email: emailMinusc })
        .then(function (resposta) {
          localUser = resposta;
        })
        .then(function () {
          cy.request({
            method: "POST",
            url: "/api/users",
            body: {
              name: localUser.name,
              email: emailMinusc.toUpperCase(),
              password: localUser.password,
            },
            failOnStatusCode: false,
          }).then((resposta) => {
            expect(resposta.status).to.equal(409);
            expect(resposta.body).to.deep.equal({
              message: "Email already in use",
              error: "Conflict",
              statusCode: 409,
            });
          });
        });
    });

    it("Não deve ser possível cadastrar usuário sem informar campo senha", function () {
      cy.request({
        method: "POST",
        url: "/api/users",
        body: {
          name: name,
          email: email,
          password: null,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          message: [
            "password must be longer than or equal to 6 characters",
            "password must be a string",
            "password should not be empty",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível cadastrar usuário utilizando uma senha menor que 6 caracteres", () => {
      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: name,
          email: email,
          password: "12345",
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          message: ["password must be longer than or equal to 6 characters"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível cadastrar usuário utilizando uma senha maior que 12 caracteres", () => {
      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: name,
          email: email,
          password: "1234567891234",
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          message: ["password must be shorter than or equal to 12 characters"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });

    it("Não deve ser possível cadastrar usuário preenchendo campo senha diferente de string", () => {
      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: name,
          email: email,
          password: 123456,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.deep.equal({
          message: [
            "password must be longer than or equal to 6 and shorter than or equal to 12 characters",
            "password must be a string",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });
  });

  describe("Cenários de teste de criação de usuário com sucesso", function () {
    beforeEach(() => {
      email = fakerPT_BR.internet.email().toLowerCase();
    });

    afterEach(() => {
      cy.deleteUser({
        email: email,
        id: id,
        password: password,
      });
    });

    it("Deve ser possível cadastrar usuário com dados válidos", function () {
      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: name,
          email: email,
          password: password,
        },
      }).then((resposta) => {
        expect(resposta.status).to.equal(201);
        expect(resposta.body).to.deep.include({
          name: name,
          email: email,
        });
        expect(resposta.body.id).to.be.a("number");
        id = resposta.body.id;
      });
    });

    it("Deve ser possível cadastrar usuário com nome de 99 caracteres", function () {
      let nomeCaractere = "";
      for (let i = 0; i < 99; i++) {
        nomeCaractere += "C";
      }
      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: nomeCaractere,
          email: email,
          password: password,
        },
      }).then((resposta) => {
        expect(resposta.status).to.equal(201);
        expect(resposta.body).to.deep.include({
          name: nomeCaractere,
          email: email,
          type: 0,
          active: true,
        });
        expect(resposta.body.id).to.be.a("number");
        id = resposta.body.id;
      });
    });

    it("Deve ser possível cadastrar usuário com nome de 100 caracteres", function () {
      let nomeCaractere = "";
      for (let i = 0; i < 100; i++) {
        nomeCaractere += "C";
      }
      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: nomeCaractere,
          email: email,
          password: password,
        },
      }).then((resposta) => {
        expect(resposta.status).to.equal(201);
        expect(resposta.body).to.include({
          name: nomeCaractere,
          email: email,
          type: 0,
          active: true,
        });
        expect(resposta.body.id).to.be.a("number");
        id = resposta.body.id;
      });
    });

    it("Deve ser possível cadastrar usuário com nome de 1 caractere", function () {
      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: "C",
          email: email,
          password: password,
        },
      }).then((resposta) => {
        expect(resposta.status).to.equal(201);
        expect(resposta.body).to.include({
          name: "C",
          email: email,
          type: 0,
          active: true,
        });
        expect(resposta.body.id).to.be.a("number");
        id = resposta.body.id;
      });
    });

    it("Deve ser possível cadastrar usuário com email de 60 caracteres", function () {
      while (email.length < 60) {
        email += "m";
      }

      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: name,
          email: email,
          password: password,
        },
      }).then((resposta) => {
        expect(resposta.status).to.equal(201);
        expect(resposta.body).to.deep.include({
          email: email,
          name: name,
          type: 0,
          active: true,
        });
        expect(resposta.body.id).to.be.a("number");
        id = resposta.body.id;
      });
    });

    it("Deve ser possível cadastrar usuário com email de 6 caracteres", function () {
      email = "l@g.en";

      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: name,
          email: email,
          password: password,
        },
      }).then((resposta) => {
        expect(resposta.status).to.equal(201);
        expect(resposta.body).to.deep.include({
          email: email,
          name: name,
          type: 0,
          active: true,
        });
        expect(resposta.body.id).to.be.a("number");
        id = resposta.body.id;
      });
    });

    it("Deve ser possível cadastrar usuário com senha de 6 caracteres", function () {
      password = "123456";

      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: name,
          email: email,
          password: password,
        },
      }).then((resposta) => {
        expect(resposta.status).to.equal(201);
        expect(resposta.body).to.deep.include({
          email: email,
          name: name,
          type: 0,
          active: true,
        });
        id = resposta.body.id;
      });
    });

    it("Deve ser possível cadastrar usuário com senha de 12 caracteres", function () {
      password = "123456789123";

      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: name,
          email: email,
          password: password,
        },
      }).then((resposta) => {
        expect(resposta.status).to.equal(201);
        expect(resposta.body).to.deep.include({
          email: email,
          name: name,
          type: 0,
          active: true,
        });
        id = resposta.body.id;
      });
    });
  });
});
