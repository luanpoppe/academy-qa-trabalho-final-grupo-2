Funcionalidade: Listagem
    Como um usuário da aplicação
    Desejo poder consultar dados de todos os usuários
    Para ser capaz de melhor gerenciar o sistema

    Contexto: Acessar a API Raromdb 
        Dado que o usuário acessou o site da Api Raromdb

    Cenário: Não deve ser possível realizar a consulta de todos os usuários cadastrados, sendo um usuário Comum 
        E realizou Login
        E é um usuário com perfil Comum
        Quando acessar a funcionalidade "List Users"
        Então não deve ser possível acessar a lista de usuários

    Cenário: Não deve ser possível realizar a consulta de todos os usuários cadastrados, sendo um usuário Crítico 
        E realizou Login
        E é um usuário com perfil Crítico
        Quando acessar a funcionalidade "List Users"
        Então não deve ser possível acessar a lista de usuários

    Cenário: Deve ser possível realizar a consulta de todos os usuários cadastrados sendo um usuário Administrador 
        E realizou Login
        E é um usuário com perfil Administrador
        Quando acessar a funcionalidade "List Users"
        Então deve ser possível acessar a lista de usuários

