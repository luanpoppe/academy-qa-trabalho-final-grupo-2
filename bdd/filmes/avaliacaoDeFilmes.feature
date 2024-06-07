Funcionalidade: Avaliação de Filmes
    Como um usuário da aplicação
    Desejo poder escrever avaliações sobre os filmes
    Para ser capaz de compartilhar minha opinião sobre os filmes

    Cenário: Usuário não autenticado não deve poder avaliar um filme
        Dado que um usuário não está autenticado
        Quando tentar adicionar uma nova review de um filme
        Então o cadastro da review não deve ser realizada
    
    Cenário: Usuário do tipo comum deve poder avaliar um filme
        Dado que um usuário do tipo comum está autenticado
        Quando tentar adicionar uma nova review de um filme
        Então o cadastro da review deve ser realizada

    Cenário: Usuário do tipo crítico deve poder avaliar um filme
        Dado que um usuário do tipo crítico está autenticado
        Quando tentar adicionar uma nova review de um filme
        Então o cadastro da review deve ser realizada

    Cenário: Usuário do tipo admnistrador deve poder avaliar um filme
        Dado que um do tipo administrador comum está autenticado
        Quando tentar adicionar uma nova review de um filme
        Então o cadastro da review deve ser realizada

    Cenário: A review feita por um usuário comum deve ser do tipo comum
        Dado que um usuário do tipo comum está autenticado
        Quando adicionar uma nova review de um filme
        Então a review cadastrada deverá ser do tipo comum

    Cenário: A review feita por um usuário crítico deve ser do tipo crítico
        Dado que um usuário do tipo crítico está autenticado
        Quando adicionar uma nova review de um filme
        Então a review cadastrada deverá ser do tipo crítico

    Cenário: A review feita por um usuário admnistrador deve ser do tipo admnistrador
        Dado que um do tipo administrador comum está autenticado
        Quando adicionar uma nova review de um filme
        Então a review cadastrada deverá ser do tipo administrador
    
    Cenário: Deve ser possível criar um filme passando uma nota de valor 1
        Dado que um usuário está autenticado
        Quando tentar adicionar review a um filme com uma nota de 1
        Então o cadastro da review deve ser realizada com sucesso

    Cenário: Deve ser possível criar um filme passando uma nota de valor 5
        Dado que um usuário está autenticado
        Quando tentar adicionar review a um filme com uma nota de 5
        Então o cadastro da review deve ser realizada com sucesso

    Cenário: Deve ser possível criar um filme passando uma avaliação como um texto vazio
        Dado que um usuário está autenticado
        Quando tentar adicionar review a um filme passando uma avaliação como um texto vazio
        Então o cadastro da review deve ser realizada com sucesso

    Cenário: Deve ser possível criar uma review com uma avaliação do filme contendo 500 caracteres
        Dado que um usuário está autenticado
        Quando tentar adicionar review a um filme com um texto contendo 500 caracteres
        Então o cadastro da review deve ser realizada com sucesso

    Cenário: Não deve ser possível criar uma review sem passar nenhuma informação
        Dado que usuário está autenticado
        Quando tentar adicionar uma nova review de um filme sem passar nenhuma informação
        Então a review não deve ser cadastrada

    Cenário: Não deve ser possível criar uma review sem passar uma nota
        Dado que usuário está autenticado
        Quando tentar adicionar uma nova review de um filme sem passar uma nota
        Então a review não deve ser cadastrada

    Cenário: Não deve ser possível criar uma review com uma nota 0
        Dado que usuário está autenticado
        Quando tentar adicionar uma nova review de um filme com uma nota 0
        Então a review não deve ser cadastrada

    Cenário: Não deve ser possível criar uma review com uma nota negativa
        Dado que usuário está autenticado
        Quando tentar adicionar uma nova review de um filme com uma nota negativa
        Então a review não deve ser cadastrada

    Cenário: Não deve ser possível criar uma review com uma nota com valor decimal
        Dado que usuário está autenticado
        Quando tentar adicionar uma nova review de um filme com uma nota sendo um número decimal
        Então a review não deve ser cadastrada

    Cenário: Não deve ser possível criar uma review com uma nota sem ser um número
        Dado que usuário está autenticado
        Quando tentar adicionar uma nova review de um filme com uma nota sem ser um número
        Então a review não deve ser cadastrada

    Cenário: Não deve ser possível criar uma review com uma nota de valor maior que 5
        Dado que usuário está autenticado
        Quando tentar adicionar uma nova review de um filme com uma nota maior que 5
        Então a review não deve ser cadastrada
    
    Cenário: Não deve ser possível criar uma review sem passar uma avaliação do filme
        Dado que usuário está autenticado
        Quando tentar adicionar uma nova review de um filme sem passar uma avaliação
        Então a review não deve ser cadastrada

    Cenário: Não deve ser possível criar uma review passando uma avaliação do filme sem ser um texto
        Dado que usuário está autenticado
        Quando tentar adicionar uma nova review passando uma avaliação do filme sem ser um texto
        Então a review não deve ser cadastrada

    Cenário: Não deve ser possível criar uma review passando uma avaliação contendo mais de 500 caracteres
        Dado que usuário está autenticado
        Quando tentar adicionar uma nova review passando uma avaliação contendo mais de 500 caracteres
        Então a review não deve ser cadastrada

    Cenário: Não deve ser possível criar uma review sem passar o id de um filme
        Dado que usuário está autenticado
        Quando tentar adicionar uma nova review sem passar o id de um filme
        Então a review não deve ser cadastrada

    Cenário: Não deve ser possível criar uma review passando o id de um filme não existente
        Dado que usuário está autenticado
        Quando tentar adicionar uma nova review passando o id de um filme não existente
        Então a review não deve ser cadastrada

    Cenário: Não deve ser possível criar uma review passando um id do filme sem ser um number
        Dado que usuário está autenticado
        Quando tentar adicionar uma nova review passando um id do filme sem ser um number
        Então a review não deve ser cadastrada

    Cenário: Não deve ser possível criar uma review passando um id do filme como número decimal
        Dado que usuário está autenticado
        Quando tentar adicionar uma nova review passando um id do filme como número decimal
        Então a review não deve ser cadastrada

    Cenário: Em um filme que já possui uma review do usuário, novas reviews deste usuário deve atualizar a review prévia ao invés de criar uma nova
        Dado que usuário está autenticado
        E que possui uma review em um filme
        Quando tentar adicionar uma nova review neste mesmo filme
        Então a review antiga do usuário deve ser atualizada para a nova
        E deve continuar existindo apenas uma review do usuário no filme

