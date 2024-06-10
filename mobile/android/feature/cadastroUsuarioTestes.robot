*** Settings ***

Resource    ../../base.robot

Test Setup        Open App
Test Teardown     Teardown


*** Test Cases ***
CT001 - Deve ser possível acessar tela de registro de usuário
    Dado que o usuário acessou o aplicativo
    Quando o usuário acessar o menu
    E acessar a funcionalidade de registro de usuário
    Então o usuário consegue visualizar o formulário para registro

CT002 - Deve ser possível registrar usuário com dados válidos
    Dado que o usuário acessou a tela de registro de usuário
    Quando preenche todos os campos do formulário com dados válidos
    E acessa a funcionalidade salvar
    Então usuário é registrado com mensagem de cadastro com sucesso

CT003 - Deve ser possível registrar usuário com email de 60 caracteres
    Dado que o usuário acessou a tela de registro de usuário
    Quando preenche todos os campos do formulário utilizando email de 60 caracteres
    E acessa a funcionalidade salvar
    Então usuário é registrado com mensagem de cadastro com sucesso

CT0 - Deve ser possível registrar usuário com email de 6 caracteres
    Dado que o usuário acessou a tela de registro de usuário
    Quando preenche todos os campos do formulário utilizando email de 6 caracteres
    E acessa a funcionalidade salvar
    Então usuário é registrado com mensagem de cadastro com sucesso

CT00 - Deve ser possível registrar usuário com nome com 99 caracteres
    Dado que o usuário acessou a tela de registro de usuário
    Quando preenche todos os campos do formulário utilizando nome de 99 caracteres
    E acessa a funcionalidade salvar
    Então usuário é registrado com mensagem de cadastro com sucesso

CT004 - Deve ser possível registrar usuário com nome de 100 caracteres
    Dado que o usuário acessou a tela de registro de usuário
    Quando preenche todos os campos do formulário utilizando nome de 100 caracteres
    E acessa a funcionalidade salvar
    Então usuário é registrado com mensagem de cadastro com sucesso

CT005 - Deve ser possível registrar usuário com senha de 6 caracteres
    Dado que o usuário acessou a tela de registro de usuário
    Quando preenche todos os campos do formulário utilizando senha de 6 caracteres
    E acessa a funcionalidade salvar
    Então usuário é registrado com mensagem de cadastro com sucesso

CT006 - Deve ser possível registrar usuário com senha de 12 caracteres
    Dado que o usuário acessou a tela de registro de usuário
    Quando preenche todos os campos do formulário utilizando senha de 12 caracteres
    E acessa a funcionalidade salvar
    Então usuário é registrado com mensagem de cadastro com sucesso

CT007 - Não deve ser possível registrar usuário sem inserir os dados no formulário
    Dado que o usuário acessou a tela de registro de usuário
    Quando acessa a funcionalidade salvar
    Então deve alertar no formulário os campos obrigatórios

CT008 - Não deve ser possível registrar usuário sem informar nome
    Dado que o usuário acessou a tela de registro de usuário
    Quando preenche todos os campos do formulário exceto campo nome
    E acessa a funcionalidade salvar
    Então deve alertar no formulário o campo Nome como obrigatório

#quebra porque aceita
CT009 - Não deve ser possível registrar usuário utilizando somente espaços no campo nome
    Dado que o usuário acessou a tela de registro de usuário
    Quando preenche todos os campos do formulário utilizando somente espaços no campo nome
    E acessa a funcionalidade salvar
    Então deve alertar no formulário o campo Nome como obrigatório

CT0 - Não deve ser possível registrar usuário sem informar email
    Dado que o usuário acessou a tela de registro de usuário
    Quando preenche todos os campos do formulário exceto campo email
    E acessa a funcionalidade salvar
    Então deve alertar no formulário o campo Email como obrigatório

CT0 - Não deve ser possível registrar usuário utilizando email inválido
    Dado que o usuário acessou a tela de registro de usuário
    Quando preenche todos os campos do formulário utilizando email inválido
    E acessa a funcionalidade salvar
    Então deve alertar no formulário o campo Email como inválido

CT0 - Não deve ser possível registrar usuário utilizando email informando espaços entre os caracteres
    Dado que o usuário acessou a tela de registro de usuário
    Quando preenche todos os campos do formulário utilizando email com espaços entre os caracteres
    E acessa a funcionalidade salvar
    Então deve alertar no formulário o campo Email como inválido

CT0 - Não deve ser possível registrar usuário sem informar senha principal
    Dado que o usuário acessou a tela de registro de usuário
    Quando preenche todos os campos do formulário exceto campo senha principal
    E acessa a funcionalidade salvar
    Então deve alertar no formulário o campo Senha como obrigatório

CT0 - Não deve ser possível registrar usuário sem informar confirmação de senha
    Dado que o usuário acessou a tela de registro de usuário
    Quando preenche todos os campos do formulário sem confirmar senha
    E acessa a funcionalidade salvar
    Então deve alertar no formulário a confirmação de senha como obrigatória

#verificar esse cenário com iury
CT0 - Não deve ser possível registrar usuário utilizando senha menor que 6
    Dado que o usuário acessou a tela de registro de usuário
    Quando preenche todos os campos do formulário utilizando senha menor que 6 caracteres
    E acessa a funcionalidade salvar
    Então operação de cadastro não pode ser concluida

#verificar esse cenário com iury
CT0 - Não deve ser possível registrar usuário utilizando senha maior que 12
    Dado que o usuário acessou a tela de registro de usuário
    Quando preenche todos os campos do formulário utilizando senha maior que 12 caracteres
    E acessa a funcionalidade salvar
    Então operação de cadastro não pode ser concluida


CT0 - Não deve ser possível registrar usuário utilizando senha principal diferente da confirmação de senha
    Dado que o usuário acessou a tela de registro de usuário
    Quando preenche todos os campos do formulário senha principal diferente da confirmação de senha
    E acessa a funcionalidade salvar
    Então deve alertar no formulário que a confirmação de senha está divergente da senha principal

CT0 - Não deve ser possível registrar usuário utilizando email ja cadastrado
    Dado que o usuário acessou a tela de registro de usuário
    Quando preenche todos os campos do formulário utlizando um email já cadastrado
    E acessa a funcionalidade salvar
    Então operação de cadastro não pode ser concluida



