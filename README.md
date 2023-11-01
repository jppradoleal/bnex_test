# Python Fullstack Developer

## Parte 1

Vamos exercitar o desenvolvimento de uma arquitetura Back-End, ok?

Crie uma API REST, que mantém os dados de uma entidade Produto. Essa entidade possui os atributos nome, descrição e valor.

Esse Back-end deve prover toda a manutenção dessa entidade Produto, como incluir Produto, Remover Produto, etc.

Deve ser usado a stack Python + Django, com uma das opções abaixo:
* Opção 1: Django Rest Framework para criação do backend de APIs.
* Opção 2: Django utilizando Templates.

Use preferencialmente CBV para desenvolvimento das Views.

## Parte 2

Vamos exercitar o desenvolvimento de uma arquitetura Front-End, ok?

Crie um sistema Front-end, que apresente os dados da sua entidade Produto, da parte 1.

Esse Front-end deve prover toda a interface gráfica para manutenção da entidade Produto, como Incluir Produto, Remover Produto e etc.

Deve ser usado uma das seguintes opções de stack para a construção desse Front-end:

* Opção 1: ReactJS.
* Opção 2: Caso não tenha conhecimento em ReactJS, pode ser utilizado Django Templates.

## Parte 3

Crie uma infraestrutra para esses sistemas, com as ferramentas Docker e Docker Compose.

Nessa infraestrutra deverão existir três serviços, Front-end Server, Back-end Server e DB-Server.

No servidor Back-end Server deve ser instalado o sistema da Parte 1.

No servidor Front-end Server deve ser instalado o sistema da Parte 2.

No servidor DB-Server deve ser instalado o banco de dados dos sistemas. O Banco de dados deve ser PostgreSQL.

Crie um README.md com instruções para a instalação e inicialização dos sistemas em modo desenvolvimento.

### Observações

Consulte as documentações oficiais das ferramentas, todas elas possuem tutoriais muito bons para serem seguidos e servirem como base.

Sugerimos enriquecer seu código com mecanismos de autenticação, autorização, logging, testes, comentarios e etc.

O resultado deste desafio deve ser publicado em um repositório público em seu GitHub, para que possamos analisar seu código-fonte.

Um bom desafio para você! Esperamos que você se divirta e aprenda com ele! Bom trabalho!