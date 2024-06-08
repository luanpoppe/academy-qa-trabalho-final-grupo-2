Funcionalidade: Evolução para perfil crítico
    Como um usuário da aplicação 
    Desejo poder me tornar um crítico
    Para ser capaz de compartilhar minha opinião sobre os filmes com um tom mais especializado 

    Contexto: Acessar a API Raromdb 
        Dado que o usuário acessou o site da Api Raromdb
        E se cadastrou no sistema 

    Cenário: Não deve ser possível evoluir usuário para perfil crítico sem realizar Login     
        E não realizou Login
        Quando acessar a funcionalidade "Promote User to critic"
        Então não deve ser possível evoluir usuário para perfil crítico

    Cenário: Deve ser possível evoluir usuário Comum para perfil crítico 
        E realizou Login
        Quando acessar a funcionalidade "Promote User to critic"
        Então o perfil do usuário deve se tornar crítico
  
    Cenário: Deve ser possível evoluir usuário administrador para perfil crítico       
        E realizou Login
        E se tornou um usuário Administrador
        Quando acessar a funcionalidade "Promote User to critic"
        Então o perfil do usuário deve se tornar crítico
    
    Cenário: Deve ser possível identificar quando uma review for feita por um usuário Crítico
        E se cadastrou no sistema         
        E realizou Login
        E se tornou um usuário Crítico
        E criou uma review de um filme 
        Quando acessar a funcionalidade "List reviews"
        Então deve ser possível ver que a review foi realizada por um usuário com perfil Crítico

    Cenário: Deve ser possível verificar que as reviews criadas por um usuário crítico impactam nas métricas de avaliação da crítica 
        E se cadastrou no sistema         
        E realizou Login
        E se tornou um usuário Crítico
        E criou uma review de um filme 
        Quando acessar a funcionalidade "Find Movie"
        Então deve ser possível visualizar que a review criada impactou nas métricas de avaliação da crítica

    Cenário: Deve ser possível diferenciar os tipos de reviews feitas por um usuário, tendo ele perfil Comum e depois Crítico
        E se cadastrou no sistema         
        E realizou Login
        E criou uma review de um filme 
        E se tornou um usuário Crítico
        E criou outra review de um filme 
        Quando acessar a funcionalidade "List reviews"
        Então deve ser possível ver os diferentes perfis que criaram a review
    
