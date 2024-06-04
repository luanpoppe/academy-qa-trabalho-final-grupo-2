///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />
import { fakerPT_BR } from "@faker-js/faker";

describe('Evolução para perfil Administrador', function () {
    var usuarioCriado;
    var token;

    beforeEach(function () {
        cy.createUser().then((newUser) => {
            usuarioCriado = newUser;
        });
    });

    it('Não deve ser possível inativar conta, sem efetuar login', function () {
        cy.request({
            method: 'PATCH',
            url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/inactivate',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.be.eq('Access denied.');
            expect(response.body.error).to.be.eq('Unauthorized');
        });
    });

    it(' Deve ser possível inativar conta, sendo um usuário Comum', function () {

        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.InactivateUser(token).then((response) => {
                expect(response.status).to.equal(204);
                expect(response.body).to.equal("");
            })
        })
    });


    it('Deve ser possível inativar a conta com sucesso, sendo um usuário Administrador', function () {

        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.promoteAdmin(token).then(function () {
                cy.InactivateUser(token).then((response) => {
                    expect(response.status).to.equal(204);
                    expect(response.body).to.equal("");
                })
            });
        })
    });

    it('Deve ser possível inativar a conta com sucesso, sendo um usuário Crítico', function () {
        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.promoteCritic(token).then(function () {
                cy.InactivateUser(token).then((response) => {
                    expect(response.status).to.equal(204);
                    expect(response.body).to.equal("");
                })
            });
        });
    });

    it('Deve ser possível cadastrar um novo usuário com o e-mail de um usuário inativo', function () {

        let name = fakerPT_BR.person.fullName();
        let password = fakerPT_BR.internet.password(6);

        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.InactivateUser(token).then(() => {
                cy.request({
                    method: "POST",
                    url: "/api/users/",
                    body: {
                        name: name,
                        email: usuarioCriado.email,
                        password: password,
                    }
                    }).then((response) => {
                        expect(response.status).to.equal(201);
                        expect(response.body.email).to.deep.equal(usuarioCriado.email);
                })
            });
        });
    });
});