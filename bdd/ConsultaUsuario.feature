Funcionalidade: Consulta geral de usuários
    Como um usuário Administrador da aplicação
    Desejo poder consultar dados de todos os usuários
    Para ser capaz de melhor gerenciar o sistema

    Contexto: Acessar a API Raromdb 
        Dado que o usuário acessou o site da Api Raromdb

    Cenário: Não deve ser possível consultar as informações de um usuário sendo um usuário Comum 
        E realizou Login
        E é um usuário com perfil Comum
        Quando acessar a funcionalidade "Find User"
        Então não deve ser possível consultar as informações dos usuários

    Cenário: Não deve ser possível consultar as informações de um usuário sendo um usuário Crítico 
        E realizou Login
        E é um usuário com perfil Crítico
        Quando acessar a funcionalidade "Find User"
        Então não deve ser possível consultar as informações dos usuários

    Cenário: Deve ser possível consultar as informações de um usuário sendo um usuário Administrador 
        E realizou Login
        E é um usuário com perfil Administrador
        Quando acessar a funcionalidade "Find User"
        Então deve ser possível consultar as informações dos usuários



    