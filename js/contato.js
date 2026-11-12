const formContato = document.getElementById("form-contato");
const mensagemSucessoContato = document.getElementById("mensagem-sucesso-contato");
const campos = formContato.querySelectorAll("input, textarea");

const regras = {
  nome: function (valor) {
    if (valor.length === 0) {
      return "Informe seu nome.";
    }
    if (valor.length < 3) {
      return "O nome precisa ter pelo menos 3 letras.";
    }
    return "";
  },

  email: function (valor) {
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (valor.length === 0) {
      return "Informe seu e-mail.";
    }
    if (!formatoEmail.test(valor)) {
      return "Digite um e-mail válido, como nome@exemplo.com.";
    }
    return "";
  },

  telefone: function (valor) {
    if (valor.length === 0) {
      return "";
    }

    const digitos = valor.replace(/\D/g, "");

    if (digitos.length < 10 || digitos.length > 11) {
      return "Digite o telefone com DDD, por exemplo (81) 91234-5678.";
    }
    return "";
  },

  mensagem: function (valor) {
    if (valor.length === 0) {
      return "Escreva sua mensagem.";
    }
    if (valor.length < 10) {
      return "A mensagem precisa ter pelo menos 10 caracteres.";
    }
    return "";
  }
};

function validarCampo(campo) {
  const mensagemErro = regras[campo.name](campo.value.trim());
  const paragrafoErro = document.getElementById(`erro-${campo.name}`);

  paragrafoErro.textContent = mensagemErro;

  if (mensagemErro === "") {
    campo.removeAttribute("aria-invalid");
    campo.classList.remove("campo-invalido");
    return true;
  }

  campo.setAttribute("aria-invalid", "true");
  campo.classList.add("campo-invalido");
  return false;
}

campos.forEach(function (campo) {
  campo.addEventListener("blur", function () {
    validarCampo(campo);
  });

  campo.addEventListener("input", function () {
    if (campo.getAttribute("aria-invalid") === "true") {
      validarCampo(campo);
    }
  });
});

formContato.addEventListener("submit", function (evento) {
  evento.preventDefault();
  mensagemSucessoContato.hidden = true;

  let primeiroInvalido = null;

  campos.forEach(function (campo) {
    const valido = validarCampo(campo);

    if (!valido && primeiroInvalido === null) {
      primeiroInvalido = campo;
    }
  });

  if (primeiroInvalido !== null) {
    primeiroInvalido.focus();
    return;
  }

  const primeiroNome = document.getElementById("nome").value.trim().split(" ")[0];

  mensagemSucessoContato.textContent =
    `Obrigado, ${primeiroNome}! Recebemos sua mensagem e vamos responder em breve.`;
  mensagemSucessoContato.hidden = false;
  formContato.reset();
});