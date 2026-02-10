    #language: pt

Funcionalidade: Carrinho de compras

  Cenário: Adicionar dois produtos e validar nome e preço no carrinho
    Dado que estou logado na loja
    Quando adiciono os seguintes produtos ao carrinho:
      | nome               | preco   |
      | Sample Shirt Name  | $49.99  |
      | Sample Shoe Name   | $89.00  |
    Então devo ver os produtos no carrinho com os preços corretos
