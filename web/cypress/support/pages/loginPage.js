export class LoginPage {
    inputEmail = "[placeholder='E-mail']"
    inputPassword = "[placeholder='Password']"


    typeEmail(email) {
        return cy.get(this.inputEmail).type(email)
    }
    typePassword(password) {
        return cy.get(this.inputEmail).type(password)
    }

    login(email, password) {
        cy.intercept("POST", "/api/auth/login").as("login");
        this.typeEmail(email)
        this.typePassword(password)
    }
}