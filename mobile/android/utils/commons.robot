*** Settings ***

Resource    ../../base.robot

*** Keywords ***
Espera elemento está visivel
    [Arguments]    ${elemento}
    Wait Until Element Is Visible    ${elemento}    10
    Element Should Be Visible        ${elemento}

Espera elemento e clica
    [Arguments]    ${elemento}
    Wait Until Element Is Visible    ${elemento}    10
    Wait Until Keyword Succeeds    5    1    Click Element                    ${elemento}    

Acessa menu
    Espera elemento e clica    ${MENU}

Inserir dados
    [Arguments]    ${campo}    ${dado}
    Espera elemento e clica    ${campo}
    Wait Until Keyword Succeeds    8    1    Input Text     ${campo}    ${dado}

Preencher formulário cadastro
    [Arguments]    ${nom}    ${ema}    ${sen}    ${conf_sen}
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${NOME}          ${nom}
    Inserir dados    ${EMAIL}         ${ema}
    Inserir dados    ${SENHA}         ${sen}
    Inserir dados    ${CONF_SENHA}    ${conf_sen}

    
            