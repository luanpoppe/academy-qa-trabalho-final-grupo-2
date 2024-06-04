///  <reference types="cypress" />
///  <reference path="../support/index.d.ts" />

describe('Consulta geral de Usuários', function () {
  var usuarioCriado;
  var usuarioConsulta;
  var token;

//Criação usuário para ser consultado 
  before(function () {
    cy.createUser().then((newUser) => {
      usuarioConsulta = newUser;
    });
  });

//Criação usuário 
  before(function () {
    cy.createUser().then((newUser) => {
      usuarioCriado = newUser;
    });
  });

//Exclusão dos usuários da base de dados 
  after(function () {
    cy.deleteUser(usuarioCriado);
    cy.deleteUser(usuarioConsulta);
  })
  
  it('Não deve ser possível acessar as informações de um usuário, sem efetuar login', function () {

    cy.request({
      method: 'GET',
      url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/' + usuarioConsulta.id,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.message).to.be.eq('Access denied.');
      expect(response.body.error).to.be.eq('Unauthorized');
    });
  });

  it('Não deve ser possível acessar as informações de um usuário, sendo um usuário Comum', function () {

    cy.login(usuarioCriado).then((login) => {
      token = login.body.accessToken
    });

    cy.request({
      method: 'GET',
      url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/' + usuarioConsulta.id,
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
        url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/' + usuarioConsulta.id,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body.message).to.be.eq('Access denied.');
        expect(response.body.error).to.be.eq('Unauthorized');
      });
    });
  });

it('Deve ser possível acessar as informações de um usuário, sendo um usuário Admin', function () {
      
  cy.promoteAdmin(token);

    cy.getUser(usuarioConsulta.id, token).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.id).to.be.equal(usuarioConsulta.id);
      expect(response.body.name).to.be.equal(usuarioConsulta.name);
      expect(response.body.email).to.be.equal(usuarioConsulta.email);
      expect(response.body.active).to.be.equal(usuarioConsulta.active);
      expect(response.body.type).to.be.equal(usuarioConsulta.type);
    });
  });
});
