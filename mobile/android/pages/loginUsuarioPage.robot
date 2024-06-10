*** Settings ***

Resource    ../../base.robot

*** Variables ***
${inputEmail}    xpath=//android.widget.ImageView/android.widget.EditText[1]
${inputSenha}    xpath=//android.widget.ImageView/android.widget.EditText[2]
${buttonLogin}    xpath=//android.widget.Button[@content-desc="Login"]
${usuarioLogado}    ${None}

*** Keywords ***
Fazer login aplicativo
    [Arguments]    ${userEmail}    ${userPassword}
    Inserir dados    ${inputEmail}    ${userEmail}
    Inserir dados    ${inputSenha}    ${userPassword}
    Clicar para voltar no celular
    Espera elemento e clica    ${buttonLogin}