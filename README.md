﻿# Projeto Final - QALabs
## Sobre o projeto:
Este projeto consiste no desenvolvimento de tópicos no sistema Raromdb, estes são: Métodos de teste, Documentações em BDD com Gherkin, Testes API, Testes automatizados e manuais Web e Mobile, Interação do grupo e Trabalho em equipe.

O objetivo deste projeto foi aperfeiçoar e avaliar os conhecimentos de seus integrantes quanto a atuação de um QA, entre elas com o desenvolvimento de testes automatizados, realização de testes exploratórios, escrita de report de bugs entre outros.

### Sites de interesse:
- Site do RaroMDB: [Frontend](https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/)
- Site do Swagger do projeto: [API](https://raromdb-3c39614e42d4.herokuapp.com/swagger)
- Reports de Bugs, Melhorias e Débitos técnicos - [Trello](https://trello.com/b/Rk9ggSCD/reports)
- Separação de tarefas entre os membros seguindo metodologia ágil - [Trello](https://trello.com/b/i486MxZU/tarefas)

### Membros do projeto:
- Caroline Maia - [GitHub](https://github.com/carolinemaia)
- Luan Poppe - [GitHub](https://github.com/luanpoppe)
- Maria Cristina - [GitHub](https://github.com/mariacfs15)
- Jonas Alberto - [GitHub](https://github.com/BodeXX)
- Thaís Barbosa - [GitHub](https://github.com/ThaisBarbosa12)

<img src="https://avatars.githubusercontent.com/u/37007813?v=4" width="50" heigth="50">  <img src="https://avatars.githubusercontent.com/u/118562068?v=4" width="50" heigth="50">  <img src="https://avatars.githubusercontent.com/u/97346690?v=4" width="50" heigth="50">  <img src="https://avatars.githubusercontent.com/u/137187041?v=4" width="50" heigth="50">  <img src="https://avatars.githubusercontent.com/u/166058394?v=4" width="50" heigth="50">


## Como iniciar o projeto
Para configurar todo o ambiente do projeto você deverá executar os passos a seguir. Lembrando que você precisa ter instalado em seu computador o Git, o Python e o NodeJS.
- Escolha uma pasta onde ficará todos os arquivos do projeto.
- `git clone https://github.com/luanpoppe/academy-qa-trabalho-final-grupo-2.git .`
- `cd api`
- `npm i`
- `cd ../web`
- `npm i`
- `cd ../mobile`
- `pip install -r requirements.txt` - Se este comando não funcionar, tente o seguinte: `python -m pip install -r requirements.txt`

Pronto, agora você já tem instalado as dependências necessárias para executar qualquer uma das três áreas do projeto: Mobile, Web e API.
Lembrando que para rodar uma das três áreas, você precisa primeiro mudar em seu terminal para a pasta da área que você quer executar. Exemplos:
- `cd api`, `cd web` ou `cd mobile`. Se você estiver dentro de alguma pasta e quiser mudar pra web, por exemplo: `cd ../web`. Vale o mesmo princípio para mudar para uma das outras pastas
- Para executar todos os testes de API ou de Web pelo terminal, basta você entrar na pasta que você deseja e executar no terminal `npx cypress run`
- Para executar todos os testes de mobile, basta você entrar na pasta de mobile e executar no terminal `robot .`

## Seção para os colaboradores:

### Comando para pegar as informações da branch main:
`git pull origin main` OU Aperta F1 → Pesquisa e seleciona “Git pull from” → Seleciona a branch “Main”
<hr>

### Manual dos Commands
#### `cy.createUser()`
Para pegar as informações do usuário criado pelo Command, basta fazer um:
```
cy.createUser().then(function(resposta) { 
    user = resposta 
})
```
Este usuário criado terá o id, o email, o password e todas outras informações do usuário
Obs --> Este é o command mais diferente, pois ele retorna diretamente as informações do usuário criado ao invés de retornar o `response`, então não é necessário fazer o `responde.body` para pegar suas informações

##### Exemplos de uso: 
- `cy.createUser()` --> Sem passar nenhum parâmetro, será criado um usuário com todas as informações novas utilizando o faker
- `cy.createUser({name: "Nome do usuário", password: "senhaDoUsuario", email: "emailDoUsuario"})` --> Passando todos os parâmetros, será criado um usuário com todos os parâmetros passdos. Se não for passado todos os parâmetros, os parâmetros ausentes serão criados com o faker
<hr>

#### `cy.deleteUser()`
- Obrigatório passar os parâmetros
- Obs -> Os parâmetros devem estar dentro das chaves `{}` , dentro dos parênteses `()`

##### Exemplos de uso: 
- `cy.deleteUser({email: valorDoEmail, password: valorDaSenha, id: valorDoId})`
- OU -> Se vc já tiver uma variável com os valores completos do usuário, basta passar esta variável. 
    - Exemplo: Ao criar um usuário com `cy.createUser()` e adicionando a resposta desse Command numa variável chamada `usuario`
    - Basta fazer -> `cy.deleteUser(usuario)`
<hr>
