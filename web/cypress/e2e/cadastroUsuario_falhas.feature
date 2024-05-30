#language: pt

Funcionalidade: Registrar Usuário

    Contexto: Acessar a página de cadastro de usuários
        Dado que o usuário acessou a página de cadastrar usuários

    Cenário: Não deve ser possível registrar usuários sem informar nenhum campo
        Quando não preencher nenhum campo
        E acessar a funcionalidade salvar
        Então deve alertar no formulário os campos obrigatórios
    
    Cenário: Não deve ser possível registrar usuário sem informar um nome
        Quando preenche todos os campos do formulário exceto o campo nome
        E acessar a funcionalidade salvar
        Então o site exibe alerta de nome no formulário "Informe o nome."
    
    Cenário: Não deve ser possível registrar usuário sem informar o e-mail
        Quando preenche todos os campos do formulário exceto o campo email
        E acessar a funcionalidade salvar
        Então o site exibe alerta de email no formulário "Informe o e-mail."
    
    Cenário: Não deve ser possível registrar usuário sem informar senha
        Quando preenche todos os campos do formulário exceto o campo senha
        E acessar a funcionalidade salvar
        Então o site exibe alerta de senha no formulário "Informe a senha"

    Cenário: Nao deve ser possível registrar um usuário sem confirmar a senha
        Quando preenche todos os campos dos formulário exceto o campo de confirmação de senha
        E acessar a funcionalidade salvar
        Então o site exibe alerta no campo de confirmação de senha no formulário "Informe a senha"
    
     Cenário: Não deve ser possível registrar usuário com nome com mais de 100 caracteres
        Quando preenche nome com mais de 100 caracteres
        E preencher todos os campos restante do formulário
        E acessar a funcionalidade salvar
        Então o site exibe alerta de nome no formulário "O nome deve ter no máximo 100 dígitos."

    Esquema do Cenário: Não deve ser possivel registrar um usuário com senha principal diferente do campo confirmar senha
        Quando preenche todos os campos dos formulários
        E a senha principal é diferente da confirmação de senha "<confSenha>"
        E acessar a funcionalidade salvar
        Então o site exibe alerta no campo de Confirmação de senha no formulário "<alerta>"
        Exemplos:
        |   confSenha   |               alerta                   |
        |     12345     | A senha deve ter pelo menos 6 dígitos. |
        |     abcde     | A senha deve ter pelo menos 6 dígitos. |
        |     12345g    | As senhas devem ser iguais.            |
        |     carolm    | As senhas devem ser iguais.            |
        | 1234567890123 | A senha deve ter no máximo 12 dígitos. |


    # Cenário: Não deve ser possível registrar um usuario com email ja cadastrado
    #     Quando preenche todos os campos do formulário utilizando um email ja cadastrado
    #     E acessar a funcionalidade salvar
    #     Então a operação de registro não poderá ser concluída alertando que o e-mail ja está cadastrado
    #     E o botão OK deve retornar para o formulário
    

