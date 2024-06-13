*** Settings ***

Resource    ../../base.robot

Test Setup        Iniciar o teste com criação de usuário admin e filme
Test Teardown     Terminar o teste com deleção de usuários e de filme

*** Keywords ***
Terminar o teste com deleção de usuários e de filme
    Deletar filme    ${filmeCriado}    ${usuarioRaiz}[token]
    Deletar usuário    ${usuarioRaiz}[userInfo]    ${usuarioRaiz}[token]
    FOR    ${usuario}    IN    @{listaUsuariosAvaliacao}
        ${tokenLocal}=    Logar usuário API    ${usuario}
        Promover usuário para administrador    ${tokenLocal}
        Deletar usuário    ${usuario}    ${tokenLocal}
    END
    Teardown

*** Test Cases ***
Teste
    ${listaFilmes}=    Pegar lista de filmes
    Set Local Variable    ${primeiroFilme}    ${listaFilmes}[0]
    ${listaLocal}=    Create List
    Set Global Variable    ${listaUsuariosAvaliacao}    ${listaLocal}
    FOR    ${counter}    IN RANGE    1    5
        ${usuarioLocal}    Criar usuário API
        ${tokenLocal}=    Logar usuário API    ${usuarioLocal}
        IF    ${counter} == 1
            Promover usuário para crítico    ${tokenLocal}
        END
        IF    ${counter} == 2
            Promover usuário para administrador    ${tokenLocal}
        END
        Append To List    ${listaUsuariosAvaliacao}    ${usuarioLocal}
        Criar avaliação de um filme    ${primeiroFilme}[id]    ${tokenLocal}
    END
    ${reviewsLocal}=    Pegar reviews de filme por id    ${primeiroFilme}[id]
    ${reviewsCriticos}=    Evaluate    [item for item in ${reviewsLocal} if item["reviewType"] == 1]
    ${reviewsComun}=    Evaluate    [item for item in ${reviewsLocal} if item["reviewType"] == 0]
    ${qtdReviewsCritico}=    Get Length    ${reviewsCriticos}
    ${qtdReviewsComun}=    Get Length    ${reviewsComun}
    Set Local Variable    ${reviewsPrimeiroFilme}    ${reviewsLocal}
    Acessar primeiro filme da lista
    Swipe para cima
    # ${contentDesc}=    Get Element Attribute    locator    content-desc
    # Should Contain    ${valorQueApareceNaTela}    ${qtdReviewsCritico}

    # Acessa o primeiro filme --> Vai ter as 3 reviews
    # Avalia as totalizador

# Teste 2
#     Pega da API a lista de filmes
#     Pega o primeiro filme
#     Salva as infomrações dele
#     Abre o app
#     Acessa o primeiro filme --> Vai ter as 3 reviews
    # Checa as infos do filme -> Título | Ex: ${primeiroFilme}[title] tem que ser igual ao xpath de titulo
