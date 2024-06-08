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


Preencher formulário cadastro com email aleatório
    [Arguments]    ${nom}    ${sen}    ${conf_sen}
    ${emailfake}=    FakerLibrary.Email
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${NOME}          ${nom}
    Inserir dados    ${EMAIL}         ${emailfake}            
    Inserir dados    ${SENHA}         ${sen}
    Inserir dados    ${CONF_SENHA}    ${conf_sen}

Preencher formulário cadastro sem email aleatório
    [Arguments]    ${nom}    ${ema}    ${sen}    ${conf_sen}
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${NOME}          ${nom}
    Inserir dados    ${EMAIL}         ${ema}            
    Inserir dados    ${SENHA}         ${sen}
    Inserir dados    ${CONF_SENHA}    ${conf_sen}
    
            