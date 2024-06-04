///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />

describe('Evolução para perfil crítico', function () {
    var usuarioCriado;
    var token;

    beforeEach(function () {
        cy.createUser().then((newUser) => {
            usuarioCriado = newUser;
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
});
