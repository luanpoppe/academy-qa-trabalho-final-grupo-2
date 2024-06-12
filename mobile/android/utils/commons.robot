*** Settings ***
Library    DateTime

Resource    ../../base.robot

*** Keywords ***
Clicar para voltar no celular
    Press Keycode    4

Clicar enter no celular
    Press Keycode    66

Espera elemento está visivel
    [Arguments]    ${elemento}
    Wait Until Element Is Visible    ${elemento}    10
    Element Should Be Visible        ${elemento}

Espera elemento e clica
    [Arguments]    ${elemento}
    Wait Until Element Is Visible    ${elemento}    10
    Wait Until Keyword Succeeds    5    1    Click Element                    ${elemento}    

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
    Espera elemento e clica    ${campo}
    Wait Until Keyword Succeeds    8    1    Input Text     ${campo}    ${dado}


Preencher formulário cadastro
    Gerar informaçoes de registro de usuario
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${NOME}          ${nomefake}
    Inserir dados    ${EMAIL}         ${emailfake}            
    Inserir dados    ${SENHA}         ${senhafake}
    Inserir dados    ${CONF_SENHA}    ${senhafake}

Gerar informaçoes de registro de usuario
    ${emailLocal}=    FakerLibrary.Email
    Set Global Variable    ${emailfake}    ${emailLocal}
    ${nomeLocal}=     FakerLibrary.Name
    Set Global Variable    ${nomefake}    ${nomeLocal}
    ${senhaLocal}=    FakerLibrary.Password
    Set Global Variable    ${senhafake}    ${senhaLocal}


Preencher formulário cadastro sem nome aleatório
    [Arguments]    ${nom}
    Gerar informaçoes de registro de usuario
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${NOME}          ${nom}
    Inserir dados    ${EMAIL}         ${emailfake}            
    Inserir dados    ${SENHA}         ${senhafake}
    Inserir dados    ${CONF_SENHA}    ${senhafake}

Preencher formulário cadastro sem gerar email aleatório
    [Arguments]    ${ema}
    Log    ${ema}
    Gerar informaçoes de registro de usuario
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${NOME}          ${nomefake}
    Inserir dados    ${EMAIL}         ${ema}            
    Inserir dados    ${SENHA}         ${senhafake}
    Inserir dados    ${CONF_SENHA}    ${senhafake}

Preencher formulário cadastro sem nome
   Gerar informaçoes de registro de usuario
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${EMAIL}         ${emailfake}            
    Inserir dados    ${SENHA}         ${senhafake}
    Inserir dados    ${CONF_SENHA}    ${senhafake}

Preencher formulário cadastro sem email
    Gerar informaçoes de registro de usuario
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${NOME}          ${nomefake}           
    Inserir dados    ${SENHA}         ${senhafake}
    Inserir dados    ${CONF_SENHA}    ${senhafake}

Preencher formulário cadastro sem senha principal e sem confirmar senha
    Gerar informaçoes de registro de usuario
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Inserir dados    ${NOME}          ${nomefake}
    Inserir dados    ${EMAIL}         ${emailfake}            

Pegar e formatar data atual
    Run Keyword And Return    Get Current Date    result_format=%d/%m/%Y

Terminar o teste com deleção de usuário quando email igual 60 caractere
    ${usuarioLocal}=    Create Dictionary    email=${emailDelete}    password=${senhafake}
    ${localToken}=    Logar usuário API    ${usuarioLocal}
    Promover usuário para administrador    ${localToken}
    
    Iniciar sessão com token da API    ${localToken}
    ${request}    GET On Session    alias=api    url=/api/users
    Set Local Variable    ${resposta}    ${request.json()}    
    
    ${userId}=    Evaluate    [item for item in ${resposta} if item["email"]=="${emailDelete}".lower()][0]["id"]
    Promover usuário para administrador    ${localToken}
    Deletar usuário por ID    ${userId}    ${localToken}

Terminar o teste com deleção de usuário quando email igual 6 caractere
    ${usuarioLocal}=    Create Dictionary    email=c@b.br    password=${senhafake}
    ${localToken}=    Logar usuário API    ${usuarioLocal}
    Promover usuário para administrador    ${localToken}
    
    Iniciar sessão com token da API    ${localToken}
    ${request}    GET On Session    alias=api    url=/api/users
    Set Local Variable    ${resposta}    ${request.json()}    
    
    ${userId}=    Evaluate    [item for item in ${resposta} if item["email"]=="c@b.br".lower()][0]["id"]
    Promover usuário para administrador    ${localToken}
    Deletar usuário por ID    ${userId}    ${localToken}

Terminar o teste com deleção de usuário quando senha igual 6 caractere
    ${usuarioLocal}=    Create Dictionary    email=${emailfake}    password=123456
    ${localToken}=    Logar usuário API    ${usuarioLocal}
    Promover usuário para administrador    ${localToken}
    
    Iniciar sessão com token da API    ${localToken}
    ${request}    GET On Session    alias=api    url=/api/users
    Set Local Variable    ${resposta}    ${request.json()}    
    
    ${userId}=    Evaluate    [item for item in ${resposta} if item["email"]=="${emailfake}".lower()][0]["id"]
    Promover usuário para administrador    ${localToken}
    Deletar usuário por ID    ${userId}    ${localToken}

Terminar o teste com deleção de usuário quando senha igual 12 caractere
    ${usuarioLocal}=    Create Dictionary    email=${emailfake}    password=123456789123
    ${localToken}=    Logar usuário API    ${usuarioLocal}
    Promover usuário para administrador    ${localToken}
    
    Iniciar sessão com token da API    ${localToken}
    ${request}    GET On Session    alias=api    url=/api/users
    Set Local Variable    ${resposta}    ${request.json()}    
    
    ${userId}=    Evaluate    [item for item in ${resposta} if item["email"]=="${emailfake}".lower()][0]["id"]
    Promover usuário para administrador    ${localToken}
    Deletar usuário por ID    ${userId}    ${localToken}