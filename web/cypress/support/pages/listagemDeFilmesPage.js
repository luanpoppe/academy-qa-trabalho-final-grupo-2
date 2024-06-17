class listagemDeFilmesPage {
  gridFilme = ".movie-grid";
  tituloFilme = ".movie-details-title";
  descricaoFilme = ".movie-detail-description";
  iconeFilme = ".movie-details-info-with-icon";

  login = "[href='/login']";

  visit() {
    cy.viewport("macbook-13");
    cy.visit("/");
  }

  listaDeFilmes() {
    return cy.get(".carousel-data");
  }

  selecionarPrimeiroFilme() {
    cy.get(".movie-card-footer").first().click();
  }

  clickLogin() {
    cy.get(this.login).click();
  }

  navegarParaProximaPaginaCadastro() {
    cy.get(".navigation").eq(1).click();
  }
}

export default listagemDeFilmesPage;
