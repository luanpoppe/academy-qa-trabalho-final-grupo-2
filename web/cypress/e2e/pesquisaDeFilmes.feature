#language: pt

Funcionalidade: Pesquisa de Filmes
    Como uma pessoa qualquer acessando o sistema
    Desejo poder pesquisar entre os filmes cadastrados 
    Para ser mais eficiente em minha busca pelo catálogo de filmes 

    Contexto: 
        Dado que o usuário acessou a página inicial do catálogo de filmes

    Cenário: Deve ser possível pesquisar um filme sem estar logado no site 
        E não realizou login
        Quando preencher o campo de pesquisa de filmes com um filme cadastrado
        E acessar a função de pesquisa
        Então o usuário deve ver o resultado da pesquisa para o filme informado

    Cenário: Deve ser possível pesquisar um filme sendo um usuário com perfil Comum 
        E realizou login sendo um usuário com perfil Comum
        Quando preencher o campo de pesquisa de filmes com um filme cadastrado
        E acessar a função de pesquisa
        Então o usuário deve ver o resultado da pesquisa para o filme informado

    Cenário: Deve ser possível pesquisar um filme sendo um usuário com perfil Crítico
        E realizou login sendo um usuário com perfil Crítico
        Quando preencher o campo de pesquisa de filmes com um filme cadastrado
        E acessar a função de pesquisa
        Então o usuário deve ver o resultado da pesquisa para o filme informado

    Cenário: Deve ser possível pesquisar um filme sendo um usuário com perfil Administrador
        E realizou login sendo um usuário com perfil Administrador
        Quando preencher o campo de pesquisa de filmes com um filme cadastrado
        E acessar a função de pesquisa
        Então o usuário deve ver o resultado da pesquisa para o filme informado

    Cenário: Deve ser possível efetuar uma pesquisa utilizando o nome completo do filme
        Quando preencher o campo de pesquisa de filmes com o título completo do filme cadastrado
        E acessar a função de pesquisa
        Então o usuário deve ver o resultado da pesquisa para o filme informado

    Cenário: Deve ser possível efetuar uma pesquisa utilizando parte do título do filme
        Quando preencher o campo de pesquisa de filmes com parte do título de um filme cadastrado
        E acessar a função de pesquisa 
        Então o usuário deve ver o resultado da pesquisa para o filme informado

    Cenário: Deve ser possível consultar mais detalhes de um filme ao interagir com o filme exibido
        Quando preencher o campo de pesquisa de filmes com um filme cadastrado
        E acessar a função de pesquisa
        E clicar no card do filme
        Então o usuário deve ver os detalhes do filme selecionado
    @intercept
    Cenário: Não deve ser possível efetuar pesquisa de um filme não cadastrado 
        Quando preencher o campo de pesquisa com um filme não cadastrado na base de dados
        E acessar a função de pesquisa
        Então o usuário deve ver uma mensagem indicando que nenhum filme foi encontrado
    @intercept
    Cenário: Não deve ser possível efetuar pesquisa de um filme pelo gênero 
        Quando preencher o campo de pesquisa com o gênero do filme
        E acessar a função de pesquisa
        Então o usuário deve ver uma mensagem indicando que nenhum filme foi encontrado
    @intercept
    Cenário: Não deve ser possível efetuar pesquisa de um filme pela descrição
        Quando preencher o campo de pesquisa com a descrição do filme
        E acessar a função de pesquisa
        Então o usuário deve ver uma mensagem indicando que nenhum filme foi encontrado
    @intercept
    Cenário: Não deve ser possível efetuar pesquisa de um filme pelo tempo de duração
        Quando preencher o campo de pesquisa com a duração do filme
        E acessar a função de pesquisa
        Então o usuário deve ver uma mensagem indicando que nenhum filme foi encontrado
    @intercept
    Cenário: Não deve ser possível efetuar pesquisa de um filme pelo ano de lançamento
        Quando preencher o campo de pesquisa com o ano de lançamento
        E acessar a função de pesquisa
        Então o usuário deve ver uma mensagem indicando que nenhum filme foi encontrado
    @intercept
    Cenário: Não deve ser possível efetuar pesquisa de um filme pelo id
        Quando preencher o campo de pesquisa com o id do filme
        E acessar a função de pesquisa
        Então o usuário deve ver uma mensagem indicando que nenhum filme foi encontrado

