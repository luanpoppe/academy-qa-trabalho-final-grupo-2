Funcionalidade: Exclusão da conta 
    Como um usuário Administrador da aplicação
    Desejo poder excluir uma conta 
    Para que as informações daquela conta sejam removidas da base de dados

    Contexto: Acessar a API Raromdb 
        Dado que o usuário acessou o site da Api Raromdb

    Cenário: Não deve ser possível excluir sua conta ou a de outro usuário, sendo um usuário com perfil Comum 
        E realizou Login
        E é um usuário com perfil Comum
        Quando acessar a funcionalidade "Delete User"
        Então não deve ser possível excluir a conta de um usuário

    Cenário: Não deve ser possível excluir sua conta ou a de outro usuário, sendo um usuário com perfil Crítico 
        E realizou Login
        E é um usuário com perfil Crítico
        Quando acessar a funcionalidade "Delete User"
        Então não deve ser possível excluir a conta de um usuário

    Cenário: Deve ser possível excluir sua conta ou a de outro usuário, sendo um usuário com perfil Administrador
        E realizou Login
        E é um usuário com perfil Administrador
        Quando acessar a funcionalidade "Delete User"
        Então deve ser possível excluir a conta de um usuário



    