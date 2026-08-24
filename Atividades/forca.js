const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class JogoDaForca {
  constructor(palavra, vidas) {
    this.palavra = palavra.toUpperCase();
    this.vidas = vidas;
    this.letrasCertas = [];
    this.letrasErradas = [];
  }

  mostrarPalavra() {
    let resultado = "";
    for (let letra of this.palavra) {
      if (this.letrasCertas.includes(letra)) {
        resultado += letra + " ";
      } else {
        resultado += "_ ";
      }
    }
    return resultado;
  }

  jogar(letra) {
    letra = letra.toUpperCase();

    if (this.palavra.includes(letra)) {
      if (!this.letrasCertas.includes(letra)) {
        this.letrasCertas.push(letra);
      }
    } else {
      if (!this.letrasErradas.includes(letra)) {
        this.letrasErradas.push(letra);
        this.vidas--;
      }
    }
  }

  ganhou() {
    return this.palavra
      .split("")
      .every((letra) => this.letrasCertas.includes(letra));
  }

  perdeu() {
    return this.vidas <= 0;
  }
}

const palavras = ["JAVASCRIPT", "COMPUTADOR", "PROGRAMA", "TECLADO", "INTERNET"];
const palavraEscolhida = palavras[Math.floor(Math.random() * palavras.length)];

const jogo = new JogoDaForca(palavraEscolhida, 6);

console.log("=== JOGO DA FORCA ===");
console.log("A palavra tem " + palavraEscolhida.length + " letras.\n");

function perguntar() {
  console.log("Palavra: " + jogo.mostrarPalavra());
  console.log("Vidas: " + jogo.vidas);
  console.log("Letras erradas: " + jogo.letrasErradas.join(", "));

  rl.question("\nDigite uma letra: ", (letra) => {
    if (!letra || letra.length !== 1) {
      console.log("\nDigite apenas uma letra!\n");
      perguntar();
      return;
    }

    jogo.jogar(letra);
    console.log("");

    if (jogo.ganhou()) {
      console.log("Você ganhou!!! A palavra era " + jogo.palavra);
      rl.close();
    } else if (jogo.perdeu()) {
      console.log("Você perdeu! A palavra certa er" + jogo.palavra);
      rl.close();
    } else {
      perguntar();
    }
  });
}

perguntar();