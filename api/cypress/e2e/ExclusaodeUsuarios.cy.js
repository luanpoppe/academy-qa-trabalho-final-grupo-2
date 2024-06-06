///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />

describe('Exclusão de Usuários', function () {
    var usuarioCriado;
    var token;

    beforeEach(function () {
        cy.createUser().then((newUser) => {
            usuarioCriado = newUser;
        });
    });

    it('Não deve ser possível realizar exclusão de uma conta, sem efetuar login ', function () {
        cy.request({
            method: 'DELETE',
            url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/' + usuarioCriado.id,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.be.eq('Access denied.');
            expect(response.body.error).to.be.eq('Unauthorized');
        });
    });


    it('Não deve ser possível realizar exclusão de uma conta, sendo um usuário com perfil Comum', function () {
        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        });

        cy.request({
            method: 'DELETE',
            url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/' + usuarioCriado.id,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.be.eq('Access denied.');
            expect(response.body.error).to.be.eq('Unauthorized');
        });
    });

    it('Não deve ser possível realizar exclusão de uma conta, sendo um usuário com perfil Crítico', function () {

        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        });

        cy.promoteCritic(token).then(function () {
            cy.request({
                method: 'DELETE',
                url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/' + usuarioCriado.id,
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.equal(401);
                expect(response.body.message).to.be.eq('Access denied.');
                expect(response.body.error).to.be.eq('Unauthorized');
            });
        });
    });

    it('Deve ser possível realizar exclusão de uma conta, sendo um usuário com perfil Administrador', function () {

        cy.promoteAdmin(token);

        cy.deleteUser(usuarioCriado).then((response) => {
            expect(response.status).to.equal(204);
            expect(response.body).to.equal("");
        });
    });
});