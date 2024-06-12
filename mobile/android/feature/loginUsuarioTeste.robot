*** Settings ***

Resource    ../../base.robot

Test Setup        Open App
Test Teardown     Teardown

*** Test Cases ***
CT001 - Deve ser possível acessar tela de Login
    Dado que o usuário acessou o aplicativo
    Quando o usuário acessar o menu
    E acessar a funcionalidade de Login
    Então o usuário consegue visualizar o formulário para autenticar no site

CT002 - Usuário deve conseguir autenticar-se com sucesso
    Dado que o usuário acessa a tela de login
    Quando informa as credenciais cadastradas
    Então usuário deve autenticar-se com sucesso

CT003 - Usuário não deve conseguir autenticar-se sem informar e-mail
    Dado que o usuário acessa a tela de login
    Quando informa as credenciais exceto campo Email
    E acessa funcionalidade login
    Então deve alertar no formulário o campo Email como obrigatório

CT004 - Usuário não deve conseguir autenticar-se sem informar senha
    Dado que o usuário acessa a tela de login
    Quando informa as credenciais exceto campo Senha
    E acessa funcionalidade login
    Então deve alertar no formulário o campo Senha como obrigatória

CT005 - Usuário não deve conseguir autenticar-se sem informar os campos obrigatórios
    Dado que o usuário acessa a tela de login
    Quando não informa Email e Senha
    E acessa funcionalidade login
    Então deve alertar no formulário os campos obrigatórios de login

CT006 - Usuário não deve conseguir autenticar-se com e-mail não cadastrado
    Dado que o usuário acessa a tela de login
    Quando informa as credenciais utilizando email não cadastrado
    E acessa funcionalidade login
    Então o site deve exibir alerta de usuário ou senha inválidos

CT007 - Usuário não deve conseguir autenticar-se com senha incorreta
    Dado que o usuário acessa a tela de login
    Quando informa as credenciais utilizando senha incorreta
    E acessa funcionalidade login
    Então o site deve exibir alerta de usuário ou senha inválidos
