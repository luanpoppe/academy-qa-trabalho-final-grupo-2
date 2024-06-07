///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />

describe('Evolução de usuário para perfil Administrador', function () {
    var usuarioCriado;
    var token;
    var filmeCriado;
    var filme;

    beforeEach(function () {
        cy.createUser().then((newUser) => {
            usuarioCriado = newUser;
        });
    });

    before(function () {
        cy.createUserAndMovie({
            title: "Divertidamente 1",
            genre: "Animação",
            description: "Divertidamente 1 marca a história de Riley (Kaitlyn Dias).",
            durationInMinutes: 95,
            releaseYear: 2015
        }).then((novoFilme) => {
            filme = novoFilme.movie.body;
        });
    });

    afterEach(function () {
        cy.deleteUser(usuarioCriado);
    })

    it('Não deve ser possível evoluir usuário para perfil Administrador sem realizar Login', function () {
        cy.request({
            method: 'PATCH',
            url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/admin',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.be.eq('Access denied.');
            expect(response.body.error).to.be.eq('Unauthorized');
        });
    });

    it('Deve ser possível evoluir usuário Comum para perfil Administrador com sucesso', function () {
        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.promoteAdmin(token).then((response) => {
                expect(response.status).to.equal(204);
            })
        });
    });

    it('Deve ser possível evoluir usuário Crítico para perfil Administrador com sucesso', function () {
        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.promoteCritic(token).then(function () {
                cy.promoteAdmin(token).then((response) => {
                    expect(response.status).to.equal(204);
                })
            });
        })
    });

    it('Deve ser possível identificar quando uma review for feita por um usuário Administrador', function () {
        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.promoteAdmin(token).then(function () {
                cy.createMovie({
                    title: "Divertidamente 2",
                    genre: "Animação",
                    description: "Divertida Mente 2 marca a sequência da famosa história de Riley (Kaitlyn Dias).",
                    durationInMinutes: 93,
                    releaseYear: 2024
                }, token).then((movie) => {
                    filmeCriado = movie.body
                }).then(function () {
                    cy.reviewMovie(filmeCriado.id, 4, "O filme é divertido!", token).then(function () {
                        cy.listReviews(token).then((response) => {
                            expect(response.status).to.equal(200);
                            expect(response.body).to.be.an("array");
                            expect(response.body[0].reviewType).to.equal(1);
                        })
                    })
                })
            });
        });
    });

    it('Deve ser possível verificar que as reviews criadas por um usuário administrador não impactam nas métricas de avaliação da crítica', function () {
        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.promoteAdmin(token).then(function () {
                cy.createMovie({
                    title: "Amor à Primeira Vista",
                    genre: "Romance/Comédia",
                    description: "O reencontro parece impossível, só que o amor desafia todas as probabilidades.",
                    durationInMinutes: 91,
                    releaseYear: 2023
                }, token).then((movie) => {
                    filmeCriado = movie.body
                }).then(function () {
                    cy.reviewMovie(filmeCriado.id, 5, "Amei! Melhor filme", token).then(function () {
                        cy.getMovie(filmeCriado.id).then((response) => {
                            expect(response.status).to.equal(200);
                            expect(response.body.id).to.equal(filmeCriado.id);
                            expect(response.body.title).to.equal(filmeCriado.title);
                            expect(response.body.criticScore).to.equal(0);
                        }).then(function () {
                            cy.deleteMovie(filmeCriado.id, token);
                        })
                    })
                })
            });
        });
    });
    
    it('Deve ser possível verificar que as reviews criadas por um usuário administrador não impactam nas métricas de usuários comuns(audiência)', function () {
        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.promoteAdmin(token).then(function () {
                cy.createMovie({
                    title: "Minions",
                    genre: "Animação",
                    description: "Seres amarelos milenares, os minions têm uma missão: servir aos maiores vilões.",
                    durationInMinutes: 91,
                    releaseYear: 2015
                }, token).then((movie) => {
                    filmeCriado = movie.body
                }).then(function () {
                    cy.reviewMovie(filmeCriado.id, 5, "Melhor animação!", token).then(function () {
                        cy.getMovie(filmeCriado.id).then((response) => {
                            expect(response.status).to.equal(200);
                            expect(response.body.id).to.equal(filmeCriado.id);
                            expect(response.body.title).to.equal(filmeCriado.title);
                            expect(response.body.audienceScore).to.equal(0);
                        }).then(function () {
                            cy.deleteMovie(filmeCriado.id, token);
                        })
                    })
                })
            });
        });
    });
    
    it('Deve ser possível diferenciar os tipos de reviews feitas por um usuário, tendo ele perfil comum e depois administrador', function () {

        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.reviewMovie(filme.id, 3, "Bacana!", token).then(function () {
                    cy.promoteAdmin(token).then(function () {
                        cy.createMovie({
                            title: "Toy Story",
                            genre: "Animação",
                            description: "O aniversário do garoto Andy está chegando e seus brinquedos ficam nervosos, temendo que ele ganhe novos brinquedos que possam substituí-los.",
                            durationInMinutes: 81,
                            releaseYear: 1995
                        }, token).then((movie) => {
                            filmeCriado = movie.body
                        }).then(function () {
                            cy.reviewMovie(filmeCriado.id, 4, "O filme é divertido!", token).then(function () {
                                cy.listReviews(token).then((response) => {
                                    expect(response.status).to.equal(200);
                                    expect(response.body).to.be.an("array");
                                    expect(response.body[0].reviewType).to.equal(0);
                                    expect(response.body[1].reviewType).to.equal("1");

                                })
                            })
                        })
                    });
                });
            });
        });
    });
