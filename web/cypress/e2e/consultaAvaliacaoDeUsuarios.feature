#language: pt

Funcionalidade: Consulta de Avaliações de Usuários


    Contexto: A consulta de avaliações é permitida apenas para usuários autenticados e limita-se aos registros do próprio usuário
        Dado que o usuário está autenticado e seleciona a opção de perfil
        

    Cenário: A consulta de avaliações é permitida apenas para usuários autenticados e limita-se aos registros do próprio usuário
        Quando acessar a lista de avaliações
        Então verá apenas os registros de avaliações do próprio usuário

    Cenário: Todas as avaliações atuais do usuário devem ser listadas
        Quando acessar a lista de avaliações
        Então verá todas as avaliações feitas pelo usuário listadas

    Cenário: Não devem existir avaliações em duplicidade
        Quando acessar a lista de avaliações
        Então não verá avaliações duplicadas para o mesmo filme


    Cenário: Deve ser possível visualizar título, nota e texto avaliativo
        Quando acessar a lista de avaliações
        Então verá o título, nota e texto avaliativo de cada filme avaliado

    Cenário: Deve ser possivel acessar os detalhes do filme que foi avaliado
        Quando o usuário acessar a lista de avaliações
        E selecionar um filme avaliado
        E visualizar os detalhes do filme
        Então poderá atualizar sua avaliação sobre o filme 


    Cenário: Não deve ser possivel usuário não autenticado acessar avaliações
        Dado que o usuário não está autenticado
        Quando tentar efetuar uma avaliação de filme
        Então o sistema não permitirá o comentario nem avaliação contendo o botão "Entre para poder escrever sua review"


    Cenário: O sistema nao deve listar avaliações quando não há avaliações do usuário
        Quando o usuário não possui avaliações registradas
        E acessa a lista de avaliações
        Então verá o titulo 'Minhas Avaliações' e não haverá avaliações

        