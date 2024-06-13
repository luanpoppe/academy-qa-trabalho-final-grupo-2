*** Settings ***

Resource    ../../base.robot
Library    String
Library    XML

*** Variables ***
${telaDetalhesFilme}    xpath=//android.widget.ImageView
${buttonAdicionarReview}    xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button
${inputReviewFilme}    xpath=//android.widget.EditText
${buttonSalvarReview}    xpath=//android.widget.Button[@content-desc="Salvar"]
${descricaoAdicionarReview}    xpath=//android.view.View[@content-desc="Dê sua nota para o filme:"]
${tituloAdicionarReview}    xpath=//android.view.View[@content-desc="Review"]
${msgFacaLoginReview}    xpath=//android.view.View[@content-desc="Faça login e tente novamente."]
${msgReviewAdicionada}    xpath=//android.view.View[@content-desc="Sua review foi adicionada!"]
${msgNaoFoiPossivelAdicionarReview}    xpath=//android.view.View[@content-desc="Não foi possível adicionar sua review."]
${textoReviewPadrao}    Review do filme opa
${listaDeAvaliacoesContainer}    xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.widget.ImageView/android.view.View


*** Keywords ***
Dar nota a filme
    [Arguments]    ${quantidadeEstrelas}
    Espera elemento e clica    xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[${quantidadeEstrelas}]

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
    ${resultado}    Evaluate    ${qtdCaracteresReview} == 500
    Should Be True    ${resultado}

E deve ser possível de ser vista imediatamente na seção de reviews do filme
    Clicar para voltar no celular
    Swipe para cima múltiplas vezes    4
    Page Should Contain Text    ${textoReviewPadrao}
    ${dataHoje}=    Pegar e formatar data atual
    Page Should Contain Text    Por "${usuarioLogado}[name]" em ${dataHoje}

Quando tentar adicionar uma review em um filme sem definir uma nota
    Acessar primeiro filme da lista
    Espera elemento e clica    ${buttonAdicionarReview}
    # Dar nota a filme    3
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
    # Espera elemento e clica    ${inputReviewFilme}
    # Inserir dados    ${inputReviewFilme}    ${textoReviewPadrao}
    # Clicar para voltar no celular
    Espera elemento e clica    ${buttonSalvarReview}

Então não deverá conseguir digitar mais de 500 caracteres
    ${textoReview}=    Get Text    ${inputReviewFilme}
    ${qtdCaracteresReview}=    Get Length    ${textoReview}
    ${resultado}    Evaluate    ${qtdCaracteresReview} < 501
    Should Be True    ${resultado}

Iniciar o teste com criação de usuário admin e filme
    Log    ${listaDeAvaliacoesContainer}
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