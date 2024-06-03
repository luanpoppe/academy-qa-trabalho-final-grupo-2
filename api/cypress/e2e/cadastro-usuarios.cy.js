import { fakerPT_BR } from "@faker-js/faker";

describe("Cenários de testes de criação de usuário", function () {
  let email;
  let name;
  let password;
  let id;
  let token;

  describe("Cenários de testes de criação de usuário com falhas", function () {
    let usuarioCadastrado;
    before(() => {
      cy.fixture("usuarioCadastrado.json").then((usuario) => {
        usuarioCadastrado = usuario;
      });
    });
    it("Não deve ser possível cadastrar usuário sem informar campo nome", function () {
      email = fakerPT_BR.internet.email();
      password = fakerPT_BR.internet.password(6);
      cy.request({
        method: "POST",
        url: "/api/users",
        body: {
          name: null,
          email: email,
          password: senha,
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

    it("Não deve ser possível cadastrar usuário sem informar campo email", function () {
      name = fakerPT_BR.person.fullName();
      password = fakerPT_BR.internet.password(6);
      cy.request({
        method: "POST",
        url: "/api/users",
        body: {
          name: nome,
          email: null,
          password: senha,
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

    it("Não deve ser possível cadastrar usuário sem informar campo senha", function () {
      name = fakerPT_BR.person.fullName();
      email = fakerPT_BR.internet.email();

      cy.request({
        method: "POST",
        url: "/api/users",
        body: {
          name: nome,
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

    it("Não deve ser possível cadastrar usuário um senha menor que 6 caracteres", () => {
      name = fakerPT_BR.person.fullName();
      email = fakerPT_BR.internet.email();
      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: nome,
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

    it("Não deve ser possível cadastrar usuário um senha maior que 12 caracteres", () => {
      name = fakerPT_BR.person.fullName();
      email = fakerPT_BR.internet.email();
      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: nome,
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

    it("Não deve ser possível cadastrar usuário com email inválido", () => {
      name = fakerPT_BR.person.fullName();
      password = fakerPT_BR.internet.password(6);

      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: nome,
          email: "@raro.com.br",
          password: senha,
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

    it("Não deve ser possível cadastrar usuário com nome com mais de 100 caracteres", () => {
      email = fakerPT_BR.internet.email();
      password = fakerPT_BR.internet.password(6);

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
          password: senha,
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

    it("Não deve ser possível cadastrar usuário com email com mais de 60 caracteres", () => {
      name = fakerPT_BR.person.fullName();
      password = fakerPT_BR.internet.password(6);

      let emailCaractere = "";
      for (let i = 0; i < 52; i++) {
        emailCaractere += "c";
      }
      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: nome,
          email: emailCaractere + "@raro.com",
          password: senha,
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

    it("Não deve ser possível cadastrar usuário preenchendo campo 'name' diferente de string", () => {
      email = fakerPT_BR.internet.email();
      password = fakerPT_BR.internet.password(6);
      cy.request({
        method: "POST",
        url: "/api/users/",
        body: {
          name: 1234567,
          email: email,
          password: senha,
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
    // it.only("Não deve ser possivel cadastrar usuário com email já cadastrado", () => {
    //   cy.request({
    //     method: "POST",
    //     url: "/api/users",
    //     body: {
    //       name: usuarioCadastrado.name,
    //       email: usuarioCadastrado.email,
    //       password: usuarioCadastrado.password,
    //     },
    //     failOnStatusCode: false,
    //   }).then((resposta) => {
    //     expect(resposta.status).to.equal(409);
    //     expect(resposta.body).to.deep.equal({
    //       message: "Email already in use",
    //       error: "Conflict",
    //       statusCode: 409,
    //     });
    //   });
    // });
  });
});
