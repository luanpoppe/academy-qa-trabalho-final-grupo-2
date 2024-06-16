*** Settings ***
Resource    ../../base.robot
Library     String
Library     XML


*** Variables ***
${telaDetalhesFilme}                    xpath=//android.widget.ImageView
${buttonAdicionarReview}                xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button
${inputReviewFilme}                     xpath=//android.widget.EditText
${estrelasReview}                       //android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View
${buttonSalvarReview}                   xpath=//android.widget.Button[@content-desc="Salvar"]
${descricaoAdicionarReview}             xpath=//android.view.View[@content-desc="Dê sua nota para o filme:"]
${tituloAdicionarReview}                xpath=//android.view.View[@content-desc="Review"]
${msgFacaLoginReview}                   xpath=//android.view.View[@content-desc="Faça login e tente novamente."]
${msgReviewAdicionada}                  xpath=//android.view.View[@content-desc="Sua review foi adicionada!"]
${msgNaoFoiPossivelAdicionarReview}     xpath=//android.view.View[@content-desc="Não foi possível adicionar sua review."]
${textoReviewPadrao}                    Review do filme opa
${listaDeAvaliacoesContainer}           xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.widget.ImageView/android.view.View

# Consulta Detalhada de Filmes
${detalhesDoFilme}                      xpath=//android.view.View[contains(@content-desc,"Detalhes do filme")]
${dadosDoFilme}                         xpath=//android.widget.ImageView
${reviewsAudiencia}                     xpath=//android.view.View[contains(@content-desc,"Avaliação da audiência")]
${reviewsCrítica}                       xpath=//android.view.View[contains(@content-desc,"Avaliação da crítica")]


*** Keywords ***
Dar nota a filme
    [Arguments]    ${quantidadeEstrelas}
    Set Local Variable    ${hue}    ${estrelasReview}\[${quantidadeEstrelas}]
    Espera elemento e clica    ${hue}

Dado que um usuário não está autenticado
    Log    Usuário não autenticado

Dado que um usuário está autenticado
    Dado que um usuário comum está autenticado

Dado que um usuário comum está autenticado
    ${usuarioCriado}=    Criar usuário API
    Acessa login
    Fazer login aplicativo    ${usuarioCriado}[email]    ${usuarioCriado}[password]
    Set Global Variable    ${usuarioLogado}    ${usuarioCriado}

Dado que um usuário crítico está autenticado
    ${usuarioCriado}=    Criar usuário API
    ${localToken}=    Logar usuário API    ${usuarioCriado}
    Set To Dictionary    ${usuarioCriado}    token=${localToken}
    Promover usuário para crítico    ${usuarioCriado}[token]
    Acessa login
    Fazer login aplicativo    ${usuarioCriado}[email]    ${usuarioCriado}[password]
    Set Global Variable    ${usuarioLogado}    ${usuarioCriado}

Dado que um usuário administrador está autenticado
    ${usuarioCriado}=    Criar usuário API
    ${localToken}=    Logar usuário API    ${usuarioCriado}
    Set To Dictionary    ${usuarioCriado}    token=${localToken}
    Promover usuário para administrador    ${usuarioCriado}[token]
    Acessa login
    Fazer login aplicativo    ${usuarioCriado}[email]    ${usuarioCriado}[password]
    Set Global Variable    ${usuarioLogado}    ${usuarioCriado}

Quando acessar a seção de review de um filme
    Acessar primeiro filme da lista
    Espera elemento e clica    ${buttonAdicionarReview}

Quando tentar adicionar uma review em um filme pelo aplicativo
    Acessar primeiro filme da lista
    Espera elemento e clica    ${buttonAdicionarReview}
    Dar nota a filme    3
    Espera elemento e clica    ${inputReviewFilme}
    Inserir dados    ${inputReviewFilme}    ${textoReviewPadrao}
    Clicar para voltar no celular
    Espera elemento e clica    ${buttonSalvarReview}

Quando tentar realizar uma nova review com um texto contendo mais de 500 caracteres
    Set Test Variable    ${localDescricaoReview}    a
    FOR    ${counter}    IN RANGE    1    502
        Set Test Variable    ${localDescricaoReview}    ${localDescricaoReview}a
    END
    Acessar primeiro filme da lista
    Espera elemento e clica    ${buttonAdicionarReview}
    Dar nota a filme    3
    Espera elemento e clica    ${inputReviewFilme}
    Inserir dados    ${inputReviewFilme}    ${localDescricaoReview}
    Clicar para voltar no celular
    Espera elemento e clica    ${buttonSalvarReview}

Quando tentar realizar uma nova review com um texto contendo 500 caracteres
    Set Test Variable    ${localDescricaoReview}    a
    FOR    ${counter}    IN RANGE    1    501
        Set Test Variable    ${localDescricaoReview}    ${localDescricaoReview}a
    END
    Acessar primeiro filme da lista
    Espera elemento e clica    ${buttonAdicionarReview}
    Dar nota a filme    3
    Espera elemento e clica    ${inputReviewFilme}
    Inserir dados    ${inputReviewFilme}    ${localDescricaoReview}
    Clicar para voltar no celular
    Espera elemento e clica    ${buttonSalvarReview}

E já realizou uma review em um filme
    Quando tentar adicionar uma review em um filme pelo aplicativo

Quando tentar realizar uma nova review no mesmo filme
    Dar nota a filme    5
    Espera elemento e clica    ${inputReviewFilme}
    Clear Text    ${inputReviewFilme}
    Inserir dados    ${inputReviewFilme}    Review Atualizada
    Clicar para voltar no celular
    Espera elemento e clica    ${buttonSalvarReview}

Então a review do usuário deve ser atualizada
    Clicar para voltar no celular
    Swipe para cima múltiplas vezes    4
    ${dataHoje}=    Pegar e formatar data atual
    Set Local Variable    ${tituloReview}    Por "${usuarioLogado}[name]" em ${dataHoje}
    Set Local Variable    ${localTemp}    ${tituloReview}\nReview Atualizada
    Page Should Contain Text    ${tituloReview}
    Page Should Contain Text    Review Atualizada
    Page Should Not Contain Text    ${textoReviewPadrao}

Então deve aparecer mensagem informando a necessidade do usuário estar logado
    Wait Until Keyword Succeeds    4    1    Element Should Be Visible    ${msgFacaLoginReview}

Então a review deve ser cadastrada com sucesso
    Wait Until Keyword Succeeds    4    1    Element Should Be Visible    ${msgReviewAdicionada}

Então a review deve ser cadastrada com sucesso contendo 500 caracteres
    Então a review deve ser cadastrada com sucesso
    ${textoReview}=    Get Text    ${inputReviewFilme}
    ${qtdCaracteresReview}=    Get Length    ${textoReview}
    ${resultado}=    Evaluate    ${qtdCaracteresReview} == 500
    Should Be True    ${resultado}

E deve ser possível de ser vista imediatamente na seção de reviews do filme
    Clicar para voltar no celular
    Swipe para cima múltiplas vezes    4
    Wait Until Keyword Succeeds    4    1    Page Should Contain Text    ${textoReviewPadrao}
    ${dataHoje}=    Pegar e formatar data atual
    Page Should Contain Text    Por "${usuarioLogado}[name]" em ${dataHoje}

Quando tentar adicionar uma review em um filme sem definir uma nota
    Acessar primeiro filme da lista
    Espera elemento e clica    ${buttonAdicionarReview}
    Espera elemento e clica    ${inputReviewFilme}
    Inserir dados    ${inputReviewFilme}    ${textoReviewPadrao}
    Clicar para voltar no celular
    Espera elemento e clica    ${buttonSalvarReview}

Então a review não deve ser adicionada
    Wait Until Keyword Succeeds    4    1    Element Should Be Visible    ${msgNaoFoiPossivelAdicionarReview}

Quando tentar adicionar uma review em um filme apenas dando uma nota
    Acessar primeiro filme da lista
    Espera elemento e clica    ${buttonAdicionarReview}
    Dar nota a filme    3
    Espera elemento e clica    ${buttonSalvarReview}

Então não deverá conseguir digitar mais de 500 caracteres
    ${textoReview}=    Get Text    ${inputReviewFilme}
    ${qtdCaracteresReview}=    Get Length    ${textoReview}
    ${resultado}=    Evaluate    ${qtdCaracteresReview} < 501
    Should Be True    ${resultado}

Iniciar o teste com criação de usuário admin e filme
    &{usuarioAdmin}=    Criar usuário admin
    Set Global Variable    ${usuarioRaiz}    ${usuarioAdmin}
    Cadastrar um filme    ${filmePadrao}    ${usuarioRaiz}[token]
    Open App

Terminar o teste com deleção de usuário e de filme
    IF    $usuarioLogado != ${None}
        ${localToken}=    Logar usuário API    ${usuarioLogado}
        Promover usuário para administrador    ${localToken}
        Deletar usuário    ${usuarioLogado}    ${localToken}
        Set Global Variable    ${usuarioLogado}    ${None}
    END
    Deletar filme    ${filmeCriado}    ${usuarioRaiz}[token]
    Deletar usuário    ${usuarioRaiz}[userInfo]    ${usuarioRaiz}[token]
    Teardown

Terminar o teste com deleção de usuário
    ${usuarioLocal}=    Create Dictionary    email=${emailfake}    password=${senhafake}
    ${localToken}=    Logar usuário API    ${usuarioLocal}
    Promover usuário para administrador    ${localToken}

    Iniciar sessão com token da API    ${localToken}
    ${request}=    GET On Session    alias=api    url=/api/users
    Set Local Variable    ${resposta}    ${request.json()}

    ${userId}=    Evaluate    [item for item in ${resposta} if item["email"]=="${emailfake}".lower()][0]["id"]
    Promover usuário para administrador    ${localToken}
    Deletar usuário por ID    ${userId}    ${localToken}

Dado que o usuario possui a lista de filmes
    ${listaFilmes}=    Pegar lista de filmes
    Set Global Variable    ${primeiroFilme}    ${listaFilmes}[0]
    ${listaLocal}=    Create List
    Set Global Variable    ${listaUsuariosAvaliacao}    ${listaLocal}
    FOR    ${counter}    IN RANGE    1    5
        ${usuarioLocal}=    Criar usuário API
        ${tokenLocal}=    Logar usuário API    ${usuarioLocal}
        IF    ${counter} == 1    Promover usuário para crítico    ${tokenLocal}
        IF    ${counter} == 2
            Promover usuário para administrador    ${tokenLocal}
        END
        Append To List    ${listaUsuariosAvaliacao}    ${usuarioLocal}
        Criar avaliação de um filme    ${primeiroFilme}[id]    ${tokenLocal}
    END
    ${reviewsLocal}=    Pegar reviews de filme por id    ${primeiroFilme}[id]
    ${reviewsCriticos}=    Evaluate    [item for item in ${reviewsLocal} if item["reviewType"] == 1]
    ${reviewsComun}=    Evaluate    [item for item in ${reviewsLocal} if item["reviewType"] == 0]
    ${qtdReviewsCriticoLocal}=    Get Length    ${reviewsCriticos}
    ${qtdReviewsComunLocal}=    Get Length    ${reviewsComun}
    Set Global Variable    ${qtdReviewsCritico}    ${qtdReviewsCriticoLocal}
    Set Global Variable    ${qtdReviewsComun}    ${qtdReviewsComunLocal}
    Set Local Variable    ${reviewsPrimeiroFilme}    ${reviewsLocal}

Quando acessar o primeiro filme da lista no app
    Acessar primeiro filme da lista

Então os dados principais do filme devem ser exibidos na tela
    Wait Until Element Is Visible    ${reviewsAudiencia}
    Verifica se o contentDesc contains text    ${dadosDoFilme}    ${primeiroFilme}[title]
    ${releaseYearString}=    Convert To String    ${primeiroFilme}[releaseYear]
    ${durationInMinutesRound}=    Evaluate    round(${primeiroFilme}[durationInMinutes] / 60)
    ${durationMinutesString}=    Convert To String    ${durationInMinutesRound}
    Verifica se o contentDesc contains text    ${dadosDoFilme}    ${releaseYearString}
    Verifica se o contentDesc contains text    ${dadosDoFilme}    ${primeiroFilme}[genre]
    Verifica se o contentDesc contains text    ${dadosDoFilme}    ${primeiroFilme}[description]
    Verifica se o contentDesc contains text    ${dadosDoFilme}    ${durationMinutesString}h

Então os dados de avaliações da audiência serão exibidos na tela
    Wait Until Element Is Visible    ${reviewsAudiencia}
    ${reviewsAudString}=    Convert To String    ${qtdReviewsComun}
    Verifica se o contentDesc contains text    ${reviewsAudiencia}    ${reviewsAudString}
    Verifica se o contentDesc contains text    ${reviewsAudiencia}    Avaliação da audiência

E os dados de avaliações da crítica também serão exibidos na tela
    Wait Until Element Is Visible    ${reviewsCrítica}
    ${reviewsCriticString}=    Convert To String    ${qtdReviewsCritico}
    Verifica se o contentDesc contains text    ${reviewsCrítica}    ${reviewsCriticString}
    Verifica se o contentDesc contains text    ${reviewsCrítica}    Avaliação da crítica

Quando acessar a sessão de filmes do aplicativo
    Log    Acessado a seção de review

Então deverá ser possível ver a porcentagem correta da avaliação de um filme
    Set Local Variable    ${avaliacaoFilme}    ${primeiroFilme}[totalRating]
    ${calculoPorcentagem}=    Evaluate    str(int(${avaliacaoFilme} / 5 * 100))
    Set Local Variable    ${avaliacaoPorcentagem}    ${calculoPorcentagem}%
    ${infosFilme}=    AppiumLibrary.Get Element Attribute    ${primeiroFilmeDaLista}    content-desc
    Should Contain    ${infosFilme}    ${avaliacaoPorcentagem}

Então poderá dar apenas notas de 1 a 5 em sua review do filme
    Wait Until Element Is Visible    ${estrelasReview}
    FOR    ${counter}    IN RANGE    1    6
        Element Should Be Visible    ${estrelasReview}\[${counter}]
    END
    Page Should Not Contain Element    ${estrelasReview}\[6]

Terminar o teste com deleção de usuários e de filme
    Deletar filme    ${filmeCriado}    ${usuarioRaiz}[token]
    Deletar usuário    ${usuarioRaiz}[userInfo]    ${usuarioRaiz}[token]
    FOR    ${usuario}    IN    @{listaUsuariosAvaliacao}
        ${tokenLocal}=    Logar usuário API    ${usuario}
        Promover usuário para administrador    ${tokenLocal}
        Deletar usuário    ${usuario}    ${tokenLocal}
    END
    Teardown
