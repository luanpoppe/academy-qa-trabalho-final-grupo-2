Funcionalidade: Evolução para perfil administrador
    Como um usuário interno da aplicação 
    Desejo poder me tornar um administrador
    Para ser capaz de gerenciar informações de filmes e usuários

    Contexto: Acessar a API Raromdb 
        Dado que o usuário acessou o site da Api Raromdb

    Cenário: Deve ser possível evoluir usuário Comum para perfil Administrador com sucesso
        E se cadastrou no sistema 
        E realizou Login
        Quando acessar a funcionalidade "Promote User to Admin"
        Então o perfil do usuário deve se tornar Administrador
  
    Cenário: Deve ser possível evoluir usuário Crítico para perfil Administrador com sucesso
        E se cadastrou no sistema         
        E realizou Login
        E se tornou um usuário Crítico
        Quando acessar a funcionalidade "Promote User to Admin"
        Então o perfil do usuário deve se tornar Administrador

    Cenário: Não deve ser possível evoluir usuário para perfil Administrador sem realizar Login
        E se cadastrou no sistema 
        E não realizou Login
        Quando acessar a funcionalidade "Promote User to Admin"
        Então não deve ser possível evoluir usuário para perfil Administrador

   