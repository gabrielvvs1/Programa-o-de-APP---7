const readline = require("readline");

class JogoDaVelha {
  constructor() {
    this.tabuleiro = ["", "", "", "", "", "", "", "", ""];
    this.jogadorAtual = "X";
    this.jogadorNumero = 1;
    this.fimDeJogo = false;
  }

  mostrarTabuleiro() {
    const t = this.tabuleiro;
    console.log("\n");
    console.log(" " + (t[0] || " ") + " | " + (t[1] || " ") + " | " + (t[2] || " "));
    console.log("-----------");
    console.log(" " + (t[3] || " ") + " | " + (t[4] || " ") + " | " + (t[5] || " "));
    console.log("-----------");
    console.log(" " + (t[6] || " ") + " | " + (t[7] || " ") + " | " + (t[8] || " "));
    console.log("\n");
  }

  jogar(posicao) {
    if (posicao < 0 || posicao > 8) {
      console.log("Posição inválida! Escolha um número de 1 a 9.");
      return false;
    }

    if (this.tabuleiro[posicao] !== "") {
      console.log("Essa posição já foi jogada. Escolha outra.");
      return false;
    }

    this.tabuleiro[posicao] = this.jogadorAtual;
    return true;
  }

  verificarVencedor() {
    const t = this.tabuleiro;

    const combinacoes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < combinacoes.length; i++) {
      const a = combinacoes[i][0];
      const b = combinacoes[i][1];
      const c = combinacoes[i][2];

      if (t[a] !== "" && t[a] === t[b] && t[b] === t[c]) {
        return t[a];
      }
    }

    return null;
  }

  verificarEmpate() {
    for (let i = 0; i < this.tabuleiro.length; i++) {
      if (this.tabuleiro[i] === "") {
        return false;
      }
    }
    return true;
  }

  trocarJogador() {
    if (this.jogadorAtual === "X") {
      this.jogadorAtual = "O";
      this.jogadorNumero = 2;
    } else {
      this.jogadorAtual = "X";
      this.jogadorNumero = 1;
    }
  }
}

const jogo = new JogoDaVelha();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("As posições do tabuleiro são numeradas de 1 a 9:");
console.log(" 1 | 2 | 3 ");
console.log("-----------");
console.log(" 4 | 5 | 6 ");
console.log("-----------");
console.log(" 7 | 8 | 9 ");

jogo.mostrarTabuleiro();

function perguntarJogada() {
  rl.question(
    "Jogador " +
      jogo.jogadorNumero +
      " (" +
      jogo.jogadorAtual +
      "), escolha uma posição (1-9): ",
    function (resposta) {
      const posicao = Number(resposta) - 1;

      if (isNaN(posicao)) {
        console.log("Digite um numero válido");
        perguntarJogada();
        return;
      }

      const jogadaValida = jogo.jogar(posicao);

      if (!jogadaValida) {
        perguntarJogada();
        return;
      }

      jogo.mostrarTabuleiro();

      const vencedor = jogo.verificarVencedor();

      if (vencedor) {
        console.log("O Jogador " +  jogo.jogadorNumero +" (" +vencedor +") venceu o jogo!");
        rl.close();
        return;
      }

      if (jogo.verificarEmpate()) {
        console.log("Deu velha");
        rl.close();
        return;
      }

      jogo.trocarJogador();
      perguntarJogada();
    }
  );
}

perguntarJogada();