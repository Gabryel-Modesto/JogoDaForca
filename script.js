const btnIniciar = document.querySelector("#btnIniciar");
const areaJogo = document.querySelector("#areaJogo");
const inicioJogo = document.querySelector("#inicioJogo");
const palavraSecreta = document.querySelector("#palavraSecreta");
const tecladoVirtual = document.querySelector("#tecladoVirtual");
const contadorErros = document.querySelector("#contadorErros");
const contadorAcertos = document.querySelector("#contadorAcertos");

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
      verificarLetra(letra);
    });

    tecladoVirtual.appendChild(botao);
  }
}

function verificarLetra(letra) {
  if (estadoJogo.finalizado) {
    return;
  }

  if (
    estadoJogo.letrasCorretas.includes(letra) ||
    estadoJogo.letrasErradas.includes(letra)
  ) {
    return;
  }

  if (estadoJogo.palavraAtual.includes(letra)) {
    estadoJogo.letrasCorretas.push(letra);
  } else {
    estadoJogo.letrasErradas.push(letra);
    estadoJogo.erros++;
  }

  atualizarPalavra();
  atualizarStatus();

  console.log(estadoJogo);
}

function atualizarStatus() {
  contadorErros.textContent = `${estadoJogo.erros} / ${estadoJogo.maxErros}`;

  contadorAcertos.textContent = estadoJogo.letrasCorretas.length;
}

btnIniciar.addEventListener("click", () => {
  sortearPalavra();
  atualizarPalavra();
  criarTeclado();
  atualizarStatus();

  areaJogo.hidden = false;
  inicioJogo.hidden = true;

  console.log(estadoJogo);
});
