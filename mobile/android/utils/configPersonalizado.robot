*** Settings ***
Resource    ../../base.robot


*** Variables ***
${ANDROID_AUTOMATION_NAME}      UIAutomator2
${ANDROID_PLATFORM_NAME}        Android
${ANDROID_APP_VERSION}          14
${ANDROID_APP_PACKAGE}          com.example.raromdb
${ANDROID_APP_ACTIVITY}         .MainActivity
${APPIUM_UDID}                  RQCT902YNAW


*** Keywords ***
Open App
    Open Application
    ...    http://127.0.0.1:4723/wd/hub
    ...    automationName=${ANDROID_AUTOMATION_NAME}
    ...    platformName=${ANDROID_PLATFORM_NAME}
    ...    platformVersion=${ANDROID_APP_VERSION}
    ...    appActivity=${ANDROID_APP_ACTIVITY}
    ...    appPackage=${ANDROID_APP_PACKAGE}
    ...    AppiumUdid=${APPIUM_UDID}

Teardown
    Run Keyword    Run Keyword If Test Failed    Capture Page Screenshot
    Close All Applications
