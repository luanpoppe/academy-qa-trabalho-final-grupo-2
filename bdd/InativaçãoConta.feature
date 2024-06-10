Funcionalidade: Inativação da conta 
    Como um usuário da aplicação
    Desejo poder inativar uma conta 
    Para deixar de ser listado como um usuário na aplicação 

    Contexto: Acessar a API Raromdb 
        Dado que o usuário acessou o site da Api Raromdb

    Cenário: Não deve ser possível inativar a conta com sucesso, sem efetar login
        Quando acessar a funcionalidade "Inactivate User"
        Então o perfil do usuário deve ser desativado com sucesso 
    
    Cenário: Deve ser possível inativar a conta com sucesso, sendo um usuário Comum
        E realizou Login
        E é um usuário com perfil Comum
        Quando acessar a funcionalidade "Inactivate User"
        Então o perfil do usuário deve ser desativado com sucesso 
  
    Cenário: Deve ser possível inativar a conta com sucesso, sendo um usuário Administrador
        E realizou Login
        E é um usuário com perfil Administrador
        Quando acessar a funcionalidade "Inactivate User"
        Então o perfil do usuário deve ser desativado com sucesso

    Cenário: Deve ser possível inativar a conta com sucesso, sendo um usuário Crítico  
        E realizou Login
        E é um usuário com perfil Crítico
        Quando acessar a funcionalidade "Inactivate User"
        Então o perfil do usuário não dever se desativado com sucesso

    Cenário: Deve ser possível cadastrar um novo usuário com o e-mail de um usuário inativo 
        Quando acessar a funcionalidade "Create User"
        E utilizar um e-mail já utilizado por um usuário inativo
        Então o perfil do usuário será cadastrado com sucesso

    Cenário: Deve ser possível visualizar as informações de uma review feita por um usuário em determinado filme, mesmo depois da inativação da sua conta
        E realizou Login
        Quando acessar a funcionalidade "Find movie"
        E consultar um filme que tenha sido avaliado por um usuário já inativo
        Então deve ser possível consultar as informações da review feita por esse usuário   