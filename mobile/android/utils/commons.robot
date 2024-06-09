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
    ${emailfake}=    FakerLibrary.Email
    ${nomefake}=     FakerLibrary.Name
    ${senhafake}=    FakerLibrary.Password
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${NOME}          ${nomefake}
    Inserir dados    ${EMAIL}         ${emailfake}            
    Inserir dados    ${SENHA}         ${senhafake}
    Inserir dados    ${CONF_SENHA}    ${senhafake}

Preencher formulário cadastro sem nome aleatório
    [Arguments]    ${nom}
    ${emailfake}=    FakerLibrary.Email
    ${senhafake}=    FakerLibrary.Password
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${NOME}          ${nom}
    Inserir dados    ${EMAIL}         ${emailfake}            
    Inserir dados    ${SENHA}         ${senhafake}
    Inserir dados    ${CONF_SENHA}    ${senhafake}

Preencher formulário cadastro sem gerar email aleatório
    [Arguments]    ${ema}
    ${nomefake}=     FakerLibrary.Name
    ${senhafake}=    FakerLibrary.Password
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${NOME}          ${nomefake}
    Inserir dados    ${EMAIL}         ${ema}            
    Inserir dados    ${SENHA}         ${senhafake}
    Inserir dados    ${CONF_SENHA}    ${senhafake}

Preencher formulário cadastro sem nome
    ${emailfake}=    FakerLibrary.Email
    ${senhafake}=    FakerLibrary.Password
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${EMAIL}         ${emailfake}            
    Inserir dados    ${SENHA}         ${senhafake}
    Inserir dados    ${CONF_SENHA}    ${senhafake}

Preencher formulário cadastro sem email
    ${nomefake}=     FakerLibrary.Name
    ${senhafake}=    FakerLibrary.Password
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${NOME}          ${nomefake}           
    Inserir dados    ${SENHA}         ${senhafake}
    Inserir dados    ${CONF_SENHA}    ${senhafake}

Preencher formulário cadastro sem senha principal e sem confirmar senha
    ${nomefake}=     FakerLibrary.Name
    ${emailfake}=    FakerLibrary.Email 
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${NOME}          ${nomefake}
    Inserir dados    ${EMAIL}         ${emailfake}            


