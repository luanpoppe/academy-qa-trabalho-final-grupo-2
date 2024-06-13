#language: pt

Funcionalidade: Avaliação de filmes

    
    Cenário: Usuário não autenticado não deve poder realizar a avaliação de um filme
        Dado que um usuário não está autenticado
        Quando tentar adicionar uma review em um filme
        Então não deve conseguir cadastrar a review
        E deve poder ser redirecionado para a página de login

    @commonUser 
    Cenário: Usuário comum deve poder realizar a avaliação de um filme
        Dado que um usuário comum está autenticado
        Quando adicionar uma review em um filme
        Então a review deve ser adicionada com sucesso "commonUser"
    
    @criticUser 
    Cenário: Usuário crítico deve poder realizar a avaliação de um filme
        Dado que um usuário crítico está autenticado
        Quando adicionar uma review em um filme
        Então a review deve ser adicionada com sucesso "criticUser"

    @adminUser 
    Cenário: Usuário administrador deve poder realizar a avaliação de um filme
        Dado que um usuário administrador está autenticado
        Quando adicionar uma review em um filme
        Então a review deve ser adicionada com sucesso "adminUser"

    @commonUser 
    Cenário: Usuário não deve poder realizar a avaliação de um filme sem definir uma nota
        Dado que um usuário está autenticado
        Quando tentar adicionar uma review em um filme sem definir uma nota
        Então a review não deve ser adicionada

    @commonUser 
    Esquema do Cenário: Usuário deve poder fechar a mensagem de erro ao avaliar um filme 
        Dado que um usuário está autenticado
        E tentou adicionar uma review em um filme sem definir uma nota
        Quando tentar tentar fechar a mensagem de erro "<comoFechar>"
        Então a mensagem de erro deve ser fechada
        Exemplos:
            | comoFechar |
            | buttonModal  |
            | outsideOfModal  |

    @commonUser 
    Cenário: Usuário deve poder realizar a avaliação de um filme apenas dando uma nota para o filme
        Dado que um usuário está autenticado
        Quando tentar adicionar uma review em um filme apenas dando uma nota
        Então a review deve ser adicionada com sucesso "commonUser"

    @commonUser 
    Cenário: Deve existir apenas uma review de um usuário em um filme
        Dado que um usuário está autenticado
        E já realizou uma review em um filme
        Quando tentar realizar uma nova review no mesmo filme
        Então o filme deverá continuar com apenas uma review do usuário
        E a review do usuário deve ser atualizada

    # Cenário com bug --> Site está permitindo digitar mais de 500 caracteres no campo de escrever o texto avaliativo da review.
    @commonUser
    Cenário: Usuário não deve poder digitar uma avaliação contendo mais de 500 caracteres
        Dado que um usuário está autenticado
        Quando tentar realizar uma nova review com um texto contendo mais de 500 caracteres
        Então não deverá conseguir digitar mais de 500 caracteres