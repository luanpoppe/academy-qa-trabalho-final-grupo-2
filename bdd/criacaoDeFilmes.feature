Funcionalidade: Criação de Filmes
    Como um administrador da aplicação 
    Desejo poder adicionar novos filmes ao catálogo
    Para que os usuários possam consultar informações e escrever avaliações destes filmes

    Cenário: Usuário administrador deve poder criar um filme
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme
        Então o cadastro do filme deve ser realizado com sucesso

    Cenário: Usuário administrador deve poder criar um filme com o título contendo 1 caractere
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com o título contendo 1 caractere
        Então o cadastro do filme deve ser realizado com sucesso

    Cenário: Usuário administrador deve poder criar um filme com o título contendo 100 caracteres
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com o título contendo 100 caracteres
        Então o cadastro do filme deve ser realizado com sucesso

    Cenário: Não deve ser possível cadastrar um filme sem um título
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme sem um título
        Então o cadastro não deve ser realizado

    Cenário: Não deve ser possível cadastrar um filme com um título vazio
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com um título vazio
        Então o cadastro não deve ser realizado

    Cenário: Não deve ser possível criar um filme com um título sendo um número
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com um título sendo um número
        Então o cadastro não deve ser realizado

    Cenário: Não deve ser possível criar um filme com um título contendo 101 caracteres
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com um título contendo 101 caracteres
        Então o cadastro não deve ser realizado

    Cenário: Não deve ser possível criar um filme sem um gênero
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme sem um gênero
        Então o cadastro não deve ser realizado

    Cenário: Não deve ser possível criar um filme com um gênero vazio
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com um gênero vazio
        Então o cadastro não deve ser realizado
    
    Cenário: Não deve ser possível criar um filme com um gênero sendo um número
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com um gênero sendo um número
        Então o cadastro não deve ser realizado
    
    Cenário: Não deve ser possível criar um filme com um gênero contendo 101 caracteres
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com um gênero contendo 101 caracteres
        Então o cadastro não deve ser realizado

    Cenário: Não deve ser possível criar um filme sem uma descrição
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme sem uma descrição
        Então o cadastro não deve ser realizado
    
    Cenário: Não deve ser possível criar um filme com uma descrição vazia
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com uma descrição vazia
        Então o cadastro não deve ser realizado
    
    Cenário: Não deve ser possível criar um filme com uma descrição sendo um número
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com uma descrição sendo um número
        Então o cadastro não deve ser realizado
    
    Cenário: Não deve ser possível criar um filme com uma descrição contendo 501 caracteres
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com uma descrição contendo 501 caracteres
        Então o cadastro não deve ser realizado

    Cenário: Não deve ser possível criar um filme sem uma duração
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme sem uma duração
        Então o cadastro não deve ser realizado

    Cenário: Não deve ser possível criar um filme com uma duração sem ser um número
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com uma duração que não seja um número
        Então o cadastro não deve ser realizado

    Cenário: Não deve ser possível criar um filme com uma duração que seja um número decimal
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com uma duração que que seja um número decimal
        Então o cadastro não deve ser realizado

    Cenário: Não deve ser possível criar um filme com uma duração que seja 0
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com uma duração que que seja 0
        Então o cadastro não deve ser realizado

    Cenário: Não deve ser possível criar um filme com uma duração que seja negativa
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com uma duração que que seja negativa
        Então o cadastro não deve ser realizado

    Cenário: Não deve ser possível criar um filme com uma duração que seja maior do que 720 horas
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com uma duração que que seja maior do que 720 horas
        Então o cadastro não deve ser realizado

    Cenário: Não deve ser possível criar um filme sem um ano de lançamento
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme sem um ano de lançamento
        Então o cadastro não deve ser realizado
    
    Cenário: Não deve ser possível criar um filme com um ano de lançamento sem ser um número
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com um ano de lançamento que não seja um número
        Então o cadastro não deve ser realizado

    Cenário: Não deve ser possível criar um filme com um ano de lançamento que seja um número decimal
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com um ano de lançamento que que seja um número decimal
        Então o cadastro não deve ser realizado

    Cenário: Não deve ser possível criar um filme com um ano de lançamento que seja menor que que 1895
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com um ano de lançamento que que seja menor que que 1895
        Então o cadastro não deve ser realizado

    Cenário: Não deve ser possível criar um filme com um ano de lançamento que seja maior do que o ano atual
        Dado que um usuário é administrador
        Quando tentar adicionar um novo filme com um ano de lançamento que que seja maior do que o ano atual
        Então o cadastro não deve ser realizado


    # Cenário: Deve ser possível adicionar dois filmes com as exatas mesmas informações