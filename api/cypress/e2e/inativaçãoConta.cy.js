///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />
import { fakerPT_BR } from "@faker-js/faker";

describe('Inativação de conta de um usuário', function () {
    let usuarioCriado;
    let filmeCriado;
    let adminUser

    before(function () {
        cy.createAdminUser().then(function (resposta) {
            adminUser = resposta
        })
    })

    beforeEach(function () {
        cy.createUser().then((newUser) => {
            usuarioCriado = newUser;
            cy.login(usuarioCriado).then(function (resposta) {
                usuarioCriado.accessToken = resposta.body.accessToken
            })
        });
    });

    after(function () {
        cy.deleteUser(adminUser)
    })

    describe('Cenários com deleção de usuário ao fim do teste', function () {
        afterEach(function () {
            cy.deleteUser(usuarioCriado)
        })

        it('Não deve ser possível inativar conta, sem efetuar login', function () {
            cy.request({
                method: 'PATCH',
                url: 'api/users/inactivate',
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.equal(401);
                expect(response.body.message).to.be.eq('Access denied.');
                expect(response.body.error).to.be.eq('Unauthorized');
            });
        });

        it('Deve ser possível cadastrar um novo usuário com o e-mail de um usuário inativo', function () {
            usuarioCriado.name = fakerPT_BR.person.fullName();
            usuarioCriado.password = fakerPT_BR.internet.password({ length: 6 });

            cy.inactivateUser(usuarioCriado.accessToken).then(() => {
                cy.request({
                    method: "POST",
                    url: "/api/users/",
                    body: {
                        name: usuarioCriado.name,
                        email: usuarioCriado.email,
                        password: usuarioCriado.password,
                    }
                }).then((response) => {
                    expect(response.status).to.equal(201);
                    expect(response.body.email).to.deep.equal(usuarioCriado.email);
                })
            });
        });
    })

    it('Deve ser possível inativar a conta com sucesso, sendo um usuário Comum', function () {
        cy.request({
            method: "PATCH",
            url: "/api/users/inactivate",
            auth: {
                bearer: usuarioCriado.accessToken,
            },
        }).then((response) => {
            expect(response.status).to.equal(204);
            expect(response.body).to.equal("");
        })
    });

    it('Deve ser possível inativar a conta com sucesso, sendo um usuário Administrador', function () {
        cy.promoteAdmin(usuarioCriado.accessToken).then(function () {
            cy.request({
                method: "PATCH",
                url: "/api/users/inactivate",
                auth: {
                    bearer: usuarioCriado.accessToken,
                },
            }).then((response) => {
                expect(response.status).to.equal(204);
                expect(response.body).to.equal("");
            })
        });
    })

    it('Deve ser possível inativar a conta com sucesso, sendo um usuário Crítico', function () {
        cy.promoteCritic(usuarioCriado.accessToken).then(function () {
            cy.request({
                method: "PATCH",
                url: "/api/users/inactivate",
                auth: {
                    bearer: usuarioCriado.accessToken,
                },
            }).then((response) => {
                expect(response.status).to.equal(204);
                expect(response.body).to.equal("");
            })
        });
    });

    it('Deve ser possível visualizar as informações de uma review feita por um usuário em determinado filme, mesmo depois da inativação da sua conta', function () {
        cy.fixture("requests/filmesEvolucaoPerfil.json").then(function (fixture) {
            cy.createMovie(fixture.viva, adminUser.accessToken).then((movie) => {
                filmeCriado = movie.body
                cy.reviewMovie(filmeCriado.id, 5, "Amei! Superou minhas expectativas", usuarioCriado.accessToken).then(function () {
                    cy.inactivateUser(usuarioCriado.accessToken).then(function () {
                        cy.getMovie(filmeCriado.id).then((response) => {
                            expect(response.status).to.equal(200);
                            expect(response.body.reviews).to.be.an("array");
                            expect(response.body.reviews[0].user).to.deep.include({
                                id: usuarioCriado.id,
                                name: usuarioCriado.name
                            });
                        })
                    })
                })
            })
        });
    });
})
