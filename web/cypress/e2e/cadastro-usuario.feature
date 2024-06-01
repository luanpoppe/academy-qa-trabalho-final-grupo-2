# language: pt

Funcionalidade: Registrar Usuário

    Contexto: Acessar a página de cadastro de usuários
      Dado que o usuário acessou a página de cadastrar usuários

    Esquema do Cenário: Deve ser possível registrar usuário com sucesso
      Quando preenche todos os campos do formulário utilizando um nome qualquer "<nome>"
      E acessar a funcionalidade salvar
      Então o usuario deve ser registrado com sucesso
      E o site exibirá uma mensagem de cadastro com sucesso
      Exemplos:
      |     nome      |
      |      1        |
      |      *        | 
      |      @        | 
      |     C. M.     |
      |     cAr01     | 
      |     🫂       |

    Cenário: Usuário registrado com sucesso deve ser do tipo comum
      Quando preenche todos os campos do formulário utilizando um nome qualquer
      E acessar a funcionalidade salvar
      Então o usuario deve ser registrado com conta do tipo comum
    
    # Cenário: Deve ser possível retornar para o formulário após confirmar a mensagem de cadastro com sucesso
    #   Quando concluir o cadastro de usuário com sucesso
    #   Então deve retornar para o formulário de cadastro clicando no botão OK

    # Cenário: Deve ser possível está automaticamente logado após registro
    #   Quando concluir o cadastro de usuário com sucesso
    #   Então o usuário deve está automaticamente logado no site


