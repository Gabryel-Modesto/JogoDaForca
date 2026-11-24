const btnIniciar = document.querySelector("#btnIniciar");
const areaJogo = document.querySelector("#areaJogo");
const inicioJogo = document.querySelector("#inicioJogo");

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

btnIniciar.addEventListener("click", () => {
    sortearPalavra();
    
    areaJogo.hidden = false;
    inicioJogo.hidden = true;

    console.log(estadoJogo);
});