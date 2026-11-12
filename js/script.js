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
