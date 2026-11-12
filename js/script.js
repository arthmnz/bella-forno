    const HORA_ABERTURA = 18;
const HORA_FECHAMENTO = 23;

function atualizarStatus() {
  const elemento = document.getElementById("status-aberto");

  if (elemento === null) {
    return;
  }

  const horaAtual = new Date().getHours();
  const estaAberto = horaAtual >= HORA_ABERTURA && horaAtual < HORA_FECHAMENTO;

  if (estaAberto) {
    elemento.textContent = `Aberto agora · fechamos às ${HORA_FECHAMENTO}h`;
    elemento.classList.add("is-open");
  } else {
    elemento.textContent = `Fechado agora · abrimos às ${HORA_ABERTURA}h`;
    elemento.classList.add("is-closed");
  }
}

atualizarStatus();

function iniciarMenuMobile() {
  const botaoMenu = document.querySelector(".menu-toggle");
  const menuPrincipal = document.getElementById("menu-principal");

  if (botaoMenu === null || menuPrincipal === null) {
    return;
  }

  function alternarMenu() {
    const aberto = menuPrincipal.classList.toggle("aberto");

    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.textContent = aberto ? "Fechar" : "Menu";
  }

  botaoMenu.addEventListener("click", alternarMenu);

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && menuPrincipal.classList.contains("aberto")) {
      alternarMenu();
      botaoMenu.focus();
    }
  });
}

iniciarMenuMobile();