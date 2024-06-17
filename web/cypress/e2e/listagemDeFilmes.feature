# language: pt

Funcionalidade: Listagem de Filmes


    Cenário: Deve ser possível usuário não autenticado consultar a lista de filmes sem retrições
        Dado que usuário acessou a página de listagem de filme
        E que o usuário não está autenticado
        Então deve conseguir visualizar a lista de filmes sem restrições

    Cenário: Deve ser possível usuário comum autenticado consultar a lista de filmes sem retrições
        Dado que usuário acessou a página de listagem de filme
        E que o usuário comum está autenticado
        Então deve conseguir visualizar a lista de filmes sem restrições

    Cenário: Deve ser possível usuário crítico autenticado consultar a lista de filmes sem retrições
        Dado que usuário acessou a página de listagem de filme
        E que o usuário crítico está autenticado
        Então deve conseguir visualizar a lista de filmes sem restrições

    Cenário: Deve ser possível usuário administrador autenticado consultar a lista de filmes sem retrições
        Dado que usuário acessou a página de listagem de filme
        E que o usuário administrador está autenticado
        Então deve conseguir visualizar a lista de filmes sem restrições

    Cenário: Deve ser possível visualizar informações sumarizadas do filme
        Dado que usuário acessou a página de listagem de filme
        Quando selecionar um filme da lista
        Então verá o id, title, description, durationInMinutes, releaseYear e uma imagem de capa para cada filme

    Cenário: Deve ser possível ordenar filmes por ordem de cadastro
        Dado que usuário acessou a página de listagem de filme
        Quando o usuário estiver na lista de filmes
        Então verá os filmes listados na ordem em que foram cadastrados

    Cenário: Deve ser possível ordenar filmes por nota
        Dado que usuário acessou a página de listagem de filme
        Quando acessar lista de filmes mais bem avaliados
        Então verá os filmes listados com os mais avaliados primeiro

    Cenário: Deve ser possível navegar pela paginação de filmes
        Dado que há mais filmes do que podem ser exibidos em uma página
        E que usuário acessou a página inicial de listagem de filme
        Quando visualizar opções de paginação
        E acessar a próxima página
        Então verá a próxima página de filmes

    Cenário: Deve ser possível ver mais detalhes de um filme
        Dado que usuário acessou a página de listagem de filme
        Quando selecionar o primeiro filme da lista
        Então verá informações detalhadas sobre o filme
    
    Cenário: Não deve haver paginação quando há menos de 5 filmes
        Dado que existem menos de 5 filmes na lista
        Quando usuário acessar a lista de filmes
        Então não verá opções de paginação

    Cenário: Deve haver paginação quando há mais de 5 filmes
        Dado que existem mais de 5 filmes na lista
        E que usuário acessou a página inicial de listagem de filme
        Quando visualizar uma opção de paginação
        E acessar a proxima pagina
        Então verá a próxima página de filmes

    Cenário: Deve ser possível voltar retornar para primeira página de filmes
        Dado que existem mais de 5 filmes na lista
        E que usuário está na segunda página de listagem de filmes
        Quando tentar retornar para a primeira parte
        Então deve conseguir retornar com sucesso
    
    Cenário: Deve ser possível ver mensagem indicando ausência de filmes cadastrados
        Dado que não existem filmes cadastrados
        Quando usuário acessar a página de listagem de filmes
        Então deverá ver mensagem informando que não há filmes cadastrados
