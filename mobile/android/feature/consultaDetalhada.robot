*** Settings ***
Resource            ../../base.robot

Test Setup          Iniciar o teste com criação de usuário admin e filme
Test Teardown       Terminar o teste com deleção de usuários e de filme


*** Test Cases ***
CT001 - Deve ser possível visualizar as informações corretas de um filme da lista
    Dado que o usuario possui a lista de filmes
    Quando acessar o primeiro filme da lista no app
    Então os dados principais do filme devem ser exibidos na tela

CT002 - Validar as avaliações da audiência e da crítica
    Dado que o usuario possui a lista de filmes
    Quando acessar o primeiro filme da lista no app
    Então os dados de avaliações da audiência serão exibidos na tela
    E os dados de avaliações da crítica também serão exibidos na tela

CT003 - Validar a avaliação em porcentagem de um filme
    Dado que o usuario possui a lista de filmes
    Quando acessar a sessão de filmes do aplicativo
    Então deverá ser possível ver a porcentagem correta da avaliação de um filme
