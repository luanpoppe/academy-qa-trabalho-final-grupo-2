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







