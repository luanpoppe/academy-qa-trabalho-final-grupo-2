import { MovieErrors } from "../support/utils/movieErrorsClass"

describe('Criação de Filmes', function () {
  const movie = {
    title: "Nome do Filme",
    genre: "Gênero do filme",
    description: "Descrição do filme",
    durationInMinutes: 90,
    releaseYear: 2017
  }

  describe('Usuário administrador', function () {
    let movieInfo
    let adminUser
    let token
    const movieErrors = new MovieErrors()

    before(function () {
      cy.createUser().then(function (userInfo) {
        adminUser = userInfo
        cy.login(adminUser).then(function (resposta) {
          token = resposta.body.accessToken
          cy.promoteAdmin(token)
        })
      })
    })
    after(function () {
      if (movieInfo) cy.promoteToAdminAndDeleteMovie(adminUser, movieInfo.id)
      cy.deleteUser(adminUser)
    })

    it('Usuário administrador deve poder criar um filme', function () {
      cy.request({
        method: "POST",
        url: "/api/movies",
        body: movie,
        auth: {
          bearer: token
        },
      }).then(function (resposta) {
        movieInfo = resposta.body
        expect(resposta.status).to.equal(201)
        expect(resposta.body).to.deep.include(movie)
        expect(resposta.body).to.have.property("id")
      })
    })

    it.only('Não deve ser possível criar um filme sem um título ', function () {
      const temporaryMovie = {
        ...movie,
        title: null
      }
      const tituloErros = movieErrors.titleErrors

      cy.request({
        method: "POST",
        url: "/api/movies",
        body: temporaryMovie,
        auth: {
          bearer: token
        },
        failOnStatusCode: false
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400)
        expect(resposta.body.message).to.have.length(3)
        expect(resposta.body.message).to.include(...[tituloErros.titleMustBeLonger, tituloErros.titleMustBeString, tituloErros.titleMustNotBeEmpty])
      })
    })
  })
})