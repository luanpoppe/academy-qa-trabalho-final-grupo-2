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
      cy.deleteUser(adminUser)
    })

    describe('Casos de criação com sucesso', function () {
      afterEach(function () {
        if (movieInfo) cy.promoteToAdminAndDeleteMovie(adminUser, movieInfo.id)
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

      it('Deve ser possível criar um filme com o título contendo 1 caractere', function () {
        const temporaryMovie = {
          ...movie,
          title: "a"
        }

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token
          },
        }).then(function (resposta) {
          movieInfo = resposta.body
          expect(resposta.status).to.equal(201)
        })
      })

      it('Deve ser possível criar um filme com o título contendo 100 caracteres', function () {
        const temporaryMovie = {
          ...movie,
          title: "a"
        }
        while (temporaryMovie.title.length < 100) {
          temporaryMovie.title += "a"
        }

        cy.request({
          method: "POST",
          url: "/api/movies",
          body: temporaryMovie,
          auth: {
            bearer: token
          },
        }).then(function (resposta) {
          movieInfo = resposta.body
          expect(resposta.status).to.equal(201)
        })
      })
    })


    describe('Casos de falha do título do filme', function () {
      it('Não deve ser possível criar um filme sem um título', function () {
        const temporaryMovie = {
          ...movie,
          title: null
        }

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
          cy.wrap(movieErrors.titleNonExistentErrors).each(function (error) {
            expect(resposta.body.message).to.deep.include(error)
          })
        })
      })

      it('Não deve ser possível criar um filme com um título vazio', function () {
        const temporaryMovie = {
          ...movie,
          title: ""
        }

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
          expect(resposta.body.message).to.have.length(2)
          expect(resposta.body.message).to.deep.include(movieErrors.titleErrors.titleMustBeLonger)
          expect(resposta.body.message).to.deep.include(movieErrors.titleErrors.titleMustNotBeEmpty)
        })
      })

      it('Não deve ser possível criar um filme com um título sendo um número', function () {
        const temporaryMovie = {
          ...movie,
          title: 1234
        }

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
          expect(resposta.body.message).to.have.length(2)
          expect(resposta.body.message).to.deep.include(movieErrors.titleErrors.titleMustBeShortherAndLonger)
          expect(resposta.body.message).to.deep.include(movieErrors.titleErrors.titleMustBeString)
        })
      })

      it('Não deve ser possível criar um filme com um título contendo 101 caracteres', function () {
        const temporaryMovie = {
          ...movie,
          title: "a"
        }

        while (temporaryMovie.title.length < 101) {
          temporaryMovie.title += "a"
        }

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
          expect(resposta.body.message).to.have.length(1)
          expect(resposta.body.message).to.deep.include(movieErrors.titleErrors.titleMustBeShorter)
        })
      })
    })

    describe('Casos de falha do gênero do filme', function () {
      it('Não deve ser possível criar um filme sem passar um gênero', function () {
        const temporaryMovie = {
          ...movie,
          genre: null
        }

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
          cy.wrap(movieErrors.allGenreErrors).each(function (error) {
            expect(resposta.body.message).to.deep.include(error)
          })
        })
      })

      it('Não deve ser possível criar um filme com gênero vazio', function () {
        const temporaryMovie = {
          ...movie,
          genre: ""
        }

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
          expect(resposta.body.message).to.have.length(2)
          expect(resposta.body.message).to.deep.include(movieErrors.genreErrors.genreMustBeLonger)
          expect(resposta.body.message).to.deep.include(movieErrors.genreErrors.genreMustNotBeEmpty)
        })
      })

      it('Não deve ser possível criar um filme com gênero sendo um número', function () {
        const temporaryMovie = {
          ...movie,
          genre: 1234
        }

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
          expect(resposta.body.message).to.have.length(2)
          expect(resposta.body.message).to.deep.include(movieErrors.genreErrors.genreMustBeShortherAndLonger)
          expect(resposta.body.message).to.deep.include(movieErrors.genreErrors.genreMustBeString)
        })
      })

      it('Não deve ser possível criar um filme com um gênero contendo 101 caracteres', function () {
        const temporaryMovie = {
          ...movie,
          genre: "a"
        }

        while (temporaryMovie.genre.length < 101) {
          temporaryMovie.genre += "a"
        }

        cy.log('temporaryMovie.genre', temporaryMovie.genre)
        cy.log('temporaryMovie.genre', temporaryMovie.genre.length)


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
          expect(resposta.body.message).to.have.length(1)
          expect(resposta.body.message).to.deep.include(movieErrors.genreErrors.genreMustBeShorter)
        })
      })
    })





    it('Não deve ser possível criar um filme sem uma descrição', function () {
      const temporaryMovie = {
        ...movie,
        description: null
      }

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
        cy.wrap(movieErrors.allDescriptionErrors).each(function (error) {
          expect(resposta.body.message).to.deep.include(error)
        })
      })
    })

    it('Não deve ser possível criar um filme sem uma duração', function () {
      const temporaryMovie = {
        ...movie,
        durationInMinutes: null
      }

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
        expect(resposta.body.message).to.have.length(5)
        cy.wrap(movieErrors.allDurationErrors).each(function (error) {
          expect(resposta.body.message).to.deep.include(error)
        })
      })
    })

    it('Não deve ser possível criar um filme sem um ano de lançamento', function () {
      const temporaryMovie = {
        ...movie,
        releaseYear: null
      }

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
        expect(resposta.body.message).to.have.length(5)
        cy.wrap(movieErrors.allReleaseYearErrors).each(function (error) {
          expect(resposta.body.message).to.deep.include(error)
        })
      })
    })
  })
})