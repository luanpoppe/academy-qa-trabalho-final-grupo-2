class listagemDeFilmesPage {
    visit() {
        cy.visit('https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/');
    }

    verificaListaDeFilmesExiste() {
        cy.get('.carousel-data');
    }

    selecionarPrimeiroFilme() {
        cy.get('.movie-card-footer').first().click();
        cy.wait(1000);
    }

    verificarInformacoesSumarizadasDoFilme() {
        cy.get('.movie-grid').within(() => {
            cy.get('.movie-details-title').should('exist');
            cy.get('.movie-detail-description').should('exist');
            cy.get('.movie-details-info-with-icon').should('exist');
            cy.get('.movie-details-info-with-icon').eq(0).should('exist');
            cy.get('.movie-details-info-with-icon').eq(1).should('exist');
            cy.get('.movie-details-info-with-icon').eq(2).should('exist');
        });
    }

    selecionarOrdenacaoPorCadastro() {
        cy.get('.carousel-data').each((item, index) => {
            cy.wrap(item).within(() => {
                cy.get('.movie-title').should('contain.text', filmes[index].title);
            });
        });
    }

    verificarOrdemCadastro() {
        
    }

    navegarParaProximaPagina() {
        cy.get('.navigation').should('exist').last().click();
    }

    verificarSePaginaCarregouMaisFilmes(filmesPaginaAtual) {
        cy.get('.carousel-data').should('exist').then(($novosFilmes) => {
            expect($novosFilmes.length).to.be.greaterThan(filmesPaginaAtual);
        });
    }
}

export default listagemDeFilmesPage;
