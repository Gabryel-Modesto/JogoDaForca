const btnIniciar = document.querySelector("#btnIniciar");
const areaJogo = document.querySelector("#areaJogo");
const inicioJogo = document.querySelector("#inicioJogo");
const palavraSecreta = document.querySelector("#palavraSecreta");
const tecladoVirtual = document.querySelector("#tecladoVirtual");
const contadorErros = document.querySelector("#contadorErros");
const contadorAcertos = document.querySelector("#contadorAcertos");
const modalResultado = document.querySelector("#modalResultado");
const mensagemResultado = document.querySelector("#mensagemResultado");
const palavraRevelada = document.querySelector("#palavraRevelada");
const btnJogarNovamente = document.querySelector("#btnJogarNovamente");
const btnDica = document.querySelector("#btnDica");
const textoDica = document.querySelector("#textoDica");
const btnComoJogar = document.querySelector("#btnComoJogar");
const btnFecharInstrucoes = document.querySelector("#btnFecharInstrucoes");
const modalInstrucoes = document.querySelector("#modalInstrucoes");

const partesForca = [
  document.querySelector("#cabeca"),
  document.querySelector("#corpo"),
  document.querySelector("#braco-esquerdo"),
  document.querySelector("#braco-direito"),
  document.querySelector("#perna-esquerda"),
  document.querySelector("#perna-direita"),
];

const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const estadoJogo = {
  palavraAtual: "",
  dicaAtual: "",
  letrasCorretas: [],
  letrasErradas: [],
  erros: 0,
  maxErros: 6,
  finalizado: false,
  vitoria: false,
  dicaUtilizada: false,
};

const palavras = [
  {
    palavra: "JAVASCRIPT",
    dica: "Linguagem muito utilizada no desenvolvimento web.",
  },
  {
    palavra: "PYTHON",
    dica: "Linguagem bastante utilizada em inteligência artificial.",
  },
  {
    palavra: "GITHUB",
    dica: "Plataforma utilizada para hospedar repositórios de código.",
  },
  {
    palavra: "ORACLE",
    dica: "Empresa conhecida por seu sistema de banco de dados.",
  },
  {
    palavra: "DOCKER",
    dica: "Ferramenta utilizada para trabalhar com contêineres.",
  },
];

function sortearPalavra() {
  const indiceAleatorio = Math.floor(Math.random() * palavras.length);

  const palavraSorteada = palavras[indiceAleatorio];

  estadoJogo.palavraAtual = palavraSorteada.palavra;
  estadoJogo.dicaAtual = palavraSorteada.dica;
}

function atualizarPalavra() {
  palavraSecreta.textContent = "";

  for (const letra of estadoJogo.palavraAtual) {
    const span = document.createElement("span");

    if (estadoJogo.letrasCorretas.includes(letra)) {
      span.textContent = letra;
    } else {
      span.textContent = "_";
    }

    palavraSecreta.appendChild(span);
  }
}

function criarTeclado() {
  tecladoVirtual.textContent = "";

  for (const letra of alfabeto) {
    const botao = document.createElement("button");

    botao.textContent = letra;

    botao.addEventListener("click", () => {
      verificarLetra(letra, botao);
    });

    tecladoVirtual.appendChild(botao);
  }
}

function verificarLetra(letra, botao) {
  if (estadoJogo.finalizado) {
    return;
  }

  if (
    estadoJogo.letrasCorretas.includes(letra) ||
    estadoJogo.letrasErradas.includes(letra)
  ) {
    return;
  }

  //Desabilitando o botão clicado
  botao.disabled = true;

  if (estadoJogo.palavraAtual.includes(letra)) {
    estadoJogo.letrasCorretas.push(letra);
    botao.classList.add("letra-correta");
  } else {
    estadoJogo.letrasErradas.push(letra);
    estadoJogo.erros++;
    botao.classList.add("letra-errada");
  }

  atualizarPalavra();
  atualizarStatus();
  atualizarDesenho();
  verificarResultado();

  console.log(estadoJogo);
}

function atualizarStatus() {
  contadorErros.textContent = `${estadoJogo.erros} / ${estadoJogo.maxErros}`;

  contadorAcertos.textContent = estadoJogo.letrasCorretas.length;
}

function verificarResultado() {
  const venceu = [...estadoJogo.palavraAtual].every((letra) =>
    estadoJogo.letrasCorretas.includes(letra),
  );

  if (venceu) {
    estadoJogo.finalizado = true;
    estadoJogo.vitoria = true;
    finalizarJogo();

    console.log("Você Venceu!");
  } else if (estadoJogo.erros >= estadoJogo.maxErros) {
    estadoJogo.finalizado = true;
    estadoJogo.vitoria = false;
    finalizarJogo();

    console.log("Você perdeu!");
  }
}

function finalizarJogo() {
  if (estadoJogo.vitoria) {
    mensagemResultado.textContent = "Parabéns, você venceu!!";
  } else {
    mensagemResultado.textContent = "Perdeu, Melhore!";
  }

  palavraRevelada.textContent = `A palavra era: ${estadoJogo.palavraAtual}`;

  modalResultado.showModal();
}

function reiniciarJogo() {
  estadoJogo.palavraAtual = "";
  estadoJogo.dicaAtual = "";
  estadoJogo.letrasCorretas = [];
  estadoJogo.letrasErradas = [];
  estadoJogo.erros = 0;
  estadoJogo.finalizado = false;
  estadoJogo.vitoria = false;
  estadoJogo.dicaUtilizada = false;
  modalResultado.close();
  textoDica.textContent = "";
  textoDica.hidden = true;
  btnDica.disabled = false;

  sortearPalavra();
  atualizarPalavra();
  criarTeclado();
  atualizarStatus();
  atualizarDesenho();
}

function mostrarDica() {
  if (estadoJogo.finalizado || estadoJogo.dicaUtilizada) {
    return;
  }

  textoDica.textContent = estadoJogo.dicaAtual;
  textoDica.hidden = false;

  estadoJogo.dicaUtilizada = true;
  btnDica.disabled = true;
}

function atualizarDesenho() {
  partesForca.forEach((parte, indice) => {
    if (indice < estadoJogo.erros) {
      parte.style.visibility = "visible";
    } else {
      parte.style.visibility = "hidden";
    }
  });
}

document.addEventListener("keydown", (evento) => {
    const letra = evento.key.toUpperCase();
    const botoes = tecladoVirtual.querySelectorAll("button");

    if(!alfabeto.includes(letra)) {
        return;
    }

    if(areaJogo.hidden || estadoJogo.finalizado) {
        return;
    }

    const botao = [...botoes].find(
        (botao) => botao.textContent === letra
    );

    verificarLetra(letra, botao);
});

btnIniciar.addEventListener("click", () => {
  sortearPalavra();
  atualizarPalavra();
  criarTeclado();
  atualizarStatus();
  atualizarDesenho();

  areaJogo.hidden = false;
  inicioJogo.hidden = true;

  console.log(estadoJogo);
});

btnJogarNovamente.addEventListener("click", reiniciarJogo);
btnDica.addEventListener("click", mostrarDica);

btnComoJogar.addEventListener("click", () => {
    modalInstrucoes.showModal();
});

btnFecharInstrucoes.addEventListener("click", () => {
    modalInstrucoes.close();
});



