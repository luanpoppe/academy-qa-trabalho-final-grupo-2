Funcionalidade: Exclusão da conta 
    Como um usuário Administrador da aplicação
    Desejo poder excluir uma conta 
    Para que as informações daquela conta sejam removidas da base de dados

    Contexto: Acessar a API Raromdb 
        Dado que o usuário acessou o site da Api Raromdb

    Cenário: Não deve ser possível realizar exclusão de uma conta, sem efetuar login 
        Quando acessar a funcionalidade "Delete User"
        Então não deve ser possível excluir a conta de um usuário

    Cenário: Não deve ser possível realizar exclusão de uma conta, sendo um usuário com perfil Comum 
        E realizou Login
        E é um usuário com perfil Comum
        Quando acessar a funcionalidade "Delete User"
        Então não deve ser possível excluir a conta de um usuário

    Cenário: Não deve ser possível realizar exclusão de uma conta, sendo um usuário com perfil Crítico 
        E realizou Login
        E é um usuário com perfil Crítico
        Quando acessar a funcionalidade "Delete User"
        Então não deve ser possível excluir a conta de um usuário

  Cenário: Deve ser possível que um usuário com perfil Administrador, exclua a conta de outro usuário
        E realizou Login
        E é um usuário com perfil Administrador
        Quando acessar a funcionalidade "Delete User"
        Então deve ser possível excluir a conta de um outro usuário

    Cenário: Deve ser possível que um usuário com perfil Administrador, exclua a própria conta
        E realizou Login
        E é um usuário com perfil Administrador
        Quando acessar a funcionalidade "Delete User"
        Então deve ser possível excluir a própria conta




    