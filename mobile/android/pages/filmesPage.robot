*** Settings ***

Resource    ../../base.robot

*** Variables ***
${primeiroFilmeDaLista}    xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[1]/android.widget.ImageView

*** Keywords ***
Acessar primeiro filme da lista
    Espera elemento e clica    ${primeiroFilmeDaLista}