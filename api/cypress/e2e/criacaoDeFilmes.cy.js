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
          expect(resposta.body.id).to.be.a("number")
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

      it('Deve ser possível criar um filme com o gênero contendo 1 caractere', function () {
        const temporaryMovie = {
          ...movie,
          genre: "a"
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
          expect(resposta.body).to.deep.include(temporaryMovie)
          expect(resposta.body.id).to.be.a("number")
        })
      })

      it('Deve ser possível criar um filme com o gênero contendo 100 caracteres', function () {
        const temporaryMovie = {
          ...movie,
          genre: "a"
        }
        while (temporaryMovie.genre.length < 100) {
          temporaryMovie.genre += "a"
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
          expect(resposta.body).to.deep.include(temporaryMovie)
          expect(resposta.body.id).to.be.a("number")
        })
      })

      it('Deve ser possível criar um filme com a descrição contendo 1 caractere', function () {
        const temporaryMovie = {
          ...movie,
          description: "a"
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
          expect(resposta.body).to.deep.include(temporaryMovie)
          expect(resposta.body.id).to.be.a("number")
        })
      })

      it('Deve ser possível criar um filme com a descrição contendo 500 caracteres', function () {
        const temporaryMovie = {
          ...movie,
          description: "a"
        }
        while (temporaryMovie.description.length < 500) {
          temporaryMovie.description += "a"
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
          expect(resposta.body).to.deep.include(temporaryMovie)
          expect(resposta.body.id).to.be.a("number")
        })
      })

      it('Deve ser possível criar um filme com o ano de lançamento de 1895', function () {
        const temporaryMovie = {
          ...movie,
          releaseYear: 1895
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
          expect(resposta.body).to.deep.include(temporaryMovie)
          expect(resposta.body.id).to.be.a("number")
        })
      })

      it('Deve ser possível criar um filme com o ano de lançamento sendo o ano atual', function () {
        const temporaryMovie = {
          ...movie,
          releaseYear: new Date().getFullYear()
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
          expect(resposta.body).to.deep.include(temporaryMovie)
          expect(resposta.body.id).to.be.a("number")
        })
      })

      it('Deve ser possível criar um filme com a duração de 1 minuto', function () {
        const temporaryMovie = {
          ...movie,
          durationInMinutes: 1
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
          expect(resposta.body).to.deep.include(temporaryMovie)
          expect(resposta.body.id).to.be.a("number")
        })
      })

      it('Deve ser possível criar um filme com a duração de 720 horas', function () {
        const temporaryMovie = {
          ...movie,
          durationInMinutes: 720 * 60
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
          expect(resposta.body).to.deep.include(temporaryMovie)
          expect(resposta.body.id).to.be.a("number")
        })
      })

      describe('Cenário com criação de mais de um filme', function () {
        let movieInfo2
        beforeEach(function () {
          cy.createMovie(movie, token).then(function (resposta) {
            movieInfo2 = resposta.body
          })
        })

        afterEach(function () {
          cy.deleteMovie(movieInfo2.id, token)
        })

        it('Deve ser possível adicionar dois filmes com as exatas mesmas informações', function () {
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
            expect(resposta.body.id).to.be.a("number")
          })
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

    describe('Casos de falha da descrição do filme', function () {
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

      it('Não deve ser possível criar um filme com uma descrição vazia', function () {
        const temporaryMovie = {
          ...movie,
          description: ""
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
          expect(resposta.body.message).to.deep.include(movieErrors.descriptionErrors.descriptionMustBeLonger)
          expect(resposta.body.message).to.deep.include(movieErrors.descriptionErrors.descriptionMustNotBeEmpty)
        })
      })

      it('Não deve ser possível criar um filme com a descrição sendo um número', function () {
        const temporaryMovie = {
          ...movie,
          description: 1234
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
          expect(resposta.body.message).to.deep.include(movieErrors.descriptionErrors.descriptionMustBeShortherAndLonger)
          expect(resposta.body.message).to.deep.include(movieErrors.descriptionErrors.descriptionMustBeString)
        })
      })

      it('Não deve ser possível criar um filme com uma descrição contendo 501 caracteres', function () {
        const temporaryMovie = {
          ...movie,
          description: "a"
        }

        while (temporaryMovie.description.length < 501) {
          temporaryMovie.description += "a"
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
          expect(resposta.body.message).to.deep.include(movieErrors.descriptionErrors.descriptionMustBeShorter)
        })
      })
    })

    describe('Casos de falha da duração do filme', function () {
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

      it('Não deve ser possível criar um filme com uma duração sem ser um número', function () {
        const temporaryMovie = {
          ...movie,
          durationInMinutes: "abcd"
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
          expect(resposta.body.message).to.have.length(4)
          expect(resposta.body.message).to.deep.include(movieErrors.durationErrors.durationMaxNumber)
          expect(resposta.body.message).to.deep.include(movieErrors.durationErrors.durationMinNumber)
          expect(resposta.body.message).to.deep.include(movieErrors.durationErrors.durationMustBeNumber)
          expect(resposta.body.message).to.deep.include(movieErrors.durationErrors.durationMustBeInteger)
        })
      })

      it('Não deve ser possível criar um filme com uma duração que seja um número decimal', function () {
        const temporaryMovie = {
          ...movie,
          durationInMinutes: 120.5
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
          expect(resposta.body.message).to.deep.include(movieErrors.durationErrors.durationMustBeInteger)
        })
      })

      it('Não deve ser possível criar um filme com uma duração que seja 0', function () {
        const temporaryMovie = {
          ...movie,
          durationInMinutes: 0
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
          expect(resposta.body.message).to.deep.include(movieErrors.durationErrors.durationMinNumber)
        })
      })

      it('Não deve ser possível criar um filme com uma duração que seja negativa', function () {
        const temporaryMovie = {
          ...movie,
          durationInMinutes: -1
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
          expect(resposta.body.message).to.deep.include(movieErrors.durationErrors.durationMinNumber)
        })
      })

      it('Não deve ser possível criar um filme com uma duração que seja maior do que 720 horas', function () {
        const temporaryMovie = {
          ...movie,
          durationInMinutes: (720 * 60) + 1
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
          expect(resposta.body.message).to.deep.include(movieErrors.durationErrors.durationMaxNumber)
        })
      })
    })

    describe('Casos de falha do ano de lançamento do filme', function () {
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

      it('Não deve ser possível criar um filme com um ano de lançamento sem ser um número', function () {
        const temporaryMovie = {
          ...movie,
          releaseYear: "abcd"
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
          expect(resposta.body.message).to.have.length(4)
          expect(resposta.body.message).to.deep.include(movieErrors.releaseYearErrors.releaseYearMaxNumber)
          expect(resposta.body.message).to.deep.include(movieErrors.releaseYearErrors.releaseYearMinNumber)
          expect(resposta.body.message).to.deep.include(movieErrors.releaseYearErrors.releaseYearMustBeNumber)
          expect(resposta.body.message).to.deep.include(movieErrors.releaseYearErrors.releaseYearMustBeInteger)
        })
      })

      it('Não deve ser possível criar um filme com um ano de lançamento que seja um número decimal', function () {
        const temporaryMovie = {
          ...movie,
          releaseYear: 2000.5
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
          expect(resposta.body.message).to.deep.include(movieErrors.releaseYearErrors.releaseYearMustBeInteger)
        })
      })

      it('Não deve ser possível criar um filme com um ano de lançamento que seja menor que 1895', function () {
        const temporaryMovie = {
          ...movie,
          releaseYear: 1894
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
          expect(resposta.body.message).to.deep.include(movieErrors.releaseYearErrors.releaseYearMinNumber)
        })
      })

      it('Não deve ser possível criar um filme com um ano de lançamento que seja maior do que o ano atual', function () {
        const temporaryMovie = {
          ...movie,
          releaseYear: new Date().getFullYear() + 1
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
          expect(resposta.body.message).to.deep.include(movieErrors.releaseYearErrors.releaseYearMaxNumber)
        })
      })
    })
  })

  describe('Casos de falhar por conta da autorização', function () {
    let user
    let localToken

    beforeEach(function () {
      cy.createUser().then(function (resposta) {
        user = resposta
        cy.login(user).then(function (resposta) {
          localToken = resposta.body.accessToken
        })
      })
    })

    afterEach(function () {
      cy.deleteUser(user)
    })

    it('Usuário não logado não deve conseguir criar um filme', function () {
      cy.request({
        method: "POST",
        url: "/api/movies",
        body: movie,
        failOnStatusCode: false
      }).then(function (resposta) {
        expect(resposta.status).to.equal(401)
        expect(resposta.body.message).to.equal("Access denied.")
        expect(resposta.body.error).to.equal("Unauthorized")
      })
    })

    it('Usuário comum não deve conseguir criar um filme', function () {
      cy.request({
        method: "POST",
        url: "/api/movies",
        body: movie,
        auth: {
          bearer: localToken
        },
        failOnStatusCode: false
      }).then(function (resposta) {
        expect(resposta.status).to.equal(403)
        expect(resposta.body.message).to.equal("Forbidden")
      })
    })

    it('Usuário crítico não deve conseguir criar um filme', function () {
      cy.promoteCritic(localToken).then(function (resposta) {
        cy.request({
          method: "POST",
          url: "/api/movies",
          body: movie,
          auth: {
            bearer: localToken
          },
          failOnStatusCode: false
        }).then(function (resposta) {
          expect(resposta.status).to.equal(403)
          expect(resposta.body.message).to.equal("Forbidden")
        })
      })
    })
  })
})