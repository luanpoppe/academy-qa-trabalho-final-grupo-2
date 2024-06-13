*** Settings ***
Library     DateTime
Resource    ../../base.robot


*** Keywords ***
Clicar para voltar no celular
    Press Keycode    4

Clicar enter no celular
    Press Keycode    66

Espera elemento está visivel
    [Arguments]    ${elemento}
    Wait Until Element Is Visible    ${elemento}    10
    Element Should Be Visible    ${elemento}

Espera elemento e clica
    [Arguments]    ${elemento}
    Wait Until Element Is Visible    ${elemento}    10
    Wait Until Keyword Succeeds    5    1    Click Element    ${elemento}

Swipe para cima
    [Arguments]    ${yInicial}=75    ${yFinal}=15    ${x}=50
    Swipe By Percent    ${x}    ${yInicial}    ${x}    ${yFinal}

Swipe para cima múltiplas vezes
    [Arguments]    ${qtasVezesRodar}    ${yInicial}=75    ${yFinal}=15    ${x}=50
    Set Local Variable    ${qtasVezesRodarCorreto}    ${qtasVezesRodar}+1
    FOR    ${counter}    IN RANGE    1    ${qtasVezesRodarCorreto}
        Swipe By Percent    ${x}    ${yInicial}    ${x}    ${yFinal}
    END

Acessa menu
    Espera elemento e clica    ${MENU}

Acessa login
    Acessa menu
    Espera elemento e clica    ${LOGIN}

Inserir dados
    [Arguments]    ${campo}    ${dado}
    Espera elemento e clica    ${campo}
    Espera elemento está visivel    ${campo}
    Wait Until Keyword Succeeds    8    1    Input Text    ${campo}    ${dado}

Preencher formulário cadastro
    ${emailfake}=    FakerLibrary.Email
    ${nomefake}=    FakerLibrary.Name
    ${senhafake}=    FakerLibrary.Password
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${NOME}    ${nomefake}
    Inserir dados    ${EMAIL}    ${emailfake}
    Inserir dados    ${SENHA}    ${senhafake}
    Inserir dados    ${CONF_SENHA}    ${senhafake}

Preencher formulário cadastro sem nome aleatório
    [Arguments]    ${nom}
    ${emailfake}=    FakerLibrary.Email
    ${senhafake}=    FakerLibrary.Password
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${NOME}    ${nom}
    Inserir dados    ${EMAIL}    ${emailfake}
    Inserir dados    ${SENHA}    ${senhafake}
    Inserir dados    ${CONF_SENHA}    ${senhafake}

Preencher formulário cadastro sem gerar email aleatório
    [Arguments]    ${ema}
    ${nomefake}=    FakerLibrary.Name
    ${senhafake}=    FakerLibrary.Password
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${NOME}    ${nomefake}
    Inserir dados    ${EMAIL}    ${ema}
    Inserir dados    ${SENHA}    ${senhafake}
    Inserir dados    ${CONF_SENHA}    ${senhafake}

Preencher formulário cadastro sem nome
    ${emailfake}=    FakerLibrary.Email
    ${senhafake}=    FakerLibrary.Password
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${EMAIL}    ${emailfake}
    Inserir dados    ${SENHA}    ${senhafake}
    Inserir dados    ${CONF_SENHA}    ${senhafake}

Preencher formulário cadastro sem email
    ${nomefake}=    FakerLibrary.Name
    ${senhafake}=    FakerLibrary.Password
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${NOME}    ${nomefake}
    Inserir dados    ${SENHA}    ${senhafake}
    Inserir dados    ${CONF_SENHA}    ${senhafake}

Preencher formulário cadastro sem senha principal e sem confirmar senha
    ${nomefake}=    FakerLibrary.Name
    ${emailfake}=    FakerLibrary.Email
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${NOME}    ${nomefake}
    Inserir dados    ${EMAIL}    ${emailfake}

Pegar e formatar data atual
    Run Keyword And Return    Get Current Date    result_format=%d/%m/%Y

Verifica se o contentDesc contains text
    [Arguments]    ${elemento}    ${validarText}
    ${contentDesc}=    AppiumLibrary.Get Element Attribute    ${elemento}    content-desc
    Should Contain    ${contentDesc}    ${validarText}
