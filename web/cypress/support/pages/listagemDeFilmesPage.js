class ListagemDeFilmesPage {
  gridFilme = ".movie-grid";
  tituloFilme = ".movie-details-title";
  descricaoFilme = ".movie-detail-description";
  iconeFilme = ".movie-details-info-with-icon";
  cardsTodosFilmes = ".movie-card"
  cardsFilmesEmDestaque = ".featured-movies .movie-card"
  postersFilmes = ".movie-poster"
  tituloFilmes = ".movie-title"
  porcentagemFilme = ".movie-card-footer label"

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

  botaoAvancarFilmesDestaque() {
    return cy.get("button.navigation").eq(1)
  }
  botaoRetornarFilmesDestaque() {
    return cy.get("button.navigation").eq(0)
  }
}

export default ListagemDeFilmesPage;
