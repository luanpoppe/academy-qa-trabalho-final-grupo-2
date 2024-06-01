# Projeto Final - QALabs
## Como iniciar o projeto
Após realizar o git clone, você deverá ir para a pasta de api (`cd api`) ou para a pasta de web (`cd web`), e então rodar o comando no terminal `npm install`

Depois → Basta rodar o `npx cypress open` 

Obs → Para rodar o projeto depois → Primeiro é necessário entrar na pasta onde será rodado o cypress (api ou web). Para fazer isso → `cd api` ou `cd web`. Se você estiver na pasta de api e quiser mudar pra web → `cd ../web`, e o contrário seria `cd ../api`

### Comando para pegar as informações da branch main:
`git pull origin main` OU Aperta F1 → Pesquisa e seleciona “Git pull from” → Seleciona a branch “Main”

## Manual dos Commands
### `cy.createUser()`
Para pegar as informações do usuário criado pelo Command, basta fazer um:
```
cy.createUser().then(function(resposta) { 
    user = resposta 
})
```
Este usuário criado terá o id, o email, o password e todas outras informações do usuário
Obs --> Este é o command mais diferente, pois ele retorna diretamente as informações do usuário criado ao invés de retornar o `response`, então não é necessário fazer o `responde.body` para pegar suas informações

#### Exemplos de uso: 
- `cy.createUser()` --> Sem passar nenhum parâmetro, será criado um usuário com todas as informações novas utilizando o faker
- `cy.createUser({name: "Nome do usuário", password: "senhaDoUsuario", email: "emailDoUsuario"})` --> Passando todos os parâmetros, será criado um usuário com todos os parâmetros passdos. Se não for passado todos os parâmetros, os parâmetros ausentes serão criados com o faker
