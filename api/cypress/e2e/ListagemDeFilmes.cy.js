/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />
import { faker } from "@faker-js/faker";

describe('Funcionalidade: Listagem de Filmes', () => {
	let token;
	let user;
	let movieId;

	const movieInfo = {
		title: faker.person.jobTitle(),
		genre: "Ação",
		description: "Descrição do Filme de Teste",
		durationInMinutes: 120,
		releaseYear: 2023,
	};

	before(() => {
		cy.createAdminUser().then(function (responseUser) {
			user = responseUser
			token = user.accessToken
			cy.createMovie(movieInfo, token).then((response) => {
				movieId = response.body.id;
				cy.wrap(movieId).as('movieCreateId');
			});
		});
	});

	describe('Usuários autenticados', function () {
		let localUser
		let localToken
		beforeEach(function () {
			cy.createUser().then(function (resposta) {
				localUser = resposta
				cy.login(localUser).then(function (resposta) {
					localToken = resposta.body.accessToken
				})
			})
		})

		afterEach(function () {
			cy.deleteUser(localUser)
		})

		it('Deve ser possível usuário comum consultar a lista de filmes sem restrições', () => {
			cy.request({
				method: 'GET',
				url: '/api/movies',
				auth: {
					bearer: localToken
				},
			}).then(function (response) {
				expect(response.status).to.eq(200);
				expect(response.body).to.be.an('array');
			})
		});

		it('Deve ser possível usuário crítico consultar a lista de filmes sem restrições', () => {
			cy.promoteCritic(localToken).then(function () {
				cy.request({
					method: 'GET',
					url: '/api/movies',
					auth: {
						bearer: localToken
					},
				}).then(function (response) {
					expect(response.status).to.eq(200);
					expect(response.body).to.be.an('array');
				})
			})
		});

		it('Deve ser possível usuário administrador consultar a lista de filmes sem restrições', () => {
			cy.promoteAdmin(localToken).then(function () {
				cy.request({
					method: 'GET',
					url: '/api/movies',
					auth: {
						bearer: localToken
					},
				}).then(function (response) {
					expect(response.status).to.eq(200);
					expect(response.body).to.be.an('array');
				})
			})
		});
	})

	it('Deve ser possível usuário não logado consultar a lista de filmes sem restrições', () => {
		cy.request({
			method: 'GET',
			url: '/api/movies',
		}).then(function (response) {
			expect(response.status).to.eq(200);
			expect(response.body).to.be.an('array');
		})
	});

	it('Listagem dos filmes deve conter informações detalhadas sobre os filmes', () => {
		cy.searchMovie(movieInfo.title).then((response) => {
			expect(response.status).to.eq(200);

			const movie = response.body[0];

			expect(movie.id).to.be.an('number');
			expect(movie).to.have.property('title', movieInfo.title);
			expect(movie).to.have.property('genre', movieInfo.genre);
			expect(movie).to.have.property('description', movieInfo.description);
			expect(movie).to.have.property('durationInMinutes', movieInfo.durationInMinutes);
			expect(movie).to.have.property('releaseYear', movieInfo.releaseYear);
			expect(movie).to.have.property('totalRating');
		});
	});

});

	
