# language: pt

Funcionalidade: Login Usuário

    Contexto: Acessar a página de Login
      Dado que o usuário acessou a página de Login

    Cenário: Usuário deve conseguir autenticar-se com sucesso
        Quando informo as credenciais cadastradas
        E acesso a funcionalidade salvar
        Então usuário deve autenticar-se com sucesso
    
    Cenário: A sessão de autenticação deve expirar após 60 min
        Quando informo as credenciais cadastradas
        E a sessão passa de 60 minutos
        Então usuário deverá ser deslogado do site retornando para a tela de login
    
    Cenário: Usuário não deve conseguir autenticar-se sem informar e-mail
        Quando informo as credenciais exceto campo email
        E acesso a funcionalidade salvar
        Então o site exibe alerta de email no formulário "Informe o e-mail."

    Cenário: Usuário não deve conseguir autenticar-se sem informar senha
        Quando informo as credenciais exceto campo senha
        E acesso a funcionalidade salvar
        Então o site exibe alerta de email no formulário "Informe a senha"
    
    Cenário: Usuário não deve se autenticar com email não cadastrado
        Quando informo as credenciais com email não cadastrado
        E acesso a funcionalidade salvar
        Então o site exibe mensagem "Usuário ou senha inválidos."
        E ao clicar no botão OK deve retornar para o formulário

    Cenário: Usuário não deve se autenticar informando senha incorreta
        Quando informo as credenciais com email válido e senha incorreta
        E acesso a funcionalidade salvar
        Então o site exibe mensagem "Usuário ou senha inválidos."
        E ao clicar no botão OK deve retornar para o formulário
    
    

