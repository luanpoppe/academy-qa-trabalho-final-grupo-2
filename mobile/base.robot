*** Settings ***

Library    AppiumLibrary
Library    FakerLibrary  
Library    RequestsLibrary

     

#Utils
Resource    android/utils/config.robot
Resource    android/utils/commons.robot
Resource    android/utils/requestsApi.robot

#Pages
Resource    android/pages/cadastroUsuariopage.robot
Resource    android/pages/loginUsuarioPage.robot
Resource    android/pages/filmeDetalhesPage.robot
Resource    android/pages/filmesPage.robot
