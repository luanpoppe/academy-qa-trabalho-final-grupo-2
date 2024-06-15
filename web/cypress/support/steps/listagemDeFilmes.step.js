///  <reference types="cypress" />
///  <reference path="../index.d.ts" />
import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';
import listagemDeFilmesPage from '../pages/ListagemDeFilmesPage';

const listFilmePage = new listagemDeFilmesPage;

const filmes = [
    {
        title: "Atlas",
        genre: "Ação",
        description: "Loucura",
        durationInMinutes: 120,
        releaseYear: 2024
    },
    {
        title: "Flash",
        genre: "Ação",
        description: "Super Herois",
        durationInMinutes: 160,
        releaseYear: 2020
    },
    {
        title: "Matrix",
        genre: "Ação",
        description: "O fim da estrada está chegando",
        durationInMinutes: 120,
        releaseYear: 1999
    },
    {
        title: "Titanic",
        genre: "Ação",
        description: "Tragédia",
        durationInMinutes: 170,
        releaseYear: 2019
    },
    {
        title: "Harry Potter",
        genre: "Magia",
        description: "Magia negra",
        durationInMinutes: 200,
        releaseYear: 2015
    },
    {
        title: "Inception",
        genre: "Ação",
        description: "O sonho dentro do sonho",
        durationInMinutes: 148,
        releaseYear: 2010
    }
];




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

                cy.wrap(filmes).each((filme) => {
                    cy.createMovie(filme, token)
                });
            });
        });
    });
});





Given('que acessou a página de listagem de filme', () => {
    listFilmePage.visit();
    listFilmePage.verificaListaDeFilmesExiste();

    });



Then('verá uma lista de filmes sem restrições', () => {
    listFilmePage.verificaListaDeFilmesExiste();
});



When('selecionar um filme da lista', () => {
    listFilmePage.selecionarPrimeiroFilme();
});


Then('verá o id, title, description, durationInMinutes, releaseYear e uma imagem de capa para cada filme', () => {
    listFilmePage.verificarInformacoesSumarizadasDoFilme();
});




When('o usuário estiver na lista de filmes', () => {
})


Then('verá os filmes listados na ordem em que foram cadastrados', () => {
    let filmeAnterior = 0;
    cy.get('.featured-movies .movie-card').each((filme) => {

        cy.log(filme.attr('href'))
        let idAtual = filme.attr('href').split('/')[2];
        cy.log(idAtual);
        expect(parseInt(idAtual)).to.be.greaterThan(filmeAnterior);
        filmeAnterior = parseInt(idAtual);

    })
});



When('acessar lista de filmes mais bem avaliados', () => {
    cy.get('h3').contains('Mais bem avaliados');
});

Then('verá os filmes listados com os mais avaliados primeiro', () => {
    let notaAnterior = 101;
    cy.get('.top-rated-movies .movie-card-footer label').each((nota) => {
        let notaFilme = nota.text() == '--' ? 0 : parseFloat(nota.text().split('%')[0])
      expect(notaFilme <= notaAnterior).to.equal(true);
      notaAnterior = notaFilme;
    });
});




When('houver mais filmes do que podem ser exibidos em uma página', () => {
    cy.get('.featured-movies .movie-card').should('have.length', 5);
})

Then('visualizar opções de paginação', () => {
    cy.get('.navigation').eq(1).should('exist');

});



When('acessar a próxima página', () => {
    let filmesPaginaAtual = 0;
    listFilmePage.navegarParaProximaPagina();

    cy.get('.carousel-data').should('exist').then(($filmes) => {
        filmesPaginaAtual = $filmes.length;
    });

    listFilmePage.verificarSePaginaCarregouMaisFilmes(filmesPaginaAtual);
});

Then('verá a próxima página de filmes', () => {
    cy.get('.carousel-data').should('exist');
});




When('selecionar o primeiro filme da lista', () => {
    listFilmePage.selecionarPrimeiroFilme();
});

Then('verá informações detalhadas sobre o filme', () => {
    listFilmePage.verificarInformacoesSumarizadasDoFilme();
});





When('existem menos de 5 filmes na lista', () => {
    cy.intercept('GET', '/api/movies', {fixture: "responses/responseBodyGetMovies2.json"}).as('getFilmes2');
    listFilmePage.visit();
    listFilmePage.verificaListaDeFilmesExiste();
});

When('visualizar a lista de filmes', () => {
    cy.wait('@getFilmes2');
});


Then('não verá opções de paginação', () => {
    cy.get('button.navigation').eq(1).should('exist').and('be.disabled'); 
});





When('existem mais de 5 filmes na lista', () => {
    cy.intercept('GET', '/api/movies', {fixture: "responses/responseBodyGetMovies6.json"}).as('getFilmes6');
    listFilmePage.visit();
    listFilmePage.verificaListaDeFilmesExiste();
});

Then('visualizar uma opção de paginação', () => {
    cy.wait('@getFilmes6');
});


When('acessar a proxima pagina', () => {
    
    listFilmePage.navegarParaProximaPagina();
    });




Then('verá uma próxima página de filmes', () => {
    cy.get('.carousel-data').should('exist');
});

