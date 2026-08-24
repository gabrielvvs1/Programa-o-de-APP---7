import readline from "readline";

class Forca {
  constructor(resposta) {
    this.resposta = resposta.split("");

    this.segredo = [];

    for (let i = 0; i < this.resposta.length; i++) {
      this.segredo[i] = "#";
    }

    this.vidas = 5;
  }
  mostrar() {
    console.log(`Você tem ${this.vidas} vidas restantes`);
    console.log(`A palavra tem ${this.resposta.length} letras`);
    console.log(this.segredo);
  }

  ganhou() {
    if (!this.segredo.includes("#")) {
      console.log("\n\nParabens Você Ganhou!!!\n\n");
      process.exit(1);
    }
  }

  tentativa(chute) {
    if (this.resposta.includes(chute)) {
      console.clear();
      console.log("\nA letra está na palavra!\n");
      for (let i = 0; i < this.resposta.length; i++) {
        if (this.resposta[i] == chute) {
          this.segredo[i] = chute;
        }
      }
      this.ganhou();
    } else {
      console.clear();
      console.log("\nA letra NÃO está na palavra!\n");
      if (this.vidas > 1) {
        this.vidas--;
      } else {
        console.log("\nAcabaram as vidas, VOCÊ PERDEU\n");
        process.exit(1);
      }
    }
  }
}

const jogo = new Forca("luz");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function perguntar() {
  jogo.mostrar();
  rl.question("Digite uma letra: ", (chute) => {
    jogo.tentativa(chute);
    perguntar();
  });
}

perguntar();