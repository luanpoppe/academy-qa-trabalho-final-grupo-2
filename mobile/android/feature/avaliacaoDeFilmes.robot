*** Settings ***

Resource    ../../base.robot
Library    OperatingSystem
Library    Telnet

Test Setup        Iniciar o teste com criação de usuário admin e filme
Test Teardown     Terminar o teste com deleção de usuário e de filme


*** Test Cases ***
Usuário não autenticado não deve poder realizar a avaliação de um filme
    Dado que um usuário não está autenticado
    Quando tentar adicionar uma review em um filme pelo aplicativo
    Então deve aparecer mensagem informando a necessidade do usuário estar logado

Cenário: Usuário comum deve poder realizar a avaliação de um filme
    Dado que um usuário comum está autenticado
    Quando tentar adicionar uma review em um filme pelo aplicativo
    Então a review deve ser cadastrada com sucesso
    E deve ser possível de ser vista na seção de reviews do filme

Cenário: Usuário crítico deve poder realizar a avaliação de um filme
    Dado que um usuário crítico está autenticado
    Quando tentar adicionar uma review em um filme pelo aplicativo
    Então a review deve ser cadastrada com sucesso
    E deve ser possível de ser vista na seção de reviews do filme

Cenário: Usuário administrador deve poder realizar a avaliação de um filme
    Dado que um usuário administrador está autenticado
    Quando tentar adicionar uma review em um filme pelo aplicativo
    Então a review deve ser cadastrada com sucesso
    E deve ser possível de ser vista na seção de reviews do filme

Cenário: Usuário não deve poder realizar a avaliação de um filme sem definir uma nota
    Dado que um usuário está autenticado
    Quando tentar adicionar uma review em um filme sem definir uma nota
    Então a review não deve ser adicionada

Cenário: Usuário deve poder realizar a avaliação de um filme apenas dando uma nota para o filme
    Dado que um usuário está autenticado
    Quando tentar adicionar uma review em um filme apenas dando uma nota
    Então a review não deve ser adicionada

Cenário: Deve existir apenas uma review de um usuário em um filme
    Dado que um usuário está autenticado
    E já realizou uma review em um filme
    Quando tentar realizar uma nova review no mesmo filme
    Então o filme deverá continuar com apenas uma review do usuário
    # E a review do usuário deve ser atualizada