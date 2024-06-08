Funcionalidade: Evolução para perfil administrador
    Como um usuário interno da aplicação 
    Desejo poder me tornar um administrador
    Para ser capaz de gerenciar informações de filmes e usuários

    Contexto: Acessar a API Raromdb 
        Dado que o usuário acessou o site da Api Raromdb

    Cenário: Não deve ser possível evoluir usuário para perfil Administrador sem realizar Login
        E não realizou Login
        Quando acessar a funcionalidade "Promote User to Admin"
        Então não deve ser possível evoluir usuário para perfil Administrador

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

    Cenário: Deve ser possível identificar quando uma review for feita por um usuário Administrador
        E se cadastrou no sistema         
        E realizou Login
        E se tornou um usuário Administrador
        E criou uma review de um filme 
        Quando acessar a funcionalidade "List reviews"
        Então deve ser possível ver que a review foi realizada por um usuário com perfil Administrador

    Cenário: Deve ser possível verificar que as reviews criadas por um usuário administrador não impactam nas métricas de avaliação da crítica 
        E se cadastrou no sistema         
        E realizou Login
        E se tornou um usuário Administrador
        E criou uma review de um filme 
        Quando acessar a funcionalidade "Find Movie"
        Então deve ser possível visualizar que a review criada não impactou nas métricas de avaliação da crítica

    Cenário: Deve ser possível verificar que as reviews criadas por um usuário administrador não impactam nas métricas de audiência 
        E se cadastrou no sistema         
        E realizou Login
        E se tornou um usuário Administrador
        E criou uma review de um filme 
        Quando acessar a funcionalidade "Find Movie"
        Então deve ser possível visualizar que a review criada não impactou nas métricas de avaliação da audiência

    Cenário: Deve ser possível diferenciar os tipos de reviews feitas por um usuário, tendo ele perfil comum e depois administrador 
        E se cadastrou no sistema         
        E realizou Login
        E criou uma review de um filme 
        E se tornou um usuário Administrador
        E criou outra review de um filme 
        Quando acessar a funcionalidade "List reviews"
        Então deve ser possível ver os diferentes perfis que criaram a review

