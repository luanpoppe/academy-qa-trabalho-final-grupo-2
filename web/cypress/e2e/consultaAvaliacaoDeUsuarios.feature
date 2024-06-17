#language: pt

Funcionalidade: Consulta de Avaliações de Usuários
    Cenário: Não deve ser possivel usuário não autenticado acessar avaliações
        Dado que o usuário não está autenticado
        Quando tentar visualizar suas avaliações de filmes
        Então o usuário não deve conseguir acessar a seção de minhas avaliações

@usuarioAutenticado
    Cenário: Usuário autenticado deve poder visualizar as avaliações realizadas apenas por ele mesmo
        Dado que o usuário está autenticado
        E já realizou avaliações de filmes
        Quando acessar a seção de minhas avaliações
        Então verá apenas os registros de avaliações do próprio usuário

@usuarioAutenticado
    Cenário: Todas as avaliações atuais do usuário devem ser listadas
        Dado que o usuário está autenticado
        E já realizou avaliações de filmes
        Quando acessar a seção de minhas avaliações
        Então todas as avaliações do próprio usuário devem ser listadas

@usuarioAutenticado
    Cenário: Não devem existir avaliações em duplicidade
        Dado que o usuário está autenticado
        E realizou mais de uma avaliação para o mesmo filme
        Quando acessar a seção de minhas avaliações
        Então não verá avaliações duplicadas para o mesmo filme

# Bug --> Na página de perfil onde mostra as avaliações, não é possível ver o texto avaliativo mesmo quando o usuário escreveu um texto avaliativo
    Cenário: Deve ser possível visualizar título, nota e texto avaliativo
        Dado que o usuário está autenticado
        E já realizou avaliações de filmes
        Quando acessar a seção de minhas avaliações
        Então verá o título, nota e texto avaliativo de cada filme avaliado

@usuarioAutenticado
    Cenário: Deve ser possivel acessar os detalhes do filme que foi avaliado
        Dado que o usuário está autenticado
        E já realizou avaliações de filmes
        Quando acessar a seção de minhas avaliações
        Então poderá acessar os detalhes adicionais dos filmes avaliados
        E poderá atualizar sua avaliação sobre o filme

@usuarioAutenticado
    Cenário: O sistema não deve listar avaliações quando não há avaliações do usuário
        Dado que o usuário está autenticado
        E não realizou avaliação de nenhum filme
        Quando acessar a seção de minhas avaliações
        Então verá o titulo 'Minhas avaliações' e não haverá avaliações