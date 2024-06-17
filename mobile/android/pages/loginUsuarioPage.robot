*** Settings ***

Resource    ../../base.robot

*** Variables ***
${inputEmail}         xpath=//android.widget.ImageView/android.widget.EditText[1]
${inputSenha}         xpath=//android.widget.ImageView/android.widget.EditText[2]
${buttonLogin}        xpath=//android.widget.Button[@content-desc="Login"]
${usuarioLogado}      ${None}
${loginRealizado}     xpath=//android.view.View[@content-desc="Login realizado!"]
${alertaLogin}        xpath=//android.view.View[@content-desc="Usuário ou senha inválidos."]

*** Keywords ***
Fazer login aplicativo
    [Arguments]    ${userEmail}    ${userPassword}
    Inserir dados    ${inputEmail}    ${userEmail}
    Inserir dados    ${inputSenha}    ${userPassword}
    Espera elemento e clica    ${buttonLogin}

E acessar a funcionalidade de Login
    Espera elemento e clica    ${LOGIN}

Então o usuário consegue visualizar o formulário para autenticar no site
    Espera elemento está visivel    ${inputEmail}
    Espera elemento está visivel    ${inputSenha}

Dado que o usuário acessa a tela de login
    Acessa login

Quando informa as credenciais cadastradas
    ${usuarioCriado}=    Criar usuário API
    Fazer login aplicativo    ${usuarioCriado}[email]    ${usuarioCriado}[password]
    Set Global Variable    ${usuarioLogado}    ${usuarioCriado}

Então usuário deve autenticar-se com sucesso
    Espera elemento está visivel    ${loginRealizado}

Quando informa as credenciais exceto campo Email
    Inserir dados    ${inputSenha}    123456

E acessa funcionalidade login
    Espera elemento e clica    ${buttonLogin}

Quando informa as credenciais exceto campo Senha
    Inserir dados    ${inputEmail}    carol3@raro.com

Então deve alertar no formulário o campo Senha como obrigatória
    Espera elemento está visivel    ${ALERTA_SENHA}

Quando não informa Email e Senha
    Espera elemento e clica    ${inputEmail}
    Espera elemento e clica    ${inputSenha}

Então deve alertar no formulário os campos obrigatórios de login
    Então deve alertar no formulário o campo Email como obrigatório
    Então deve alertar no formulário o campo Senha como obrigatória

Quando informa as credenciais utilizando email não cadastrado
    Inserir dados    ${inputEmail}    esseemailehinexistente@gg.como
    Inserir dados    ${inputSenha}    123456

Então o site deve exibir alerta de usuário ou senha inválidos
    Espera elemento está visivel    ${alertaLogin}

Quando informa as credenciais utilizando senha incorreta
    Quando informa as credenciais utilizando email não cadastrado