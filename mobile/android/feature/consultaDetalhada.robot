*** Settings ***

Resource    ../../base.robot

Test Setup        Iniciar o teste com criação de usuário admin e filme
# Test Setup        Open App
Test Teardown     Finalização
# Test Teardown     Teardown

*** Keywords ***
# Iniciar
#     ${usuarioLocal}=    Criar usuário API
#     Set Global Variable    ${usuarioRaiz}    ${usuarioLocal}
#     ${tokenLocal}=    Logar usuário API    ${usuarioLocal}
#     Set To Dictionary    ${usuarioRaiz}    token=${tokenLocal}
#     Promover usuário para administrador    ${tokenLocal}
#     Cadastrar um filme    ${filmePadrao}    ${tokenLocal}
#     Open App
#     Iniciar o teste com criação de usuário admin e filme



Finalização
    Deletar filme    ${filmeCriado}    ${usuarioRaiz}[token]
    Deletar usuário    ${usuarioRaiz}    ${usuarioRaiz}[token]

*** Test Cases ***
Teste
    ${listaFilmes}=    Pegar lista de filmes
    Set Local Variable    ${primeiroFilme}    ${listaFilmes}[0]
    FOR    ${counter}    IN RANGE    1    4
        ${usuarioLocal}    Criar usuário API
        ${tokenLocal}=    Logar usuário API    ${usuarioLocal}
        IF    ${counter} == 1
            Promover usuário para crítico    ${tokenLocal}
        END
        # Cadastrar um filme    ${filmePadrao}    ${tokenLocal}
        Criar avaliação de um filme    ${primeiroFilme}[id]    ${tokenLocal}
    END
    # Abre o app
    # Acessa o primeiro filme --> Vai ter as 3 reviews
    # Avalia as totalizador

# Teste 2
#     Pega da API a lista de filmes
#     Pega o primeiro filme
#     Salva as infomrações dele
#     Abre o app
#     Acessa o primeiro filme --> Vai ter as 3 reviews
#     Checa as infos do filme -> Título | 
