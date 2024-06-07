# language: pt

Funcionalidade: Listagem de Filmes

    Contexto: 
        Dado que acessou a página inicial do catálogo de filmes  

    Cenário: Deve ser possível qualquer tipo de usuário, logado ou não, consulta a lista de filmes sem restrições
        Quando acessar a página de listagem de filmes
        Então verá uma lista de filmes sem restrições

    Cenário: Deve ser possível visualizar informações sumarizadas do filme
        Quando acessar a página de listagem de filmes
        Então verá o id, title, description, durationInMinutes, releaseYear e uma imagem de capa para cada filme

    Cenário: Deve ser possível ordenar filmes por ordem de cadastro
        Quando selecionar a opção de ordenar por ordem de cadastro
        Então verá os filmes listados na ordem em que foram cadastrados

    Cenário: Deve ser possível ordenar filmes por nota
        Quando selecionar a opção de ordenar por nota
        Então verá os filmes listados com os mais avaliados primeiro

    Cenário: Deve ser possível navegar pela paginação de filmes
        Quando acessar a página de listagem de filmes
        E houver mais filmes do que podem ser exibidos em uma página
        Então verá opções de paginação
        Quando acessar a próxima página
        Então verá a próxima página de filmes

    Cenário: Deve ser possível ver mais detalhes de um filme
        Quando acessar a página de listagem de filmes
        E selecionar um filme da lista
        Então será redirecionado para a página de detalhes do filme
        E verá informações detalhadas sobre o filme