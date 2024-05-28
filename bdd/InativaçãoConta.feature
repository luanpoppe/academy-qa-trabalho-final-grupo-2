Funcionalidade: Inativação da conta 
    Como um usuário da aplicação
    Desejo poder inativar uma conta 
    Para deixar de ser listado como um usuário na aplicação 

    Contexto: Acessar a API Raromdb 
        Dado que o usuário acessou o site da Api Raromdb

    Cenário: Deve ser possível inativar a conta com sucesso, sendo um usuário Comum
        E se cadastrou no sistema 
        E realizou Login
        Quando acessar a funcionalidade "Inactivate User"
        Então o perfil do usuário deve ser desativado com sucesso 
  
    Cenário: Deve ser possível inativar a conta com sucesso, sendo um usuário Administrador
        E se cadastrou no sistema 
        E realizou Login
        E se tornou um usuário Administrador
        Quando acessar a funcionalidade "Inactivate User"
        Então o perfil do usuário deve ser desativado com sucesso

    Cenário: Deve ser possível inativar a conta com sucesso, sendo um usuário Crítico  
        E se cadastrou no sistema 
        E realizou Login
        E se tornou um usuário Crítico
        Quando acessar a funcionalidade "Inactivate User"
        Então o perfil do usuário não dever se desativado com sucesso

    Cenário: Deve ser possível utilizar o e-mail de um usuário inativo  
        Quando acessar a funcionalidade "Create User"
        E utilizar um e-mail já utilizado por um usuário inativo
        Então o perfil do usuário será cadastrado com sucesso

    