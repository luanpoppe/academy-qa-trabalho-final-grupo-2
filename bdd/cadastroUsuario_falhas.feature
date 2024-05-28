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
        Então o site exibe alerta no formulário "alerta"
    
    Cenário: Não deve ser possível registrar usuário sem informar o e-mail
        Quando informar um nome
        E não informar um e-mail válido
        E informar uma senha válida
        E confirmar a senha anterior informada
        E acessa a funcionalidade salvar
        Então deve alertar no formulário a obrigatoriedade do email
    
    Cenário: Não deve ser possível registrar usuário sem informar senha
        Quando informar um nome
        E não informar um e-mail válido
        E informar não informar senha
        E acessa a funcionalidade salvar
        Então deve alertar no formulário a obrigatoriedade da senha
    
    Cenário: Não deve ser possível registrar usuário com nome com mais de 100 caracteres


