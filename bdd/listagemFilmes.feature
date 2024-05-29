#language: pt

Funcionalidade: Listagem de Filmes

    Contexto:
        Dado que acessou a pagina de listagem de Filmes
    

    Cenário: Usuário não autenticado acessa a lista de filmes
        Quando acessar a página de listagem de filmes
        Entao verá uma lista de filmes sem restrições


    Cenário: Usuário vê informações sumarizadas dos filmes
        Quando acessar a página de listagem de filmes
        Então verá o titulo, descrição, nota e uma imagem de capa para cada filme


    Cenário: Usuário ordena filmes por ordem de cadastro
        Quando selecionar a opção de ordenar por ordem de cadastro
        Então verá os filmes listados na ordem em que foram cadastrados


    Cenário: Usuário ordena filmes por nota
        Quando selecionar a opção de ordenar por nota
        Entao verá os filmes listados com os mais avaliados primeiro


    Cenário: Usuário navega pela paginação de filmes
        Quando acessar a página de listagem de filmes
        E houver mais filmes do que podem ser exibidos em uma página
        Entao verá opções de paginação
        Quando acessar a próxima página
        Entao verá a próxima página de filmes

    Cenário: Usuário vê mais detalhes de um filme
        Quando acessar a página de listagem de filmes
        E selecionar um filme da lista
        Então será redirecionado para a página de detalhes do filme
        E verá informações detalhes sobre o filme
    
        