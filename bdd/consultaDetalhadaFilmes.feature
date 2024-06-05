#language: pt

Funcionalidade: Consulta detalhada de filmes


# Cenário: API- Deve ser possível um usuário do tipo comum realizar uma consulta detalhada de filmes com Id válido
#     Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
#     E acessou o método /api/movies/{id}
#     Quando preencher um Id de filme existente
#     E enviar a requisição
#     Então a API deverá retornar o status code 200 e retornar as informações detalhadas do filme

# Cenário: API- Não deve retornar dados do filme quando um usuário do tipo comum realizar uma consulta detalhada de filmes com Id inválido
#     Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
#     E acessou o método /api/movies/{id}
#     Quando preencher um Id de filme inexistente
#     E enviar a requisição
#     Então a API deverá retornar o status code 200 e não retorna as informações detalhadas do filme

# Cenário: API- Deve ser possível um usuário não logado realizar uma consulta detalhada de filmes com Id válido
#     Dado que o usuário não esta logado na API Raromdb
#     E acessou o método /api/movies/{id}
#     Quando preencher um Id de filme existente
#     E enviar a requisição
#     Então a API deverá retornar o status code 200 e retornar as informações detalhadas do filme

# Cenário: API- Não deve retornar dados do filme quando um usuário não logado realizar uma consulta detalhada de filmes com Id inválido
#     Dado que o usuário não esta logado na API Raromdb
#     E acessou o método /api/movies/{id}
#     Quando preencher um Id de filme inexistente
#     E enviar a requisição
#     Então a API deverá retornar o status code 200 e não retorna as informações detalhadas do filme

# Cenário: API- Deve ser possível um usuário do tipo crítico realizar uma consulta detalhada de filmes com Id válido
#     Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
#     E acessou o método /api/movies/{id}
#     Quando preencher um Id de filme existente
#     E enviar a requisição
#     Então a API deverá retornar o status code 200 e retornar as informações detalhadas do filme

# Cenário: API- Não deve retornar dados do filme quando um usuário do tipo crítico realizar uma consulta detalhada de filmes com Id inválido
#     Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
#     E acessou o método /api/movies/{id}
#     Quando preencher um Id de filme inexistente
#     E enviar a requisição
#     Então a API deverá retornar o status code 200 e não retorna as informações detalhadas do filme

# Cenário: API- Deve ser possível um usuário do tipo administrador realizar uma consulta detalhada de filmes com Id válido
#     Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
#     E acessou o método /api/movies/{id}
#     Quando preencher um Id de filme existente
#     E enviar a requisição
#     Então a API deverá retornar o status code 200 e retornar as informações detalhadas do filme

# Cenário: API- Não deve retornar dados do filme quando um usuário do tipo administrador realizar uma consulta detalhada de filmes com Id inválido
#     Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
#     E acessou o método /api/movies/{id}
#     Quando preencher um Id de filme inexistente
#     E enviar a requisição
#     Então a API deverá retornar o status code 200 e não retorna as informações detalhadas do filme

Cenário: API- Deve ser possível retornar o link da imagem de capa do filme ao realizar uma consulta detalhada de filmes
    Dado que o usuário de qualquer tipo esta logado e autenticado na API Raromdb
    E acessou o método /api/movies/{id}
    Quando preencher um Id de filme existente
    E enviar a requisição
    Então a API deverá retornar o status code 200 e retornar o o link da imagem de capa do filme

Cenário: API- Deve ser possível avaliar um filme ao realizar uma consulta detalhada de filmes
    Dado que o usuário de qualquer tipo esta logado e autenticado na API Raromdb
    E acessou o método /api/movies/{id}
    Quando preencher um Id de filme existente
    E enviar a requisição
    Então a API deverá retornar o status code 200 e uma opção para realizar avaliação

# Cenário: API- Deve ser possível um usuário do tipo comum retornar os dados da avaliação realizada no filme ao consultá-lo detalhadamente
#     Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
#     E acessou o método /api/movies/{id}
#     Quando preencher o Id de um filme com avaliações
#     E enviar a requisição
#     Então a API deverá retornar o status code 200 e todas as informações de avaliações realizadas no filme

# Cenário: API- Deve ser possível um usuário do tipo crítico retornar os dados da avaliação realizada no filme ao consultá-lo detalhadamente
#     Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
#     E acessou o método /api/movies/{id}
#     Quando preencher o Id de um filme com avaliações
#     E enviar a requisição
#     Então a API deverá retornar o status code 200 e todas as informações de avaliações realizadas no filme    
# Cenário: API- Deve ser possível um usuário do tipo administrador retornar os dados da avaliação realizada no filme ao consultá-lo detalhadamente
#     Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
#     E acessou o método /api/movies/{id}
#     Quando preencher o Id de um filme com avaliações
#     E enviar a requisição
#     Então a API deverá retornar o status code 200 e todas as informações de avaliações realizadas no filme
# Cenário: API- Deve ser possível um usuário do tipo não logado retornar os dados da avaliação realizada no filme ao consultá-lo detalhadamente
#     Dado que o usuário do tipo não logado esta logado e autenticado na API Raromdb
#     E acessou o método /api/movies/{id}
#     Quando preencher o Id de um filme com avaliações
#     E enviar a requisição
#     Então a API deverá retornar o status code 200 e todas as informações de avaliações realizadas no filme

# Cenário: API- Deve ser possível um usuário do tipo comum retornar os dados do(s) usuário(s) que realizou a(S) avaliação(s) do filme ao consultá-lo detalhadamente
#     Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
#     E acessou o método /api/movies/{id}
#     Quando preencher o Id de um filme com avaliações
#     E enviar a requisição
#     Então a API deverá retornar o status code 200 e retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme

# Cenário: API- Deve ser possível um usuário do tipo crítico retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme ao consultá-lo detalhadamente
#     Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
#     E acessou o método /api/movies/{id}
#     Quando preencher o Id de um filme com avaliações
#     E enviar a requisição
#     Então a API deverá retornar o status code 200 e retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme

# Cenário: API- Deve ser possível um usuário do tipo administrador retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme ao consultá-lo detalhadamente
#     Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
#     E acessou o método /api/movies/{id}
#     Quando preencher o Id de um filme com avaliações
#     E enviar a requisição
#     Então a API deverá retornar o status code 200 e retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme

# Cenário: API- Deve ser possível um usuário do tipo não logado retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme ao consultá-lo detalhadamente
#     Dado que o usuário do tipo não logado esta logado e autenticado na API Raromdb
#     E acessou o método /api/movies/{id}
#     Quando preencher o Id de um filme com avaliações
#     E enviar a requisição
#     Então a API deverá retornar o status code 200 e retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme

Cenário: API- Deve ser possível retornar o totalizador das avaliações realizadas por usuários comuns e admins ao realizar uma consulta detalhada de filmes
    Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
    E acessou o método /api/movies/{id}
    Quando preencher o Id de um filme com avaliações
    Então deverá retornar o totalizador da média das avaliações da audiência realizadas do filme selecionado

Cenário: API- Deve ser possível retornar totalizador das avaliações realizadas por usuários críticos ao realizar uma consulta detalhada de filmes
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá retornar o totalizador da média das avaliações da crítica realizadas do filme selecionado






Cenário: FRONT- Deve ser possível visualizar a quantidade de avaliações realizadas por usuários comuns e admins ao consultar um filme 
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar a quantidade de avaliações da audiência realizadas

Cenário: FRONT- Deve ser possível visualizar a quantidade de avaliações realizadas por usuários críticos ao consultar um filme 
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar a quantidade de avaliações da crítica realizadas

Cenário: FRONT- Deve ser possível realizar uma consulta detalhada de filmes com Id válido
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar todas as informações do filme selecionado

Cenário: FRONT- Não deve ser possível realizar uma consulta detalhada de filmes com Id inválido
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id inválido na url
    Então o sistema deverá exibir uma mensagem de filme não encontrado 

Cenário: FRONT- Deve ser possível realizar uma consulta detalhada de filmes com usuário não logado
    Dado que o usuário não logado acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar todas as informações do filme selecionado

Cenário: FRONT- Deve ser possível realizar uma consulta detalhada de filmes com usuário do tipo comum
    Dado que o usuário do tipo comum acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar todas as informações do filme selecionado

Cenário: FRONT- Deve ser possível realizar uma consulta detalhada de filmes com usuário do tipo crítico
    Dado que o usuário do tipo crítico acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar todas as informações do filme selecionado

Cenário: FRONT- Deve ser possível realizar uma consulta detalhada de filmes com usuário administrador
    Dado que o usuário do tipo administrador acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar todas as informações do filme selecionado

Cenário: FRONT- Deve ser possível visualizar o Id do filme na url ao realizar uma consulta detalhada de filmes
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando selecionar um filme na tela inicial
    Então deverá visualizar o Id do filme selecionado na url todas 
    E os detalhes do filme selecionado na tela

Cenário: FRONT- Deve ser possível visualizar o título do filme ao realizar uma consulta detalhada de filmes
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar o título do filme selecionado

Cenário: FRONT- Deve ser possível visualizar a descrição do filme ao realizar uma consulta detalhada de filmes
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar a descrição do filme selecionado

Cenário: FRONT- Deve ser possível visualizar o genêro do filme ao realizar uma consulta detalhada de filmes
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar o genêro do filme selecionado

Cenário: FRONT- Deve ser possível visualizar o ano de lançamento do filme ao realizar uma consulta detalhada de filmes
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar o ano de lançamento do filme selecionado

Cenário: FRONT- Deve ser possível visualizar a imagem de capa do filme ao realizar uma consulta detalhada de filmes
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar a imagem de capa do filme selecionado

Cenário: FRONT- Deve ser possível visualizar o totalizador das avaliações realizadas por usuários comuns e admins ao realizar uma consulta detalhada de filmes
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar o totalizador da média das avaliações da audiência realizadas do filme selecionado

Cenário: FRONT- Deve ser possível visualizar totalizador das avaliações realizadas por usuários críticos ao realizar uma consulta detalhada de filmes
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar o totalizador da média das avaliações da crítica realizadas do filme selecionado

Cenário: FRONT- Deve ser possível um usuário do tipo comum avaliar um filme ao realizar uma consulta detalhada de filmes
    Dado que o usuário do tipo comum acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar um campo habilitado para avaliar o filme

Cenário: FRONT- Deve ser possível um usuário do tipo crítico avaliar um filme ao realizar uma consulta detalhada de filmes
    Dado que o usuário do tipo crítico acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar um campo habilitado para avaliar o filme

Cenário: FRONT- Deve ser possível um usuário do tipo administrador avaliar um filme ao realizar uma consulta detalhada de filmes
    Dado que o usuário do tipo administrador acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar um campo habilitado para avaliar o filme

Cenário: FRONT- Não deve ser possível um usuário não logado avaliar um filme ao realizar uma consulta detalhada de filmes
    Dado que o usuário não logado acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar um campo desabilitado para avaliar o filme

Cenário: FRONT- Deve ser possível visualizar todas as avaliações realizadas no filme ao consultá-lo detalhadamente
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar todas as avaliações realizadas no filme selecionado

Cenário: FRONT- Deve ser possível visualizar a data e hora das avaliações realizadas no filme ao consultá-lo detalhadamente
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar a data e hora das avaliações realizadas no filme selecionado

Cenário: FRONT- Deve ser possível visualizar o nome dos usuários que realizaram as avaliações do filme ao consultar detalhadamente um filme
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar o nome dos usuários que realizaram avaliações no filme selecionado

Cenário: FRONT- Deve ser possível visualizar a nota de todas avaliações realizadas no filme ao consultá-lo detalhadamente 
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar a nota de todas avaliações realizadas no filme selecionado

Cenário: FRONT- Deve ser possível visualizar o texto de todas avaliações realizadas no filme ao consultá-lo detalhadamente 
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar o texto de todas avaliações realizadas no filme selecionado

Cenário: FRONT- Não deve ser possível visualizar o tipo dos usuários que realizaram as avaliações do filme ao consultar detalhadamente um filme
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar o tipo dos usuários que realizaram as avaliações do filme selecionado

Cenário: FRONT- Não deve ser possível visualizar o Id dos usuários que realizaram as avaliações do filme ao consultar detalhadamente um filme
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então deverá visualizar o Id dos usuários que realizaram as avaliações do filme selecionado

Cenário: FRONT- Não deve ser possível visualizar o tipo de avaliação de todas avaliações realizadas no filme ao consultá-lo detalhadamente 
    Dado que o usuário de qualquer tipo acessou a tela de consulta de filmes no Frontend Raromdb
    Quando inserir um Id válido na url
    Então não deverá visualizar o tipo de avaliação de todas avaliações realizadas no filme selecionado

