
const botoesFiltro = document.querySelectorAll(".filtro");
const campoBusca = document.getElementById("busca");
const cards = document.querySelectorAll(".card");
const mensagemSemResultados = document.getElementById("sem-resultados");

let categoriaAtiva = "todas";

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function aplicarFiltros() {
  const termo = normalizar(campoBusca.value.trim());
  let visiveis = 0;

  cards.forEach(function (card) {
    const categoriaOk =
      categoriaAtiva === "todas" || card.dataset.categoria === categoriaAtiva;
    const buscaOk = normalizar(card.dataset.nome).includes(termo);

    if (categoriaOk && buscaOk) {
      card.hidden = false;
      visiveis++;
    } else {
      card.hidden = true;
    }
  });

  mensagemSemResultados.hidden = visiveis > 0;
}

botoesFiltro.forEach(function (botao) {
  botao.addEventListener("click", function () {
    categoriaAtiva = botao.dataset.filtro;

    botoesFiltro.forEach(function (outro) {
      outro.classList.remove("ativo");
      outro.setAttribute("aria-pressed", "false");
    });

    botao.classList.add("ativo");
    botao.setAttribute("aria-pressed", "true");

    aplicarFiltros();
  });
});

campoBusca.addEventListener("input", aplicarFiltros);