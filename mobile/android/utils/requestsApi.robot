*** Settings ***
Resource    ../../base.robot
Library    OperatingSystem
Library    Collections

*** Variables ***
&{filmePadrao}    title=Nome do filme    genre=Gênero do filme    description=Descrição do filme    durationInMinutes=120    releaseYear=2020
${usuarioRaiz}


*** Keywords ***
Iniciar sessão padrão da API
    ${headers}=    Create Dictionary    accept=application/json    Content-Type=application/json
    Create Session    alias=api    url=https://raromdb-3c39614e42d4.herokuapp.com/    headers=${headers}

Iniciar sessão com token da API
    [Arguments]    ${tokenParam}
    ${headers}=    Create Dictionary    accept=application/json    Content-Type=application/json    Authorization=Bearer ${tokenParam}
    Create Session    alias=api    url=https://raromdb-3c39614e42d4.herokuapp.com/    headers=${headers}

Criar usuário API
    ${localEmail}=    Fakerlibrary.Email
    Set Local Variable    ${localPassword}    senha123
    ${fakerName}=    FakerLibrary.Name
    ${body}=    Create Dictionary    name=${fakerName}    email=${localEmail}    password=${localPassword}
    Iniciar sessão padrão da API
    ${resposta}    POST On Session    alias=api    url=/api/users    json=${body}
    Set Local Variable    ${usuarioCriado}    ${resposta.json()}
    Set To Dictionary    ${usuarioCriado}    password=${localPassword}
    RETURN    ${usuarioCriado}

Logar usuário API
    [Arguments]    ${userParam}
    ${body}=    Create Dictionary    email=${userParam}[email]    password=${userParam}[password]
    Iniciar sessão padrão da API
    ${resposta}    POST On Session    alias=api    url=/api/auth/login    json=${body}
    RETURN    ${resposta.json()}[accessToken]

Promover usuário para administrador
    [Arguments]    ${tokenParam}
    Iniciar sessão com token da API    ${tokenParam}
    PATCH On Session    alias=api    url=/api/users/admin

Promover usuário para crítico
    [Arguments]    ${tokenParam}
    Iniciar sessão com token da API    ${tokenParam}
    PATCH On Session    alias=api    url=/api/users/apply

Criar usuário admin
    ${localUser}=    Criar usuário API
    ${localToken}=    Logar usuário API    ${localUser}
    Promover usuário para administrador    ${localToken}
    Set Local Variable    &{dicionarioUsuario}    userInfo=${localUser}    token=${localToken}
    RETURN    &{dicionarioUsuario}

Deletar usuário
    [Arguments]    ${usuarioParam}    ${tokenParam}
    Promover usuário para administrador    ${tokenParam}
    Iniciar sessão com token da API    ${tokenParam}
    ${resposta}    DELETE On Session    alias=api    url=/api/users/${usuarioParam}[id]

Deletar usuário por ID
    [Arguments]    ${id}    ${tokenParam}
    Promover usuário para administrador    ${tokenParam}
    Iniciar sessão com token da API    ${tokenParam}
    ${resposta}    DELETE On Session    alias=api    url=/api/users/${id}

Deletar usuário por email
    [Arguments]    ${usuarioEmail}    ${tokenParam}
    Promover usuário para administrador    ${tokenParam}
    Iniciar sessão com token da API    ${tokenParam}
    ${resposta}    DELETE On Session    alias=api    url=/api/movies/${usuarioEmail}


Cadastrar um filme
    [Arguments]    ${dicionarioFilme}    ${tokenParam}
    ${localReleaseYear}=    Convert To Integer    ${dicionarioFilme}[releaseYear]
    ${localDurationInMinutes}=    Convert To Integer    ${dicionarioFilme}[durationInMinutes]
    Set To Dictionary    ${dicionarioFilme}    releaseYear=${localReleaseYear}    durationInMinutes=${localDurationInMinutes}
    Iniciar sessão com token da API    ${tokenParam}
    ${resposta}    POST On Session    alias=api    url=/api/movies    json=${dicionarioFilme}
    Set Global Variable    ${filmeCriado}    ${resposta.json()}
    Log    ${filmeCriado}

Deletar filme
    [Arguments]    ${filme}    ${tokenParam}
    Promover usuário para administrador    ${tokenParam}
    Iniciar sessão com token da API    ${tokenParam}
    ${resposta}    DELETE On Session    alias=api    url=/api/movies/${filme}[id]

Pegar lista de filmes
    Iniciar sessão padrão da API
    ${resposta}    GET On Session    alias=api    url=/api/movies
    Set Local Variable    ${listaFilmes}    ${resposta.json()}
    RETURN    ${listaFilmes}

Criar avaliação de um filme
    [Arguments]    ${idDoFilme}    ${tokenUsuario}
    Iniciar sessão com token da API    ${tokenUsuario}
    ${score}=    Convert To Integer    4
    ${avaliacaoFilme}=    Create Dictionary      movieId=${idDoFilme}    score=${score}    reviewText=Review em texto do filme
    ${resposta}    POST On Session    alias=api    url=/api/users/review    json=${avaliacaoFilme}

Pegar reviews de filme por id
    [Arguments]    ${idDoFilme}
    Iniciar sessão padrão da API
    ${resposta}    GET On Session    alias=api    url=/api/movies/${idDoFilme}
    Set Local Variable    ${respostaBody}    ${resposta.json()}
    RETURN    ${respostaBody}[reviews]