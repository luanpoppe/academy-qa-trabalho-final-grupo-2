# language: pt

Funcionalidade: Registrar Usuário

    Contexto: Acessar a página de cadastro de usuários
      Dado que o usuário acessou a página de cadastrar usuários

    
     Esquema do Cenário: Deve ser possível registrar usuário com sucesso
      Quando preenche todos os campos do formulário utilizando um nome qualquer "<nome>"
      E acessar a funcionalidade salvar
      Então o usuario deve ser registrado com sucesso
      E o site exibirá uma mensagem de cadastro com sucesso
      E o usuário deve retornar para o formulário de cadastro clicando no botão OK
      Exemplos:
      |     nome      |
      |      1        |
      |      *        | 
      |      @        | 
      |     C. M.     |
      |     cAr01     | 
      |     🫂       |

    Cenário: Deve ser possível registrar usuário com nome com 99 caracteres
      Quando preenche todos os campos do formulário utilizando nome com 99 caracteres
      E acessar a funcionalidade salvar
      Então o usuario deve ser registrado com sucesso
      E o usuário deve retornar para o formulário de cadastro clicando no botão OK

    Cenário: Deve ser possível registrar usuário com nome com 100 caracteres
      Quando preenche todos os campos do formulário utilizando nome com 100 caracteres
      E acessar a funcionalidade salvar
      Então o usuario deve ser registrado com sucesso
      E o usuário deve retornar para o formulário de cadastro clicando no botão OK
    
    Cenário: Deve ser possível registrar usuário inserindo email com letras maiúsculas
      Quando preenche todos os campos do formulário inserindo email com letras maiúsculas
      E acessar a funcionalidade salvar
      Então o usuario deve ser registrado com sucesso
      E o usuário deve retornar para o formulário de cadastro clicando no botão OK  
    
    Cenário: Deve ser possível registrar usuário com email com 6 caracteres
      Quando preenche todos os campos do formulário utilizando email com 6 caracteres
      E acessar a funcionalidade salvar
      Então o usuario deve ser registrado com sucesso
      E o usuário deve retornar para o formulário de cadastro clicando no botão OK
    
    Cenário: Deve ser possível registrar usuário com email com 60 caracteres
      Quando preenche todos os campos do formulário utilizando email com 60 caracteres
      E acessar a funcionalidade salvar
      Então o usuario deve ser registrado com sucesso
      E o usuário deve retornar para o formulário de cadastro clicando no botão OK

    Cenário: Deve ser possível registrar usuário com senha com 6 caracteres
      Quando preenche todos os campos do formulário utilizando senha com 6 caracteres
      E acessar a funcionalidade salvar
      Então o usuario deve ser registrado com sucesso
      E o usuário deve retornar para o formulário de cadastro clicando no botão OK

    Cenário: Deve ser possível registrar usuário com senha com 12 caracteres
      Quando preenche todos os campos do formulário utilizando senha com 12 caracteres
      E acessar a funcionalidade salvar
      Então o usuario deve ser registrado com sucesso
      E o usuário deve retornar para o formulário de cadastro clicando no botão OK
  
    Cenário: Usuário registrado com sucesso deve ser do tipo comum
      Quando preenche todos os campos do formulário utilizando um nome qualquer
      E acessar a funcionalidade salvar
      Então o usuario deve ser registrado com conta do tipo comum
      E o usuário deve retornar para o formulário de cadastro clicando no botão OK

    Cenário: Deve ser possível está automaticamente logado após registro
      Quando preenche todos os campos do formulário utilizando um nome qualquer
      E acessar a funcionalidade salvar
      Então o usuario deve ser registrado com sucesso
      E o usuário deve está automaticamente logado no site
    


