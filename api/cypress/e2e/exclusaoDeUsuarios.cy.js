///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />

describe('Exclusão de Usuários', function () {
    let usuarioCriado;
    let filmeCriado;

    beforeEach(function () {
        cy.createUser().then((newUser) => {
            usuarioCriado = newUser
            cy.login(usuarioCriado).then(function (resposta) {
                usuarioCriado.accessToken = resposta.body.accessToken
            })
        });
    });

    describe('Cenários com exclusão de usuário após o fim dos testes', function () {
        afterEach(function () {
            cy.deleteUser(usuarioCriado)
        })

        it('Não deve ser possível realizar exclusão de uma conta, sem efetuar login ', function () {
            cy.request({
                method: 'DELETE',
                url: '/api/users/' + usuarioCriado.id,
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.equal(401);
                expect(response.body).to.deep.include({
                    message: 'Access denied.',
                    error: 'Unauthorized'
                });
            });
        });

        it('Não deve ser possível realizar exclusão de uma conta, sendo um usuário com perfil Comum', function () {
            cy.request({
                method: 'DELETE',
                url: '/api/users/' + usuarioCriado.id,
                failOnStatusCode: false,
                auth: {
                    bearer: usuarioCriado.accessToken
                }
            }).then((response) => {
                expect(response.status).to.equal(403);
                expect(response.body.message).to.equal("Forbidden");
            });
        });

        it('Não deve ser possível realizar exclusão de uma conta, sendo um usuário com perfil Crítico', function () {
            cy.promoteCritic(usuarioCriado.accessToken).then(function () {
                cy.request({
                    method: 'DELETE',
                    url: '/api/users/' + usuarioCriado.id,
                    failOnStatusCode: false,
                    auth: {
                        bearer: usuarioCriado.accessToken
                    }
                }).then((response) => {
                    expect(response.status).to.equal(403);
                    expect(response.body.message).to.equal("Forbidden");
                });
            });
        });

        it('Não deve ser possível que um usuário com perfil Administrador, insira um valor diferente de um número inteiro para excluir uma conta', function () {
            cy.promoteAdmin(usuarioCriado.accessToken).then(function () {
                cy.request({
                    method: 'DELETE',
                    url: '/api/users/' + "string",
                    failOnStatusCode: false,
                    auth: { bearer: usuarioCriado.accessToken },
                }).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.deep.include({
                        error: "Bad Request",
                        message: "Validation failed (numeric string is expected)"
                    });
                });
            });
        });

        it('Excluir um usuário com id não existente deve retornar sucesso', function () {
            cy.promoteAdmin(usuarioCriado.accessToken).then(function () {
                cy.listAllUsers(usuarioCriado.accessToken).then(function (resposta) {
                    const ultimoId = resposta.body[resposta.body.length - 1].id
                    cy.request({
                        method: 'DELETE',
                        url: '/api/users/' + (ultimoId + 1000).toString(),
                        failOnStatusCode: false,
                        auth: {
                            bearer: usuarioCriado.accessToken,
                        },
                    }).then((response) => {
                        expect(response.status).to.equal(204);
                        expect(response.body).to.equal("");
                    });
                })
            });
        });
    })

    it('Deve ser possível que um usuário com perfil Administrador, exclua a própria conta', function () {
        cy.promoteAdmin(usuarioCriado.accessToken).then(function () {
            cy.request({
                method: 'DELETE',
                url: '/api/users/' + usuarioCriado.id,
                failOnStatusCode: false,
                auth: { bearer: usuarioCriado.accessToken },
            }).then((response) => {
                expect(response.status).to.equal(204);
                expect(response.body).to.equal("");
            });
        })
    });

    it('Deve ser possível que um usuário com perfil Administrador, exclua a conta de outro usuário', function () {
        cy.createUser().then(function (resposta) {
            const outroUsuario = resposta
            cy.promoteAdmin(usuarioCriado.accessToken).then(function () {
                cy.request({
                    method: 'DELETE',
                    url: '/api/users/' + outroUsuario.id,
                    auth: {
                        bearer: usuarioCriado.accessToken,
                    },
                }).then((response) => {
                    expect(response.status).to.equal(204);
                    expect(response.body).to.equal("");
                });
            });
        })
    });

    it('Não deve ser possível visualizar as informações de uma review feita por um usuário em determinado filme, após a exclusão do usuário', function () {
        cy.promoteAdmin(usuarioCriado.accessToken).then(function () {
            cy.fixture("requests/filmesEvolucaoPerfil.json").then(function (fixture) {
                cy.createMovie(fixture.porLugaresIncriveis, usuarioCriado.accessToken).then((movie) => {
                    filmeCriado = movie.body
                    cy.reviewMovie(filmeCriado.id, 5, "Amei! Adoro filmes de romance dramáticos", usuarioCriado.accessToken).then(function () {
                        cy.request({
                            method: 'DELETE',
                            url: '/api/users/' + usuarioCriado.id,
                            auth: { bearer: usuarioCriado.accessToken },
                        }).then(function () {
                            cy.getMovie(filmeCriado.id).then((response) => {
                                expect(response.status).to.equal(200);
                                expect(response.body.reviews).to.be.an("array");
                                expect(response.body.reviews.length).to.equal(0)
                            })
                        })
                    })
                });
            })
        });
    });
});
