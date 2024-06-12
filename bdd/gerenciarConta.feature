Funcionalidade: Gerenciar conta
Como um usuário do sistema
Desejo poder gerenciar minha conta
Para ter controle sobre minhas informações

#API

Cenário: Deve ser possível como usuário do tipo comum atualizar apenas as próprias informações de nome e senha  
    Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e os novos valores de nome e senha 
    E enviar a requisição
    Então a API deverá retornar o status code 200 e atualizar as informações do usuário com sucesso

Cenário: Não deve ser possível como usuário do tipo comum atualizar as informações de outro usuário 
    Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar o Id de outro usuário e os novos valores de nome e senha 
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Não deve ser possível como usuário do tipo comum atualizar sua senha para uma senha com < 6 dígitos
    Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de senha < 6 dígitos 
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Não deve ser possível como usuário do tipo comum atualizar sua senha para uma senha com > 12 dígitos
    Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de senha > 12 dígitos 
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Não deve ser possível como usuário do tipo comum atualizar sua senha para uma senha com emojis
    Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de senha com emojis
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Não deve ser possível como usuário do tipo comum atualizar seu nome para um nome com < 1 dígitos
    Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de nome < 1 dígitos 
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Não deve ser possível como usuário do tipo comum atualizar seu nome para um nome com > 100 dígitos
    Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de nome > 100 dígitos 
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Deve ser possível como usuário do tipo comum atualizar somente o seu nome 
    Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de nome 
    E enviar a requisição
    Então a API deverá retornar o status code 200 e atualizar somente o nome do usuário com sucesso

Cenário: Deve ser possível como usuário do tipo comum atualizar somente a sua senha 
    Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de senha 
    E enviar a requisição
    Então a API deverá retornar o status code 200 e atualizar somente a senha do usuário com sucesso

Cenário: Não deve ser possível como usuário do tipo comum atualizar somente o nome de outro usuário
    Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar o Id de outro usuário e o novo valor de nome 
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Não deve ser possível como usuário do tipo comum atualizar somente a senha de outro usuário
    Dado que o usuário do tipo comum esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar o Id de outro usuário e o novo valor de senha 
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Deve ser possível como usuário do tipo crítico atualizar apenas as próprias informações de nome e senha 
    Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e os novos valores de nome e senha 
    E enviar a requisição
    Então a API deverá retornar o status code 200 e atualizar as informações do usuário com sucesso

Cenário: Não deve ser possível como usuário do tipo crítico atualizar as informações de outro usuário 
    Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar o Id de outro usuário e os novos valores de nome e senha 
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Não deve ser possível como usuário do tipo crítico atualizar sua senha para uma senha com < 6 dígitos
    Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de senha < 6 dígitos 
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Não deve ser possível como usuário do tipo crítico atualizar sua senha para uma senha com > 12 dígitos
    Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de senha > 12 dígitos 
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Não deve ser possível como usuário do tipo crítico atualizar sua senha para uma senha com emojis
    Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de senha com emojis
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Não deve ser possível como usuário do tipo crítico atualizar seu nome para um nome com < 1 dígitos
    Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de nome < 1 dígitos 
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Não deve ser possível como usuário do tipo crítico atualizar seu nome para um nome com > 100 dígitos
    Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de nome > 100 dígitos 
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Deve ser possível como usuário do tipo crítico atualizar somente o seu nome 
    Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de nome 
    E enviar a requisição
    Então a API deverá retornar o status code 200 e atualizar somente o nome do usuário com sucesso

Cenário: Deve ser possível como usuário do tipo crítico atualizar somente a sua senha 
    Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de senha 
    E enviar a requisição
    Então a API deverá retornar o status code 200 e atualizar somente a senha do usuário com sucesso

Cenário: Não deve ser possível como usuário do tipo crítico atualizar somente o nome de outro usuário
    Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar o Id de outro usuário e o novo valor de nome 
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Não deve ser possível como usuário do tipo crítico atualizar somente a senha de outro usuário
    Dado que o usuário do tipo crítico esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar o Id de outro usuário e o novo valor de senha 
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Deve ser possível como usuário do tipo administrador atualizar as próprias informações de nome e senha 
    Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e os novos valores de nome e senha 
    E enviar a requisição
    Então a API deverá retornar o status code 200 e atualizar as informações do usuário com sucesso

Cenário: Deve ser possível como usuário do tipo administrador atualizar as informações de outro usuário 
    Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar o Id de outro usuário e os novos valores de nome e senha 
    E enviar a requisição
    Então a API deverá retornar o status code 200 e atualizar as informações do usuário com sucesso

Cenário: Não deve ser possível como usuário do tipo administrador atualizar sua senha para uma senha com < 6 dígitos
    Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de senha < 6 dígitos 
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Não deve ser possível como usuário do tipo administrador atualizar sua senha para uma senha com > 12 dígitos
    Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de senha > 12 dígitos 
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Não deve ser possível como usuário do tipo administrador atualizar sua senha para uma senha com emojis
    Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de senha com emojis
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Não deve ser possível como usuário do tipo administrador atualizar seu nome para um nome com < 1 dígitos
    Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de nome < 1 dígitos 
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Não deve ser possível como usuário do tipo administrador atualizar seu nome para um nome com > 100 dígitos
    Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de nome > 100 dígitos 
    E enviar a requisição
    Então a API deverá retornar o status code 403 e informar a mensagem "Forbidden"

Cenário: Deve ser possível como usuário do tipo administrador atualizar somenmte o seu nome 
    Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de nome 
    E enviar a requisição
    Então a API deverá retornar o status code 200 e atualizar o nome do usuário com sucesso

Cenário: Deve ser possível como usuário do tipo administrador atualizar somente sua senha 
    Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar seu próprio Id e o novo valor de senha 
    E enviar a requisição
    Então a API deverá retornar o status code 200 e atualizar a senha do usuário com sucesso

Cenário: Deve ser possível como usuário do tipo administrador atualizar somente o nome de outro usuário
    Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar o Id de outro usuário e o novo valor de nome 
    E enviar a requisição
    Então a API deverá retornar o status code 200 e atualizar o nome do usuário com sucesso

Cenário: Deve ser possível como usuário do tipo administrador atualizar somente a senha de outro usuário
    Dado que o usuário do tipo administrador esta logado e autenticado na API Raromdb
    E acessou o método PUT /api/user/{id}
    Quando informar o Id de outro usuário e o novo valor de senha 
    E enviar a requisição
    Então a API deverá retornar o status code 200 e atualizar a senha do usuário com sucesso



 #FRONT

# Cenário: Deve ser possível acessar a atualização de informações como usuário do tipo comum autenticado no sistema
#     Dado que possuo um usuário comum cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando vizualizar o texto "Atualize informações da sua conta."
#     Então o usuário poderá atualizar suas informações

# Cenário: Deve ser possível como usuário do tipo comum alterar apenas suas próprias informações 
#     Dado que possuo um usuário comum cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando alterar as próprias informações de nome, senha e confirmar senha do usuário comum
#     E acessar a função salvar
#     Então será possível atualizar as informações do usuário com sucesso

# Cenário: Deve ser possível como usuário do tipo comum atualizar suas informações de nome e senha na funcionalidade de gerenciamento de conta 
#     Dado que possuo um usuário comum cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando alterar o campo nome
#     E atualizar o campo senha
#     E atualizar o campo confirmar senha com o mesmo valor inserido no campo senha
#     E acessar a função salvar
#     Então será possível atualizar as informações do usuário com sucesso

# Cenário: Os campos de senha e confirmação de senha devem ser preenchidos com os mesmos dados para que a senha possa ser alterada por um usuário do tipo comum
#     Dado que possuo um usuário comum cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando atualizar o campo senha
#     E atualizar o campo confirmar senha com o mesmo valor inserido no campo senha
#     E acessar a função salvar
#     Então será possível atualizar as informações do usuário com sucesso

# Cenário: Não deve ser possível como usuário do tipo comum alterar a senha do usuário caso os campos de senha e confirmação de senha sejam diferentes 
#     Dado que possuo um usuário comum cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando atualizar o campo senha
#     E atualizar o campo confirmar senha com um valor diferente do inserido no campo senha
#     E acessar a função salvar
#     Então o sistema exibirá a mensagem de erro "As senhas devem ser iguais."

# Cenário: O usuário do tipo comum deve vizualizar os seus dados relevantes quando acessar a funcionalidade de gerenciar conta
#     Dado que possuo um usuário comum cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando vizualizar o texto "Atualize informações da sua conta."
#     Então o usuário terá acesso aos dados de nome e e-mail da sua conta

# Cenário: Não deve ser possível como usuário do tipo comum atualizar a senha do usuário para uma senha com < 6 dígitos
#     Dado que possuo um usuário comum cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando atualizar os campos de senha e confirmar senha para "12345"
#     E acessar a função salvar
#     Então o campo senha exibirá a mensagem de erro "A senha deve ter pelo menos 6 dígitos"
#     E o campo confirmar senha exibirá a mensagem de erro "A senha deve ter pelo menos 6 dígitos"

# Cenário: Não deve ser possível como usuário do tipo comum atualizar a senha do usuário para uma senha com > 12 dígitos
#     Dado que possuo um usuário comum cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando atualizar os campos de senha e confirmar senha para "1234561234567"
#     E acessar a função salvar
#     Então o alerta de erro informando que não é possível realizar a operação será exibido na tela

# Cenário: Não deve ser possível como usuário do tipo comum atualizar a senha com dados vazios
#     Dado que possuo um usuário comum cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando habilitar a função alterar senha
#     E acessar a função salvar
#     Então o campo senha exibirá a mensagem de erro "Campo obrigatório"
#     E o campo confirmar senha exibirá a mensagem de erro "As senhas devem ser iguais."

# Cenário: Não deve ser possível como usuário do tipo comum atualizar o nome para um nome com < 1 dígitos
#     Dado que possuo um usuário comum cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando informar um nome com < 1 dígitos
#     E acessar a função salvar
#     Então o campo nome exibirá a mensagem de erro "Informe o nome"

# Cenário: Não deve ser possível como usuário do tipo comum atualizar o nome para um nome com > 100 dígitos
#     Dado que possuo um usuário comum cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando atualizar o campo nome para "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
#     E acessar a função salvar
#     Então o campo nome exibirá a mensagem de erro "O nome deve ter no máximo 100 dígitos."

# Cenário: Deve ser possível como usuário do tipo comum atualizar somente o nome 
#     Dado que possuo um usuário comum cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando alterar o campo nome
#     E acessar a função salvar
#     Então será possível atualizar apenas o nome do usuário com sucesso

# Cenário: Deve ser possível como usuário do tipo comum atualizar somente a senha 
#     Dado que possuo um usuário comum cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando atualizar o campo senha
#     E atualizar o campo confirmar senha com o mesmo valor inserido no campo senha
#     E acessar a função salvar
#     Então será possível atualizar apenas a senha do usuário com sucesso

# Cenário: Deve ser possível acessar a atualização de informações como usuário do tipo crítico autenticado no sistema
#     Dado que possuo um usuário crítico cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando vizualizar o texto "Atualize informações da sua conta."
#     Então o usuário poderá atualizar suas informações

# Cenário: Deve ser possível como usuário do tipo crítico alterar apenas suas próprias informações 
#     Dado que possuo um usuário crítico cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando alterar as próprias informações de nome, senha e confirmar senha do usuário comum
#     E acessar a função salvar
#     Então será possível atualizar as informações do usuário com sucesso

# Cenário: Deve ser possível como usuário do tipo crítico atualizar suas informações de nome e senha na funcionalidade de gerenciamento de conta 
#     Dado que possuo um usuário crítico cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando alterar o campo nome
#     E atualizar o campo senha
#     E atualizar o campo confirmar senha com o mesmo valor inserido no campo senha
#     E acessar a função salvar
#     Então será possível atualizar as informações do usuário com sucesso

# Cenário: Os campos de senha e confirmação de senha devem ser preenchidos com os mesmos dados para que a senha possa ser alterada por um usuário do tipo crítico
#     Dado que possuo um usuário crítico cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando atualizar o campo senha
#     E atualizar o campo confirmar senha com o mesmo valor inserido no campo senha
#     E acessar a função salvar
#     Então será possível atualizar as informações do usuário com sucesso

# Cenário: Não deve ser possível como usuário do tipo crítico alterar a senha do usuário caso os campos de senha e confirmação de senha sejam diferentes 
#     Dado que possuo um usuário crítico cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando atualizar o campo senha
#     E atualizar o campo confirmar senha com um valor diferente do inserido no campo senha
#     E acessar a função salvar
#     Então o sistema exibirá a mensagem de erro "As senhas devem ser iguais."

# Cenário: O usuário do tipo crítico deve vizualizar os seus dados relevantes quando acessar a funcionalidade de gerenciar conta
#     Dado que possuo um usuário crítico cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando vizualizar o texto "Atualize informações da sua conta."
#     Então o usuário terá acesso aos dados de nome e e-mail da sua conta

# Cenário: Não deve ser possível como usuário do tipo crítico atualizar a senha do usuário para uma senha com < 6 dígitos
#     Dado que possuo um usuário crítico cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando atualizar os campos de senha e confirmar senha para "12345"
#     E acessar a função salvar
#     Então o sistema exibirá a mensagem de erro "A senha deve ter pelo menos 6 dígitos"

# Cenário: Não deve ser possível como usuário do tipo crítico atualizar a senha do usuário para uma senha com > 12 dígitos
#     Dado que possuo um usuário crítico cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando atualizar os campos de senha e confirmar senha para "1234561234567"
#     E acessar a função salvar
#     Então o alerta de erro informando que não é possível realizar a operação será exibido na tela

# Cenário: Não deve ser possível como usuário do tipo crítico atualizar a senha com dados vazios
#     Dado que possuo um usuário crítico cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando habilitar a função alterar senha
#     E acessar a função salvar
#     Então o campo senha exibirá a mensagem de erro "Campo obrigatório"
#     E o campo confirmar senha exibirá a mensagem de erro "As senhas devem ser iguais."

# Cenário: Não deve ser possível como usuário do tipo crítico atualizar o nome para um nome com < 1 dígitos
#     Dado que possuo um usuário crítico cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando informar um nome com < 1 dígitos
#     E acessar a função salvar
#     Então o campo nome exibirá a mensagem de erro "Informe o nome"

# Cenário: Não deve ser possível como usuário do tipo crítico atualizar o nome para um nome com > 100 dígitos
#     Dado que possuo um usuário crítico cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando atualizar o campo nome para "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
#     E acessar a função salvar
#     Então o campo nome exibirá a mensagem de erro "O nome deve ter no máximo 100 dígitos."

# Cenário: Deve ser possível como usuário do tipo crítico atualizar somente o nome 
#     Dado que possuo um usuário crítico cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando alterar o campo nome
#     E acessar a função salvar
#     Então será possível atualizar apenas o nome do usuário com sucesso

# Cenário: Deve ser possível como usuário do tipo crítico atualizar somente a senha 
#     Dado que possuo um usuário crítico cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando atualizar o campo senha
#     E atualizar o campo confirmar senha com o mesmo valor inserido no campo senha
#     E acessar a função salvar
#     Então será possível atualizar apenas a senha do usuário com sucesso

# Cenário: Deve ser possível acessar a atualização de informações como usuário do tipo administrador autenticado no sistema
#     Dado que possuo um usuário administrador cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando vizualizar o texto "Atualize informações da sua conta."
#     Então o usuário poderá atualizar suas informações

# Cenário: Deve ser possível como usuário do tipo administrador alterar apenas suas próprias informações 
#     Dado que possuo um usuário administrador cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando alterar as próprias informações de nome, senha e confirmar senha do usuário comum
#     E acessar a função salvar
#     Então será possível atualizar as informações do usuário com sucesso

# Cenário: Deve ser possível como usuário do tipo administrador atualizar suas informações de nome e senha na funcionalidade de gerenciamento de conta 
#     Dado que possuo um usuário administrador cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando alterar o campo nome
#     E atualizar o campo senha
#     E atualizar o campo confirmar senha com o mesmo valor inserido no campo senha
#     E acessar a função salvar
#     Então será possível atualizar as informações do usuário com sucesso

# Cenário: Os campos de senha e confirmação de senha devem ser preenchidos com os mesmos dados para que a senha possa ser alterada por um usuário do tipo administrador
#     Dado que possuo um usuário administrador cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando atualizar o campo senha
#     E atualizar o campo confirmar senha com o mesmo valor inserido no campo senha
#     E acessar a função salvar
#     Então será possível atualizar as informações do usuário com sucesso

# Cenário: Não deve ser possível como usuário do tipo administrador alterar a senha do usuário caso os campos de senha e confirmação de senha sejam diferentes
#     Dado que possuo um usuário administrador cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando atualizar o campo senha
#     E atualizar o campo confirmar senha com um valor diferente do inserido no campo senha
#     E acessar a função salvar
#     Então o sistema exibirá a mensagem de erro "As senhas devem ser iguais."

# Cenário: O usuário do tipo administrador deve vizualizar os seus dados relevantes quando acessar a funcionalidade de gerenciar conta
#     Dado que possuo um usuário administrador cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando vizualizar o texto "Atualize informações da sua conta."
#     Então o usuário terá acesso aos dados de nome e e-mail da sua conta

# Cenário: Não deve ser possível como usuário do tipo administrador atualizar a senha do usuário para uma senha com < 6 dígitos
#     Dado que possuo um usuário administrador cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando atualizar os campos de senha e confirmar senha para "12345"
#     E acessar a função salvar
#     Então o sistema exibirá a mensagem de erro "A senha deve ter pelo menos 6 dígitos"

# Cenário: Não deve ser possível como usuário do tipo administrador atualizar a senha do usuário para uma senha com > 12 dígitos
#     Dado que possuo um usuário administrador cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando atualizar os campos de senha e confirmar senha para "1234561234567"
#     E acessar a função salvar
#     Então o alerta de erro informando que não é possível realizar a operação será exibido na tela

# Cenário: Não deve ser possível como usuário do tipo administrador atualizar a senha com dados vazios
#     Dado que possuo um usuário administrador cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando habilitar a função alterar senha
#     E acessar a função salvar
#     Então o campo senha exibirá a mensagem de erro "Campo obrigatório"
#     E o campo confirmar senha exibirá a mensagem de erro "As senhas devem ser iguais."

# Cenário: Não deve ser possível como usuário do tipo administrador atualizar o nome para um nome com < 1 dígitos
#     Dado que possuo um usuário administrador cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando informar um nome com < 1 dígitos
#     E acessar a função salvar
#     Então o campo nome exibirá a mensagem de erro "Informe o nome"

# Cenário: Não deve ser possível como usuário do tipo administrador atualizar o nome para um nome com > 100 dígitos
#     Dado que possuo um usuário administrador cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando atualizar o campo nome para "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
#     E acessar a função salvar
#     Então o campo nome exibirá a mensagem de erro "O nome deve ter no máximo 100 dígitos."

# Cenário: Deve ser possível como usuário do tipo administrador atualizar somente o nome 
#     Dado que possuo um usuário administrador cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando alterar o campo nome
#     E acessar a função salvar
#     Então será possível atualizar apenas o nome do usuário com sucesso

# Cenário: Deve ser possível como usuário do tipo administrador atualizar somente a senha 
#     Dado que possuo um usuário administrador cadastrado e logado no sistema
#     E que acessei a funcionalidade de gerencimaneto de conta
#     Quando atualizar o campo senha
#     E atualizar o campo confirmar senha com o mesmo valor inserido no campo senha
#     E acessar a função salvar
#     Então será possível atualizar apenas a senha do usuário com sucesso
   