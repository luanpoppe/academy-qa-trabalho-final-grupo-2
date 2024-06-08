*** Settings ***

Resource    ../../base.robot
Resource    ../utils/config.robot
Resource    ../utils/commons.robot


*** Variables ***
${HOME}                 xpath=//android.view.View[@content-desc="Home"]
${MENU}                 xpath=//android.widget.Button[@content-desc="Open navigation menu"]
${REGISTRO}             xpath=//android.view.View[@content-desc="Registre-se"]
${CADASTRO}             xpath=//android.view.View[@content-desc="Cadastro"]
${NOME}                 xpath=//android.widget.ImageView/android.widget.EditText[1]
${EMAIL}                xpath=//android.widget.ImageView/android.widget.EditText[2]
${SENHA}                xpath=//android.widget.ImageView/android.widget.EditText[3]
${CONF_SENHA}           xpath=//android.widget.ImageView/android.widget.EditText[4]
${BUTTON_REGISTRAR}     xpath=//android.widget.Button[@content-desc="Registrar"]
${CADASTRO_SUCESSO}     xpath=//android.view.View[@content-desc="Cadastro realizado!"]




*** Keywords ***
Dado que o usuário acessou o aplicativo
    Espera elemento está visivel    ${HOME}

Quando o usuário acessar o menu
    Acessa menu

E acessar a funcionalidade de registro de usuário
    Espera elemento e clica         ${REGISTRO}

Então o usuário consegue visualizar o formulário para registro
    Espera elemento está visivel    ${NOME}
    Espera elemento está visivel    ${EMAIL}
    Espera elemento está visivel    ${SENHA}
    Espera elemento está visivel    ${CONF_SENHA}

Dado que o usuário acessou a tela de registro de usuário
    Acessa menu
    Espera elemento e clica         ${REGISTRO}

Quando preenche todos os campos do formulário com dados válidos
    Preencher formulário cadastro com email aleatório    carol    123456    123456

E acessa a funcionalidade salvar
    Hide Keyboard
    Click Element    ${BUTTON_REGISTRAR}

Então usuário é registrado com mensagem de cadastro com sucesso
    Espera elemento está visivel    ${CADASTRO_SUCESSO}

Quando preenche todos os campos do formulário utilizando email de 60 caracteres
    Preencher formulário cadastro sem email aleatório    Carol    CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCA@raro.com    123456    123456

Quando preenche todos os campos do formulário utilizando nome de 100 caracteres
    Preencher formulário cadastro com email aleatório    CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC    123456    123456
    
Quando preenche todos os campos do formulário utilizando senha de 6 caracteres
    Preencher formulário cadastro com email aleatório    Carol    123456    123456

Quando preenche todos os campos do formulário utilizando senha de 12 caracteres
    Preencher formulário cadastro com email aleatório    carol    123456789123    123456789123



