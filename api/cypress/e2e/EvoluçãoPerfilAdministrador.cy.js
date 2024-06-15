///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />

describe('Evolução de usuário para perfil Administrador', function () {
    let usuarioCriado;
    let user
    let token;
    let filmeCriado;
    let filme;
    let movies

    before(function () {
        cy.fixture("requests/filmesEvolucaoPerfil.json").then(function (fixture) {
            movies = fixture
            cy.createUserAndMovie(movies.divertidamente).then((response) => {
                cy.log('response', response)
                filme = response.movie.body;
                user = response.user
            });
        })
    });

    beforeEach(function () {
        cy.createUser().then((newUser) => {
            usuarioCriado = newUser;
        });
    });

    after(function () {
        cy.deleteUser(user)
    })

    afterEach(function () {
        cy.deleteUser(usuarioCriado);
    })

    it('Não deve ser possível evoluir usuário para perfil Administrador sem realizar Login', function () {
        cy.request({
            method: 'PATCH',
            url: '/api/users/admin',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body).to.deep.include({
                message: 'Access denied.',
                error: 'Unauthorized'
            });
        });
    });

    it('Deve ser possível evoluir usuário Comum para perfil Administrador com sucesso', function () {
        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.request({
                method: 'PATCH',
                url: '/api/users/admin',
                auth: {
                    bearer: token
                }
            }).then(function (response) {
                expect(response.status).to.equal(204);
            })
        });
    });

    it('Deve ser possível evoluir usuário Crítico para perfil Administrador com sucesso', function () {
        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.promoteCritic(token).then(function () {
                cy.request({
                    method: 'PATCH',
                    url: '/api/users/admin',
                    auth: {
                        bearer: token
                    }
                }).then((response) => {
                    expect(response.status).to.equal(204);
                })
            });
        })
    });

    it('Deve ser possível verificar que as reviews criadas quando um usuário possui perfil comum, não sofrem alteração no seu tipo quando o usuário se torna Administrador', function () {
        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.reviewMovie(filme.id, 5, "Amo esse filme!", token).then(function () {
                cy.promoteAdmin(token).then(function () {
                    cy.listReviews(token).then((response) => {
                        expect(response.status).to.equal(200);
                        expect(response.body).to.be.an("array");
                        expect(response.body[0].reviewType).to.equal(0);
                    })
                })
            })
        });
    });


    it('Deve ser possível diferenciar os tipos de reviews feitas por um usuário, tendo ele perfil comum e depois administrador', function () {
        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.reviewMovie(filme.id, 3, "Bacana!", token).then(function () {
                cy.promoteAdmin(token).then(function () {
                    cy.createMovie(movies.toyStory, token).then((movie) => {
                        filmeCriado = movie.body
                    }).then(function () {
                        cy.reviewMovie(filmeCriado.id, 4, "O filme é divertido!", token).then(function () {
                            cy.listReviews(token).then((response) => {
                                expect(response.status).to.equal(200);
                                expect(response.body).to.be.an("array");
                                expect(response.body[0].reviewType).to.equal(0);
                                expect(response.body[1].reviewType).not.to.equal(0);
                            })
                        })
                    })
                });
            });
        });
    });

    describe('Cenários com usuário administrador', function () {
        beforeEach(function () {
            cy.login(usuarioCriado).then(function (resposta) {
                usuarioCriado.token = resposta.body.accessToken
                cy.promoteAdmin(resposta.body.accessToken)
            })
        })

        afterEach(function () {
            cy.deleteMovie(filmeCriado.id, usuarioCriado.token)
        })

        it('Deve ser possível identificar quando uma review for feita por um usuário Administrador', function () {
            cy.createMovie(movies.divertidamente2, usuarioCriado.token).then((movie) => {
                filmeCriado = movie.body
            }).then(function () {
                cy.reviewMovie(filmeCriado.id, 4, "O filme é divertido!", usuarioCriado.token).then(function () {
                    cy.listReviews(usuarioCriado.token).then((response) => {
                        expect(response.status).to.equal(200);
                        expect(response.body).to.be.an("array");
                        expect(response.body[0].reviewType).not.to.equal(1);
                    })
                })
            })
        })

        it('Deve ser possível verificar que as reviews criadas por um usuário administrador não impactam nas métricas de avaliação da crítica', function () {
            cy.createMovie(movies.primeiraVista, usuarioCriado.token).then((movie) => {
                filmeCriado = movie.body
            })
                .then(function () {
                    cy.reviewMovie(filmeCriado.id, 5, "Amei! Melhor filme", usuarioCriado.token).then(function () {
                        cy.getMovie(filmeCriado.id).then((response) => {
                            expect(response.status).to.equal(200);
                            expect(response.body).to.deep.include({
                                id: filmeCriado.id,
                                title: filmeCriado.title,
                                criticScore: 0
                            })
                        })
                    });
                });
        });

        it('Deve ser possível verificar que as reviews criadas por um usuário administrador não impactam nas métricas de usuários comuns(audiência)', function () {
            cy.createMovie(movies.minions, usuarioCriado.token).then((movie) => {
                filmeCriado = movie.body
            }).then(function () {
                cy.reviewMovie(filmeCriado.id, 5, "Melhor animação!", usuarioCriado.token).then(function () {
                    cy.getMovie(filmeCriado.id).then((response) => {
                        expect(response.status).to.equal(200);
                        expect(response.body.id).to.equal(filmeCriado.id);
                        expect(response.body.title).to.equal(filmeCriado.title);
                        expect(response.body.audienceScore).to.equal(0);
                    })
                })
            });
        });
    })
})



