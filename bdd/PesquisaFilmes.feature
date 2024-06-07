#language: pt

Funcionalidade: Pesquisa de Filmes

    Contexto: 
        Dado que acessou a página inicial do catálogo de filmes  


        Cenário: Deve ser possivel qualquer tipo de usuário, logado ou não realizar pesquisa no catálogo de filmes.
            Quando preencher o campo de pesquisa de filmes com um filme cadastrado
            E acessar a função de pesquisa
            Então o usuário deve ver o resultado da pesquisa para o filme informado

        Cenário: Deve ser possivel efetuar Pesquisa se baseando no titulo do filme.
            Quando preencher o campo de pesquisa de filmes com o titulo de um filme cadastrado
            E acessar a função de pesquisa 
            Então o usuário deve ser o resultado da pesquisa baseado no titulo do filme informado

        Cenário: Deve ser possivel retornar informações de filmes registrados no catálogo
            Quando preencher o campo de pesquisa de filmes com texto que contenha parte do titulo de um filme cadastrado
            E acessar a função de pesquisa
            Então o usuário deve ver o resultado da pesquisa contendo filmes com titulos iguais ou que contenham o texto informado

        Cenário: Deve ser possivel consultar mais detalhes de um filme ao interagir com um dos filmes exibidos na listagem
                Quando preencher o campo de pesquisa de filmes com o titulo de um filme cadastrado
                E acessar a função de pesquisa
                E selecionar um dos filmes exibidos na listagem
                Então o usuário deve ver os detalhes do filmes selecionado

        Cenário: Não deve ser possivel efetuar pesquisa com resultado nulo
            Quando preencher o campo de pesquisa de filmes com titulo inexistente 
            E acessar a função de pesquisa
            Então o usuário deve ver uma mensagem indicando que nenhum filme foi encontrado
        

        