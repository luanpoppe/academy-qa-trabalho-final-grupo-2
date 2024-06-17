*** Settings ***

Library    AppiumLibrary
Library    FakerLibrary  
Library    RequestsLibrary
Library    String

     

#Utils
Resource    android/utils/configPersonalizado.robot
# Resource    android/utils/config.robot --> DESCOMENTAR PARA ENVIAR O EXERCÍCIO
Resource    android/utils/commons.robot
Resource    android/utils/requestsApi.robot

#Pages
Resource    android/pages/cadastroUsuariopage.robot
Resource    android/pages/loginUsuarioPage.robot
Resource    android/pages/filmeDetalhesPage.robot
Resource    android/pages/filmesPage.robot
