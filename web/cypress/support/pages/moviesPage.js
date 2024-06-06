import { fakerPT_BR } from "@faker-js/faker";

export default class MoviesPage {
  buttonLogo = ".link-logo";
  boxBusca = ".search-box";
  inputBusca = ".search-input";
  buttonBusca = ".search-button";
  buttonLogin = '[href="/login"]';
  buttonRegistre = '[href="/register"]';

  labelImage = ".w-full h-auto rounded-lg";
  labelTitle = ".movie-details-title";
  labelDescription = ".movie-detail-description";
  labelYear = ":nth-child(4) > span";
  labelHour = ":nth-child(5) > span";
  labelGenre = ":nth-child(6) > span";
  labelAudience = ".movie-score-info > :nth-child(1) > :nth-child(1)";
  labelQtdAudience = ".movie-score-info > :nth-child(1) > :nth-child(3)";
  starAudience1 = ".movie-score-info > :nth-child(1) > div > :nth-child(1)";
  starAudience2 = ".movie-score-info > :nth-child(1) > div > :nth-child(2)";
  starAudience3 = ".movie-score-info > :nth-child(1) > div > :nth-child(3)";
  starAudience4 = ".movie-score-info > :nth-child(1) > div > :nth-child(4)";
  starAudience5 = ".movie-score-info > :nth-child(1) > div > :nth-child(5)";
  labelCritic = ".movie-score-info > :nth-child(2) > :nth-child(1)";
  labelQtdCritic = ".movie-score-info > :nth-child(2) > :nth-child(3)";
  starCritic1 = ".movie-score-info > :nth-child(2) > div > :nth-child(1)";
  starCritic2 = ".movie-score-info > :nth-child(2) > div > :nth-child(2)";
  starCritic3 = ".movie-score-info > :nth-child(2) > div > :nth-child(3)";
  starCritic4 = ".movie-score-info > :nth-child(2) > div > :nth-child(4)";
  starCritic5 = ".movie-score-info > :nth-child(2) > div > :nth-child(5)";
  labelReview = ".movie-details-container > :nth-child(2)";
  labelStarReview = ".stars";
  inputTextReview = "[placeholder='O que você acha deste filme ?']";
  buttonEntre = '[href="/login"]';
  labelAllReviews = ".user-reviews-section > h2";
  cardUserReview = ".user-review-card";
  nameUserReview = "h3";
  avatarUserReview = ".avatar-img";
  starUserReview = ".user-review-info";
  textUserReview = ".user-review-card > p";
  dateHourReview = ".user-review-card > label";
  labelMovie = ".movie-card-footer";
  erroIdinválido = "h2";
  statusIdInválido = "h3";

  typeMovie(title) {
    cy.get(this.inputBusca).type(title);
  }
  clickButtonBusca() {
    cy.get(this.buttonBusca).click();
  }
  clickMovieTelaInicial() {
    cy.get(this.labelMovie).click();
  }
}
