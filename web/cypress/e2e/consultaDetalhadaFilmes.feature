# language: pt

Funcionalidade: Consulta detalhada de filmes
Como uma pessoa qualquer acessando o sistema
Desejo poder consultar mais detalhes de um filme
Para pode visualizar todas as informações registradas para aquele filme

# Cenário: Deve ser possível visualizar a quantidade de avaliações de audiência realizadas ao consultar um filme 
#     Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
#     Quando inserir um Id de filme válido na url
#     Então deverá visualizar a quantidade de avaliações da audiência realizadas

# Cenário: Deve ser possível visualizar a quantidade de avaliações da crítica realizadas ao consultar um filme 
#     Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
#     Quando inserir um Id de filme válido na url
#     Então deverá visualizar a quantidade de avaliações da crítica realizadas

Cenário: Deve ser possível realizar uma consulta detalhada de filmes com Id válido
    Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
    Quando inserir um Id de filme válido na url
    Então deverá visualizar todas as informações do filme selecionado

# Cenário: Não deve ser possível realizar uma consulta detalhada de filmes com Id inválido
#     Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
#     Quando inserir um Id inválido na url
#     Então Então o sistema deverá exibir uma mensagem de erro

# Cenário: Deve ser possível visualizar o Id do filme na url ao realizar uma consulta detalhada de filmes
#     Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
#     Quando selecionar um filme na tela inicial
#     Então deverá visualizar o Id do filme selecionado na url 




# Cenário: Deve ser possível visualizar o ano de lançamento do filme ao realizar uma consulta detalhada de filmes
#     Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
#     Quando inserir um Id de filme válido na url
#     Então deverá visualizar o ano de lançamento do filme selecionado

# Cenário: Deve ser possível visualizar a imagem de capa do filme ao realizar uma consulta detalhada de filmes
#     Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
#     Quando inserir um Id de filme válido na url
#     Então deverá visualizar a imagem de capa do filme selecionado

# Cenário: Deve ser possível visualizar o totalizador das avaliações realizadas por usuários comuns e admins ao realizar uma consulta detalhada de filmes
#     Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
#     Quando inserir um Id de filme válido na url
#     Então deverá visualizar o totalizador da média das avaliações da audiência realizadas do filme selecionado

# Cenário: Deve ser possível visualizar totalizador das avaliações realizadas por usuários críticos ao realizar uma consulta detalhada de filmes
#     Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
#     Quando inserir um Id de filme válido na url
#     Então deverá visualizar o totalizador da média das avaliações da crítica realizadas do filme selecionado

# Cenário: Deve ser possível um usuário do tipo comum avaliar um filme ao realizar uma consulta detalhada de filmes
#     Dado que o usuário do tipo comum acessou a tela de consulta de filmes no Frontend Raromdb
#     Quando inserir um Id de filme válido na url
#     Então deverá visualizar um campo habilitado para avaliar o filme

# Cenário: Deve ser possível um usuário do tipo crítico avaliar um filme ao realizar uma consulta detalhada de filmes
#     Dado que o usuário do tipo crítico acessou a tela de consulta de filmes no Frontend Raromdb
#     Quando inserir um Id de filme válido na url
#     Então deverá visualizar um campo habilitado para avaliar o filme

# Cenário: Deve ser possível um usuário do tipo administrador avaliar um filme ao realizar uma consulta detalhada de filmes
#     Dado que o usuário do tipo administrador acessou a tela de consulta de filmes no Frontend Raromdb
#     Quando inserir um Id de filme válido na url
#     Então deverá visualizar um campo habilitado para avaliar o filme

# Cenário: Não deve ser possível um usuário não logado avaliar um filme ao realizar uma consulta detalhada de filmes
#     Dado que o usuário não logado acessou a tela de consulta de filmes no Frontend Raromdb
#     Quando inserir um Id de filme válido na url
#     Então deverá visualizar um campo desabilitado para avaliar o filme

# Cenário: Deve ser possível visualizar todas as avaliações realizadas no filme ao consultá-lo detalhadamente
#     Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
#     Quando inserir um Id de filme válido na url
#     Então deverá visualizar todas as avaliações realizadas no filme selecionado

# Cenário: Deve ser possível visualizar a data e hora das avaliações realizadas no filme ao consultá-lo detalhadamente
#     Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
#     Quando inserir um Id de filme válido na url
#     Então deverá visualizar a data e hora das avaliações realizadas no filme selecionado

# Cenário: Deve ser possível visualizar o nome dos usuários que realizaram as avaliações do filme ao consultar detalhadamente um filme
#     Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
#     Quando inserir um Id de filme válido na url
#     Então deverá visualizar o nome dos usuários que realizaram avaliações no filme selecionado

# Cenário: Deve ser possível visualizar a nota de todas avaliações realizadas no filme ao consultá-lo detalhadamente 
#     Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
#     Quando inserir um Id de filme válido na url
#     Então deverá visualizar a nota de todas avaliações realizadas no filme selecionado

# Cenário: Deve ser possível visualizar o texto de todas avaliações realizadas no filme ao consultá-lo detalhadamente 
#     Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
#     Quando inserir um Id de filme válido na url
#     Então deverá visualizar o texto de todas avaliações realizadas no filme selecionado

# Cenário: Não deve ser possível visualizar o tipo dos usuários que realizaram as avaliações do filme ao consultar detalhadamente um filme
#     Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
#     Quando inserir um Id de filme válido na url
#     Então deverá visualizar o tipo dos usuários que realizaram as avaliações do filme selecionado

# Cenário: Não deve ser possível visualizar o Id dos usuários que realizaram as avaliações do filme ao consultar detalhadamente um filme
#     Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
#     Quando inserir um Id de filme válido na url
#     Então deverá visualizar o Id dos usuários que realizaram as avaliações do filme selecionado

# Cenário: Não deve ser possível visualizar o tipo de avaliação de todas avaliações realizadas no filme ao consultá-lo detalhadamente 
#     Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
#     Quando inserir um Id de filme válido na url
#     Então não deverá visualizar o tipo de avaliação de todas avaliações realizadas no filme selecionado