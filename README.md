## Teste PHP

### Construir uma aplicação em PHP (pode utilizar framework) com banco de dados Postgres que contenha:
- Cadastro de clientes (CRUD) (Nome, email, telefone, CPF, endereço)
- Cadastro de produtos (CRUD) (Código, Nome, Descrição, Valor)
- Cadastro de pedidos (CRUD), com status (Aberto, Pago ou Cancelado), Cliente, mais de um produto, valor do pedido, data do pedido.
* Se alterar o valor no CRUD de produtos, os pedidos antigos não podem alterar o valor.

### Cada CRUD:
- Deve ser filtrável e ordenável por qualquer campo.
- Deve possuir formulários para criação e atualização de seus itens.
- Deve permitir a deleção de qualquer item de sua lista.
- Barra de navegação entre os CRUDs.
- Links para os outros CRUDs nas listagens (Ex: link para o detalhe do cliente da compra na lista de pedidos de compra)

### BÔNUS (opcional fazer)
- Validar o CPF
- Validar o E-mail
- Pesquisar o endereço pelo CEP
- Colocar máscaras nos campos
- Criar o Docker (docker-compose) para rodar a aplicação
- Aplicar desconto no valor total do pedido
