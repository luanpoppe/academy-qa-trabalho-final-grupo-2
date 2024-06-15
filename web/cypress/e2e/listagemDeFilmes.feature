# language: pt

Funcionalidade: Listagem de Filmes

    Contexto: 
        Dado que acessou a página de listagem de filme

   
    Cenário: Deve ser possível qualquer tipo de usuário, logado ou não, consulta a lista de filmes sem restrições
        Então verá uma lista de filmes sem restrições

    
    Cenário: Deve ser possível visualizar informações sumarizadas do filme
        Quando selecionar um filme da lista
        Então verá o id, title, description, durationInMinutes, releaseYear e uma imagem de capa para cada filme
    


    
    Cenário: Deve ser possível ordenar filmes por ordem de cadastro
        Quando o usuário estiver na lista de filmes
        Então verá os filmes listados na ordem em que foram cadastrados


    
    Cenário: Deve ser possível ordenar filmes por nota
        Quando acessar lista de filmes mais bem avaliados
        Então verá os filmes listados com os mais avaliados primeiro

    
    Cenário: Deve ser possível navegar pela paginação de filmes
        Quando houver mais filmes do que podem ser exibidos em uma página
        E visualizar opções de paginação
        E acessar a próxima página
        Então verá a próxima página de filmes

    
    Cenário: Deve ser possível ver mais detalhes de um filme
        Quando selecionar o primeiro filme da lista
        Então verá informações detalhadas sobre o filme
        

    Cenário: Não deve haver paginação quando há menos de 5 filmes
        Quando existem menos de 5 filmes na lista
        E visualizar a lista de filmes
        Então não verá opções de paginação


    Cenario: Deve haver paginação quando há mais de 5 filmes
        Quando existem mais de 5 filmes na lista
        E visualizar uma opção de paginação
        E acessar a proxima pagina
        Então verá uma próxima página de filmes
