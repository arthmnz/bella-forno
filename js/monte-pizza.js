const form = document.getElementById("form-pizza");
const listaResumo = document.getElementById("resumo-lista");
const totalResumo = document.getElementById("resumo-total");
const campoQuantidade = document.getElementById("quantidade");
const dicaSabores = document.getElementById("dica-sabores");
const avisoSabores = document.getElementById("aviso-sabores");
const mensagemSucesso = document.getElementById("mensagem-sucesso");

function formatarReais(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function obterTamanho() {
  return form.querySelector('input[name="tamanho"]:checked');
}

function obterMarcados(nome) {
  return Array.from(form.querySelectorAll(`input[name="${nome}"]:checked`));
}

function somarPrecos(campos) {
  return campos.reduce(function (total, campo) {
    return total + Number(campo.dataset.preco);
  }, 0);
}

function obterQuantidade() {
  const quantidade = parseInt(campoQuantidade.value, 10);

  if (Number.isNaN(quantidade) || quantidade < 1) {
    return 1;
  }
  if (quantidade > 10) {
    return 10;
  }
  return quantidade;
}


function adicionarLinha(rotulo, valor) {
  const item = document.createElement("li");
  const textoEsquerda = document.createElement("span");
  const textoDireita = document.createElement("span");

  textoEsquerda.textContent = rotulo;
  textoDireita.textContent = valor;

  item.append(textoEsquerda, textoDireita);
  listaResumo.append(item);
}

function atualizarResumo() {
  mensagemSucesso.hidden = true;
  listaResumo.textContent = "";

  const tamanho = obterTamanho();
  const sabores = obterMarcados("sabor");
  const borda = obterMarcados("borda")[0];
  const adicionais = obterMarcados("adicional");
  const quantidade = obterQuantidade();

  let precoUnitario = Number(tamanho.dataset.preco);
  adicionarLinha(`Pizza ${tamanho.value}`, formatarReais(precoUnitario));

  if (sabores.length > 0) {
    const extraSabores = somarPrecos(sabores);
    const nomes = sabores.map(function (sabor) {
      return sabor.value;
    });

    precoUnitario += extraSabores;
    adicionarLinha(
      `Sabores: ${nomes.join(", ")}`,
      extraSabores > 0 ? `+ ${formatarReais(extraSabores)}` : ""
    );
  } else {
    adicionarLinha("Sabores: nenhum escolhido", "");
  }

  const extraBorda = Number(borda.dataset.preco);
  if (extraBorda > 0) {
    precoUnitario += extraBorda;
    adicionarLinha(borda.value, `+ ${formatarReais(extraBorda)}`);
  }

  if (adicionais.length > 0) {
    const extraAdicionais = somarPrecos(adicionais);
    const nomes = adicionais.map(function (adicional) {
      return adicional.value;
    });

    precoUnitario += extraAdicionais;
    adicionarLinha(
      `Adicionais: ${nomes.join(", ")}`,
      `+ ${formatarReais(extraAdicionais)}`
    );
  }

  if (quantidade > 1) {
    adicionarLinha("Valor de cada pizza", formatarReais(precoUnitario));
    adicionarLinha("Quantidade", `× ${quantidade}`);
  }

  totalResumo.textContent = formatarReais(precoUnitario * quantidade);
}

/* Texto no singular ou plural: "1 sabor", "2 sabores" */
function textoSabores(quantidade) {
  return quantidade === 1 ? "1 sabor" : `${quantidade} sabores`;
}

/* Chamada quando o cliente troca de tamanho */
function aoMudarTamanho() {
  const tamanho = obterTamanho();
  const maximo = Number(tamanho.dataset.max);
  const sabores = obterMarcados("sabor");

  dicaSabores.textContent =
    maximo === 1 ? "Escolha 1 sabor." : `Escolha até ${maximo} sabores.`;

  if (sabores.length > maximo) {
    const excedentes = sabores.slice(maximo);

    excedentes.forEach(function (sabor) {
      sabor.checked = false;
    });

    avisoSabores.textContent =
      `O tamanho ${tamanho.value} aceita ${textoSabores(maximo)}. ` +
      "Desmarcamos os sabores que passaram do limite.";
  } else {
    avisoSabores.textContent = "";
  }

  atualizarResumo();
}

function aoMudarSabor(evento) {
  const maximo = Number(obterTamanho().dataset.max);
  const sabores = obterMarcados("sabor");

  if (sabores.length > maximo) {
    evento.target.checked = false;
    avisoSabores.textContent =
      `Limite de ${textoSabores(maximo)} neste tamanho. ` +
      "Desmarque um sabor para escolher outro.";
  } else {
    avisoSabores.textContent = "";
  }

  atualizarResumo();
}

form.addEventListener("change", function (evento) {
  const nome = evento.target.name;

  if (nome === "tamanho") {
    aoMudarTamanho();
  } else if (nome === "sabor") {
    aoMudarSabor(evento);
  } else {
    if (nome === "quantidade") {
      campoQuantidade.value = obterQuantidade();
    }
    atualizarResumo();
  }
});

campoQuantidade.addEventListener("input", atualizarResumo);

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  if (obterMarcados("sabor").length === 0) {
    avisoSabores.textContent = "Escolha pelo menos 1 sabor para confirmar o pedido.";
    mensagemSucesso.hidden = true;
    form.querySelector('input[name="sabor"]').focus();
    return;
  }

  avisoSabores.textContent = "";
  mensagemSucesso.textContent =
    `Pedido confirmado! Total: ${totalResumo.textContent}. Obrigado pela preferência.`;
  mensagemSucesso.hidden = false;
});

aoMudarTamanho();