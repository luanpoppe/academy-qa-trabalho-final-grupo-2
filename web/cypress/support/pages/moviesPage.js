import { fakerPT_BR } from "@faker-js/faker";

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
  labelCritic = ".movie-score-info > :nth-child(2) > :nth-child(1)";
  labelQtdCritic = ".movie-score-info > :nth-child(2) > :nth-child(3)";
  starCritic = ".movie-score-info > :nth-child(2)";
  labelReview = ".movie-details-container > :nth-child(2)";
  labelStarReview = ".stars";
  inputTextReview = "textarea";
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
  buttohEnviar = ".rate-movie > button";
  star5 = ".stars > :nth-child(5)";
  star4 = ".stars > :nth-child(4)";
  review5 = ".user-reviews-container > :nth-child(5)";
  review4 = ".user-reviews-container > :nth-child(4)";
  review3 = ".user-reviews-container > :nth-child(3)";
  review2 = ".user-reviews-container > :nth-child(2)";
  review1 = ".user-reviews-container > :nth-child(1)";
  labelEntre = ".rate-movie > a";
  reviewDateHour1 = ":nth-child(1) > label";
  reviewDateHour2 = ":nth-child(2) > label";
  reviewDateHour3 = ":nth-child(3) > label";
  reviewDateHour4 = ":nth-child(4) > label";
  reviewDateHour5 = ":nth-child(5) > label";
  reviewAvatar1 = ":nth-child(1) > .user-review-info > .avatar-img";
  reviewAvatar2 = ":nth-child(2) > .user-review-info > .avatar-img";
  reviewAvatar3 = ":nth-child(3) > .user-review-info > .avatar-img";
  reviewAvatar4 = ":nth-child(4) > .user-review-info > .avatar-img";
  reviewAvatar5 = ":nth-child(5) > .user-review-info > .avatar-img";
  reviewName1 = ":nth-child(1) > .user-review-info > .user-reviecard-info > h3";
  reviewName2 = ":nth-child(2) > .user-review-info > .user-reviecard-info > h3";
  reviewName3 = ":nth-child(3) > .user-review-info > .user-reviecard-info > h3";
  reviewName4 = ":nth-child(4) > .user-review-info > .user-reviecard-info > h3";
  reviewName5 = ":nth-child(5) > .user-review-info > .user-reviecard-info > h3";
  reviewText1 = ":nth-child(1) > p";
  reviewText2 = ":nth-child(2) > p";
  reviewText3 = ":nth-child(3) > p";
  reviewText4 = ":nth-child(4) > p";
  reviewText5 = ":nth-child(5) > p";
  reviewStars1 =
    ":nth-child(1) > .user-review-info > .user-reviecard-info > .star-container-reviewcard";
  reviewStars2 =
    ":nth-child(2) > .user-review-info > .user-reviecard-info > .star-container-reviewcard";
  reviewStars3 =
    ":nth-child(3) > .user-review-info > .user-reviecard-info > .star-container-reviewcard";
  reviewStars4 =
    ":nth-child(4) > .user-review-info > .user-reviecard-info > .star-container-reviewcard";
  reviewStars5 =
    ":nth-child(5) > .user-review-info > .user-reviecard-info > .star-container-reviewcard";

  typeEmail(email) {
    cy.get(this.inputEmail).type(email);
  }

  typeSenha(senha) {
    cy.get(this.inputSenha).type(senha);
  }

  typeReview(review) {
    cy.get(this.inputTextReview).type(review);
  }

  clickStar5() {
    cy.get(this.star5).click();
  }

  clickButtonEnviarReview() {
    cy.get(this.buttohEnviar).click();
  }

  clickButtonLogin() {
    cy.get(this.buttonLogin).click();
  }

  clickLabelMovie() {
    cy.get(this.labelMovie).click();
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
}
