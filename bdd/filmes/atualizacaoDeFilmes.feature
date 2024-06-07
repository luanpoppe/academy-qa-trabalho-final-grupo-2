Funcionalidade: Atualização de Filmes
    Como um administrador da aplicação 
    Desejo poder atualizar informações de um filme do catálogo
    Para que os usuários possam consultar informações atualizadas sobre o filme

    Cenário: Usuário administrador deve poder atualizar um filme
        Dado que um usuário é administrador
        Quando tentar atualizar informações de um filme cadastrado
        Então a atualização do filme deve ser realizado com sucesso

    Cenário: Usuário administrador deve poder atualizar um filme com o título contendo 1 caractere
        Dado que um usuário é administrador
        Quando tentar atualizar um filme com o título contendo 1 caractere
        Então a atualização do filme deve ser realizado com sucesso

    Cenário: Usuário administrador deve poder atualizar um filme com o título contendo 100 caracteres
        Dado que um usuário é administrador
        Quando tentar atualizar um filme com o título contendo 100 caracteres
        Então a atualização do filme deve ser realizado com sucesso

    Cenário: Usuário administrador deve poder atualizar um filme com o gênero contendo 1 caractere
        Dado que um usuário é administrador
        Quando tentar atualizar um filme com o gênero contendo 1 caractere
        Então a atualização do filme deve ser realizado com sucesso

    Cenário: Usuário administrador deve poder atualizar um filme com o gênero contendo 100 caracteres
        Dado que um usuário é administrador
        Quando tentar atualizar um filme com o gênero contendo 100 caracteres
        Então a atualização do filme deve ser realizado com sucesso

    Cenário: Usuário administrador deve poder atualizar um filme com a descrição contendo 1 caractere
        Dado que um usuário é administrador
        Quando tentar atualizar um filme com a descrição contendo 1 caractere
        Então a atualização do filme deve ser realizado com sucesso

    Cenário: Usuário administrador deve poder atualizar um filme com a descrição contendo 500 caracteres
        Dado que um usuário é administrador
        Quando tentar atualizar um filme com a descrição contendo 500 caracteres
        Então a atualização do filme deve ser realizado com sucesso

    Cenário: Usuário administrador deve poder atualizar um filme com o ano de lançamento de 1895
        Dado que um usuário é administrador
        Quando tentar atualizar um filme com o ano de lançamento de 1895
        Então a atualização do filme deve ser realizado com sucesso

    Cenário: Usuário administrador deve poder atualizar um filme com o ano de lançamento sendo o ano atual
        Dado que um usuário é administrador
        Quando tentar atualizar um filme com o ano de lançamento sendo o ano atual
        Então a atualização do filme deve ser realizado com sucesso

    Cenário: Usuário administrador deve poder atualizar um filme com a duração de 1 minuto
        Dado que um usuário é administrador
        Quando tentar atualizar um filme com a duração de 1 minuto
        Então a atualização do filme deve ser realizado com sucesso

    Cenário: Usuário administrador deve poder atualizar um filme com a duração de 720 horas
        Dado que um usuário é administrador
        Quando tentar atualizar um filme com a duração de 720 horas
        Então a atualização do filme deve ser realizado com sucesso

    # Cenário: Deve ser possível adicionar dois filmes com as exatas mesmas informações
    #     Dado que um usuário é administrador
    #     E tem as informações de um filme já cadastrado
    #     Quando tentar cadastrar outro filme com as mesmas informações do filme já cadastrado
    #     Então a atualização do filme deve ser realizado com sucesso

    # Cenário: Não deve ser possível cadastrar um filme sem um título
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme sem um título
    #     Então a atualização não deve ser realizado

    # Cenário: Não deve ser possível cadastrar um filme com um título vazio
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme com um título vazio
    #     Então a atualização não deve ser realizado

    # Cenário: Não deve ser possível atualizar um filme com um título sendo um número
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme com um título sendo um número
    #     Então a atualização não deve ser realizado

    # Cenário: Não deve ser possível atualizar um filme com um título contendo 101 caracteres
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme com um título contendo 101 caracteres
    #     Então a atualização não deve ser realizado

    # Cenário: Não deve ser possível atualizar um filme sem um gênero
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme sem um gênero
    #     Então a atualização não deve ser realizado

    # Cenário: Não deve ser possível atualizar um filme com um gênero vazio
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme com um gênero vazio
    #     Então a atualização não deve ser realizado
    
    # Cenário: Não deve ser possível atualizar um filme com um gênero sendo um número
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme com um gênero sendo um número
    #     Então a atualização não deve ser realizado
    
    # Cenário: Não deve ser possível atualizar um filme com um gênero contendo 101 caracteres
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme com um gênero contendo 101 caracteres
    #     Então a atualização não deve ser realizado

    # Cenário: Não deve ser possível atualizar um filme sem uma descrição
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme sem uma descrição
    #     Então a atualização não deve ser realizado
    
    # Cenário: Não deve ser possível atualizar um filme com uma descrição vazia
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme com uma descrição vazia
    #     Então a atualização não deve ser realizado
    
    # Cenário: Não deve ser possível atualizar um filme com uma descrição sendo um número
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme com uma descrição sendo um número
    #     Então a atualização não deve ser realizado
    
    # Cenário: Não deve ser possível atualizar um filme com uma descrição contendo 501 caracteres
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme com uma descrição contendo 501 caracteres
    #     Então a atualização não deve ser realizado

    # Cenário: Não deve ser possível atualizar um filme sem uma duração
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme sem uma duração
    #     Então a atualização não deve ser realizado

    # Cenário: Não deve ser possível atualizar um filme com uma duração sem ser um número
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme com uma duração que não seja um número
    #     Então a atualização não deve ser realizado

    # Cenário: Não deve ser possível atualizar um filme com uma duração que seja um número decimal
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme com uma duração que que seja um número decimal
    #     Então a atualização não deve ser realizado

    # Cenário: Não deve ser possível atualizar um filme com uma duração que seja 0
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme com uma duração que que seja 0
    #     Então a atualização não deve ser realizado

    # Cenário: Não deve ser possível atualizar um filme com uma duração que seja negativa
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme com uma duração que que seja negativa
    #     Então a atualização não deve ser realizado

    # Cenário: Não deve ser possível atualizar um filme com uma duração que seja maior do que 720 horas
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme com uma duração que que seja maior do que 720 horas
    #     Então a atualização não deve ser realizado

    # Cenário: Não deve ser possível atualizar um filme sem um ano de lançamento
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme sem um ano de lançamento
    #     Então a atualização não deve ser realizado
    
    # Cenário: Não deve ser possível atualizar um filme com um ano de lançamento sem ser um número
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme com um ano de lançamento que não seja um número
    #     Então a atualização não deve ser realizado

    # Cenário: Não deve ser possível atualizar um filme com um ano de lançamento que seja um número decimal
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme com um ano de lançamento que que seja um número decimal
    #     Então a atualização não deve ser realizado

    # Cenário: Não deve ser possível atualizar um filme com um ano de lançamento que seja menor que que 1895
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme com um ano de lançamento que que seja menor que que 1895
    #     Então a atualização não deve ser realizado

    # Cenário: Não deve ser possível atualizar um filme com um ano de lançamento que seja maior do que o ano atual
    #     Dado que um usuário é administrador
    #     Quando tentar atualizar um filme com um ano de lançamento que que seja maior do que o ano atual
    #     Então a atualização não deve ser realizado
    
    # Cenário: Não deve ser possível um usuário não logado atualizar um filme
    #     Dado que um usuário não está logado
    #     Quando tentar atualizar um filme
    #     Então a atualização não deve ser realizado

    # Cenário: Não deve ser possível um usuário comum atualizar um filme
    #     Dado que um usuário é comum
    #     Quando tentar atualizar um filme
    #     Então a atualização não deve ser realizado

    # Cenário: Não deve ser possível um usuário crítico atualizar um filme
    #     Dado que um usuário é crítico
    #     Quando tentar atualizar um filme
    #     Então a atualização não deve ser realizado