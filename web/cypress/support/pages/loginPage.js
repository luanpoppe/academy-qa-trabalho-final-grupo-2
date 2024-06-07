import { fakerPT_BR } from "@faker-js/faker";

export default class LoginPage {
    inputEmail = "[placeholder='E-mail']";
    inputSenha = "[placeholder='Password']";

    buttonLogin = ".login-button";
    buttonOk = ".modal-actions";
    linkAuth = ".movies-page-link";
    erroFormulario = ".input-error";
    msgErro = ".error-message";

    campoForm = ".input-container";

    typeEmail(email) {
        cy.get(this.inputEmail).type(email);
    }

    typeSenha(senha) {
        cy.get(this.inputSenha).type(senha);
    }

    clickLogin() {
        cy.get(this.buttonLogin).click();
    }

    clickOK() {
        cy.get(this.buttonOk).click();
    }
}
// export class LoginPage {
//     inputEmail = "[placeholder='E-mail']"
//     inputPassword = "[placeholder='Password']"


//     typeEmail(email) {
//         return cy.get(this.inputEmail).type(email)
//     }
//     typePassword(password) {
//         return cy.get(this.inputEmail).type(password)
//     }

//     login(email, password) {
//         cy.intercept("POST", "/api/auth/login").as("login");
//         this.typeEmail(email)
//         this.typePassword(password)
//     }
// }