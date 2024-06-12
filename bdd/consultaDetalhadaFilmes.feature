#language: pt

Funcionalidade: Consulta detalhada de filmes
Como uma pessoa qualquer acessando o sistema
Desejo poder consultar mais detalhes de um filme
Para pode visualizar todas as informações registradas para aquele filme

#API

Cenário: Deve ser possível um usuário do tipo comum realizar uma consulta detalhada de filmes com Id válido
    Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher um Id de filme existente
    E enviar a requisição
    Então a API deverá retornar o status code 200 e retornar as informações detalhadas do filme

Cenário: Não deve retornar dados do filme quando um usuário do tipo comum realizar uma consulta detalhada de filmes com Id inválido
    Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher um Id de filme inexistente
    E enviar a requisição
    Então a API deverá retornar o status code 200 e não retorna as informações detalhadas do filme

Cenário: Deve ser possível um usuário não logado realizar uma consulta detalhada de filmes com Id válido
    Dado que o usuário não esta logado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher um Id de filme existente
    E enviar a requisição
    Então a API deverá retornar o status code 200 e retornar as informações detalhadas do filme

Cenário: Não deve retornar dados do filme quando um usuário não logado realizar uma consulta detalhada de filmes com Id inválido
    Dado que o usuário não esta logado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher um Id de filme inexistente
    E enviar a requisição
    Então a API deverá retornar o status code 200 e não retorna as informações detalhadas do filme

Cenário: Deve ser possível um usuário do tipo crítico realizar uma consulta detalhada de filmes com Id válido
    Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher um Id de filme existente
    E enviar a requisição
    Então a API deverá retornar o status code 200 e retornar as informações detalhadas do filme

Cenário: Não deve retornar dados do filme quando um usuário do tipo crítico realizar uma consulta detalhada de filmes com Id inválido
    Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher um Id de filme inexistente
    E enviar a requisição
    Então a API deverá retornar o status code 200 e não retorna as informações detalhadas do filme

Cenário: Deve ser possível um usuário do tipo administrador realizar uma consulta detalhada de filmes com Id válido
    Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher um Id de filme existente
    E enviar a requisição
    Então a API deverá retornar o status code 200 e retornar as informações detalhadas do filme

Cenário: Não deve retornar dados do filme quando um usuário do tipo administrador realizar uma consulta detalhada de filmes com Id inválido
    Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher um Id de filme inexistente
    E enviar a requisição
    Então a API deverá retornar o status code 200 e não retorna as informações detalhadas do filme

Cenário: Deve ser possível um usuário do tipo comum retornar os dados da avaliação realizada no filme ao consultá-lo detalhadamente
    Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher o Id de um filme com avaliações
    E enviar a requisição
    Então a API deverá retornar o status code 200 e todas as informações de avaliações realizadas no filme

Cenário: Deve ser possível um usuário do tipo crítico retornar os dados da avaliação realizada no filme ao consultá-lo detalhadamente
    Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher o Id de um filme com avaliações
    E enviar a requisição
    Então a API deverá retornar o status code 200 e todas as informações de avaliações realizadas no filme    
Cenário: Deve ser possível um usuário do tipo administrador retornar os dados da avaliação realizada no filme ao consultá-lo detalhadamente
    Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher o Id de um filme com avaliações
    E enviar a requisição
    Então a API deverá retornar o status code 200 e todas as informações de avaliações realizadas no filme
Cenário: Deve ser possível um usuário do tipo não logado retornar os dados da avaliação realizada no filme ao consultá-lo detalhadamente
    Dado que o usuário do tipo não logado esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher o Id de um filme com avaliações
    E enviar a requisição
    Então a API deverá retornar o status code 200 e todas as informações de avaliações realizadas no filme

Cenário: Deve ser possível um usuário do tipo comum retornar os dados do(s) usuário(s) que realizou a(S) avaliação(s) do filme ao consultá-lo detalhadamente
    Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher o Id de um filme com avaliações
    E enviar a requisição
    Então a API deverá retornar o status code 200 e retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme

Cenário: Deve ser possível um usuário do tipo crítico retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme ao consultá-lo detalhadamente
    Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher o Id de um filme com avaliações
    E enviar a requisição
    Então a API deverá retornar o status code 200 e retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme

Cenário: Deve ser possível um usuário do tipo administrador retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme ao consultá-lo detalhadamente
    Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher o Id de um filme com avaliações
    E enviar a requisição
    Então a API deverá retornar o status code 200 e retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme

Cenário: Deve ser possível um usuário do tipo não logado retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme ao consultá-lo detalhadamente
    Dado que o usuário do tipo não logado esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher o Id de um filme com avaliações
    E enviar a requisição
    Então a API deverá retornar o status code 200 e retornar os dados do(s) usuário(s) que realizou a(s) avaliação(s) do filme

Cenário: Deve ser possível um usuário do tipo comum retornar um totalizador com a média das avaliações de audiência realizadas no filme ao consultá-lo detalhadamente
    Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher o Id de um filme com avaliações
    Então deverá retornar o totalizador da média das avaliações da audiência realizadas no filme selecionado

Cenário: Deve ser possível um usuário do tipo crítico retornar um totalizador com a média das avaliações de audiência realizadas no filme ao consultá-lo detalhadamente
    Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher o Id de um filme com avaliações
    Então deverá retornar o totalizador da média das avaliações da audiência realizadas no filme selecionado

Cenário: Deve ser possível um usuário do tipo administrador retornar um totalizador com a média das avaliações de audiência realizadas no filme ao consultá-lo detalhadamente
    Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher o Id de um filme com avaliações
    Então deverá retornar o totalizador da média das avaliações da audiência realizadas no filme selecionado

Cenário: Deve ser possível um usuário do tipo não logado retornar um totalizador com a média das avaliações de audiência realizadas no filme ao consultá-lo detalhadamente
    Dado que o usuário do tipo não logado esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher o Id de um filme com avaliações
    Então deverá retornar o totalizador da média das avaliações da audiência realizadas no filme selecionado    

Cenário: Deve ser possível um usuário do tipo comum retornar um totalizador da média das avaliações da crítica realizadas no filme ao consultá-lo detalhadamente
    Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher o Id de um filme com avaliações
    Então deverá retornar o totalizador da média das avaliações da crítica realizadas no filme selecionado   

 Cenário: Deve ser possível um usuário do tipo crítico retornar um totalizador da média das avaliações da crítica realizadas no filme ao consultá-lo detalhadamente
    Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher o Id de um filme com avaliações
    Então deverá retornar o totalizador da média das avaliações da crítica realizadas no filme selecionado

Cenário: Deve ser possível um usuário do tipo administrador retornar um totalizador da média das avaliações da crítica realizadas no filme ao consultá-lo detalhadamente
    Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher o Id de um filme com avaliações
    Então deverá retornar o totalizador da média das avaliações da crítica realizadas no filme selecionado

Cenário: Deve ser possível um usuário do tipo não logado retornar um totalizador da média das avaliações da crítica realizadas no filme ao consultá-lo detalhadamente
    Dado que o usuário do tipo não logado esta logado e autenticado na API Raromdb
    E acessou o método GET /api/movies/{id}
    Quando preencher o Id de um filme com avaliações
    Então deverá retornar o totalizador da média das avaliações da crítica realizadas no filme selecionado



#FRONT

Cenário: Deve ser possível visualizar a quantidade de avaliações realizadas por usuários comuns ao consultar um filme detalhadamente
    Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
    Quando inserir um Id de filme válido na url
    Então deverá visualizar a quantidade de avaliações da audiência realizadas

Cenário: Deve ser possível visualizar a quantidade de avaliações realizadas por usuários críticos ao consultar um filme detalhadamente 
    Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
    Quando inserir um Id de filme válido na url
    Então deverá visualizar a quantidade de avaliações da crítica realizadas

Cenário: Deve ser possível realizar uma consulta detalhada de filmes com Id válido
    Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
    Quando inserir um Id de filme válido na url
    Então deverá visualizar todas as informações do filme selecionado

Cenário: Não deve ser possível realizar uma consulta detalhada de filmes com Id inválido
    Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
    Quando inserir um Id inválido na url
    Então Então o sistema deverá exibir uma mensagem de erro

Cenário: Deve ser possível visualizar o Id do filme na url ao realizar uma consulta detalhada de filmes
    Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
    Quando selecionar um filme na tela inicial
    Então deverá visualizar o Id do filme selecionado na url 

Cenário: Deve ser possível visualizar a imagem de capa do filme ao realizar uma consulta detalhada de filmes
    Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
    Quando inserir um Id de filme válido na url
    Então deverá visualizar a imagem de capa do filme selecionado

Cenário: Deve ser possível um usuário do tipo comum avaliar um filme ao realizar uma consulta detalhada de filmes
    Dado que o usuário do tipo comum esta logado no Frontend Raromdb
    Quando selecionar um filme na tela inicial
    Então deverá visualizar um campo habilitado para avaliar o filme
    E o usuário comum deverá avaliar o filme com sucesso

Cenário: Deve ser possível um usuário do tipo crítico avaliar um filme ao realizar uma consulta detalhada de filmes
    Dado que o usuário do tipo crítico acessou a tela de consulta de filmes no Frontend Raromdb
    Quando selecionar um filme na tela inicial
    Então deverá visualizar um campo habilitado para avaliar o filme
    E o usuário crítico deverá avaliar o filme com sucesso

Cenário: Deve ser possível um usuário do tipo administrador avaliar um filme ao realizar uma consulta detalhada de filmes
    Dado que o usuário do tipo administrador acessou a tela de consulta de filmes no Frontend Raromdb
    Quando selecionar um filme na tela inicial
    Então deverá visualizar um campo habilitado para avaliar o filme
    E o usuário administrador deverá avaliar o filme com sucesso

Cenário: Não deve ser possível um usuário não logado avaliar um filme ao realizar uma consulta detalhada de filmes
    Dado que o usuário não logado acessou a tela de consulta de filmes no Frontend Raromdb
    Quando selecionar um filme na tela inicial
    Então deverá visualizar um campo desabilitado para avaliar o filme 
    E uma mensagem informando "Entre para poder escrever sua review"
 
Cenário: Deve ser possível visualizar todas as avaliações realizadas no filme ao consultá-lo detalhadamente
    Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
    Quando inserir um Id de filme válido na url
    Então deverá visualizar todas as avaliações realizadas no filme selecionado
    E todas as informações das avaliações

Cenário: Deve ser possível visualizar o totalizador da média das avaliações realizadas por usuários comuns no filme ao consultá-lo detalhadamente
    Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
    Quando inserir um Id de filme válido na url
    Então deverá visualizar o totalizador da média das avaliações da audiência realizadas no filme selecionado

Cenário: Deve ser possível visualizar o totalizador da média das avaliações realizadas por usuários críticos no filme ao consultá-lo detalhadamente
    Dado que o usuário de qualquer tipo acessou a tela inicial do Frontend Raromdb
    Quando inserir um Id de filme válido na url
    Então deverá visualizar o totalizador da média das avaliações da crítica realizadas no filme selecionado

