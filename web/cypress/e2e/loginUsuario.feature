# language: pt

Funcionalidade: Login Usuário

    Contexto: Acessar a página de Login
      Dado que o usuário acessou a página de Login

    Cenário: Usuário deve conseguir autenticar-se com sucesso
      Quando o usuário informa as credenciais cadastradas
      E acessa a funcionalidade de logar
      Então usuário deve autenticar-se com sucesso
    
    Cenário: Usuário deve conseguir autenticar-se inserindo o email cadastrado em letras maiúsculas
      Quando o usuário informa as credenciais cadastradas inserindo o email em letras maiúsculas
      E acessa a funcionalidade de logar
      Então usuário deve autenticar-se com sucesso
    
    Cenário: A sessão de autenticação deve expirar após 60 min
      E o usuário informa as credenciais cadastradas
      E acessa a funcionalidade de logar
      Quando realiza tentativa de atualizar dados após 60 minutos de sessão de Login
      Então o site deve redirecionar o usuário para página de login
    
    Cenário: Usuário não deve conseguir autenticar-se sem informar e-mail
      Quando o usuário informa as credenciais exceto campo email
      E acessa a funcionalidade de logar
      Então o site exibe alerta de email no formulário "Informe o e-mail."

    Cenário: Usuário não deve conseguir autenticar-se sem informar senha
      Quando o usuário informa as credenciais exceto campo senha
      E acessa a funcionalidade de logar
      Então o site exibe alerta de email no formulário "Informe a senha"
    
    Cenário: Usuário não deve se autenticar com email não cadastrado
      Quando o usuário informa as credenciais com email não cadastrado
      E acessa a funcionalidade de logar
      Então o site exibe mensagem "Usuário ou senha inválidos."
      E ao clicar no botão OK deve retornar para o formulário

    Cenário: Usuário não deve se autenticar informando senha não cadastrada
      Quando o usuário informa as credenciais com email válido e senha incorreta
      E acessa a funcionalidade de logar
      Então o site exibe mensagem "Usuário ou senha inválidos."
      E ao clicar no botão OK deve retornar para o formulário
    
    Cenário: Usuário deve conseguir encerrar a sessão
      E o usuário informa as credenciais cadastradas
      E acessa a funcionalidade de logar
      Quando encerra a sessão acessando a funcionalidade Logout
      Então usuário deve ser deslogado sendo redirecionado para a página principal