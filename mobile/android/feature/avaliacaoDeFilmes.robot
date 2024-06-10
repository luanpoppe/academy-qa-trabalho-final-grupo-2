*** Settings ***

Resource    ../../base.robot

Test Setup        Iniciar o teste com criação de usuário admin e filme
Test Teardown     Terminar o teste com deleção de usuário e de filme


*** Test Cases ***
Usuário não autenticado não deve poder realizar a avaliação de um filme
    Dado que um usuário não está autenticado
    Quando tentar adicionar uma review em um filme pelo aplicativo

    # Cadastrar um filme    &{filmePadrao}
    # Log To Console    ${filmeCriado}
    # Should Be Equal    ${filmeCriado}    huehuehuehueh

    # Quando tentar adicionar uma review em um filme
    # Então não deve conseguir cadastrar a review
    # E deve poder ser redirecionado para a página de login