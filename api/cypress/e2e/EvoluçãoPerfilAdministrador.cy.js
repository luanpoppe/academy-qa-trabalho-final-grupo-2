///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />

describe('Evolução de usuário para perfil Administrador', function () {
    var usuarioCriado;
    var token;
    var filmeCriado;

    beforeEach(function () {
        cy.createUser().then((newUser) => {
            usuarioCriado = newUser;
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

    // it('Deve ser possível identificar quando uma review for feita por um usuário Administrador', function () {

    //     cy.login(usuarioCriado).then((login) => {
    //         token = login.body.accessToken
    //     }).then(function () {
    //         cy.promoteAdmin(token).then(function () {
    //             cy.createMovie({
    //                 title: "Divertidamente 2",
    //                 genre: "Animação",
    //                 description: "Divertida Mente 2 marca a sequência da famosa história de Riley (Kaitlyn Dias).",
    //                 durationInMinutes: 93,
    //                 releaseYear: 2024
    //             }, token).then((movie) => {
    //                 filmeCriado = movie.body
    //             }).then(function () {
    //                 cy.reviewMovie(filmeCriado.id, 4, "O filme é divertido!", token).then(function () {
    //                     cy.listReviews(token).then((response) => {
    //                         expect(response.status).to.equal(200);
    //                         expect(response.body).to.be.an("array");
    //                         expect(response.body[0].reviewType).to.equal("13");
                        
    //                     }).then(function () {
    //                         cy.deleteMovie(idFilme, token);
    //                     })
    //                 })
    //             })
    //         });
    //     });
    // });
});