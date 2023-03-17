
# Teste - Empresa Esferas Software - Vaga Programador PHP Pleno 

Construir uma aplicação em PHP com banco de dados Postgres.




## Instruções do Teste

- [Clique aqui](https://github.com/wilsoncastrodev/teste-esferas-software/blob/master/TESTE.md) para visualizar as instruções do teste
## Índice

- [Demonstração](#demonstração)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Instalação e Execução da Aplicação](#instalação-e-execução-da-aplicação)
- [Modelo de Dados Lógicos](#modelo-de-dados-lógicos)
- [Documentação da API](#documentação-da-api)
- [Screenshots](#screenshots)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Referências](#referências)
- [Agradecimentos](#agradecimentos)
- [Contato](#contato)
- [Autores](#autores)
- [Licença](#licença)
## Demonstração

Caso queira ver a aplicação em execução sem a necessidade de instalá-la em sua máquina local, acesse: https://esferas.tests.wilsoncastro.dev

![App Screenshot](https://github.com/wilsoncastrodev/teste-esferas-software/blob/master/client-app/src/assets/images/esferas.gif?raw=true)


## Funcionalidades Implementadas

- Criar, editar, listar e excluir clientes; 
- Criar, editar, listar e excluir produtos; 
- Criar, editar, listar e excluir pedidos; 
- Filtro de listagens por qualquer campo;
- Ordenação de listagens por qualquer campo;
- Campo de CPF com validação;
- Campo de E-mail com validação;
- Preenchimento autómatico do endereço do cliente por meio do CEP;
- Mascaras nos campos do formulário;
- Barra de navagação de páginas;
- Docker para executar a aplicação;
## Instalação e Execução da Aplicação

#### Pré-requisitos
São necessários os seguintes requisitos instalados na máquina local para testar a aplicação:
- Docker
- Docker Compose

### Instalando e executando o projeto com o Docker
- Clone o repositório:

```bash
  git clone https://github.com/wilsoncastrodev/teste-esferas-software
```
- Em seguida, entre no diretório raiz do projeto utilizando o comando a seguir:

```bash
  cd teste-esferas-software
```
- Execute o seguinte comando para iniciar a execução dos containers do Docker:

```bash
  docker-compose up -d
```
- Caso o servidor esteja sendo executado pela primeira vez é necessário rodar o comando abaixo,  para carregar as dependências e realizar as configurações necessárias para que aplicação funcione corretamente:

```bash
  docker exec -it esferas-server-app-php bash ../server-init.sh
```
- Se a instalação tiver ocorrido normalmente, abra o navegador e execute a URL a seguir:

```bash
  http://localhost:5500
```
    
## Modelo de Dados Lógicos

![App Screenshot](https://raw.githubusercontent.com/wilsoncastrodev/teste-esferas-software/master/client-app/src/assets/images/modelo-dados-logico-esferas.png)
## Documentação da API

### Clientes

#### Endpoints
| Método   | Rota       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `GET`      | `api/customers` | Consuta lista de clientes |
| `GET`      | `api/customers/${id}` | Consulta cliente por ID |
| `POST`      | `api/customers` | Cria cliente |
| `PATCH`      | `api/customers/${id}` | Atualiza cliente por ID |
| `DELETE`      | `api/customers/${id}` | Exclui cliente por ID |

#### Retorna todos os clientes

```
  GET /api/customers
```
Exemplo de Resposta:

```json
[
    {
        "id": 1,
        "name": "Stefany Clarice Dias",
        "email": "stefanyclaricedias@teste.com",
        "phone": "(12) 31231-2312",
        "cpf": "930.055.326-74",
        "zipcode": "79814-054",
        "address": "Rua Edgar Xavier de Matos",
        "number": 870,
        "complement": "Casa",
        "neighbourhood": "Jardim Itália",
        "city": "Dourados",
        "state": "MS",
        "created_at": "2023-03-19T18:36:03.000000Z",
        "updated_at": "2023-03-19T18:36:03.000000Z"
    }
]
```

#### Retorna um cliente

```
  GET /api/customers/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. Identificador único do cliente. |

Exemplo de Resposta:

```json
{
    "id": 1,
    "name": "Stefany Clarice Dias",
    "email": "stefanyclaricedias@teste.com",
    "phone": "(12) 31231-2312",
    "cpf": "930.055.326-74",
    "zipcode": "79814-054",
    "address": "Rua Edgar Xavier de Matos",
    "number": 870,
    "complement": "Casa",
    "neighbourhood": "Jardim Itália",
    "city": "Dourados",
    "state": "MS",
    "created_at": "2023-03-19T18:36:03.000000Z",
    "updated_at": "2023-03-19T18:36:03.000000Z"
}
```
#### Cadastra um cliente

```
  POST /api/customers
```

Exemplo de corpo de Requisição:
```json
{
    "name": "Stefany Clarice Dias",
    "email": "stefanyclaricedias@teste.com",
    "phone": "(12) 31231-2312",
    "cpf": "930.055.326-74",
    "zipcode": "79814-054",
    "address": "Rua Edgar Xavier de Matos",
    "number": 870,
    "complement": "Casa",
    "neighbourhood": " Jardim Itália",
    "city": "Dourados",
    "state": "MS"
}
```

#### Atualiza um cliente

```
  PATCH /api/customers/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. Identificador único do cliente. |

Exemplo de corpo de Requisição:
```json
{
    "name": "Stefany Clarice Dias",
    "email": "stefanyclaricedias@teste.com",
    "phone": "(12) 31231-2312",
    "cpf": "930.055.326-74",
    "zipcode": "79814-054",
    "address": "Rua Edgar Xavier de Matos",
    "number": 870,
    "complement": "Casa",
    "neighbourhood": " Jardim Itália",
    "city": "Dourados",
    "state": "MS"
}
```

#### Exclui um cliente

```
  DELETE /api/customers/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. Identificador único do cliente. |

### Produtos

#### Endpoints
| Método   | Rota       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `GET`      | `api/products` | Consuta lista de produtos |
| `GET`      | `api/products/${id}` | Consulta produto por ID |
| `POST`      | `api/products` | Cria produto |
| `PATCH`      | `api/products/${id}` | Atualiza produto por ID |
| `DELETE`      | `api/products/${id}` | Exclui produto por ID |

#### Retorna todos os produtos

```
  GET /api/products
```
Exemplo de Resposta:

```json
[
    {
        "id": 1,
        "code": "ESFERAS000064",
        "name": "Mouse Sem Fio Recarregável",
        "description": "Curabitur aliquet quam id dui posuere blandit. Curabitur aliquet quam id dui posuere blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "price": 49.99,
        "created_at": "2023-03-19T18:37:48.000000Z",
        "updated_at": "2023-03-19T18:37:48.000000Z"
    }
]
```

#### Retorna um produto

```
  GET /api/products/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. Identificador único do produto. |

Exemplo de Resposta:

```json
{
    "id": 1,
    "code": "ESFERAS000064",
    "name": "Mouse Sem Fio Recarregável",
    "description": "Curabitur aliquet quam id dui posuere blandit. Curabitur aliquet quam id dui posuere blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "price": 49.99,
    "created_at": "2023-03-19T18:37:48.000000Z",
    "updated_at": "2023-03-19T18:37:48.000000Z"
}
```
#### Cadastra um produto

```
  POST /api/products
```

Exemplo de corpo de Requisição:
```json
{
    "name": "Mouse Sem Fio Recarregável",
    "description": "Curabitur aliquet quam id dui posuere blandit. Curabitur aliquet quam id dui posuere blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "price": 49.99
}
```

#### Atualiza um produto

```
  PATCH /api/products/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. Identificador único do produto. |

Exemplo de corpo de Requisição:
```json
{
    "name": "Mouse Sem Fio Recarregável",
    "description": "Curabitur aliquet quam id dui posuere blandit. Curabitur aliquet quam id dui posuere blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "price": 49.99
}
```

#### Exclui um produto

```
  DELETE /api/products/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. Identificador único do produto. |

### Pedidos

#### Endpoints
| Método   | Rota       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `GET`      | `api/orders` | Consuta lista de pedidos |
| `GET`      | `api/orders/${id}` | Consulta pedido por ID |
| `POST`      | `api/orders` | Cria pedido |
| `PATCH`      | `api/orders/${id}` | Atualiza pedido por ID |
| `DELETE`      | `api/orders/${id}` | Exclui pedido por ID |

#### Retorna todos os pedidos

```
  GET /api/orders
```
Exemplo de Resposta:

```json
[
    {
        "id": 1,
        "customer_id": 1,
        "status": "Cancelado",
        "discount": 0,
        "subtotal": 9965.95,
        "total": 9965.95,
        "created_at": "2023-03-19T18:41:14.000000Z",
        "updated_at": "2023-03-19T18:41:31.000000Z",
    }
]
```

#### Retorna um pedido

```
  GET /api/orders/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. Identificador único do pedido. |

Exemplo de Resposta:

```json
{
    "id": 1,
    "customer_id": 1,
    "status": "Cancelado",
    "discount": 0,
    "subtotal": 9965.95,
    "total": 9965.95,
    "created_at": "2023-03-19T18:41:14.000000Z",
    "updated_at": "2023-03-19T18:41:31.000000Z",
}
```
#### Cadastra um pedido

```
  POST /api/orders
```

Exemplo de corpo de Requisição:
```json
{
    "customer_id": 1,
    "products": [
        {
            "id": 1,
            "quantity": 5,
            "price": 100
        },
        {
            "id": 2,
            "quantity": 3,
            "price": 99
        },
    ],
    "discount": 20
}
```

#### Atualiza um pedido

```
  PATCH /api/orders/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. Identificador único do pedido. |

Exemplo de corpo de Requisição:
```json
{
    "id": 1,
    "customer_id": 1,
    "products": [
        {
            "id": 1,
            "quantity": 5,
            "price": 100
        },
        {
            "id": 2,
            "quantity": 3,
            "price": 99
        }
    ],
    "discount": 10,
    "status": "Cancelado"
}
```

#### Exclui um pedido

```
  DELETE /api/orders/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. Identificador único do produto. | 

## Screenshots

![App Screenshot](https://raw.githubusercontent.com/wilsoncastrodev/teste-esferas-software/master/client-app/src/assets/images/esferas%20(1).png)

![App Screenshot](https://raw.githubusercontent.com/wilsoncastrodev/teste-esferas-software/master/client-app/src/assets/images/esferas%20(2).png)

![App Screenshot](https://raw.githubusercontent.com/wilsoncastrodev/teste-esferas-software/master/client-app/src/assets/images/esferas%20(3).png)

![App Screenshot](https://raw.githubusercontent.com/wilsoncastrodev/teste-esferas-software/master/client-app/src/assets/images/esferas%20(4).png)

![App Screenshot](https://raw.githubusercontent.com/wilsoncastrodev/teste-esferas-software/master/client-app/src/assets/images/esferas%20(5).png)

## Tecnologias Utilizadas

| Tecnologia | Versão
| :---: | :---: |
| PHP| 8.x |
| Laravel | 10.x |
| Postgres | 15.x |
| pgAdmin | 4.x |
| Nginx | 1.x |
| Javascript | - |
| Typescript | 5.x |
| React | 18.x |
| Redux | 4.x |
| HTML5 | - |
| CSS3 | - |
| Bootstrap | 5.x |
| Docker (Docker Compose) | 23.x |
| APIs REST/RESTful | - |
| Git | - |

## Referências

 - [Documentação do Laravel](https://laravel.com/docs/10.x/)
 - [Documentação do React](https://pt-br.reactjs.org/)
## Agradecimentos

Agradeço a toda equipe da Esferas Software pela oportunidade de participar do processo seletivo. E que Deus possa abençoá-los.
## Contato

Se tiver alguma dúvida, sinta-se à vontade para entrar em contato comigo pelo e-mail contato@wilsoncastro.dev.
## Autores

- [@wcastro](https://github.com/wilsoncastrodev)


## Licença

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
