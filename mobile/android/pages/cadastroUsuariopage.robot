*** Settings ***

Resource    ../../base.robot
Resource    ../utils/config.robot
Resource    ../utils/commons.robot


*** Variables ***
${HOME}                     xpath=//android.view.View[@content-desc="Home"]
${MENU}                     xpath=//android.widget.Button[@content-desc="Open navigation menu"]
${REGISTRO}                 xpath=//android.view.View[@content-desc="Registre-se"]
${CADASTRO}                 xpath=//android.view.View[@content-desc="Cadastro"]

#formulário
${NOME}                     xpath=//android.widget.ImageView/android.widget.EditText[1]
${EMAIL}                    xpath=//android.widget.ImageView/android.widget.EditText[2]
${SENHA}                    xpath=//android.widget.ImageView/android.widget.EditText[3]
${CONF_SENHA}               xpath=//android.widget.ImageView/android.widget.EditText[4]

#botão
${BUTTON_REGISTRAR}         xpath=//android.widget.Button[@content-desc="Registrar"]

#alertas de cadastro
${CADASTRO_SUCESSO}         xpath=//android.view.View[@content-desc="Cadastro realizado!"]
${ALERTA_FALHA_CADASTRO}    xpath=//android.view.View[@content-desc="Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde."]

#alertas de formulário
${ALERTA_NOME}              xpath=//android.view.View[@content-desc="Informe o nome."]
${ALERTA_EMAIL}             xpath=//android.view.View[@content-desc="Informe o e-mail."]
${ALERTA_EMAIL_INVALIDO}    xpath=//android.view.View[@content-desc="Informe um e-mail válido."]
${ALERTA_SENHA}             xpath=//android.view.View[@content-desc="Informe uma senha."]
${ALERTA_CONF_SENHA}        xpath=//android.view.View[@content-desc="Confirme a senha."]
${ALERTA_SENHA_DIF}         xpath=//android.view.View[@content-desc="As senhas não coincidem."]




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
    Wait Until Keyword Succeeds    5    1    Espera elemento e clica         ${REGISTRO}

Quando preenche todos os campos do formulário com dados válidos
    Preencher formulário cadastro

E acessa a funcionalidade salvar
    Hide Keyboard
    Click Element    ${BUTTON_REGISTRAR}

Então usuário é registrado com mensagem de cadastro com sucesso
    Espera elemento está visivel    ${CADASTRO_SUCESSO}

Quando preenche todos os campos do formulário utilizando email de 60 caracteres
    Preencher formulário cadastro sem gerar email aleatório    CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB@raro.com

Quando preenche todos os campos do formulário utilizando email de 6 caracteres
    Preencher formulário cadastro sem gerar email aleatório    c@r.br

Quando preenche todos os campos do formulário utilizando nome de 100 caracteres
    Preencher formulário cadastro sem nome aleatório    CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC

Quando preenche todos os campos do formulário utilizando nome de 99 caracteres
    Preencher formulário cadastro sem nome aleatório    CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC

Quando preenche todos os campos do formulário utilizando senha de 6 caracteres
    Preencher formulário cadastro sem senha principal e sem confirmar senha
    Inserir dados    ${SENHA}         123456
    Inserir dados    ${CONF_SENHA}    123456

Quando preenche todos os campos do formulário utilizando senha de 12 caracteres
    Preencher formulário cadastro sem senha principal e sem confirmar senha
    Inserir dados    ${SENHA}         123456789123
    Inserir dados    ${CONF_SENHA}    123456789123

Quando acessa a funcionalidade salvar
    Espera elemento e clica    ${BUTTON_REGISTRAR}

Então deve alertar no formulário os campos obrigatórios
    Espera elemento está visivel    ${ALERTA_NOME}
    Espera elemento está visivel    ${ALERTA_EMAIL}
    Espera elemento está visivel    ${ALERTA_SENHA}
    Espera elemento está visivel    ${ALERTA_CONF_SENHA}

Quando preenche todos os campos do formulário exceto campo nome
    Preencher formulário cadastro sem nome

Então deve alertar no formulário o campo Nome como obrigatório
    Espera elemento está visivel    ${ALERTA_NOME}

Quando preenche todos os campos do formulário utilizando somente espaços no campo nome
    Espera elemento está visivel    ${CADASTRO}
    Click Element    ${NOME}
    Espera elemento e clica    ${NOME}
    Press Keycode    62
    Press Keycode    62
    Press Keycode    62
    Press Keycode    62
    Press Keycode    62
    Press Keycode    62    
    Preencher formulário cadastro sem nome   

Quando preenche todos os campos do formulário exceto campo email
    Preencher formulário cadastro sem email

Então deve alertar no formulário o campo Email como obrigatório
    Espera elemento está visivel    ${ALERTA_EMAIL}

 Quando preenche todos os campos do formulário utilizando email inválido
    Preencher formulário cadastro sem gerar email aleatório    carol@.com

Quando preenche todos os campos do formulário utilizando email com espaços entre os caracteres
    Preencher formulário cadastro sem gerar email aleatório    c${SPACE}a@gmail.com

Então deve alertar no formulário o campo Email como inválido
    Espera elemento está visivel    ${ALERTA_EMAIL_INVALIDO}

Quando preenche todos os campos do formulário exceto campo senha principal
    Preencher formulário cadastro sem senha principal e sem confirmar senha
    Inserir dados    ${CONF_SENHA}    123456

Então deve alertar no formulário o campo Senha como obrigatório
    Espera elemento está visivel    ${ALERTA_SENHA}
    Espera elemento está visivel    ${ALERTA_SENHA_DIF}

Quando preenche todos os campos do formulário sem confirmar senha
    Preencher formulário cadastro sem senha principal e sem confirmar senha
    Inserir dados    ${SENHA}    123456

Então deve alertar no formulário a confirmação de senha como obrigatória
    Espera elemento está visivel    ${ALERTA_CONF_SENHA}

Quando preenche todos os campos do formulário utilizando senha menor que 6 caracteres
    Preencher formulário cadastro sem senha principal e sem confirmar senha
    Inserir dados    ${SENHA}         12345
    Inserir dados    ${CONF_SENHA}    12345

Quando preenche todos os campos do formulário senha principal diferente da confirmação de senha
    Preencher formulário cadastro sem senha principal e sem confirmar senha
    Inserir dados    ${SENHA}         abcdef
    Inserir dados    ${CONF_SENHA}    abcdefg

Quando preenche todos os campos do formulário utilizando senha maior que 12 caracteres
    Preencher formulário cadastro sem senha principal e sem confirmar senha
    Inserir dados    ${SENHA}         1234567891234
    Inserir dados    ${CONF_SENHA}    1234567891234

Então operação de cadastro não pode ser concluida
    Espera elemento está visivel    ${ALERTA_FALHA_CADASTRO}
Então deve alertar no formulário que a confirmação de senha está divergente da senha principal
    Espera elemento está visivel    ${ALERTA_SENHA_DIF}

Quando preenche todos os campos do formulário utlizando um email já cadastrado
    Preencher formulário cadastro sem gerar email aleatório    $ema
