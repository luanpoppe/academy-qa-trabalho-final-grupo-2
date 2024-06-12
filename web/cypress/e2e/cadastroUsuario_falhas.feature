#language: pt

Funcionalidade: Registrar Usuário

    Contexto: Acessar a página de cadastro de usuários
        Dado que o usuário acessou a página de cadastrar usuários
   
    Cenário: Não deve ser possível registrar usuário sem inserir os dados no formulário
        Quando não preencher nenhum campo
        E acessar a funcionalidade salvar
        Então deve alertar no formulário os campos obrigatórios
       
    Cenário: Não deve ser possível registrar usuário sem informar um nome
        Quando preenche todos os campos do formulário exceto o campo nome
        E acessar a funcionalidade salvar
        Então o site exibe alerta de nome no formulário "Informe o nome."
    
    Cenário: Não deve ser possível registrar usuário informando nome com espaços
        Quando preenche todos os campos do formulário utilizando espaços no nome
        E acessar a funcionalidade salvar
        Então o site exibe alerta de nome no formulário "Informe o nome."
   
    Cenário: Não deve ser possível registrar usuário com nome com mais de 100 caracteres
        Quando preenche nome com mais de 100 caracteres
        E preencher todos os campos restante do formulário com dados válidos
        E acessar a funcionalidade salvar
        Então o site exibe alerta de nome no formulário "O nome deve ter no máximo 100 dígitos."
    
    Cenário: Não deve ser possível registrar usuário sem informar o e-mail
        Quando preenche todos os campos do formulário exceto o campo email
        E acessar a funcionalidade salvar
        Então o site exibe alerta de email no formulário "Informe o e-mail."
   
    Cenário: Não deve ser possível registrar usuário utilizando email informando espaços entre os caracteres
        Quando preenche todos os campos do formulário utilizando espaços no email "c   a@gmail.com"
        E acessar a funcionalidade salvar
        Então a operação de registro não poderá ser concluída exibindo o alerta "Não foi possível cadastrar o usuário."
    
    #BUG DA API
    Esquema do Cenário: Nao deve ser possível registrar um usuário com e-mail inválido
        Quando preenche todos os campos dos formulários e utiliza email inválido "<emailinvalido>"
        E acessar a funcionalidade salvar
        Então o site exibe alerta de email no formulário "<alerta>"
        Exemplos: 
        |                      emailinvalido                           |                    alerta                     |    
        |                          ca@b                                | Informe pelo menos 5 dígitos para o e-mail    |                                  
        |                         123@.com                             |            Informe um e-mail válido.          |                  
        |                        carolail.com                          |            Informe um e-mail válido.          |
        |                      caromaia#gmail.com                      |            Informe um e-mail válido.          |
        |                      caromaia@gmai🫢l.com                    |            Informe um e-mail válido.          |
        |aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@h.com |   O e-mail deve ter no máximo 60 dígitos.     |
        
    Cenário: Não deve ser possível registrar usuário sem informar senha
        Quando preenche todos os campos do formulário exceto o campo senha
        E acessar a funcionalidade salvar
        Então o site exibe alerta de senha no formulário "Informe a senha"
    
    Cenário: Nao deve ser possível registrar um usuário sem confirmar a senha
        Quando preenche todos os campos dos formulário exceto o campo de confirmação de senha
        E acessar a funcionalidade salvar
        Então o site exibe alerta no campo de confirmação de senha no formulário "Informe a senha"
    
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
    
    Esquema do Cenário: Não deve ser possivel registrar um usuario com senha menor que 6 digitos
        Quando preenche todos os campos dos formulários e utiliza senha menor que 6 digitos "<senha>" "<confSenha>"
        E acessar a funcionalidade salvar
        Então o site exibe alerta de senha no formulário "A senha deve ter pelo menos 6 dígitos."
        Exemplos:
        |        senha       |      confSenha     |
        |        12345       |        12345       |                           
        |        1234        |         1234       |       
        |        123         |         123        |  
        |         1          |          1         |      
    
    Esquema do Cenário: Não deve ser possivel registrar um usuario com senha maior que 12 digitos
        Quando preenche todos os campos dos formulários e utiliza senha maior que 12 digitos "<senha>" "<confSenha>"
        E acessar a funcionalidade salvar
        Então o site exibe alerta de senha no formulário "A senha deve ter no máximo 12 dígitos."
        Exemplos:
        |         senha       |      confSenha     |
        |      1234567890111  |    1234567890111   |                               
        |     abcdefghjkltrwe |   abcdefghjkltrwe  |  
        
    Cenário: Não deve ser possível registrar um usuario com email ja cadastrado
        Quando preenche todos os campos do formulário e utiliza um email ja cadastrado
        E acessar a funcionalidade salvar
        Então a operação de registro não poderá ser concluída com alerta "E-mail já cadastrado. Utilize outro e-mail"
        E o botão OK deve retornar para o formulário
       
    Cenário: Não deve ser possível registrar um usuário recém cadastrado
        Quando realiza o cadastro de usuário com sucesso
        E acessa funcionalidade salvar com os dados do usuario recém cadastrado preenchido no formulário
        Então a operação de registro não poderá ser concluída com alerta "E-mail já cadastrado. Utilize outro e-mail"
        E o botão OK deve retornar para o formulário
    
