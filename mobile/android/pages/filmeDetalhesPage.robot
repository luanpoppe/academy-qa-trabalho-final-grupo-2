*** Settings ***

Resource    ../../base.robot

*** Keywords ***

Dado que um usuário não está autenticado
    Log    Usuário não autenticado

Quando tentar adicionar uma review em um filme pelo aplicativo
    Acessar primeiro filme da lista

Iniciar o teste com criação de usuário admin e filme
    Criar usuário admin
    Cadastrar um filme    ${filmePadrao}
    Open App

Terminar o teste com deleção de usuário e de filme
    Deletar filme    ${filmeCriado}
    Deletar usuário    ${usuarioCriado}
    Teardown