///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />

describe('Evolução de usuário para perfil crítico', function () {
    var usuarioCriado;
    var token;
    var filme;
    var filmeCriado;

    beforeEach(function () {
        cy.createUser().then((newUser) => {
            usuarioCriado = newUser;
        });
    });

    before(function () {
        cy.createUserAndMovie({
            title: "O Rei Leão",
            genre: "Animação",
            description: "As aventuras de um leão jovem de nome Simba, o herdeiro de seu pai, Mufasa.",
            durationInMinutes: 88,
            releaseYear: 1994
        }).then((novoFilme) => {
            filme = novoFilme.movie.body;
        });
    });

    before(function () {
        cy.createUserAndMovie({
            title: "O Rei Leão 2: O Reino de Simba",
            genre: "Animação",
            description: "Kiara, a filha de Simba e herdeira do reino, desobedece o pai quando ele tenta impedi-la de se meter em confusões.",
            durationInMinutes: 81,
            releaseYear: 1998
        }).then((novoFilme) => {
            filmeCriado = novoFilme.movie.body;
        });
    });

    afterEach(function () {
        cy.deleteUser(usuarioCriado);
    })

    it('Não deve ser possível evoluir usuário para perfil crítico sem realizar Login', function () {
        cy.request({
            method: 'PATCH',
            url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/apply',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.be.eq('Access denied.');
            expect(response.body.error).to.be.eq('Unauthorized');
        });
    });

    it('Deve ser possível evoluir usuário Comum para perfil crítico com sucesso', function () {
        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.promoteCritic(token).then((response) => {
                expect(response.status).to.equal(204);
            })
        });
    });


    it('Deve ser possível evoluir usuário administrador para perfil crítico com sucesso', function () {
        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.promoteAdmin(token).then(function () {
                cy.promoteCritic(token).then((response) => {
                    expect(response.status).to.equal(204);
                })
            });
        })
    });

    it('Deve ser possível identificar quando uma review for feita por um usuário Crítico', function () {
        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.promoteCritic(token).then(() => {
                cy.reviewMovie(filme.id, 5, "Melhor filme de animação", token).then(function () {
                    cy.listReviews(token).then((response) => {
                        expect(response.status).to.equal(200);
                        expect(response.body).to.be.an("array");
                        expect(response.body[0].reviewType).to.equal(1);
                    })
                })
            })
        });
    });

    it('Deve ser possível verificar que as reviews criadas por um usuário crítico impactam nas métricas de avaliação da crítica ', function () {
        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.promoteCritic(token).then(function () {
                cy.reviewMovie(filme.id, 5, "O filme é incrível! Fiquei emocionada", token).then(function () {
                    cy.getMovie(filme.id).then((response) => {
                        expect(response.status).to.equal(200);
                        expect(response.body.id).to.equal(filme.id);
                        expect(response.body.title).to.equal(filme.title);
                        expect(response.body.criticScore).to.equal(5);
                    })
                })
            })
        });
    });

    it('Deve ser possível diferenciar os tipos de reviews feitas por um usuário, tendo ele perfil Comum e depois Crítico', function () {

        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.reviewMovie(filme.id, 5, "Melhor animação da Disney!", token).then(function () {
                cy.promoteCritic(token).then(function () {
                        cy.reviewMovie(filmeCriado.id, 3, "O primeiro filme é muito melhor!", token).then(function () {
                            cy.listReviews(token).then((response) => {
                                expect(response.status).to.equal(200);
                                expect(response.body).to.be.an("array");
                                expect(response.body[0].reviewType).to.equal(0);
                                expect(response.body[1].reviewType).to.equal(1);
                            })
                        })
                    })
                });
            });
        });
    });


