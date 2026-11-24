const btnIniciar = document.querySelector("#btnIniciar");
const areaJogo = document.querySelector("#areaJogo");
const inicioJogo = document.querySelector("#inicioJogo");
const palavraSecreta = document.querySelector("#palavraSecreta");

const estadoJogo = {
    palavraAtual: "",
    dicaAtual: "",
    letrasCorretas: [],
    letrasErradas: [],
    erros: 0,
    maxErros: 6,
    finalizado: false,
    vitoria: false
};

const palavras = [
    {
        palavra: "JAVASCRIPT",
        dica: "Linguagem muito utilizada no desenvolvimento web."
    },
    {
        palavra: "PYTHON",
        dica: "Linguagem bastante utilizada em inteligência artificial."
    },
    {
        palavra: "GITHUB",
        dica: "Plataforma utilizada para hospedar repositórios de código."
    },
    {
        palavra: "ORACLE",
        dica: "Empresa conhecida por seu sistema de banco de dados."
    },
    {
        palavra: "DOCKER",
        dica: "Ferramenta utilizada para trabalhar com contêineres."
    }
];

function sortearPalavra() {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);

    const palavraSorteada = palavras[indiceAleatorio];

    estadoJogo.palavraAtual = palavraSorteada.palavra;
    estadoJogo.dicaAtual = palavraSorteada.dica;
}

function atualizarPalavra() {
    palavraSecreta.textContent = "";

    for(const letra of estadoJogo.palavraAtual) {
        const span = document.createElement("span");

        if(estadoJogo.letrasCorretas.includes(letra)) {
            span.textContent = letra;
        } else {
            span.textContent = "_"
        }

        palavraSecreta.appendChild(span);
    };
};


btnIniciar.addEventListener("click", () => {
    sortearPalavra();
    atualizarPalavra();

    areaJogo.hidden = false;
    inicioJogo.hidden = true;

    console.log(estadoJogo);
});