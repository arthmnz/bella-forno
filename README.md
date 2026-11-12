# Bella Forno

Site de uma pizzaria familiar fictícia, desenvolvido como trabalho de faculdade com **HTML, CSS e JavaScript puros** (sem frameworks e sem bibliotecas). O projeto tem 5 páginas e foco em layout responsivo, acessibilidade e interatividade em JavaScript.

## Páginas

| Página | Arquivo | O que tem | JavaScript |
|---|---|---|---|
| Início | `index.html` | Destaque, favoritas da casa, horário e endereço | `script.js` |
| Cardápio | `cardapio.html` | Cartões de produtos com filtro por categoria e busca | `script.js`, `cardapio.js` |
| Monte sua pizza | `monte-sua-pizza.html` | Formulário de montagem com resumo e total em tempo real | `script.js`, `monte-pizza.js` |
| Sobre | `sobre.html` | História da pizzaria e valores | nenhum |
| Contato | `contato.html` | Formulário com validação, horário e endereço | `script.js`, `contato.js` |

## Funcionalidades

- **Indicador "Aberto agora / Fechado agora"** na página inicial, calculado pela hora do computador do visitante (funcionamento das 18h às 23h).
- **Cardápio com filtro por categoria** (Todas, Tradicionais, Especiais, Doces, Bebidas e Sobremesas) e **busca por nome** que ignora maiúsculas e acentos. Filtro e busca funcionam combinados, e uma mensagem aparece quando nada é encontrado.
- **Monte sua pizza**: o cliente escolhe tamanho, sabores, borda, adicionais e quantidade. O resumo e o total são recalculados a cada alteração, sem recarregar a página. O tamanho define o máximo de sabores, e o site impede e avisa quando o limite é ultrapassado.
- **Formulário de contato com validação** em JavaScript, com mensagens de erro junto a cada campo. O que o usuário digitou é mantido quando há erro.
- **Layout responsivo**: as colunas viram uma só em telas de até 767 px.

## Tecnologias

- **HTML5** com tags semânticas (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `form`, `fieldset`)
- **CSS3**: variáveis (custom properties), Flexbox, Grid, media queries e o seletor `:has()`
- **JavaScript (ES6+)** sem dependências
- **Google Fonts**: Fraunces (títulos) e DM Sans (textos)

## Como executar

Não é preciso instalar nada:

1. Baixe ou clone a pasta do projeto.
2. Abra o arquivo `index.html` no navegador.

Para uma experiência melhor durante o desenvolvimento, use a extensão **Live Server** do VSCode (botão direito em `index.html` > *Open with Live Server*).

> As fontes são carregadas do Google Fonts, então é preciso internet para vê-las. Sem conexão, o site usa as fontes de reserva (Georgia e Arial).

## Estrutura do projeto

```
bella-forno/
├── index.html
├── cardapio.html
├── monte-sua-pizza.html
├── sobre.html
├── contato.html
├── css/
│   └── estilo.css            # único CSS, compartilhado por todas as páginas
├── js/
│   ├── script.js             # compartilhado: "Aberto agora"
│   ├── cardapio.js           # filtro e busca do cardápio
│   ├── monte-pizza.js        # cálculo de preço e resumo do pedido
│   └── contato.js            # validação do formulário de contato
└── img/                      # fotos usadas nas páginas
```

## Design

As decisões visuais ficam como variáveis no `:root` do `css/estilo.css`, então mudar uma cor ou um espaçamento é editar uma linha.

| Variável | Cor | Uso |
|---|---|---|
| `--color-primary` | `#C83B2D` | Botões, logo e destaques (vermelho tomate) |
| `--color-primary-dark` | `#98291F` | Hover e estados de foco |
| `--color-secondary` | `#526343` | Reserva (verde oliva) |
| `--color-accent` | `#E8B653` | Selos dos cartões (dourado) |
| `--color-background` | `#FFF8EF` | Fundo da página (creme) |
| `--color-surface` | `#FFFFFF` | Cabeçalho, cartões e campos |
| `--color-text` | `#292522` | Texto principal e rodapé |
| `--color-muted` | `#756D66` | Texto auxiliar |
| `--color-border` | `#E9DED1` | Bordas e divisórias |
| `--color-success` | `#347A4A` | Confirmações e "Aberto agora" |
| `--color-error` | `#B42318` | Erros e "Fechado agora" |

- **Tipografia:** títulos em *Fraunces* e textos em *DM Sans*.
- **Espaçamento:** escala em múltiplos de 4 px (`--space-1` a `--space-8`).
- **Medidas:** largura máxima do conteúdo de 1200 px (`--content-width`) e altura mínima de 44 px em botões e campos (`--control-height`).

## Como funciona

### CSS

- Um único arquivo, organizado por blocos: variáveis, base, cabeçalho e menu, botões, hero, cartões, horário, cardápio, Monte sua pizza, Sobre, Contato e menu mobile.
- O `body` é um contêiner flex em coluna com `min-height: 100vh`, e o `main` usa `flex: 1`, o que mantém o rodapé sempre no fim da janela.
- A grade de cartões usa `repeat(auto-fit, minmax(260px, 1fr))`. No cardápio, a classe `cards-grid-cardapio` troca para `auto-fill`, para que um cartão sozinho (depois de filtrar) não estique até a largura toda.
- Em *Monte sua pizza*, `.opcao:has(input:checked)` destaca a opção marcada sem JavaScript, e o resumo usa `position: sticky` para acompanhar a rolagem.
- O atributo `hidden` é reforçado com `[hidden] { display: none !important; }`, que é como o JavaScript mostra e esconde elementos.

### JavaScript

| Arquivo | Responsabilidade |
|---|---|
| `script.js` | `atualizarStatus()` define "Aberto agora" ou "Fechado agora" comparando a hora atual com `HORA_ABERTURA` (18) e `HORA_FECHAMENTO` (23). |
| `cardapio.js` | `aplicarFiltros()` mostra ou esconde cada cartão conforme a categoria ativa (`data-categoria`) e o texto da busca (`data-nome`). `normalizar()` remove acentos e maiúsculas. |
| `monte-pizza.js` | Calcula o total, monta o resumo, limita os sabores pelo tamanho e valida o envio. Usa um único ouvinte de `change` no formulário (delegação de eventos). |
| `contato.js` | Valida cada campo ao sair dele (`blur`) e todos no envio, mostra os erros junto aos campos e confirma o envio com o primeiro nome do cliente. |

### Monte sua pizza

Os preços ficam nos atributos `data-preco` e `data-max` do HTML, e o JavaScript apenas lê esses valores.

| Item | Preço |
|---|---|
| Broto (1 sabor) | R$ 38,00 |
| Média (até 2 sabores) | R$ 52,00 |
| Grande (até 2 sabores) | R$ 66,00 |
| Família (até 3 sabores) | R$ 82,00 |
| Sabores tradicionais | incluídos |
| Quatro Queijos, Frango com Catupiry, Carne de Sol, Chocolate com Morango | + R$ 6,00 por sabor |
| Borda recheada (catupiry ou cheddar) | + R$ 8,00 |
| Adicionais (queijo extra, bacon, azeitona) | + R$ 5,00 cada |
| Quantidade | de 1 a 10 |

**Fórmula:** `total = (tamanho + sabores + borda + adicionais) × quantidade`

Exemplo: Grande (66) + Quatro Queijos (6) + Carne de Sol (6) + borda de catupiry (8) + queijo extra (5) = R$ 91,00 por pizza, ou R$ 182,00 com 2 pizzas.

### Validação do formulário de contato

| Campo | Regra |
|---|---|
| Nome | obrigatório, mínimo de 3 caracteres |
| E-mail | obrigatório, formato `texto@texto.texto` |
| Telefone | opcional; se preenchido, 10 ou 11 dígitos (DDD + número) |
| Mensagem | obrigatória, mínimo de 10 caracteres |

O formulário usa o atributo `novalidate` para desligar as bolhas de erro do navegador, e a validação fica por conta do `contato.js`.

## Como personalizar

- **Cores e espaçamentos:** edite as variáveis do `:root` em `css/estilo.css`.
- **Horário de funcionamento:** altere `HORA_ABERTURA` e `HORA_FECHAMENTO` em `js/script.js` e o texto de horário no HTML (rodapé, "Venha nos visitar" e página de contato).
- **Novo item no cardápio:** copie um `<article class="card" ...>` em `cardapio.html` e altere `data-categoria` (`tradicionais`, `especiais`, `doces`, `bebidas` ou `sobremesas`), `data-nome` (é o texto usado pela busca), a foto, o título, a descrição e o preço.
- **Preços do Monte sua pizza:** altere o `data-preco` da opção em `monte-sua-pizza.html` **e** o texto `R$` visível na mesma opção, pois os dois precisam ficar iguais. O máximo de sabores de cada tamanho está em `data-max`.

## Acessibilidade

- Tags semânticas e um único `h1` por página
- Link da página atual marcado com `aria-current="page"`
- Botões de filtro com `aria-pressed`
- Campos de formulário com `label` visível, erros ligados por `aria-describedby` e `aria-invalid` nos campos com problema
- Avisos e confirmações com `role="status"`
- Contorno de foco visível (`:focus-visible`) para navegação por teclado
- Alvos de toque com no mínimo 44 px de altura
- Texto alternativo (`alt`) nas imagens

## Limitações conhecidas

- Não há servidor: pedidos e mensagens **não são enviados** a lugar nenhum, e a confirmação é apenas uma simulação na tela.
- As validações acontecem só no navegador. Em um sistema real, o servidor repetiria as mesmas verificações.
- O indicador "Aberto agora" usa o relógio do computador do visitante.
- Os preços aparecem duas vezes no *Monte sua pizza* (no `data-preco` e no texto visível) e precisam ser mantidos iguais.
- Cabeçalho e rodapé são repetidos em cada arquivo HTML.
- Endereço, horários, preços e textos são fictícios, e as fotos são ilustrativas.

## Melhorias futuras

- Pagamento e cálculo de taxa de entrega
- Acompanhamento do status do pedido
- Conta de usuário e opção "pedir novamente"
- Banco de dados e validação no servidor
- Reaproveitar cabeçalho e rodapé com componentes, em vez de copiá-los em cada página

## Autoria

Trabalho acadêmico de desenvolvimento web.

- **Disciplina:** Web Coding
- **Curso e instituição:** Ciência da Computação - Uninassau Graças
- **Professor(a):** Maurício Braga
- **Integrantes:** Guilherme Cunha de Souza - 01880132
José Arthur Alves Manzella - 01694035
Marcos Veríssimo Da Cruz Silva - 01932881
Pedro Andrade de Paula - 01890646
Pedro Henrique Novais Dantas - 01882261
Vinicius Santana Romeu Fossati - 01814289
Wellington Peres da Silva Júnior - 01903520
