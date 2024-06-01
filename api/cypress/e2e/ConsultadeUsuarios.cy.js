///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />
import { faker } from "@faker-js/faker";

describe('Consulta geral de Usuários', function () {
  var usuarioCriado;
  var token;

  beforeEach(function () {
    cy.createUser().then((newUser) => {
      usuarioCriado = newUser;
    });
  });

  it('Não deve ser possível acessar as informações de um usuário, sendo um usuário Comum', function () {

    cy.login(usuarioCriado).then((login) => {
      token = login.body.accessToken
    });

    cy.request({
      method: 'GET',
      url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/' + usuarioCriado.id,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.message).to.be.eq('Access denied.');
      expect(response.body.error).to.be.eq('Unauthorized');
    });
  });

  it('Não deve ser possível acessar as informações de um usuário, sendo um usuário Crítico ', function () {

    cy.login(usuarioCriado).then((login) => {
      token = login.body.accessToken
    });

    cy.promoteCritic(token).then(function () {
      cy.request({
        method: 'GET',
        url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/' + usuarioCriado.id,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body.message).to.be.eq('Access denied.');
        expect(response.body.error).to.be.eq('Unauthorized');
      });
    });
  });

  it('Não deve ser possível acessar as informações de um usuário, sem efetuar login', function () {

    cy.request({
      method: 'GET',
      url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/' + usuarioCriado.id,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.message).to.be.eq('Access denied.');
      expect(response.body.error).to.be.eq('Unauthorized');
    });
  });

  it('Não deve ser possível consultar um usuário com id inválido', function () {

  });

  it('Deve ser possível acessar as informações de um usuário, sendo um usuário Admin', function () {
    
    });
  });

