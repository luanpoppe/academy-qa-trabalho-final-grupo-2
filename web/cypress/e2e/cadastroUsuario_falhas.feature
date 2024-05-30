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
        Então o site exibe alerta de email no formulário
    
    Cenário: Não deve ser possível registrar usuário sem informar senha
        Quando preenche todos os campos do formulário exceto o campo senha
        E acessar a funcionalidade salvar
        Então o site exibe alerta de senha no formulário
    
    # Cenário: Não deve ser possível registrar usuário com nome com mais de 100 caracteres


