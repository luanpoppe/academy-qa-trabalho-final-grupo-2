*** Settings ***

Resource    ../../base.robot

*** Variables ***
${URL_API}    https://raromdb-3c39614e42d4.herokuapp.com

*** Keywords ***
Cadastrar usuario na API
    ${name_fake}=    FakerLibrary.Name
    ${emailfake}=    FakerLibrary.Email 
    ${body}    Create Dictionary    name=${name_fake}    email=${emailfake}    password=123456
    ${resposta}    POST On Session    alias=CreateUser    url=${URL_API}/api/users    json=${body}
             
