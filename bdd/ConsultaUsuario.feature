Funcionalidade: Consulta de usuários
    Como um usuário Administrador da aplicação
    Desejo poder consultar dados de todos os usuários
    Para ser capaz de melhor gerenciar o sistema

    Contexto: Acessar a API Raromdb 
        Dado que o usuário acessou o site da Api Raromdb

    Cenário: Não deve ser possível acessar as informações de um usuário, sendo um usuário Comum 
        E realizou Login
        E é um usuário com perfil Comum
        Quando acessar a funcionalidade "Find Users"
        E inserir um id válido
        Então não deve ser possível consultar as informações de um usuário

    Cenário: Não deve ser possível acessar as informações de um usuário, sendo um usuário Crítico 
        E realizou Login
        E é um usuário com perfil Comum
        Quando acessar a funcionalidade "Find Users"
        E inserir um id válido
        Então não deve ser possível consultar as informações de um usuário

    Cenário: Não deve ser possível acessar as informações de um usuário, sem efetuar login  
        E não efetuou Login 
        Quando acessar a funcionalidade "Find Users"
        E inserir um id válido
        Então não deve ser possível consultar as informações de um usuário

    Cenário: Não deve ser possível consultar um usuário com id inválido 
        E realizou Login
        E é um usuário com perfil Comum
        Quando acessar a funcionalidade "Find Users"
        E inserir um id inválido
        Então não deve ser possível consultar as informações do usuário

    Cenário: Deve ser possível acessar as informações de um usuário, sendo um usuário Admin  
        E realizou Login
        E é um usuário com perfil Comum
        Quando acessar a funcionalidade "Find Users"
        E inserir um id válido
        Então deve ser possível consultar as informações de um usuário



    