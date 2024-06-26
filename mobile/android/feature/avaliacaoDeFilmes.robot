*** Settings ***

Resource    ../../base.robot
Library    OperatingSystem
Library    Telnet

Test Setup        Iniciar o teste com criação de usuário admin e filme
Test Teardown     Terminar o teste com deleção de usuário e de filme


*** Test Cases ***
CT001 - Usuário não autenticado não deve poder realizar a avaliação de um filme
    Dado que um usuário não está autenticado
    Quando tentar adicionar uma review em um filme pelo aplicativo
    Então deve aparecer mensagem informando a necessidade do usuário estar logado

CT002 - Usuário comum deve poder realizar a avaliação de um filme
    Dado que um usuário comum está autenticado
    Quando tentar adicionar uma review em um filme pelo aplicativo
    Então a review deve ser cadastrada com sucesso
    E deve ser possível de ser vista imediatamente na seção de reviews do filme

CT003 - Usuário crítico deve poder realizar a avaliação de um filme
    Dado que um usuário crítico está autenticado
    Quando tentar adicionar uma review em um filme pelo aplicativo
    Então a review deve ser cadastrada com sucesso
    E deve ser possível de ser vista imediatamente na seção de reviews do filme

CT004 - Usuário administrador deve poder realizar a avaliação de um filme
    Dado que um usuário administrador está autenticado
    Quando tentar adicionar uma review em um filme pelo aplicativo
    Então a review deve ser cadastrada com sucesso
    E deve ser possível de ser vista imediatamente na seção de reviews do filme

CT005 - Usuário não deve poder realizar a avaliação de um filme sem definir uma nota
    Dado que um usuário está autenticado
    Quando tentar adicionar uma review em um filme sem definir uma nota
    Então a review não deve ser adicionada

#Teste quebrando por estar com bug --> A review devia ser cadastrada, mas não está sendo (problema raiz é na API)
CT006 - Usuário deve poder realizar a avaliação de um filme apenas dando uma nota para o filme
    Dado que um usuário está autenticado
    Quando tentar adicionar uma review em um filme apenas dando uma nota
    Então a review deve ser cadastrada com sucesso

CT007 - Deve ser possível atualizar review de um usuário em um filme
    Dado que um usuário está autenticado
    E já realizou uma review em um filme
    Quando tentar realizar uma nova review no mesmo filme
    Então a review do usuário deve ser atualizada

CT008 - Usuário não deve poder digitar uma avaliação contendo mais de 500 caracteres
    Dado que um usuário está autenticado
    Quando tentar realizar uma nova review com um texto contendo mais de 500 caracteres
    Então não deverá conseguir digitar mais de 500 caracteres

# Teste quebrando por estar com bug --> Ele não consegue escrever 500 caracteres no campo de texto
CT009 - Usuário deve poder digitar uma avaliação contendo 500 caracteres
    Dado que um usuário está autenticado
    Quando tentar realizar uma nova review com um texto contendo 500 caracteres
    Então a review deve ser cadastrada com sucesso contendo 500 caracteres

CT010 - Usuário deve poder dar nota apenas de 1 a 5 para um filme
    Dado que um usuário está autenticado
    Quando acessar a seção de review de um filme
    Então poderá dar apenas notas de 1 a 5 em sua review do filme