class listagemDeFilmesPage {
    visit() {
        cy.viewport("macbook-13")
        cy.visit('/');
    }

    listaDeFilmes() {
        return cy.get('.carousel-data');
    }

    selecionarPrimeiroFilme() {
        cy.get('.movie-card-footer').first().click();
    }

    selecionarOrdenacaoPorCadastro() {
        cy.get('.carousel-data').each((item, index) => {
            cy.wrap(item).within(() => {
                cy.get('.movie-title').should('contain.text', filmes[index].title);
            });
        });
    }

    navegarParaProximaPaginaCadastro() {
        cy.get('.navigation').eq(1).click();
    }
}

export default listagemDeFilmesPage;
