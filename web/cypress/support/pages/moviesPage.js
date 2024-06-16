export default class MoviesPage {
  buttonLogo = ".link-logo";
  boxBusca = ".search-box";
  inputBusca = ".search-input";
  buttonBusca = ".search-button";
  buttonLogin = ".login-button";
  buttonRegistre = '[href="/register"]';
  inputEmail = '[placeholder="E-mail"]';
  inputSenha = '[placeholder="Password"]';

  labelImage = ".w-full";
  labelTitle = ".movie-details-title";
  labelDescription = ".movie-detail-description";
  labelYear = ":nth-child(4) > span";
  labelHour = ":nth-child(5) > span";
  labelGenre = ":nth-child(6) > span";
  labelAudience = ".movie-score-info > :nth-child(1) > :nth-child(1)";
  labelQtdAudience = ".movie-score-info > :nth-child(1) > :nth-child(3)";
  starAudience = ".movie-score-info > :nth-child(1)";
  singleStarsAudience = ".movie-score-info > :nth-child(1) > div"
  labelCritic = ".movie-score-info > :nth-child(2) > :nth-child(1)";
  labelQtdCritic = ".movie-score-info > :nth-child(2) > :nth-child(3)";
  starCritic = ".movie-score-info > :nth-child(2)";
  singleStarsCritic = ".movie-score-info > :nth-child(2) > div"
  labelReview = ".movie-details-container > :nth-child(2)";
  labelStarReview = ".stars";
  inputTextReview = "textarea";
  buttonEntre = '.rate-movie [href="/login"]';
  labelAllReviews = ".user-reviews-section > h2";
  cardUserReview = ".user-review-card";
  nameUserReview = ".user-review-card h3";
  avatarUserReview = ".avatar-img";
  starUserReview = ".user-review-info";
  textUserReview = ".user-review-card > p";
  dateHourReview = ".user-review-card > label";
  labelMovie = ".movie-card-footer";
  erroIdinválido = "h2";
  statusIdInválido = "h3";


  modalError = {
    divModal: ".modal-content",
    titleModal: ".modal-content h3",
    textModal: ".modal-content p",
    buttonModal: ".modal-content button",
  }

  allReviewStars = () => {
    return cy.get(".review-form-star")
  }
  allUserReviews() {
    return cy.get(".user-reviews-container > div")
  }
  getUserReview(nota) {
    return cy.get(`.user-reviews-container > :nth-child(${nota})`)
  }
  allReviewDateHour() {
    return cy.get(".user-review-card > label")
  }
  allReviewAvatar() {
    return cy.get(".user-review-info > img")
  }
  allReviewNames() {
    return cy.get(".user-reviecard-info > h3")
  }
  allReviewTexts() {
    return cy.get(".user-review-card > p")
  }
  allReviewUserStars() {
    return cy.get(".user-reviews-section .star-container-reviewcard")
  }

  buttohEnviar = ".rate-movie > button";
  labelEntre = ".rate-movie > a";

  typeEmail(email) {
    cy.get(this.inputEmail).type(email);
  }

  typeSenha(senha) {
    cy.get(this.inputSenha).type(senha);
  }

  typeReview(review) {
    cy.get(this.inputTextReview).type(review);
  }

  clickButtonEnviarReview() {
    cy.get(this.buttohEnviar).click();
  }

  clickButtonLogin() {
    cy.get(this.buttonLogin).click();
  }

  clickLabelMovie() {
    cy.get(this.labelMovie).click()
  }

  clickButtonLogo() {
    cy.get(this.buttonLogo).click();
  }

  typeMovie(title) {
    cy.get(this.inputBusca).type(title);
  }
  clickButtonBusca() {
    cy.get(this.buttonBusca).click();
  }
  clickMovieTelaInicial() {
    cy.get(this.labelMovie).click();
  }

  visitMoviePage(movieId) {
    cy.wait('@getUser')
    cy.visit("/movies/" + movieId)
    cy.wait('@getMovie')
  }

  createUserReview(textoDaReview) {
    cy.get(this.inputTextReview).clear();
    this.typeReview(textoDaReview);
    this.clickButtonEnviarReview();
  }

  clickStartReview(nota) {
    return cy.get(`.rate-movie .stars > :nth-child(${nota})`).click()
  }
}
