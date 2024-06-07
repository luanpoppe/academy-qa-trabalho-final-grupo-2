/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />
import { faker } from "@faker-js/faker";

describe('Funcionalidade: Listagem de Filmes', () => {
    let token;
    let user;
    let movieId;

    const movieInfo = {
        title: faker.name.jobTitle(),
        genre: "Ação",
        description: "Descrição do Filme de Teste",
        durationInMinutes: 120,
        releaseYear: 2023,
    };

    before(() => {
        cy.createUser().then((createdUser) => {
            user = createdUser;

            const newUserInfos = {
                email: user.email,
                password: user.password,
            };

            cy.login(newUserInfos).then((response) => {
                token = response.body.accessToken;

                cy.promoteAdmin(token).then((response) => {
                    expect(response.status).to.eq(204);

                    cy.createMovie(movieInfo, token).then((response) => {
                        movieId = response.body.id;
                        cy.wrap(movieId).as('movieCreateId');
                    });
                });
            });
        });
    });

    it('Deve ser possível qualquer tipo de usuário, logado ou não, consultar a lista de filmes sem restrições', () => {
        cy.getAllMovies().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });

    it('Deve ser possível visualizar informações sumarizadas do filme', () => {
        cy.searchMovie(movieInfo.title).then((response) => {
            expect(response.status).to.eq(200);

            const movie = response.body[0];

            expect(movie).to.have.property('title', movieInfo.title);
            expect(movie).to.have.property('genre', movieInfo.genre);
            expect(movie).to.have.property('description', movieInfo.description);
            expect(movie).to.have.property('durationInMinutes', movieInfo.durationInMinutes);
            expect(movie).to.have.property('releaseYear', movieInfo.releaseYear);
        });
    });

    it('Deve ser possível ver mais detalhes de um filme', () => {
        cy.wrap(movieId).should('not.be.undefined'); 
        cy.getMovie(movieId).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', movieId);
            expect(response.body).to.have.property('title', movieInfo.title);
            expect(response.body).to.have.property('genre', movieInfo.genre);
            expect(response.body).to.have.property('description', movieInfo.description);
            expect(response.body).to.have.property('durationInMinutes', movieInfo.durationInMinutes);
            expect(response.body).to.have.property('releaseYear', movieInfo.releaseYear);
        });
    });
});
