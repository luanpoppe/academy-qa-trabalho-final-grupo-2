*** Settings ***
Resource    ../../base.robot
Library    OperatingSystem
Library    Collections

*** Variables ***
&{filmePadrao}    title=Nome do filme    genre=Gênero do filme    description=Descrição do filme    durationInMinutes=120    releaseYear=2020


*** Keywords ***
Iniciar sessão padrão da API
    ${headers}=    Create Dictionary    accept=application/json    Content-Type=application/json
    Create Session    alias=api    url=https://raromdb-3c39614e42d4.herokuapp.com/    headers=${headers}

Iniciar sessão com token da API
    [Arguments]    ${tokenParam}
    ${headers}=    Create Dictionary    accept=application/json    Content-Type=application/json    Authorization=Bearer ${tokenParam}
    Create Session    alias=api    url=https://raromdb-3c39614e42d4.herokuapp.com/    headers=${headers}

Criar usuário
    ${localEmail}=    Fakerlibrary.Email
    Set Global Variable    ${email}    ${localEmail}
    Set Global Variable    ${password}    senha123
    ${body}=    Create Dictionary    name=Nome Teste    email=${email}    password=${password}
    Iniciar sessão padrão da API
    ${resposta}    POST On Session    alias=api    url=/api/users    json=${body}
    Set Global Variable    ${usuarioCriado}    ${resposta.json()}

Logar usuário
    ${body}=    Create Dictionary    email=${email}    password=${password}
    Iniciar sessão padrão da API
    ${resposta}    POST On Session    alias=api    url=/api/auth/login    json=${body}
    Set Global Variable    ${tokenUsuario}    ${resposta.json()}[accessToken]
    Log    ${tokenUsuario}

Promover usuário para administrador
    Iniciar sessão com token da API    ${tokenUsuario}
    PATCH On Session    alias=api    url=/api/users/admin

Criar usuário admin
    Criar usuário
    Logar usuário
    Promover usuário para administrador

Deletar usuário
    [Arguments]    ${usuarioParam}
    Promover usuário para administrador
    Iniciar sessão com token da API    ${tokenUsuario}
    ${resposta}    DELETE On Session    alias=api    url=/api/movies/${usuarioParam}[id]

Cadastrar um filme
    [Arguments]    ${dicionarioFilme}
    ${localReleaseYear}=    Convert To Integer    ${dicionarioFilme}[releaseYear]
    ${localDurationInMinutes}=    Convert To Integer    ${dicionarioFilme}[durationInMinutes]
    Set To Dictionary    ${dicionarioFilme}    releaseYear=${localReleaseYear}    durationInMinutes=${localDurationInMinutes}
    Iniciar sessão com token da API    ${tokenUsuario}
    ${resposta}    POST On Session    alias=api    url=/api/movies    json=${dicionarioFilme}
    Set Global Variable    ${filmeCriado}    ${resposta.json()}
    Log    ${filmeCriado}

Deletar filme
    [Arguments]    ${filme}
    Promover usuário para administrador
    Iniciar sessão com token da API    ${tokenUsuario}
    ${resposta}    DELETE On Session    alias=api    url=/api/movies/${filme}[id]